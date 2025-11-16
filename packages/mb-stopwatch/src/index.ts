import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady } from '@myboard/widget-utils';

interface Lap {
  id: number;
  time: number;
}

@customElement('mb-stopwatch')
export class StopwatchWidget extends LitElement {
  @state() private elapsed = 0;
  @state() private isRunning = false;
  @state() private laps: Lap[] = [];

  private startTime = 0;
  private intervalId?: number;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      color: white;
      overflow: hidden;
    }

    h3 {
      margin: 0 0 16px 0;
      font-size: 18px;
      font-weight: 600;
    }

    .time-display {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 12px;
      padding: 24px;
      text-align: center;
      margin-bottom: 16px;
    }

    .time {
      font-size: 48px;
      font-weight: 700;
      letter-spacing: -1px;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .controls {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    .btn {
      flex: 1;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      padding: 12px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn.primary {
      background: rgba(16, 185, 129, 0.6);
    }

    .btn.primary:hover {
      background: rgba(16, 185, 129, 0.8);
    }

    .btn.danger {
      background: rgba(239, 68, 68, 0.6);
    }

    .btn.danger:hover {
      background: rgba(239, 68, 68, 0.8);
    }

    .laps {
      flex: 1;
      overflow-y: auto;
      background: rgba(0, 0, 0, 0.15);
      border-radius: 8px;
      padding: 8px;
    }

    .lap-item {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      margin-bottom: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 6px;
      font-size: 14px;
    }

    .lap-number {
      font-weight: 600;
    }

    .empty-state {
      text-align: center;
      padding: 20px;
      opacity: 0.6;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .time {
        font-size: 36px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    queueMicrotask(() => emitReady(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.stop();
  }

  private formatTime(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  }

  private start() {
    if (this.isRunning) return;

    this.isRunning = true;
    this.startTime = Date.now() - this.elapsed;

    this.intervalId = window.setInterval(() => {
      this.elapsed = Date.now() - this.startTime;
    }, 10);
  }

  private pause() {
    if (!this.isRunning) return;

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  private reset() {
    this.pause();
    this.elapsed = 0;
    this.laps = [];
  }

  private addLap() {
    if (this.elapsed === 0) return;

    this.laps = [
      { id: Date.now(), time: this.elapsed },
      ...this.laps,
    ];
  }

  private stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  render() {
    return html`
      <div class="container">
        <h3>Stopwatch</h3>

        <div class="time-display">
          <div class="time">${this.formatTime(this.elapsed)}</div>
        </div>

        <div class="controls">
          ${this.isRunning
            ? html`
                <button class="btn danger" @click=${this.pause}>Pause</button>
                <button class="btn" @click=${this.addLap}>Lap</button>
              `
            : html`
                <button class="btn primary" @click=${this.start}>
                  ${this.elapsed === 0 ? 'Start' : 'Resume'}
                </button>
                ${this.elapsed > 0
                  ? html`<button class="btn danger" @click=${this.reset}>Reset</button>`
                  : ''}
              `}
        </div>

        <div class="laps">
          ${this.laps.length === 0
            ? html`<div class="empty-state">No laps recorded</div>`
            : this.laps.map(
                (lap, index) => html`
                  <div class="lap-item">
                    <span class="lap-number">Lap ${this.laps.length - index}</span>
                    <span>${this.formatTime(lap.time)}</span>
                  </div>
                `
              )}
        </div>
      </div>
    `;
  }
}
