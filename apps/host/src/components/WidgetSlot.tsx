'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ensureLoaded } from '../lib/widget-loader';

type SlotStatus = 'loading' | 'ready' | 'error';

type Props = {
  tag: string;
  url: string;
  title?: string;
};

export default function WidgetSlot({ tag, url, title }: Props) {
  const hostRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<SlotStatus>('loading');
  const [failReason, setFailReason] = useState<string | undefined>(undefined);
  const [retryCount, setRetryCount] = useState(0);

  const loadWidget = useCallback(() => {
    let cancelled = false;
    setStatus('loading');
    setFailReason(undefined);

    ensureLoaded(url)
      .catch((err: unknown) => {
        if (!cancelled) {
          setStatus('error');
          setFailReason(err instanceof Error ? err.message : 'load-error');
        }
      });

    console.debug(`[WidgetSlot] loading: ${tag} from ${url}`);
    return () => { cancelled = true; };
  }, [url]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    loadWidget();
  };

  useEffect(() => {
    return loadWidget();
  }, [loadWidget]);

  useLayoutEffect(() => {
    const widgetElement = hostRef.current;
    if (!widgetElement) return;

    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled && status !== 'error' && status !== 'ready') {
        settled = true;
        setStatus('error');
        setFailReason('ready-timeout');
      }
    }, 10000);

    const onReady = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      setStatus('ready');
      setFailReason(undefined);
    };
    const onError = (e: Event) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      setStatus('error');
      const detail: { reason: string } = (e as CustomEvent).detail;
      setFailReason(detail && typeof detail.reason === 'string' ? detail.reason : 'widget-error');
    };

    widgetElement.addEventListener('widget-ready', onReady as EventListener);
    widgetElement.addEventListener('widget-error', onError as EventListener);
    return () => {
      window.clearTimeout(timeout);
      widgetElement.removeEventListener('widget-ready', onReady as EventListener);
      widgetElement.removeEventListener('widget-error', onError as EventListener);
    };
  }, [tag]);

  const Tag = useMemo(() => tag as React.ElementType, [tag]);

  return (
    <div className="slot">
      <div className="slot__hdr">
        <span className="slot__title">{title ?? tag}</span>
        <span
          className={`slot__badge slot__badge--${status}`}
          aria-live="polite"
          title={status === 'error' ? failReason : status}
        >
          <span className="slot__dot" />
          {status === 'error' ? (failReason ?? 'error') : status}
        </span>
      </div>
      <div className="slot__body" data-status={status}>
        {status === 'loading' && <div className="slot__skeleton" />}
        {status === 'error' && (
          <div className="slot__error">
            <div className="error-message">
              <strong>Failed to load widget</strong>
              <p>{failReason || 'Unknown error occurred'}</p>
              {retryCount < 3 && (
                <button className="retry-btn" onClick={handleRetry}>
                  Try Again
                </button>
              )}
              {retryCount >= 3 && (
                <p className="retry-exhausted">Maximum retry attempts reached</p>
              )}
            </div>
          </div>
        )}
        <Tag
          ref={hostRef}
          className="slot__webc"
        />
      </div>
    </div>
  );
}


