import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady, emitError, widgetStore, eventBus } from '@myboard/sdk';

const WIDGET_ID = 'productivity-stats';

interface ProductivityStats {
  notesCreated: number;
  pomodoroCompleted: number;
}

/**
 * Productivity Stats Widget
 *
 * Tracks user productivity metrics:
 * - Notes created (via notes widget events)
 * - Pomodoro cycles completed (via pomodoro widget events)
 * - Persists stats in centralized widgetStore
 */
@customElement('mb-counter')
export class MbCounterElement extends LitElement {
  @state() private notesCreated = 0;
  @state() private pomodoroCompleted = 0;
  private unsubscribeNoteAdded?: () => void;
  private unsubscribeNoteDeleted?: () => void;
  private unsubscribePomodoroComplete?: () => void;
  private unsubscribeStore?: () => void;

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .stats-surface {
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      border-radius: 16px;
      padding: 24px;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(99, 102, 241, 0.2);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.3);
    }

    .stats-title {
      font-size: 0.875rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: rgba(255, 255, 255, 0.9);
      margin-bottom: 24px;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      width: 100%;
      max-width: 300px;
    }

    .stat-card {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .stat-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: white;
      line-height: 1;
      margin-bottom: 8px;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    .stat-label {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.8);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 500;
    }

    .stats-actions {
      margin-top: 24px;
    }

    .btn {
      padding: 8px 20px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.2);
      color: white;
      font-weight: 500;
      font-size: 0.8125rem;
      cursor: pointer;
      transition: all 0.2s ease;
      backdrop-filter: blur(8px);
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.3);
      border-color: rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
    }

    .btn:active {
      transform: translateY(0);
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();

    try {
      // Load stats from widget store
      const stored = widgetStore.getState<ProductivityStats>(WIDGET_ID);
      if (stored) {
        this.notesCreated = stored.notesCreated || 0;
        this.pomodoroCompleted = stored.pomodoroCompleted || 0;
      }

      console.log('[Productivity] Widget mounted, initial stats:', {
        notesCreated: this.notesCreated,
        pomodoroCompleted: this.pomodoroCompleted,
      });

      // Subscribe to notes events
      this.unsubscribeNoteAdded = eventBus.subscribe(
        'notes',
        'note-added',
        (event) => {
          console.log('[Productivity] Note added event received:', event);
          this.notesCreated++;
          this.saveStats();
          this.requestUpdate(); // Force re-render
        }
      );

      this.unsubscribeNoteDeleted = eventBus.subscribe(
        'notes',
        'note-deleted',
        (event) => {
          console.log('[Productivity] Note deleted event received:', event);
          if (this.notesCreated > 0) {
            this.notesCreated--;
            this.saveStats();
            this.requestUpdate(); // Force re-render
          }
        }
      );

      // Subscribe to pomodoro events
      this.unsubscribePomodoroComplete = eventBus.subscribe(
        'pomodoro',
        'cycle-complete',
        (event) => {
          console.log(
            '[Productivity] Pomodoro complete event received:',
            event
          );
          this.pomodoroCompleted++;
          this.saveStats();
          this.requestUpdate(); // Force re-render
        }
      );

      // Subscribe to widget store changes (in case another instance updates)
      this.unsubscribeStore = widgetStore.subscribe<ProductivityStats>(
        WIDGET_ID,
        (stats) => {
          console.log('[Productivity] Store updated:', stats);
          this.notesCreated = stats.notesCreated || 0;
          this.pomodoroCompleted = stats.pomodoroCompleted || 0;
          this.requestUpdate();
        }
      );

      queueMicrotask(() => emitReady(this));
    } catch (e) {
      emitError(this, e instanceof Error ? e.message : 'mount-error');
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.unsubscribeNoteAdded?.();
    this.unsubscribeNoteDeleted?.();
    this.unsubscribePomodoroComplete?.();
    this.unsubscribeStore?.();
  }

  private saveStats(): void {
    const stats = {
      notesCreated: this.notesCreated,
      pomodoroCompleted: this.pomodoroCompleted,
    } as ProductivityStats;
    console.log('[Productivity] Saving stats:', stats);
    widgetStore.setState(WIDGET_ID, stats);
  }

  private handleReset = () => {
    this.notesCreated = 0;
    this.pomodoroCompleted = 0;
    this.saveStats();
  };

  render() {
    return html`
      <div class="stats-surface">
        <div class="stats-title">Today's Progress</div>
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">${this.notesCreated}</div>
            <div class="stat-label">Notes</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${this.pomodoroCompleted}</div>
            <div class="stat-label">Pomodoros</div>
          </div>
        </div>
        <div class="stats-actions">
          <button class="btn" @click=${this.handleReset}>Reset Stats</button>
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
