import { LitElement, html, css } from 'lit';
import { emitReady } from '@myboard/widget-utils';

type Task = { id: string; text: string; completed: boolean };

export class MbTasksElement extends LitElement {
  private tasks: Task[] = [];

  private readonly STORAGE_KEY = 'mb-tasks';

  static styles = css`
    :host { display: block; font-family: system-ui, -apple-system, sans-serif; height: 100%; }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border-radius: 16px;
      padding: 20px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(16, 185, 129, 0.2);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
    }
    .row {
      display: flex;
      gap: 12px;
      margin-bottom: 16px;
      padding-bottom: 12px;
      border-bottom: 1px solid rgba(16, 185, 129, 0.1);
    }
    input {
      flex: 1;
      padding: 10px 12px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 10px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.875rem;
      transition: all 0.2s ease;
    }
    input:focus {
      outline: none;
      border-color: #10b981;
      background: white;
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    button {
      padding: 10px 16px;
      border-radius: 10px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: white;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    button:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    .list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 10px;
      flex: 1;
      overflow: auto;
      min-height: 0;
      padding-right: 4px;
    }
    .item {
      display: flex;
      align-items: center;
      gap: 12px;
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 12px;
      padding: 12px 16px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(8px);
    }
    .item:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.15);
      border-color: rgba(16, 185, 129, 0.2);
    }
    .item.done {
      opacity: 0.6;
    }
    .item.done .text {
      text-decoration: line-through;
    }
    .check {
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: 2px solid rgba(16, 185, 129, 0.3);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      background: white;
    }
    .check.done {
      background: #10b981;
      border-color: #10b981;
    }
    .text {
      flex: 1;
      font-size: 0.875rem;
      line-height: 1.4;
      word-break: break-word;
    }
    .del {
      background: transparent;
      border: 1px solid rgba(16, 185, 129, 0.2);
      color: #64748b;
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .del:hover {
      background: rgba(239, 68, 68, 0.1);
      border-color: rgba(239, 68, 68, 0.3);
      color: #ef4444;
      transform: translateY(-1px);
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    try {
      const s = localStorage.getItem(this.STORAGE_KEY);
      this.tasks = s ? (JSON.parse(s) as Task[]) : [];
    } catch { }
    queueMicrotask(() => emitReady(this));
  }

  private save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch { }
  }

  private add(e: Event) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector('input') as HTMLInputElement;
    const v = input.value.trim();
    if (!v) return;
    this.tasks = [{ id: String(Date.now()), text: v, completed: false }, ...this.tasks];
    this.save();
    input.value = '';
    this.requestUpdate();
  }

  private toggle(id: string) {
    this.tasks = this.tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    this.save();
    this.requestUpdate();
  }

  private del(id: string) {
    this.tasks = this.tasks.filter((t) => t.id !== id);
    this.save();
    this.requestUpdate();
  }

  render() {
    return html`
      <div class="surface">
        <form class="row" @submit=${(e: Event) => this.add(e)}>
          <input placeholder="Add task" />
          <button type="submit">Add</button>
        </form>
        <ul class="list">
          ${this.tasks.map(
            (t) => html`
              <li class="item ${t.completed ? 'done' : ''}">
                <div class="check ${t.completed ? 'done' : ''}" @click=${() => this.toggle(t.id)}>
                  ${t.completed ? '✓' : ''}
                </div>
                <span class="text">${t.text}</span>
                <button class="del" @click=${() => this.del(t.id)}>Delete</button>
              </li>
            `
          )}
        </ul>
      </div>
    `;
  }
}

if (!customElements.get('mb-tasks')) {
  customElements.define('mb-tasks', MbTasksElement);
}
