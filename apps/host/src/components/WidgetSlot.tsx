'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ensureLoaded } from '../lib/widget-loader';
import { performanceTracker } from '../lib/performance-tracker';

type SlotStatus = 'loading' | 'ready' | 'error';

type Props = {
  id: string;
  tag: string;
  url: string;
  title?: string;
};

export default function WidgetSlot({ id, tag, url, title }: Props) {
  const hostRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<SlotStatus>('loading');
  const [failReason, setFailReason] = useState<string | undefined>(undefined);
  const [retryCount, setRetryCount] = useState(0);

  const loadWidget = useCallback(() => {
    let cancelled = false;
    setStatus('loading');
    setFailReason(undefined);

    // Start performance tracking
    performanceTracker.startTracking(id);

    ensureLoaded(url, { widgetId: id, expectedTag: tag })
      .catch((err: unknown) => {
        if (!cancelled) {
          setStatus('error');
          setFailReason(err instanceof Error ? err.message : 'load-error');
          performanceTracker.markError(id);
        }
      });

    console.debug(`[WidgetSlot] loading: ${tag} from ${url}`);
    return () => { cancelled = true; };
  }, [url, id, tag]);

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
        performanceTracker.markError(id);
      }
    }, 10000);

    const onReady = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      setStatus('ready');
      setFailReason(undefined);
      performanceTracker.markReady(id);
    };
    const onError = (e: Event) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      setStatus('error');
      const detail: { reason: string } = (e as CustomEvent).detail;
      setFailReason(detail && typeof detail.reason === 'string' ? detail.reason : 'widget-error');
      performanceTracker.markError(id);
    };

    widgetElement.addEventListener('widget-ready', onReady as EventListener);
    widgetElement.addEventListener('widget-error', onError as EventListener);
    return () => {
      window.clearTimeout(timeout);
      widgetElement.removeEventListener('widget-ready', onReady as EventListener);
      widgetElement.removeEventListener('widget-error', onError as EventListener);
    };
  }, [tag, id]);

  const Tag = useMemo(() => tag as React.ElementType, [tag]);

  // Get load time for display in dev mode
  const loadTime = performanceTracker.getMetrics(id)?.loadDuration;
  const showLoadTime = process.env.NODE_ENV !== 'production' && status === 'ready' && loadTime;

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
          {showLoadTime && ` (${loadTime.toFixed(0)}ms)`}
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


