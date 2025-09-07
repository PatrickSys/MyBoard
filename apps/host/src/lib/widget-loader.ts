const registry = new Map<string, Promise<void>>();

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
};

export function ensureLoaded(url: string, options: EnsureLoadedOptions = {}): Promise<void> {
  const timeoutMs = options.timeoutMs ?? 10000;
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

    script.addEventListener('load', () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      resolve();
    });

    script.addEventListener('error', () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timer);
      reject(new Error('load-error'));
    });
  });

  registry.set(url, promise);
  return promise;
}


