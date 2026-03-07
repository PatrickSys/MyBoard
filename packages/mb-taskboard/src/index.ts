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

function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60_000);
  if (minutes < 1) return 'just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const date = new Date(timestamp);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  if (date.getFullYear() !== new Date().getFullYear()) opts.year = 'numeric';
  return date.toLocaleDateString(undefined, opts);
}

function formatDueDate(dateStr: string): { label: string; state: 'overdue' | 'due-soon' | 'normal' } {
  const due = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.floor((due.getTime() - today.getTime()) / 86_400_000);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  if (due.getFullYear() !== today.getFullYear()) opts.year = 'numeric';
  const label = due.toLocaleDateString(undefined, opts);
  if (diffDays <= 0) return { label, state: 'overdue' };
  if (diffDays <= 2) return { label, state: 'due-soon' };
  return { label, state: 'normal' };
}

const PRIORITY_WEIGHT: Record<TaskPriority, number> = { high: 0, medium: 1, low: 2 };

function urgencyBucket(task: Task): number {
  if (!task.dueDate) return 3;
  const { state } = formatDueDate(task.dueDate);
  if (state === 'overdue') return 0;
  if (state === 'due-soon') return 1;
  return 2;
}

function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const bucketDiff = urgencyBucket(a) - urgencyBucket(b);
    if (bucketDiff !== 0) return bucketDiff;
    if (a.dueDate && b.dueDate && a.dueDate !== b.dueDate) {
      return a.dueDate < b.dueDate ? -1 : 1;
    }
    const priorityDiff = PRIORITY_WEIGHT[a.priority] - PRIORITY_WEIGHT[b.priority];
    if (priorityDiff !== 0) return priorityDiff;
    return b.createdAt - a.createdAt;
  });
}

@customElement('mb-taskboard')
export class MbTaskboardElement extends LitElement {
  @state() private tasks: Task[] = [];
  @state() private titleInput = '';
  @state() private dueInput = '';
  @state() private priorityInput: TaskPriority =
    DEFAULT_SETTINGS.defaultPriority;
  @state() private showCompleted = DEFAULT_SETTINGS.showCompleted;
  @state() private draggedTaskId: string | null = null;
  @state() private dragOverColumn: TaskStatus | null = null;

