import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady } from '@myboard/widget-utils';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

@customElement('mb-tasks')
export class TasksWidget extends LitElement {
  @state() private tasks: Task[] = [];

  private readonly STORAGE_KEY = 'mb-tasks';

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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

    .add-form {
      display: flex;
      gap: 8px;
      margin-bottom: 16px;
    }

    input {
      flex: 1;
      padding: 10px 12px;
      border: none;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 14px;
    }

    input::placeholder {
      color: rgba(0, 0, 0, 0.4);
    }

    .btn {
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 8px;
      color: white;
      cursor: pointer;
      padding: 10px 16px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
      white-space: nowrap;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .tasks-list {
      flex: 1;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }

    .task-item {
      background: rgba(255, 255, 255, 0.15);
      border-radius: 8px;
      padding: 12px;
      display: flex;
      align-items: center;
      gap: 12px;
      transition: all 0.2s;
      backdrop-filter: blur(10px);
    }

    .task-item:hover {
      background: rgba(255, 255, 255, 0.2);
    }

    .task-item.completed {
      opacity: 0.6;
    }

    .checkbox {
      width: 20px;
      height: 20px;
      min-width: 20px;
      border: 2px solid rgba(255, 255, 255, 0.5);
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }

    .checkbox:hover {
      border-color: rgba(255, 255, 255, 0.8);
    }

    .checkbox.checked {
      background: rgba(255, 255, 255, 0.9);
      border-color: rgba(255, 255, 255, 0.9);
    }

    .checkmark {
      color: #059669;
      font-weight: bold;
      font-size: 14px;
    }

    .task-text {
      flex: 1;
      font-size: 14px;
      line-height: 1.4;
      word-break: break-word;
    }

    .task-item.completed .task-text {
      text-decoration: line-through;
    }

    .delete-btn {
      background: rgba(239, 68, 68, 0.8);
      border: none;
      border-radius: 6px;
      color: white;
      cursor: pointer;
      width: 28px;
      height: 28px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }

    .delete-btn:hover {
      background: rgba(239, 68, 68, 1);
      transform: scale(1.1);
    }

    .empty-state {
      text-align: center;
      opacity: 0.6;
      padding: 40px 20px;
      font-size: 14px;
    }

    .stats {
      margin-top: 12px;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 12px;
      opacity: 0.8;
      text-align: center;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this.loadTasks();
    queueMicrotask(() => emitReady(this));
  }

  private loadTasks() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.tasks = JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to load tasks:', e);
      this.tasks = [];
    }
  }

  private saveTasks() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
    } catch (e) {
      console.error('Failed to save tasks:', e);
    }
  }

  private handleAdd(e: Event) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input') as HTMLInputElement;
    const text = input.value.trim();

    if (text) {
      this.tasks = [
        {
          id: Date.now().toString(),
          text,
          completed: false,
        },
        ...this.tasks,
      ];
      this.saveTasks();
      input.value = '';
    }
  }

  private toggleTask(id: string) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
  }

  private deleteTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  render() {
    const completedCount = this.tasks.filter((t) => t.completed).length;
    const totalCount = this.tasks.length;

    return html`
      <div class="container">
        <h3>Tasks</h3>

        <form class="add-form" @submit=${this.handleAdd}>
          <input type="text" placeholder="Add a new task..." />
          <button type="submit" class="btn">Add</button>
        </form>

        <div class="tasks-list">
          ${this.tasks.length === 0
            ? html`<div class="empty-state">No tasks yet. Add one above!</div>`
            : this.tasks.map(
                (task) => html`
                  <div class="task-item ${task.completed ? 'completed' : ''}">
                    <div
                      class="checkbox ${task.completed ? 'checked' : ''}"
                      @click=${() => this.toggleTask(task.id)}
                    >
                      ${task.completed ? html`<span class="checkmark">✓</span>` : ''}
                    </div>
                    <div class="task-text">${task.text}</div>
                    <button class="delete-btn" @click=${() => this.deleteTask(task.id)}>
                      ×
                    </button>
                  </div>
                `
              )}
        </div>

        ${totalCount > 0
          ? html`
              <div class="stats">
                ${completedCount} of ${totalCount} completed
                ${completedCount === totalCount && totalCount > 0 ? ' 🎉' : ''}
              </div>
            `
          : ''}
      </div>
    `;
  }
}
