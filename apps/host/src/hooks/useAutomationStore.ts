import { useState, useEffect, useCallback } from 'react';
import type { AutomationWire, AutomationState } from '../types/automation';

const STORAGE_KEY = 'myboard.automation';
const AUTOMATION_UPDATED_EVENT = 'myboard:automation-updated';

export function useAutomationStore() {
  const [wires, setWires] = useState<AutomationWire[]>([]);
  const [lastError, setLastError] = useState<string | null>(null);

  // Load wires from storage
  useEffect(() => {
    const syncFromEvent = (event: Event) => {
      const custom = event as CustomEvent<{ wires: AutomationWire[] }>;
      if (!custom.detail?.wires) return;
      setWires(custom.detail.wires);
    };

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as AutomationState;
        const normalized = (parsed.wires ?? [])
          .filter((wire): wire is AutomationWire => Boolean(wire?.id))
          .map((wire) => ({
            ...wire,
            enabled: wire.enabled ?? true,
            createdAt: wire.createdAt ?? new Date().toISOString(),
            updatedAt: wire.updatedAt ?? new Date().toISOString(),
          }));
        setWires(normalized);
      }
    } catch (err) {
      console.error('[AutomationStore] Failed to load wires:', err);
    }
    window.addEventListener(AUTOMATION_UPDATED_EVENT, syncFromEvent as EventListener);
    return () =>
      window.removeEventListener(
        AUTOMATION_UPDATED_EVENT,
        syncFromEvent as EventListener
      );
  }, []);

  // Persist wires to storage
  useEffect(() => {
    try {
      const state: AutomationState = { wires };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.error('[AutomationStore] Failed to save wires:', err);
    }
  }, [wires]);

  const addWire = useCallback(
    (
      wire: Omit<AutomationWire, 'id' | 'enabled' | 'createdAt' | 'updatedAt'>
    ): { ok: true } | { ok: false; reason: string } => {
      if (
        createsCycle(
          wires,
          wire.sourceWidgetId,
          wire.sourceEvent,
          wire.targetWidgetId,
          wire.targetAction
        )
      ) {
        const reason = 'Wire creates an automation cycle';
        setLastError(reason);
        return { ok: false, reason };
      }

      const now = new Date().toISOString();
      const newWire: AutomationWire = {
        ...wire,
        id: `wire_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`,
        enabled: true,
        createdAt: now,
        updatedAt: now,
      };
      setWires((prev) => {
        const next = [...prev, newWire];
        broadcast(next);
        return next;
      });
      setLastError(null);
      return { ok: true };
    },
    [wires]
  );

  const removeWire = useCallback((id: string) => {
    setWires((prev) => {
      const next = prev.filter((wire) => wire.id !== id);
      broadcast(next);
      return next;
    });
  }, []);

  const toggleWire = useCallback((id: string) => {
    const now = new Date().toISOString();
    setWires((prev) =>
      {
        const next = prev.map((wire) =>
        wire.id === id
          ? {
              ...wire,
              enabled: !wire.enabled,
              updatedAt: now,
            }
          : wire
        );
        broadcast(next);
        return next;
      }
    );
  }, []);

  return {
    wires,
    lastError,
    addWire,
    removeWire,
    toggleWire,
  };
}

function broadcast(wires: AutomationWire[]) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent(AUTOMATION_UPDATED_EVENT, { detail: { wires } })
  );
}

function createsCycle(
  existingWires: AutomationWire[],
  sourceWidgetId: string,
  sourceEvent: string,
  targetWidgetId: string,
  targetAction: string
): boolean {
  const all = [
    ...existingWires.filter((wire) => wire.enabled),
    {
      id: '__candidate__',
      enabled: true,
      sourceWidgetId,
      sourceEvent,
      targetWidgetId,
      targetAction,
      createdAt: '',
      updatedAt: '',
    } satisfies AutomationWire,
  ];

  const bySource = new Map<string, string[]>();
  for (const wire of all) {
    const next = bySource.get(wire.sourceWidgetId) ?? [];
    next.push(wire.targetWidgetId);
    bySource.set(wire.sourceWidgetId, next);
  }

  const stack = new Set<string>();
  const visited = new Set<string>();

  const visit = (node: string): boolean => {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;
    visited.add(node);
    stack.add(node);
    const neighbors = bySource.get(node) ?? [];
    for (const neighbor of neighbors) {
      if (visit(neighbor)) {
        return true;
      }
    }
    stack.delete(node);
    return false;
  };

  return visit(sourceWidgetId);
}
