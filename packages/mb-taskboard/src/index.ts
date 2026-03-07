import { LitElement, css, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import {
  type WidgetCommandRequest,
  emitError,
  emitReady,
  eventBus,
  getWidgetSettings,
  registerWidgetCommandHandler,
  setWidgetSettings,
  widgetStore,
} from '@myboard/sdk';

type TaskPriority = 'low' | 'medium' | 'high';
type TaskStatus = 'backlog' | 'in-progress' | 'done';

interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  dueDate?: string;
  status: TaskStatus;
  createdAt: number;
  updatedAt: number;
}

interface TaskboardSettings {
  showCompleted?: boolean;
  defaultPriority?: TaskPriority;
}

const TASKBOARD_ID = 'taskboard';
const TASKBOARD_STATE_KEY = 'taskboard:tasks';
const DEFAULT_SETTINGS: Required<TaskboardSettings> = {
  showCompleted: true,
  defaultPriority: 'medium',
};

function sanitizePriority(
  value: unknown,
  fallback: TaskPriority = DEFAULT_SETTINGS.defaultPriority
): TaskPriority {
  return value === 'low' || value === 'medium' || value === 'high'
    ? value
    : fallback;
}

function sanitizeSettings(
  settings: TaskboardSettings | undefined,
  fallback: Required<TaskboardSettings> = DEFAULT_SETTINGS
): Required<TaskboardSettings> {
  return {
    showCompleted: settings?.showCompleted ?? fallback.showCompleted,
    defaultPriority: sanitizePriority(
      settings?.defaultPriority,
      fallback.defaultPriority
    ),
  };
}

