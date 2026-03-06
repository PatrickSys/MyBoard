import { LitElement, css, html } from 'lit';
import {
  type WidgetCommandRequest,
  emitReady,
  emitError,
  eventBus,
  getWidgetSettings,
  registerWidgetCommandHandler,
  setWidgetSettings,
  widgetStore,
} from '@myboard/sdk';

type Phase = 'idle' | 'work' | 'break';
type ActivePhase = Exclude<Phase, 'idle'>;

type PomodoroSettings = {
  workMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
};

type PomodoroHistoryEntry = {
  completedAt: number;
  durationMinutes: number;
};

const WIDGET_ID = 'pomodoro';
const HISTORY_KEY = 'pomodoro:history';

const DEFAULT_SETTINGS: PomodoroSettings = {
  workMinutes: 25,
  shortBreakMinutes: 5,
  longBreakMinutes: 15,
};

const SETTING_BOUNDS: Record<
  keyof PomodoroSettings,
  { min: number; max: number }
> = {
  workMinutes: { min: 5, max: 90 },
  shortBreakMinutes: { min: 1, max: 30 },
  longBreakMinutes: { min: 5, max: 45 },
};

function clampSetting(
  key: keyof PomodoroSettings,
  value: number | undefined
): number {
  const bounds = SETTING_BOUNDS[key];
  const fallback = DEFAULT_SETTINGS[key];
  const numeric = typeof value === 'number' ? value : fallback;
  return Math.min(bounds.max, Math.max(bounds.min, numeric));
}

function sanitizeSettings(
  settings: Partial<PomodoroSettings> | undefined
): PomodoroSettings {
  return {
    workMinutes: clampSetting('workMinutes', settings?.workMinutes),
    shortBreakMinutes: clampSetting(
      'shortBreakMinutes',
      settings?.shortBreakMinutes
    ),
    longBreakMinutes: clampSetting(
      'longBreakMinutes',
      settings?.longBreakMinutes
    ),
  };
}

