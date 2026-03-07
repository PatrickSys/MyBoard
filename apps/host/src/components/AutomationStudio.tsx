'use client';

import React, { useMemo, useState } from 'react';
import type { WidgetManifest } from '@myboard/sdk';
import { useAutomationStore } from '../hooks/useAutomationStore';
import { useCardAnchors } from '../hooks/useCardAnchors';
import styles from './AutomationStudio.module.scss';

type Props = {
  isOpen: boolean;
  activeWidgets: ReadonlyArray<WidgetManifest>;
  onClose: () => void;
};

export default function AutomationStudio({ isOpen, activeWidgets, onClose }: Props) {
  const { wires, addWire, removeWire, toggleWire, lastError } = useAutomationStore();
  const anchors = useCardAnchors(isOpen);

  const [sourceId, setSourceId] = useState('');
  const [sourceEvent, setSourceEvent] = useState('');
  const [targetId, setTargetId] = useState('');
  const [targetAction, setTargetAction] = useState('');

  const sourceWidget = useMemo(
    () => activeWidgets.find((widget) => widget.id === sourceId),
    [activeWidgets, sourceId]
  );
  const targetWidget = useMemo(
    () => activeWidgets.find((widget) => widget.id === targetId),
    [activeWidgets, targetId]
  );

  const widgetMap = useMemo(
    () => new Map(activeWidgets.map((w) => [w.id, w])),
    [activeWidgets]
  );

  function getEventLabel(widgetId: string, eventKey: string) {
    const events = widgetMap.get(widgetId)?.automation?.events ?? [];
    return events.find((e) => e.key === eventKey)?.label ?? eventKey;
  }

  function getActionLabel(widgetId: string, actionKey: string) {
    const actions = widgetMap.get(widgetId)?.automation?.actions ?? [];
    return actions.find((a) => a.key === actionKey)?.label ?? actionKey;
  }

  if (!isOpen) return null;

  const handleCreateWire = () => {
    if (!sourceId || !sourceEvent || !targetId || !targetAction) return;
    const result = addWire({
      sourceWidgetId: sourceId,
      sourceEvent,
      targetWidgetId: targetId,
      targetAction,
    });
    if (!result.ok) return;
    setSourceEvent('');
    setTargetAction('');
  };

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Automation Studio">
      <div className={styles.header}>
        <div>
          <h2>Automation Studio</h2>
          <p>Connect widget events to typed actions with keyboard-friendly controls.</p>
        </div>
        <button className="btn--primary" onClick={onClose}>
          Exit Studio
        </button>
      </div>

      <div className={styles.body}>
        <div className={styles.canvas}>
          <svg className={styles.wireLayer}>
            {wires.map((wire) => {
              const start = anchors[wire.sourceWidgetId];
              const end = anchors[wire.targetWidgetId];
              if (!start || !end) return null;

              return (
                <g key={wire.id}>
                  <path
                    d={`M ${start.x} ${start.y} C ${start.x + 100} ${start.y}, ${end.x - 100} ${end.y}, ${end.x} ${end.y}`}
                    className={styles.wirePath}
                  />
                  <circle
                    cx={(start.x + end.x) / 2}
                    cy={(start.y + end.y) / 2}
                    r="12"
                    fill="#ef4444"
                    style={{ cursor: 'pointer', pointerEvents: 'all' }}
                    onClick={() => removeWire(wire.id)}
                  >
                    <title>Delete Wire</title>
                  </circle>
                  <text
                    x={(start.x + end.x) / 2}
                    y={(start.y + end.y) / 2 + 4}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    style={{ pointerEvents: 'none' }}
                  >
                    ×
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <div className={styles.wireListPanel}>
          <div className={styles.wireListHeader}>
            <span>Wires ({wires.length})</span>
          </div>
          {wires.length === 0 ? (
            <p className={styles.emptyState}>No wires yet. Use the builder below to connect widgets.</p>
          ) : (
            <ul className={styles.wireList}>
              {wires.map((wire) => (
                <li key={wire.id} className={`${styles.wireItem} ${!wire.enabled ? styles.wireItemDisabled : ''}`}>
                  <div className={styles.wireDescription}>
                    <span className={styles.wireSource}>
                      {widgetMap.get(wire.sourceWidgetId)?.title ?? wire.sourceWidgetId}
                      <em>{getEventLabel(wire.sourceWidgetId, wire.sourceEvent)}</em>
                    </span>
                    <span className={styles.wireArrow}>→</span>
                    <span className={styles.wireTarget}>
                      {widgetMap.get(wire.targetWidgetId)?.title ?? wire.targetWidgetId}
                      <em>{getActionLabel(wire.targetWidgetId, wire.targetAction)}</em>
                    </span>
                  </div>
                  <div className={styles.wireActions}>
                    <button
                      className={styles.toggleBtn}
                      onClick={() => toggleWire(wire.id)}
                      aria-label={wire.enabled ? 'Disable wire' : 'Enable wire'}
                      title={wire.enabled ? 'Disable' : 'Enable'}
                    >
                      {wire.enabled ? 'On' : 'Off'}
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => removeWire(wire.id)}
                      aria-label="Delete wire"
                      title="Delete wire"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.builder}>
          <span>When</span>
          <select value={sourceId} onChange={(event) => setSourceId(event.target.value)}>
            <option value="">Select Widget</option>
            {activeWidgets.map((widget) => (
              <option key={widget.id} value={widget.id}>
                {widget.title}
              </option>
            ))}
          </select>
          <select
            value={sourceEvent}
            onChange={(event) => setSourceEvent(event.target.value)}
            disabled={!sourceId}
          >
            <option value="">Select Event</option>
            {(sourceWidget?.automation?.events ?? []).map((event) => (
              <option key={event.key} value={event.key}>
                {event.label}
              </option>
            ))}
          </select>

          <span>Then</span>
          <select value={targetId} onChange={(event) => setTargetId(event.target.value)}>
            <option value="">Select Widget</option>
            {activeWidgets.map((widget) => (
              <option key={widget.id} value={widget.id}>
                {widget.title}
              </option>
            ))}
          </select>
          <select
            value={targetAction}
            onChange={(event) => setTargetAction(event.target.value)}
            disabled={!targetId}
          >
            <option value="">Select Action</option>
            {(targetWidget?.automation?.actions ?? []).map((action) => (
              <option key={action.key} value={action.key}>
                {action.label}
              </option>
            ))}
          </select>

          <button
            className="btn--primary"
            disabled={!sourceEvent || !targetAction}
            onClick={handleCreateWire}
          >
            Save Wire
          </button>
        </div>
        {lastError && (
          <p role="status" aria-live="polite" style={{ color: '#ef4444', marginTop: '8px' }}>
            {lastError}
          </p>
        )}
      </div>
    </div>
  );
}
