'use client';

import { useEffect, useMemo, useState } from 'react';
import { ensureLoaded } from '../lib/widget-loader';

/** The widget is rendered at this logical size, then scaled down to thumbW×thumbH. */
const INNER_W = 320;
const INNER_H = 240;

type Props = {
  tag: string;
  url: string;
  integrity?: string;
  /** Outer thumbnail width in px (default 56) */
  thumbW?: number;
  /** Outer thumbnail height in px (default 42) */
  thumbH?: number;
  /** Background colour shown in the fallback / loading shimmer base */
  fallbackBg: string;
  /** 1-2 uppercase initials shown in the fallback tile */
  fallbackInitials: string;
};

export default function WidgetThumbnail({
  tag,
  url,
  integrity,
  thumbW = 56,
  thumbH = 42,
  fallbackBg,
  fallbackInitials,
}: Props) {
  const [phase, setPhase] = useState<'loading' | 'live' | 'fallback'>('loading');
  const scale = thumbW / INNER_W;
  const Tag = useMemo(() => tag as React.ElementType, [tag]);

  useEffect(() => {
    let cancelled = false;

    // Hard cap: show fallback if the script doesn't load within 5 s.
    const timeout = window.setTimeout(() => {
      if (!cancelled) setPhase('fallback');
    }, 5000);

    ensureLoaded(url, { integrity, expectedTag: tag })
      .then(() => {
        window.clearTimeout(timeout);
        if (!cancelled) setPhase('live');
      })
      .catch(() => {
        window.clearTimeout(timeout);
        if (!cancelled) setPhase('fallback');
      });

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [url, tag, integrity]);

  return (
    <div
      style={{
        width: thumbW,
        height: thumbH,
        borderRadius: 10,
        overflow: 'hidden',
        flexShrink: 0,
        position: 'relative',
        border: '1px solid var(--border)',
        background: phase === 'fallback' ? fallbackBg : 'var(--bg-secondary)',
      }}
    >
      {/* ── Live widget render ── */}
      {phase === 'live' && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: INNER_W,
            height: INNER_H,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <Tag style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
      )}

      {/* ── Loading shimmer ── */}
      {phase === 'loading' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, var(--bg-secondary) 25%, var(--border) 50%, var(--bg-secondary) 75%)',
            backgroundSize: '200% 100%',
            animation: 'slotPulse 1.8s ease-in-out infinite',
          }}
        />
      )}

      {/* ── Fallback: coloured initials tile ── */}
      {phase === 'fallback' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 700,
            fontSize: Math.round(thumbH * 0.38),
            letterSpacing: '0.04em',
          }}
        >
          {fallbackInitials}
        </div>
      )}
    </div>
  );
}
