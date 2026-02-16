import { useEffect, useState } from 'react';

type Anchor = {
  x: number;
  y: number;
};

function calculateAnchors(): Record<string, Anchor> {
  const anchors: Record<string, Anchor> = {};
  const cards = document.querySelectorAll<HTMLElement>('[data-widget-id]');
  cards.forEach((card) => {
    const widgetId = card.dataset.widgetId;
    if (!widgetId) return;
    const rect = card.getBoundingClientRect();
    anchors[widgetId] = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
  });
  return anchors;
}

export function useCardAnchors(isActive: boolean) {
  const [anchors, setAnchors] = useState<Record<string, Anchor>>({});

  useEffect(() => {
    if (!isActive) return;

    let frameId = 0;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const schedule = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        timeoutId = undefined;
        frameId = requestAnimationFrame(() => {
          setAnchors(calculateAnchors());
        });
      }, 100);
    };

    const observer = new ResizeObserver(schedule);
    const cards = document.querySelectorAll<HTMLElement>('[data-widget-id]');
    cards.forEach((card) => observer.observe(card));

    schedule();
    window.addEventListener('resize', schedule);
    document.addEventListener('scroll', schedule, true);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      if (timeoutId) clearTimeout(timeoutId);
      observer.disconnect();
      window.removeEventListener('resize', schedule);
      document.removeEventListener('scroll', schedule, true);
    };
  }, [isActive]);

  return anchors;
}