export class MbPomodoroElement extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
      height: 100%;
    }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
      border-radius: 16px;
      padding: 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 10px;
      border: 1px solid rgba(239, 68, 68, 0.2);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .row input {
      width: 72px;
      border: 1px solid rgba(239, 68, 68, 0.3);
      border-radius: 8px;
      padding: 5px 7px;
      background: rgba(255, 255, 255, 0.9);
    }
    button {
      padding: 8px 14px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.85rem;
      color: #374151;
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .time {
      font-size: 2.4rem;
      font-weight: 700;
      color: #1f2937;
      font-variant-numeric: tabular-nums;
      line-height: 1;
    }
    .phase {
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      color: white;
    }
    .phase.work {
      background: #ef4444;
    }
    .phase.break {
      background: #10b981;
    }
    .phase.idle {
      background: #64748b;
    }
    .bar {
      height: 7px;
      background: rgba(255, 255, 255, 0.35);
      border-radius: 999px;
      overflow: hidden;
      margin-top: auto;
    }
    .bar > div {
      height: 100%;
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
      transition: width 0.3s ease;
    }
    .meta {
      color: #7f1d1d;
      font-size: 0.75rem;
      display: flex;
      justify-content: space-between;
    }
  `;

  private phase: Phase = 'idle';
  private remainingMs = DEFAULT_SETTINGS.workMinutes * 60 * 1000;
  private activePhaseDurationMs = DEFAULT_SETTINGS.workMinutes * 60 * 1000;
  private intervalId: number | null = null;
  private completedWorkSessions = 0;
  private settings: PomodoroSettings = DEFAULT_SETTINGS;
  private unsubs: Array<() => void> = [];

  connectedCallback(): void {
    super.connectedCallback();
    try {
      const hostSettings =
        getWidgetSettings<Partial<PomodoroSettings>>(WIDGET_ID);
      this.settings = sanitizeSettings(hostSettings);
      this.syncIdleDuration();

      const unsubSettings = eventBus.subscribe(
        'host',
        'settings-updated',
        (event) => {
          const { widgetId, settings: nextSettings } = event.data as {
            widgetId: string;
            settings: Partial<PomodoroSettings>;
          };
          if (widgetId === WIDGET_ID) {
            this.settings = sanitizeSettings({
              ...this.settings,
              ...nextSettings,
            });
            if (this.phase === 'idle') {
              this.syncIdleDuration();
            }
            this.requestUpdate();
          }
        }
      );

      const unregisterCommands = registerWidgetCommandHandler(
        WIDGET_ID,
        async (request: WidgetCommandRequest) => {
          const { commandType, payload } = request;

          if (commandType === 'timer.start') {
            const phaseValue =
              payload?.phase === 'work' || payload?.phase === 'break'
                ? (payload.phase as ActivePhase)
                : undefined;
            const minutesValue =
              typeof payload?.minutes === 'number' && payload.minutes > 0
                ? payload.minutes
                : undefined;
            this.start({ phase: phaseValue, minutes: minutesValue });
            return { ok: true };
          }

          if (commandType === 'timer.pause') {
            this.pause();
            return { ok: true };
          }

          if (commandType === 'timer.reset') {
            this.reset();
            return { ok: true };
          }

          return {
            ok: false,
            code: 'COMMAND_ACTION_NOT_SUPPORTED',
            reason: `pomodoro does not support ${commandType}`,
          };
        }
      );

      this.unsubs = [unsubSettings, unregisterCommands];

      queueMicrotask(() => emitReady(this));
    } catch (error) {
      emitError(this, error instanceof Error ? error.message : 'mount-error');
    }
  }

  disconnectedCallback(): void {
    this.stop();
    this.unsubs.forEach((unsubscribe) => unsubscribe());
    this.unsubs = [];
    super.disconnectedCallback();
  }

  private syncIdleDuration(): void {
    this.remainingMs = this.settings.workMinutes * 60 * 1000;
    this.activePhaseDurationMs = this.remainingMs;
  }

  private getBreakMinutes(): number {
    return this.completedWorkSessions > 0 &&
      this.completedWorkSessions % 4 === 0
      ? this.settings.longBreakMinutes
      : this.settings.shortBreakMinutes;
  }

  private getDefaultDurationMs(phase: ActivePhase): number {
    const minutes =
      phase === 'work' ? this.settings.workMinutes : this.getBreakMinutes();
    return minutes * 60 * 1000;
  }

  private emitPhaseStartedEvent(): void {
    if (this.phase === 'work') {
      eventBus.publish(WIDGET_ID, 'session-started', {
        startedAt: Date.now(),
        phase: this.phase,
      });
      return;
    }

    if (this.phase === 'break') {
      eventBus.publish(WIDGET_ID, 'break-started', {
        startedAt: Date.now(),
        longBreak:
          this.activePhaseDurationMs ===
          this.settings.longBreakMinutes * 60 * 1000,
      });
    }
  }

  private persistSettings(): void {
    setWidgetSettings(WIDGET_ID, this.settings);
  }

  private startPhase(
    phase: ActivePhase,
    minutesOverride?: number,
    emitLifecycleEvent = true
  ): void {
    const durationMs =
      typeof minutesOverride === 'number' && minutesOverride > 0
        ? Math.round(minutesOverride * 60 * 1000)
        : this.getDefaultDurationMs(phase);
    this.phase = phase;
    this.remainingMs = durationMs;
    this.activePhaseDurationMs = durationMs;
    if (emitLifecycleEvent) {
      this.emitPhaseStartedEvent();
    }
  }

  private start = (options?: { phase?: ActivePhase; minutes?: number }) => {
    if (this.intervalId) return;

    if (options?.phase || options?.minutes || this.phase === 'idle') {
      const nextPhase =
        options?.phase ?? (this.phase === 'break' ? 'break' : 'work');
      this.startPhase(nextPhase, options?.minutes);
    } else {
      this.emitPhaseStartedEvent();
    }

    this.intervalId = window.setInterval(this.tick, 1000);
    this.requestUpdate();
  };

  private pause = () => {
    if (!this.intervalId) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
    this.requestUpdate();
  };

  private stop() {
    if (!this.intervalId) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
  }

  private reset = () => {
    this.stop();
    this.phase = 'idle';
    this.syncIdleDuration();
    this.requestUpdate();
  };

  private tick = () => {
    this.remainingMs = Math.max(0, this.remainingMs - 1000);
    if (this.remainingMs === 0) {
      const completedPhase = this.phase;
      const completedDurationMs = this.activePhaseDurationMs;
      this.stop();
      if (completedPhase === 'work') {
        this.completedWorkSessions += 1;
        const durationMinutes = Math.max(
          1,
          Math.round(completedDurationMs / (60 * 1000))
        );
        eventBus.publish(WIDGET_ID, 'session-completed', {
          completedAt: Date.now(),
          durationMinutes,
        });
        const history =
          widgetStore.getState<PomodoroHistoryEntry[]>(HISTORY_KEY) ?? [];
        widgetStore.setState(
          HISTORY_KEY,
          [
            {
              completedAt: Date.now(),
              durationMinutes,
            },
            ...history,
          ].slice(0, 30)
        );
      }

      if (completedPhase === 'work') {
        this.startPhase('break');
      } else {
        this.phase = 'work';
        this.activePhaseDurationMs = this.getDefaultDurationMs('work');
        this.remainingMs = this.activePhaseDurationMs;
      }
    }
    this.requestUpdate();
  };

  private updateSetting = (key: keyof PomodoroSettings, value: string) => {
    const numeric = Number(value);
    if (Number.isNaN(numeric)) return;
    this.settings = sanitizeSettings({ ...this.settings, [key]: numeric });
    if (this.phase === 'idle') {
      this.syncIdleDuration();
    }
    this.persistSettings();
    this.requestUpdate();
  };

  private fmt(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  render() {
    const total = Math.max(this.activePhaseDurationMs, 60 * 1000);
    const currentTotalMinutes = Math.max(1, Math.round(total / (60 * 1000)));
    const pct = Math.max(
      0,
      Math.min(100, 100 - Math.round((this.remainingMs / total) * 100))
    );

    return html`
      <div class="surface">
        <div class="row">
          <div class="time">${this.fmt(this.remainingMs)}</div>
          <div class="phase ${this.phase}">${this.phase}</div>
        </div>
        <div class="row">
          <button @click=${this.start} ?disabled=${Boolean(this.intervalId)}>
            Start
          </button>
          <button @click=${this.pause} ?disabled=${!this.intervalId}>
            Pause
          </button>
          <button @click=${this.reset}>Reset</button>
        </div>
        <div class="row">
          <label>
            Work
            <input
              type="number"
              min="5"
              max="90"
              .value=${String(this.settings.workMinutes)}
              @change=${(event: Event) =>
                this.updateSetting(
                  'workMinutes',
                  (event.target as HTMLInputElement).value
                )}
            />
          </label>
          <label>
            Short
            <input
              type="number"
              min="1"
              max="30"
              .value=${String(this.settings.shortBreakMinutes)}
              @change=${(event: Event) =>
                this.updateSetting(
                  'shortBreakMinutes',
                  (event.target as HTMLInputElement).value
                )}
            />
          </label>
          <label>
            Long
            <input
              type="number"
              min="5"
              max="45"
              .value=${String(this.settings.longBreakMinutes)}
              @change=${(event: Event) =>
                this.updateSetting(
                  'longBreakMinutes',
                  (event.target as HTMLInputElement).value
                )}
            />
          </label>
        </div>
        <div class="meta">
          <span>Completed sessions: ${this.completedWorkSessions}</span>
          <span>${currentTotalMinutes}m cycle</span>
        </div>
        <div class="bar"><div style="width:${pct}%"></div></div>
      </div>
    `;
  }
}

if (!customElements.get('mb-pomodoro')) {
  customElements.define('mb-pomodoro', MbPomodoroElement);
}