function normalizeTaskTitle(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

@customElement('mb-taskboard')
export class MbTaskboardElement extends LitElement {
  @state() private tasks: Task[] = [];
  @state() private titleInput = '';
  @state() private dueInput = '';
  @state() private priorityInput: TaskPriority =
    DEFAULT_SETTINGS.defaultPriority;
  @state() private showCompleted = DEFAULT_SETTINGS.showCompleted;

  private unsubscribers: Array<() => void> = [];

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%);
      border-radius: 16px;
      border: 1px solid rgba(14, 165, 233, 0.2);
      padding: 12px;
      box-sizing: border-box;
      display: grid;
      grid-template-rows: auto auto 1fr;
      gap: 8px;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
    }
    .row {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }
    .input-group {
      display: flex;
      flex: 1;
      gap: 8px;
      min-width: 200px;
    }
    input,
    select {
      border: 1px solid rgba(14, 165, 233, 0.3);
      border-radius: 10px;
      padding: 6px 10px;
      background: rgba(255, 255, 255, 0.9);
      font-size: 0.82rem;
      transition: border-color 0.2s;
    }
    input:focus,
    select:focus {
      outline: none;
      border-color: #0284c7;
      background: #fff;
    }
    input[type='text'] {
      flex: 1;
    }
    .btn-primary {
      border: none;
      border-radius: 10px;
      padding: 6px 14px;
      background: #0284c7;
      color: #fff;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    }
    .btn-primary:hover {
      background: #0369a1;
    }
    .btn-ghost {
      background: transparent;
      border: 1px solid rgba(14, 165, 233, 0.4);
      color: #0369a1;
      border-radius: 8px;
      padding: 4px 8px;
      font-size: 0.75rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-ghost:hover {
      background: rgba(255, 255, 255, 0.5);
      border-color: #0369a1;
    }
    .columns {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
      min-height: 0;
    }
    .column {
      border: 1px solid rgba(14, 165, 233, 0.15);
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.4);
      padding: 8px;
      display: flex;
      flex-direction: column;
      min-height: 0;
    }
    .column h4 {
      margin: 0 0 6px 0;
      font-size: 0.72rem;
      text-transform: uppercase;
      color: #0369a1;
      letter-spacing: 0.08em;
      font-weight: 800;
      text-align: center;
    }
    .list {
      display: grid;
      gap: 8px;
      overflow-y: auto;
      min-height: 0;
      padding-right: 4px;
    }
    .list::-webkit-scrollbar {
      width: 4px;
    }
    .list::-webkit-scrollbar-thumb {
      background: rgba(14, 165, 233, 0.2);
      border-radius: 4px;
    }
    .task {
      border: 1px solid rgba(14, 165, 233, 0.1);
      border-radius: 10px;
      background: #fff;
      padding: 8px;
      display: grid;
      gap: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
      transition: transform 0.1s;
    }
    .task:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .task-main {
      font-size: 0.85rem;
      color: #1e293b;
      line-height: 1.4;
      font-weight: 500;
      word-break: break-word;
    }
    .task-meta {
      font-size: 0.7rem;
      color: #64748b;
      display: flex;
      justify-content: space-between;
      gap: 6px;
      align-items: center;
    }
    .priority-pill {
      padding: 1px 6px;
      border-radius: 4px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.6rem;
    }
    .priority-pill.high {
      background: #fee2e2;
      color: #b91c1c;
    }
    .priority-pill.medium {
      background: #fef3c7;
      color: #b45309;
    }
    .priority-pill.low {
      background: #f0fdf4;
      color: #15803d;
    }
    .task-actions {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      border-top: 1px solid #f1f5f9;
      padding-top: 6px;
    }
    .settings-row {
      font-size: 0.75rem;
      color: #0369a1;
      display: flex;
      align-items: center;
      gap: 6px;
      user-select: none;
      cursor: pointer;
    }
  `;

  connectedCallback(): void {
    super.connectedCallback();
    try {
      this.tasks = widgetStore.getState<Task[]>(TASKBOARD_STATE_KEY) ?? [];
      const settings = sanitizeSettings(
        getWidgetSettings<TaskboardSettings>(TASKBOARD_ID)
      );
      this.showCompleted = settings.showCompleted;
      this.priorityInput = settings.defaultPriority;

      this.unsubscribers.push(
        registerWidgetCommandHandler(
          TASKBOARD_ID,
          async (request: WidgetCommandRequest) => {
            const { commandType, payload } = request;

            if (commandType === 'task.create') {
              const title =
                normalizeTaskTitle(payload?.title) ??
                normalizeTaskTitle(payload?.text) ??
                (typeof payload?.note === 'object' &&
                payload.note &&
                normalizeTaskTitle((payload.note as { text?: unknown }).text)
                  ? normalizeTaskTitle(
                      (payload.note as { text?: unknown }).text
                    )
                  : null) ??
                'Automated Task';
              const priority = sanitizePriority(
                payload?.priority,
                this.priorityInput
              );
              const dueDate =
                typeof payload?.dueDate === 'string'
                  ? payload.dueDate
                  : undefined;
              const task = this.createTask(title, priority, dueDate);
              if (!task) {
                return {
                  ok: false,
                  code: 'COMMAND_PAYLOAD_INVALID',
                  reason: 'task.create requires a non-empty title',
                };
              }
              return { ok: true, result: { taskId: task.id } };
            }

            if (commandType === 'task.move-next') {
              if (typeof payload?.id !== 'string') {
                return {
                  ok: false,
                  code: 'COMMAND_PAYLOAD_INVALID',
                  reason: 'task.move-next requires payload.id',
                };
              }
              const task = this.tasks.find((entry) => entry.id === payload.id);
              if (!task) {
                return {
                  ok: false,
                  code: 'COMMAND_TARGET_NOT_FOUND',
                  reason: `Task ${payload.id} not found`,
                };
              }
              const nextStatus: Record<TaskStatus, TaskStatus> = {
                backlog: 'in-progress',
                'in-progress': 'done',
                done: 'done',
              };
              this.moveTask(task, nextStatus[task.status]);
              return { ok: true };
            }

            return {
              ok: false,
              code: 'COMMAND_ACTION_NOT_SUPPORTED',
              reason: `taskboard does not support ${commandType}`,
            };
          }
        )
      );

      this.unsubscribers.push(
        eventBus.subscribe('host', 'settings-updated', (event) => {
          const { widgetId, settings: nextSettings } = event.data as {
            widgetId: string;
            settings: TaskboardSettings;
          };
          if (widgetId === TASKBOARD_ID) {
            const merged = sanitizeSettings(
              {
                showCompleted: nextSettings.showCompleted ?? this.showCompleted,
                defaultPriority:
                  nextSettings.defaultPriority ?? this.priorityInput,
              },
              {
                showCompleted: this.showCompleted,
                defaultPriority: this.priorityInput,
              }
            );
            this.showCompleted = merged.showCompleted;
            this.priorityInput = merged.defaultPriority;
            this.requestUpdate();
          }
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

  private persist(nextTasks: Task[]): void {
    this.tasks = nextTasks;
    widgetStore.setState(TASKBOARD_STATE_KEY, nextTasks);
  }

  private saveSettings(): void {
    const settings = sanitizeSettings({
      showCompleted: this.showCompleted,
      defaultPriority: this.priorityInput,
    });
    setWidgetSettings(TASKBOARD_ID, settings);
  }

  private createTask(
    title: string,
    priority = this.priorityInput,
    dueDate?: string
  ): Task | undefined {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) {
      return undefined;
    }

    const now = Date.now();
    const task: Task = {
      id: String(now),
      title: normalizedTitle,
      priority,
      dueDate,
      status: 'backlog',
      createdAt: now,
      updatedAt: now,
    };
    this.persist([task, ...this.tasks]);
    eventBus.publish(TASKBOARD_ID, 'task-created', {
      id: task.id,
      title: task.title,
      priority: task.priority,
    });
    return task;
  }

  private handleAddButtonClick = () => {
    const task = this.createTask(
      this.titleInput,
      this.priorityInput,
      this.dueInput || undefined
    );
    if (!task) return;
    this.titleInput = '';
    this.dueInput = '';
  };

  private deleteTask(id: string): void {
    this.persist(this.tasks.filter((task) => task.id !== id));
  }

  private moveTask(task: Task, status: TaskStatus): void {
    if (task.status === status) return;
    const next = this.tasks.map((current) =>
      current.id === task.id
        ? {
            ...current,
            status,
            updatedAt: Date.now(),
          }
        : current
    );
    this.persist(next);
    eventBus.publish(TASKBOARD_ID, 'task-moved', {
      id: task.id,
      from: task.status,
      to: status,
    });
    if (status === 'done') {
      eventBus.publish(TASKBOARD_ID, 'task-completed', { id: task.id });
    }
  }

  private toggleShowCompleted = (event: Event) => {
    this.showCompleted = (event.target as HTMLInputElement).checked;
    this.saveSettings();
    this.requestUpdate();
  };

  private renderColumn(status: TaskStatus, title: string) {
    const tasks = this.tasks.filter((task) => {
      if (status !== task.status) return false;
      if (status === 'done' && !this.showCompleted) return false;
      return true;
    });

    return html`
      <section class="column">
        <h4>${title}</h4>
        <div class="list">
          ${tasks.map((task) => {
            const canMoveBack = status !== 'backlog';
            const canMoveForward = status !== 'done';
            const previousStatus: Record<TaskStatus, TaskStatus> = {
              backlog: 'backlog',
              'in-progress': 'backlog',
              done: 'in-progress',
            };
            const nextStatus: Record<TaskStatus, TaskStatus> = {
              backlog: 'in-progress',
              'in-progress': 'done',
              done: 'done',
            };
            return html`
              <article class="task">
                <div class="task-main">${task.title}</div>
                <div class="task-meta">
                  <span class="priority-pill ${task.priority}"
                    >${task.priority}</span
                  >
                  <span>${task.dueDate ? `Due ${task.dueDate}` : ''}</span>
                </div>
                <div class="task-actions">
                  ${canMoveBack
                    ? html`<button
                        class="btn-ghost"
                        @click=${() =>
                          this.moveTask(task, previousStatus[status])}
                      >
                        Back
                      </button>`
                    : null}
                  ${canMoveForward
                    ? html`<button
                        class="btn-ghost"
                        @click=${() => this.moveTask(task, nextStatus[status])}
                      >
                        Next
                      </button>`
                    : null}
                  <button
                    class="btn-ghost"
                    style="margin-left:auto;color:#ef4444;border-color:rgba(239,68,68,0.2)"
                    @click=${() => this.deleteTask(task.id)}
                  >
                    Delete
                  </button>
                </div>
              </article>
            `;
          })}
        </div>
      </section>
    `;
  }

  render() {
    return html`
      <div class="surface">
        <div class="row">
          <div class="input-group">
            <input
              type="text"
              placeholder="What needs to be done?"
              .value=${this.titleInput}
              @input=${(event: Event) => {
                this.titleInput = (event.target as HTMLInputElement).value;
              }}
              @keydown=${(event: KeyboardEvent) => {
                if (event.key === 'Enter') this.handleAddButtonClick();
              }}
            />
            <input
              type="date"
              .value=${this.dueInput}
              @input=${(event: Event) => {
                this.dueInput = (event.target as HTMLInputElement).value;
              }}
            />
            <select
              .value=${this.priorityInput}
              @change=${(event: Event) => {
                this.priorityInput = sanitizePriority(
                  (event.target as HTMLSelectElement).value,
                  this.priorityInput
                );
                this.saveSettings();
              }}
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            <button class="btn-primary" @click=${this.handleAddButtonClick}>
              Add Task
            </button>
          </div>
        </div>
        <div class="row">
          <label class="settings-row">
            <input
              type="checkbox"
              .checked=${this.showCompleted}
              @change=${this.toggleShowCompleted}
            />
            Show completed tasks
          </label>
        </div>
        <div class="columns">
          ${this.renderColumn('backlog', 'Backlog')}
          ${this.renderColumn('in-progress', 'Progress')}
          ${this.renderColumn('done', 'Done')}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mb-taskboard': MbTaskboardElement;
  }
}
