import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady, emitError, widgetStore, eventBus } from '@myboard/sdk';

const WIDGET_ID = 'productivity-insights';

interface DailyStats {
  date: string;
  notesCreated: number;
  pomodoroCompleted: number;
  tasksCompleted: number;
}

interface ProductivityStats {
  notesCreated: number;
  pomodoroCompleted: number;
  tasksCompleted: number;
  history: DailyStats[];
}

function todayIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function upsertToday(history: DailyStats[], patch: Partial<DailyStats>): DailyStats[] {
  const today = todayIsoDate();
  const current = history.find((entry) => entry.date === today) ?? {
    date: today,
    notesCreated: 0,
    pomodoroCompleted: 0,
    tasksCompleted: 0,
  };
  const next = { ...current, ...patch };
  const withoutToday = history.filter((entry) => entry.date !== today);
  return [next, ...withoutToday].slice(0, 14);
}

@customElement('mb-counter')
export class MbCounterElement extends LitElement {
  @state() private notesCreated = 0;
  @state() private pomodoroCompleted = 0;
  @state() private tasksCompleted = 0;
  @state() private history: DailyStats[] = [];

  private unsubscribers: Array<() => void> = [];

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }
    .stats-surface {
      background: linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%);
      border-radius: 16px;
      padding: 20px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 14px;
      border: 1px solid rgba(14, 165, 233, 0.3);
    }
    .stats-title {
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: rgba(255, 255, 255, 0.85);
      font-weight: 700;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
    }
    .stat-card {
      background: rgba(255, 255, 255, 0.14);
      border-radius: 10px;
      padding: 10px;
      text-align: center;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .stat-value {
      font-size: 1.8rem;
      font-weight: 700;
      color: #fff;
      line-height: 1;
    }
    .stat-label {
      font-size: 0.68rem;
      color: rgba(255, 255, 255, 0.9);
      text-transform: uppercase;
      margin-top: 4px;
      letter-spacing: 0.05em;
    }
    .trend {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      padding: 10px;
      color: rgba(255, 255, 255, 0.95);
      font-size: 0.75rem;
      display: grid;
      gap: 6px;
    }
    .trend-row {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-variant-numeric: tabular-nums;
    }
    .stats-actions {
      display: flex;
      gap: 8px;
    }
    .btn {
      padding: 7px 14px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.18);
      color: #fff;
      font-size: 0.75rem;
      cursor: pointer;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();

    try {
      const stored = widgetStore.getState<ProductivityStats>(WIDGET_ID);
      if (stored) {
        this.notesCreated = stored.notesCreated || 0;
        this.pomodoroCompleted = stored.pomodoroCompleted || 0;
        this.tasksCompleted = stored.tasksCompleted || 0;
        this.history = stored.history || [];
      }

      this.unsubscribers.push(
        eventBus.subscribe('notes', 'note-added', () => {
          this.notesCreated++;
          this.history = upsertToday(this.history, { notesCreated: this.notesCreated });
          this.saveStats();
        })
      );
      this.unsubscribers.push(
        eventBus.subscribe('pomodoro', 'session-completed', () => {
          this.pomodoroCompleted++;
          this.history = upsertToday(this.history, {
            pomodoroCompleted: this.pomodoroCompleted,
          });
          this.saveStats();
        })
      );
      this.unsubscribers.push(
        eventBus.subscribe('taskboard', 'task-completed', () => {
          this.tasksCompleted++;
          this.history = upsertToday(this.history, { tasksCompleted: this.tasksCompleted });
          this.saveStats();
        })
      );

      this.unsubscribers.push(
        widgetStore.subscribe<ProductivityStats>(WIDGET_ID, (stats) => {
          this.notesCreated = stats.notesCreated || 0;
          this.pomodoroCompleted = stats.pomodoroCompleted || 0;
          this.tasksCompleted = stats.tasksCompleted || 0;
          this.history = stats.history || [];
          this.requestUpdate();
        })
      );

      queueMicrotask(() => emitReady(this));
    } catch (error) {
      emitError(this, error instanceof Error ? error.message : 'mount-error');
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribers.forEach((unsubscribe) => unsubscribe());
    this.unsubscribers = [];
  }

  private saveStats(): void {
    widgetStore.setState<ProductivityStats>(WIDGET_ID, {
      notesCreated: this.notesCreated,
      pomodoroCompleted: this.pomodoroCompleted,
      tasksCompleted: this.tasksCompleted,
      history: this.history,
    });
    this.requestUpdate();
  }

  private weeklyTotals() {
    const entries = this.history.slice(0, 7);
    return {
      notes: entries.reduce((sum, entry) => sum + entry.notesCreated, 0),
      pomodoros: entries.reduce((sum, entry) => sum + entry.pomodoroCompleted, 0),
      tasks: entries.reduce((sum, entry) => sum + entry.tasksCompleted, 0),
    };
  }

  private handleResetToday = () => {
    const today = todayIsoDate();
    this.notesCreated = 0;
    this.pomodoroCompleted = 0;
    this.tasksCompleted = 0;
    this.history = upsertToday(this.history.filter((entry) => entry.date !== today), {
      date: today,
      notesCreated: 0,
      pomodoroCompleted: 0,
      tasksCompleted: 0,
    });
    this.saveStats();
  };

  render() {
    const weekly = this.weeklyTotals();
    return html`
      <div class="stats-surface">
        <div class="stats-title">Productivity Insights</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${this.notesCreated}</div>
            <div class="stat-label">Notes Today</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.pomodoroCompleted}</div>
            <div class="stat-label">Pomodoros</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.tasksCompleted}</div>
            <div class="stat-label">Tasks Done</div>
          </div>
        </div>
        <div class="trend">
          <div class="trend-row"><span>Weekly notes</span><strong>${weekly.notes}</strong></div>
          <div class="trend-row"><span>Weekly pomodoros</span><strong>${weekly.pomodoros}</strong></div>
          <div class="trend-row"><span>Weekly tasks</span><strong>${weekly.tasks}</strong></div>
        </div>
        <div class="stats-actions">
          <button class="btn" @click=${this.handleResetToday}>Reset Today</button>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mb-counter': MbCounterElement;
  }
}