  private unsubscribers: Array<() => void> = [];

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, Segoe UI, sans-serif;
    }
    .surface {
      height: 100%;
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      border-radius: 16px;
      border: 1px solid rgba(100, 116, 139, 0.2);
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
      transition: background 0.15s, border-color 0.15s, box-shadow 0.15s;
    }
    /* Backlog — slate/gray */
    .column-backlog {
      background: rgba(248, 250, 252, 0.7);
      border-color: rgba(100, 116, 139, 0.25);
    }
    .column-backlog h4 { color: #475569; }
    /* In Progress — amber */
    .column-in-progress {
      background: rgba(255, 251, 235, 0.75);
      border-color: rgba(217, 119, 6, 0.3);
    }
    .column-in-progress h4 { color: #b45309; }
    /* Done — green */
    .column-done {
      background: rgba(240, 253, 244, 0.75);
      border-color: rgba(21, 128, 61, 0.25);
    }
    .column-done h4 { color: #15803d; }
    /* Drag-over highlight */
    .column--drag-over {
      box-shadow: inset 0 0 0 2px currentColor;
      opacity: 0.9;
    }
    .column-backlog.column--drag-over  { box-shadow: inset 0 0 0 2px #64748b; background: rgba(226,232,240,0.6); }
    .column-in-progress.column--drag-over { box-shadow: inset 0 0 0 2px #d97706; background: rgba(253,230,138,0.5); }
    .column-done.column--drag-over     { box-shadow: inset 0 0 0 2px #16a34a; background: rgba(187,247,208,0.5); }
    .column h4 {
      margin: 0 0 6px 0;
      font-size: 0.72rem;
      text-transform: uppercase;
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
      transition: transform 0.1s, opacity 0.1s, box-shadow 0.1s;
      cursor: grab;
    }
    .task:hover {
      transform: translateY(-1px);
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    }
    .task--dragging {
      opacity: 0.4;
      cursor: grabbing;
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
    .task-created {
      font-size: 0.65rem;
      color: #94a3b8;
      flex-shrink: 0;
    }
    .task-due {
      font-size: 0.68rem;
      display: flex;
      align-items: center;
      gap: 3px;
      font-weight: 500;
    }
    .task-due--normal  { color: #64748b; }
    .task-due--due-soon { color: #d97706; }
    .task-due--overdue  { color: #dc2626; font-weight: 600; }
    .task-actions {
      display: flex;
      gap: 4px;
      margin-top: 4px;
      border-top: 1px solid #f1f5f9;
      padding-top: 6px;
    }
    .icon-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 6px;
      border: 1px solid transparent;
      background: transparent;
      cursor: pointer;
      padding: 0;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
      color: #94a3b8;
      flex-shrink: 0;
    }
    .icon-btn svg { display: block; }
    .icon-btn.btn-back:hover  { background: #f1f5f9; border-color: #cbd5e1; color: #475569; }
    .icon-btn.btn-next:hover  { background: #eff6ff; border-color: #93c5fd; color: #2563eb; }
    .icon-btn.btn-delete:hover { background: #fff1f2; border-color: #fca5a5; color: #dc2626; }
    .icon-btn.btn-delete { margin-left: auto; }
    /* CSS tooltip */
    .icon-btn[data-tooltip] { position: relative; }
    .icon-btn[data-tooltip]::after {
      content: attr(data-tooltip);
      position: absolute;
      bottom: calc(100% + 6px);
      left: 50%;
      transform: translateX(-50%);
      background: #1e293b;
      color: #f8fafc;
      font-size: 0.6rem;
      font-weight: 500;
      white-space: nowrap;
      padding: 3px 7px;
      border-radius: 5px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 10;
    }
    .icon-btn[data-tooltip]:hover::after { opacity: 1; }
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

  private handleDragStart(taskId: string, event: DragEvent): void {
    this.draggedTaskId = taskId;
    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/plain', taskId);
    }
  }

  private handleDragEnd(): void {
    this.draggedTaskId = null;
    this.dragOverColumn = null;
  }

  private handleDragOver(status: TaskStatus, event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer) event.dataTransfer.dropEffect = 'move';
    if (this.dragOverColumn !== status) this.dragOverColumn = status;
  }

  private handleDragLeave(status: TaskStatus, event: DragEvent): void {
    const related = event.relatedTarget as Node | null;
    const section = (event.currentTarget as HTMLElement);
    if (!section.contains(related)) {
      if (this.dragOverColumn === status) this.dragOverColumn = null;
    }
  }

  private handleDrop(status: TaskStatus, event: DragEvent): void {
    event.preventDefault();
    const id = this.draggedTaskId ?? event.dataTransfer?.getData('text/plain');
    if (!id) return;
    const task = this.tasks.find((t) => t.id === id);
    if (task) this.moveTask(task, status);
    this.draggedTaskId = null;
    this.dragOverColumn = null;
  }

  private renderColumn(status: TaskStatus, title: string) {
    const tasks = sortTasks(this.tasks.filter((task) => {
      if (status !== task.status) return false;
      if (status === 'done' && !this.showCompleted) return false;
      return true;
    }));

    const isDragOver = this.dragOverColumn === status;

    return html`
      <section
        class="column column-${status} ${isDragOver ? 'column--drag-over' : ''}"
        @dragover=${(e: DragEvent) => this.handleDragOver(status, e)}
        @dragleave=${(e: DragEvent) => this.handleDragLeave(status, e)}
        @drop=${(e: DragEvent) => this.handleDrop(status, e)}
      >
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
            const isDragging = this.draggedTaskId === task.id;
            return html`
              <article
                class="task ${isDragging ? 'task--dragging' : ''}"
                draggable="true"
                @dragstart=${(e: DragEvent) => this.handleDragStart(task.id, e)}
                @dragend=${() => this.handleDragEnd()}
              >
                <div class="task-main">${task.title}</div>
                ${task.dueDate ? (() => {
                  const { label, state } = formatDueDate(task.dueDate);
                  return html`<div class="task-due task-due--${state}">
                    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="3" width="12" height="12" rx="2"/><path d="M5 1v4M11 1v4M2 7h12"/>
                    </svg>
                    ${label}
                  </div>`;
                })() : null}
                <div class="task-meta">
                  <span class="priority-pill ${task.priority}">${task.priority}</span>
                  <span class="task-created">${formatRelativeTime(task.createdAt)}</span>
                </div>
                <div class="task-actions">
                  ${canMoveBack
                    ? html`<button
                        class="icon-btn btn-back"
                        data-tooltip="Move back"
                        @click=${() => this.moveTask(task, previousStatus[status])}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M10 3L5 8l5 5"/>
                        </svg>
                      </button>`
                    : null}
                  ${canMoveForward
                    ? html`<button
                        class="icon-btn btn-next"
                        data-tooltip="Move forward"
                        @click=${() => this.moveTask(task, nextStatus[status])}
                      >
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M6 3l5 5-5 5"/>
                        </svg>
                      </button>`
                    : null}
                  <button
                    class="icon-btn btn-delete"
                    data-tooltip="Delete task"
                    @click=${() => this.deleteTask(task.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M3 4h10M6 4V2h4v2M5 4l.5 9h5L11 4"/>
                    </svg>
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
