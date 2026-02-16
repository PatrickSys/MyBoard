import { widgetProcessManager } from './widget-process-manager';

const registry = new Map<string, Promise<void>>();
const failures = new Map<string, { count: number; blockedUntil: number }>();

const MAX_FAILURES = 3;
const CIRCUIT_MS = 15000;

function injectModuleScript(url: string): HTMLScriptElement {
  const script = document.createElement('script');
  script.type = 'module';
  script.src = url;
  script.crossOrigin = 'anonymous';
  document.head.appendChild(script);
  return script;
}

export type EnsureLoadedOptions = {
  timeoutMs?: number;
  readyTimeoutMs?: number;
  integrity?: string;
  trustedOrigin?: string;
  expectedTag?: string;
  widgetId?: string;
};

export function ensureLoaded(url: string, options: EnsureLoadedOptions = {}): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 10000;
  const readyTimeoutMs = options.readyTimeoutMs ?? 4000;
  const widgetId = options.widgetId;

  if (widgetId && widgetProcessManager.isQuarantined(widgetId)) {
    return Promise.reject(new Error('widget-quarantined'));
  }

  const failure = failures.get(url);
  if (failure && failure.blockedUntil > Date.now()) {
    return Promise.reject(new Error('circuit-open'));
  }

  if (options.trustedOrigin) {
    const parsed = new URL(url, window.location.origin);
    if (parsed.origin !== options.trustedOrigin) {
      return Promise.reject(new Error('untrusted-origin'));
    }
  }

  const existing = registry.get(url);
  if (existing) return existing;

  const promise = new Promise<void>((resolve, reject) => {
    let settled = false;
    const timer = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      reject(new Error('load-timeout'));
    }, timeoutMs);

    const script = injectModuleScript(url);
    if (options.integrity) {
      script.integrity = options.integrity;
      script.crossOrigin = 'anonymous';
    }

    script.addEventListener('load', () => {
      if (settled) return;

      const expectedTag = options.expectedTag;
      if (!expectedTag) {
        settled = true;
        window.clearTimeout(timer);
        failures.delete(url);
        resolve();
        return;
      }

      const readyStart = Date.now();
      const checkReady = () => {
        if (settled) return;
        if (customElements.get(expectedTag)) {
          settled = true;
          window.clearTimeout(timer);
          failures.delete(url);
          resolve();
          return;
        }
        if (Date.now() - readyStart >= readyTimeoutMs) {
          settled = true;
          window.clearTimeout(timer);
          reject(new Error('element-not-defined'));
          return;
        }
        window.setTimeout(checkReady, 100);
      };
      checkReady();
    });

    script.addEventListener('error', () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      script.remove();
      reject(new Error('load-error'));
    });
  });

  const trackedPromise = promise.catch((error) => {
      const state = failures.get(url) ?? { count: 0, blockedUntil: 0 };
      const count = state.count + 1;
      failures.set(url, {
        count,
        blockedUntil: count >= MAX_FAILURES ? Date.now() + CIRCUIT_MS : 0,
      });
      if (widgetId) {
        widgetProcessManager.recordCrash(widgetId, error instanceof Error ? error.message : 'load-error');
      }
      registry.delete(url);
      throw error;
    });

  registry.set(url, trackedPromise);

  return trackedPromise;
}


