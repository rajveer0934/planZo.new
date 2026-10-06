// Sarthi AI Chat Service
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

const FALLBACK_BACKEND_ENDPOINTS = [
  'https://ais-pre-4jxtpt4bcbmoak3lbjynqw-700559720665.asia-southeast1.run.app/api/chat',
  'https://ais-dev-4jxtpt4bcbmoak3lbjynqw-700559720665.asia-southeast1.run.app/api/chat',
];

/**
 * Primary Sarthi AI Query Handler
 * Calls the backend `/api/chat` endpoint with automatic retry on transient spikes.
 * Does NOT use credentials: 'include' to guarantee seamless cross-origin and cross-browser support
 * across all student laptops, mobile phones, and incognito sessions.
 */
export async function querySarthiAi(payload: ChatRequestPayload): Promise<string> {
  const localEndpoint = '/api/chat';

  // Candidate endpoints to try
  const endpointsToTry: string[] = [localEndpoint];
  if (
    typeof window !== 'undefined' &&
    window.location.origin &&
    !window.location.origin.includes('localhost') &&
    !window.location.origin.includes('4jxtpt4bcbmoak3lbjynqw')
  ) {
    endpointsToTry.push(...FALLBACK_BACKEND_ENDPOINTS);
  }

  let lastErrorMessage = '';

  for (const endpoint of endpointsToTry) {
    // Attempt up to 2 times for each endpoint in case of transient 503 load spike
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout for deep thinking

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          signal: controller.signal,
          body: JSON.stringify(payload),
        });

        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data && data.reply) {
            return cleanAiResponseFormat(data.reply);
          }
        }

        if (res.status === 503 || res.status === 429) {
          lastErrorMessage = 'AI server is experiencing high traffic. Please retry.';
          // Wait 1.5s before second attempt
          if (attempt === 1) {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            continue;
          }
        } else {
          lastErrorMessage = `Server responded with status ${res.status}`;
        }
      } catch (netErr: any) {
        if (netErr?.name === 'AbortError') {
          lastErrorMessage = 'Request timed out. Please try asking again.';
        } else {
          lastErrorMessage = netErr?.message || 'Network connection failed.';
        }
        if (attempt === 1) {
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }
    }
  }

  // If all live endpoints failed, throw so UI can show a clear Retry button
  throw new Error(
    lastErrorMessage || 'Sarthi AI is currently unreachable. Please check your network and retry.'
  );
}
