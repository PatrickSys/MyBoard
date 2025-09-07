export const WIDGET_READY = 'widget-ready' as const;
export const WIDGET_ERROR = 'widget-error' as const;

export type WidgetErrorDetail = {
  reason: string;
};

export function emitReady(target: Element): void {
  target.dispatchEvent(new CustomEvent(WIDGET_READY, { bubbles: true }));
}

export function emitError(target: Element, reason: string): void {
  const detail: WidgetErrorDetail = { reason };
  target.dispatchEvent(new CustomEvent(WIDGET_ERROR, { bubbles: true, detail }));
}


