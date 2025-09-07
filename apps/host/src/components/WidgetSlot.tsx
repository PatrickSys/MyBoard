'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ensureLoaded } from '../lib/widget-loader';

type Status = 'loading' | 'ready' | 'error';

type Props = {
  tag: string;
  url: string;
  title?: string;
};

export default function WidgetSlot({ tag, url, title }: Props) {
  const hostRef = useRef<HTMLElement | null>(null);
  const [status, setStatus] = useState<Status>('loading');
  const [reason, setReason] = useState<string | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    setStatus('loading');
    setReason(undefined);
    ensureLoaded(url)
      .catch((err: unknown) => {
        if (!cancelled) {
          setStatus('error');
          setReason(err instanceof Error ? err.message : 'load-error');
        }
      });
    return () => { cancelled = true; };
  }, [url]);

  useLayoutEffect(() => {
    const widgetElement = hostRef.current;
    if (!widgetElement) return;

    let settled = false;
    const timeout = window.setTimeout(() => {
      if (!settled && status !== 'error' && status !== 'ready') {
        settled = true;
        setStatus('error');
        setReason('ready-timeout');
      }
    }, 10000);

    const onReady = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      setStatus('ready');
      setReason(undefined);
    };
    const onError = (e: Event) => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      setStatus('error');
      const detail: { reason: string } = (e as CustomEvent).detail;
      setReason(detail && typeof detail.reason === 'string' ? detail.reason : 'widget-error');
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
        {title ?? tag} — {status}{reason ? `: ${reason}` : ''}
      </div>
      <Tag ref={hostRef} />
    </div>
  );
}


