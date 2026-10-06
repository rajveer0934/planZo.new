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

const env = ((import.meta as any)?.env ?? {}) as Record<string, string | undefined>;

// Backend URL, e.g. https://your-backend.run.app
// .env me set karo:  VITE_API_BASE_URL=https://your-backend.run.app
// Agar frontend aur backend SAME domain par hain to khali chhod do.
// NOTE: Vite env build time par bake hota hai -- .env badalne ke baad
// dev server restart / dobara build + deploy zaroori hai.
const API_BASE: string = (env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');

// Optional backup backend (sirf tab use hoga jab .env me diya ho):
// VITE_FALLBACK_API_URL=https://backup-backend.run.app
// Purana hardcoded "ais-dev" URL hata diya gaya hai -- wo expire ho chuka tha
// aur har request me 30s x 2 extra timeout add kar raha tha.
const FALLBACK_API_BASE: string = (env.VITE_FALLBACK_API_URL || '').trim().replace(/\/+$/, '');

const REQUEST_TIMEOUT_MS = 60000; // per attempt (AI + cold start ke liye 60s)
const MAX_ATTEMPTS_PER_ENDPOINT = 2;
const MAX_HISTORY_MESSAGES = 10; // sirf last N messages bhejo
const RETRYABLE_STATUS = [408, 425, 429, 500, 502, 503, 504];

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
  if (FALLBACK_API_BASE) endpoints.push(`${FALLBACK_API_BASE}/api/chat`);

  // Production me API_BASE khali hai matlab same-origin /api/chat use hoga.
  // Agar frontend static hosting par hai (Vercel/Netlify/Firebase) to wahan
  // /api/chat exist nahi karta -> 404/HTML. Isliye warning.
  if (typeof window !== 'undefined' && !API_BASE) {
    const host = window.location?.hostname || '';
    const isLocal = host === 'localhost' || host === '127.0.0.1';
    if (!isLocal) {
      console.warn(
        '[SarthiAI] VITE_API_BASE_URL set nahi hai. Same-origin /api/chat use ho raha hai. ' +
          'Agar backend alag domain par hai to .env me VITE_API_BASE_URL set karke dobara build karo.'
      );
    }
  }
  return Array.from(new Set(endpoints));
}

/** Server ke error body se readable message nikalo (JSON ya plain text) */
function extractServerMessage(raw: string): string {
  if (!raw) return '';
  try {
    const j = JSON.parse(raw);
    const m = j?.error?.message ?? j?.error ?? j?.message ?? j?.detail;
    if (m) return typeof m === 'string' ? m : JSON.stringify(m);
  } catch {
    /* not JSON */
  }
  // HTML error page ho to ignore
  if (/^\s*</.test(raw)) return '';
  return raw.slice(0, 200);
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

    // Body hamesha timeout ke andar hi padho
    const raw = await res.text();

    if (!res.ok) {
      const serverMsg = extractServerMessage(raw);
      const retryable = RETRYABLE_STATUS.includes(res.status);
      let msg = serverMsg || `Server error (${res.status})`;

      if (res.status === 429 || res.status === 503) {
        msg = 'AI server is experiencing high traffic. Please retry.';
      } else if (res.status === 404 || res.status === 405) {
        msg = 'Chat backend (/api/chat) not found. Backend deploy / VITE_API_BASE_URL check karo.';
      } else if (res.status === 413) {
        msg = 'Request too large. Attachment chhota karke try karo.';
      } else if (res.status === 401 || res.status === 403) {
        msg = serverMsg || 'Backend ne request reject ki (auth / API key / CORS check karo).';
      }
      console.error(`[SarthiAI] ${endpoint} -> ${res.status}`, raw.slice(0, 300));
      throw new ChatHttpError(msg, res.status, retryable);
    }

    // Content-type par depend mat karo -- seedha JSON parse try karo
    let data: any;
    try {
      data = JSON.parse(raw);
    } catch {
      // Usually HTML page aata hai jab backend exist hi nahi karta
      console.error(`[SarthiAI] Non-JSON response from ${endpoint}:`, raw.slice(0, 300));
      throw new ChatHttpError(
        'Backend returned a non-JSON response. /api/chat endpoint ya VITE_API_BASE_URL check karo.',
        res.status,
        false
      );
    }

    const reply = data?.reply ?? data?.text ?? data?.response ?? data?.message;

    if (typeof reply === 'string' && reply.trim()) {
      return reply;
    }

    throw new ChatHttpError(
      data?.error
        ? typeof data.error === 'string'
          ? data.error
          : data.error?.message || 'Sarthi AI returned an error.'
        : 'Sarthi AI returned an empty reply.',
      502,
      true
    );
  } catch (err: any) {
    if (err instanceof ChatHttpError) throw err;
    if (err?.name === 'AbortError') {
      throw new ChatHttpError('Request timed out. Please try asking again.', 408, true);
    }
    // Network error / CORS block / DNS fail / server down
    console.error(`[SarthiAI] network/CORS error on ${endpoint}:`, err);
    throw new ChatHttpError(
      'Cannot reach Sarthi AI server. Internet, backend URL ya CORS settings check karo.',
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
 * - Pehle configured / same-origin backend, phir optional fallback
 * - Sirf transient errors (408/429/5xx/timeout/network) par retry
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
          await sleep(1500 * attempt); // backoff
        }
      }
    }
  }

  throw new Error(
    lastErrorMessage || 'Sarthi AI is currently unreachable. Please check your network and retry.'
  );
}
