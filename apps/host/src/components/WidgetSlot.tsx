'use client';

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ensureLoaded } from '../lib/widget-loader';
import { performanceTracker } from '../lib/performance-tracker';

type SlotStatus = 'loading' | 'ready' | 'error';

type Props = {
  id: string;
  tag: string;
  url: string;
  integrity?: string;
  trustedOrigin?: string;
  title?: string;
  devMode?: boolean;
  onSettings?: () => void;
  onDelete?: () => void;
};

export default function WidgetSlot({ id, tag, url, integrity, trustedOrigin, title, devMode, onSettings, onDelete }: Props) {
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

    ensureLoaded(url, { integrity, trustedOrigin, expectedTag: tag, widgetId: id })
      .catch((err: unknown) => {
        if (!cancelled) {
          setStatus('error');
          setFailReason(err instanceof Error ? err.message : 'load-error');
          performanceTracker.markError(id);
        }
      });

    console.debug(`[WidgetSlot] loading: ${tag} from ${url}`);
    return () => { cancelled = true; };
  }, [url, id, tag, integrity, trustedOrigin]);

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
  const showLoadTime = devMode && status === 'ready' && loadTime;

  return (
    <div className="slot">
      <div className="slot__hdr">
        <span className="slot__title">{title ?? tag}</span>
        <div className="slot__hdr-right">
          {(devMode || status !== 'ready') && (
            <span
              className={`slot__badge slot__badge--${status}`}
              aria-live="polite"
              title={status === 'error' ? failReason : status}
            >
              <span className="slot__dot" />
              {status === 'error' ? (failReason ?? 'error') : status}
              {showLoadTime && ` (${loadTime.toFixed(0)}ms)`}
            </span>
          )}
          {onSettings && (
            <button
              className="slot__action"
              onClick={(e) => { e.stopPropagation(); onSettings(); }}
              aria-label="Widget settings"
              title="Settings"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
            </button>
          )}
          {onDelete && (
            <button
              className="slot__action slot__action--delete"
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              aria-label="Remove widget"
              title="Remove from page"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14H6L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4h6v2"/>
              </svg>
            </button>
          )}
        </div>
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


