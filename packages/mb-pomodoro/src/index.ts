import { LitElement, css, html } from 'lit';
import { emitReady, emitError } from '@myboard/widget-utils';

type Phase = 'idle' | 'work' | 'break';

export class MbPomodoroElement extends LitElement {
  static styles = css`
    :host { display: block; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; height: 100%; }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #fecaca 0%, #fca5a5 100%);
      border-radius: 16px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(239, 68, 68, 0.2);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
      min-height: 40px;
    }
    button {
      padding: 8px 16px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      font-weight: 500;
      font-size: 0.875rem;
      transition: all 0.2s ease;
      color: #374151;
    }
    button:hover {
      background: white;
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none;
    }
    .time {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1f2937;
      font-variant-numeric: tabular-nums;
      letter-spacing: -0.025em;
    }
    .phase {
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .phase.work {
      background: #ef4444;
      color: white;
      box-shadow: 0 2px 4px rgba(239, 68, 68, 0.2);
    }
    .phase.break {
      background: #10b981;
      color: white;
      box-shadow: 0 2px 4px rgba(16, 185, 129, 0.2);
    }
    .phase.idle {
      background: #6b7280;
      color: white;
      box-shadow: 0 2px 4px rgba(107, 114, 128, 0.2);
    }
    .bar {
      height: 6px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 999px;
      overflow: hidden;
      margin-top: auto;
      border: 1px solid rgba(0, 0, 0, 0.05);
    }
    .bar > div {
      height: 100%;
      background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
      width: 0%;
      transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      border-radius: 999px;
    }
  `;

  private phase: Phase = 'idle';
  private remainingMs = 25 * 60 * 1000; // 25 minutes default
  private intervalId: number | null = null;

  connectedCallback(): void {
    super.connectedCallback();
    queueMicrotask(() => emitReady(this));
  }

  disconnectedCallback(): void {
    this.stop();
    super.disconnectedCallback();
  }

  private tick = () => {
    this.remainingMs = Math.max(0, this.remainingMs - 1000);
    if (this.remainingMs === 0) {
      this.stop();
      this.phase = this.phase === 'work' ? 'break' : 'work';
      this.remainingMs = this.phase === 'work' ? 25 * 60 * 1000 : 5 * 60 * 1000;
    }
    this.requestUpdate();
  };

  private start() {
    if (this.intervalId) return;
    if (this.phase === 'idle') this.phase = 'work';
    this.intervalId = window.setInterval(this.tick, 1000);
    this.requestUpdate();
  }

  private pause() {
    if (!this.intervalId) return;
    window.clearInterval(this.intervalId);
    this.intervalId = null;
    this.requestUpdate();
  }

  private stop() {
    if (this.intervalId) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  private reset() {
    this.stop();
    this.phase = 'idle';
    this.remainingMs = 25 * 60 * 1000;
    this.requestUpdate();
  }

  private fmt(ms: number) {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const ss = s % 60;
    return `${String(m).padStart(2, '0')}:${String(ss).padStart(2, '0')}`;
  }

  render() {
    const total = this.phase === 'break' ? 5 * 60 * 1000 : 25 * 60 * 1000;
    const pct = Math.max(0, Math.min(100, 100 - Math.round((this.remainingMs / total) * 100)));
    return html`
      <div class="surface">
        <div class="row">
          <div class="time">${this.fmt(this.remainingMs)}</div>
          <div class="phase ${this.phase}">${this.phase}</div>
        </div>
        <div class="row">
          <button @click=${() => this.start()} ?disabled=${!!this.intervalId}>Start</button>
          <button @click=${() => this.pause()} ?disabled=${!this.intervalId}>Pause</button>
          <button @click=${() => this.reset()}>Reset</button>
        </div>
        <div class="bar"><div style="width:${pct}%"></div></div>
      </div>
    `;
  }
}

if (!customElements.get('mb-pomodoro')) {
  customElements.define('mb-pomodoro', MbPomodoroElement);
}




