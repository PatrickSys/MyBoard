'use client';

import { useEffect, useMemo, useState } from 'react';
import type { WidgetManifest } from '@myboard/sdk';
import styles from './WidgetSettingsPanel.module.scss';

type Props = {
  manifest: WidgetManifest | null;
  initialSettings: Record<string, unknown>;
  onClose: () => void;
  onSave: (settings: Record<string, unknown>) => void;
};

function normalizeInitial(manifest: WidgetManifest, initialSettings: Record<string, unknown>) {
  const values: Record<string, unknown> = {};
  for (const field of manifest.settingsSchema?.fields ?? []) {
    values[field.key] = initialSettings[field.key] ?? field.defaultValue ?? '';
  }
  return values;
}

export default function WidgetSettingsPanel({
  manifest,
  initialSettings,
  onClose,
  onSave,
}: Props) {
  const [draft, setDraft] = useState<Record<string, unknown>>(
    manifest ? normalizeInitial(manifest, initialSettings) : {}
  );
  useEffect(() => {
    if (!manifest) return;
    setDraft(normalizeInitial(manifest, initialSettings));
  }, [initialSettings, manifest]);

  const fields = useMemo(() => manifest?.settingsSchema?.fields ?? [], [manifest]);
  if (!manifest) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Widget settings">
      <div className={styles.panel}>
        <div className={styles.header}>
          <h3>{manifest.settingsSchema?.title ?? `${manifest.title} Settings`}</h3>
          <button className="btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.body}>
          {fields.map((field) => {
            const value = draft[field.key];
            return (
              <div key={`${manifest.id}:${field.key}`} className={styles.field}>
                <label htmlFor={`${manifest.id}:${field.key}`}>{field.label}</label>
                {field.type === 'boolean' && (
                  <input
                    id={`${manifest.id}:${field.key}`}
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, [field.key]: event.target.checked }))
                    }
                  />
                )}
                {field.type === 'number' && (
                  <input
                    id={`${manifest.id}:${field.key}`}
                    type="number"
                    value={String(value ?? '')}
                    min={field.min}
                    max={field.max}
                    onChange={(event) =>
                      setDraft((prev) => ({
                        ...prev,
                        [field.key]: Number.isNaN(Number(event.target.value))
                          ? field.defaultValue ?? 0
                          : Number(event.target.value),
                      }))
                    }
                  />
                )}
                {field.type === 'string' && (
                  <input
                    id={`${manifest.id}:${field.key}`}
                    type="text"
                    value={String(value ?? '')}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, [field.key]: event.target.value }))
                    }
                  />
                )}
                {field.type === 'select' && (
                  <select
                    id={`${manifest.id}:${field.key}`}
                    value={String(value ?? '')}
                    onChange={(event) =>
                      setDraft((prev) => ({ ...prev, [field.key]: event.target.value }))
                    }
                  >
                    {(field.options ?? []).map((option) => (
                      <option key={`${field.key}:${option.value}`} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            );
          })}
        </div>
        <div className={styles.actions}>
          <button className="btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn--primary"
            onClick={() => {
              onSave(draft);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
