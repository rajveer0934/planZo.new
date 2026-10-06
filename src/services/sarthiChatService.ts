export interface ChatAttachment {
  name: string;
  mimeType: string;
  data: string; // base64
}

export interface ChatMessageItem {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachment?: ChatAttachment;
}

export interface ChatContextPayload {
  college?: string;
  branch?: string;
  semester?: number;
  bandwidth?: string;
  attendance?: number;
}

export interface ChatRequestPayload {
  messages: ChatMessageItem[];
  attachment?: ChatAttachment;
  context?: ChatContextPayload;
}

/**
 * Cleanly format academic response text
 */
export function cleanAiResponseFormat(text: string): string {
  if (!text) return '';
  return text
    .replace(/^#{4,6}\s+/gm, '### ')
    .replace(/\*{3,}/g, '**')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/* ------------------------------------------------------------------ */
/* Config                                                              */
/* ------------------------------------------------------------------ */

// Production backend URL (e.g. https://your-backend.run.app) -- set it in .env as:
// VITE_API_BASE_URL=https://your-backend.run.app
// Agar frontend aur backend same domain par hain to khali chhod do.
const API_BASE: string = (
  ((import.meta as any)?.env?.VITE_API_BASE_URL as string | undefined) || ''
).replace(/\/+$/, '');

// Last-resort fallback. IMPORTANT: ye URL sahi aur zinda hona chahiye,
// warna isko hata do. Dead URL sirf timeout badhata hai.
const FALLBACK_BACKEND_ENDPOINT =
  'https://ais-dev-xwtqs7ljetyij5npxh755f-893813178872.asia-east1.run.app/api/chat';

const REQUEST_TIMEOUT_MS = 30000; // per attempt (fetch + body read dono cover)
const MAX_ATTEMPTS_PER_ENDPOINT = 2;
const MAX_HISTORY_MESSAGES = 10; // sirf last N messages bhejo

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

class ChatHttpError extends Error {
  status: number;
  retryable: boolean;
  constructor(message: string, status: number, retryable: boolean) {
    super(message);
    this.name = 'ChatHttpError';
    this.status = status;
    this.retryable = retryable;
  }
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Payload halka karo:
 * - sirf recent messages
 * - purane messages se base64 attachment hatao (current attachment
 *   payload.attachment me already jaata hai)
 */
function buildLeanPayload(payload: ChatRequestPayload): ChatRequestPayload {
  const recent = (payload.messages || []).slice(-MAX_HISTORY_MESSAGES);
  const messages = recent.map(({ attachment, ...rest }) => rest as ChatMessageItem);
  return { ...payload, messages };
}

function getEndpoints(): string[] {
  const endpoints: string[] = [`${API_BASE}/api/chat`];

  const isBrowser = typeof window !== 'undefined' && !!window.location?.origin;
  if (isBrowser) {
    const origin = window.location.origin;
    const isLocalOrDev = origin.includes('localhost') || origin.includes('ais-dev');
    if (!isLocalOrDev && !FALLBACK_BACKEND_ENDPOINT.startsWith(origin)) {
      endpoints.push(FALLBACK_BACKEND_ENDPOINT);
    }
  }
  return Array.from(new Set(endpoints));
}

async function postOnce(endpoint: string, body: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
      body,
    });

    if (!res.ok) {
      let detail = '';
      try {
        detail = (await res.text()).slice(0, 200);
      } catch {
        /* ignore */
      }
      const retryable = [429, 500, 502, 503, 504].includes(res.status);
      let msg = `Server error (${res.status})`;
      if (res.status === 429 || res.status === 503) {
        msg = 'AI server is experiencing high traffic. Please retry.';
      } else if (res.status === 404 || res.status === 405) {
        msg = 'Chat backend (/api/chat) not found. Backend deploy / URL check karo.';
      } else if (res.status === 413) {
        msg = 'Request too large. Attachment chhota karke try karo.';
      }
      console.error(`[SarthiAI] ${endpoint} -> ${res.status}`, detail);
      throw new ChatHttpError(msg, res.status, retryable);
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      // Usually HTML page aata hai jab backend exist hi nahi karta
      throw new ChatHttpError(
        'Backend returned a non-JSON response. /api/chat endpoint check karo.',
        res.status,
        false
      );
    }

    const data = await res.json();
    const reply = data?.reply ?? data?.text ?? data?.response ?? data?.message;

    if (typeof reply === 'string' && reply.trim()) {
      return reply;
    }

    throw new ChatHttpError(
      data?.error ? String(data.error) : 'Sarthi AI returned an empty reply.',
      502,
      true
    );
  } catch (err: any) {
    if (err instanceof ChatHttpError) throw err;
    if (err?.name === 'AbortError') {
      throw new ChatHttpError('Request timed out. Please try asking again.', 408, true);
    }
    // Network error / CORS block
    console.error(`[SarthiAI] network/CORS error on ${endpoint}:`, err);
    throw new ChatHttpError(
      err?.message || 'Network connection failed.',
      0,
      true
    );
  } finally {
    clearTimeout(timeoutId);
  }
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

/**
 * Primary Sarthi AI Query Handler
 * - Pehle same-origin / configured backend, phir fallback
 * - Sirf transient errors (429/5xx/timeout/network) par retry
 * - credentials: 'include' use nahi hota (cross-origin friendly)
 */
export async function querySarthiAi(payload: ChatRequestPayload): Promise<string> {
  const body = JSON.stringify(buildLeanPayload(payload));
  const endpoints = getEndpoints();

  let lastErrorMessage = '';

  for (const endpoint of endpoints) {
    for (let attempt = 1; attempt <= MAX_ATTEMPTS_PER_ENDPOINT; attempt++) {
      try {
        const reply = await postOnce(endpoint, body);
        return cleanAiResponseFormat(reply);
      } catch (err: any) {
        lastErrorMessage = err?.message || lastErrorMessage;
        const retryable = err instanceof ChatHttpError ? err.retryable : true;

        // Non-retryable (404, 400, HTML response...) -> is endpoint ko chhod do
        if (!retryable) break;

        if (attempt < MAX_ATTEMPTS_PER_ENDPOINT) {
          await sleep(1000 * attempt); // 1s backoff
        }
      }
    }
  }

  throw new Error(
    lastErrorMessage || 'Sarthi AI is currently unreachable. Please check your network and retry.'
  );
}
