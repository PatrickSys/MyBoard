export interface NotesEventPayloadMap {
  'note-added': { note: { id: string; text: string; tags?: string[]; pinned?: boolean } };
  'note-updated': { note: { id: string; text: string; tags?: string[]; pinned?: boolean } };
  'note-deleted': { id: string };
  'note-pinned': { id: string; pinned: boolean };
}

export interface PomodoroEventPayloadMap {
  'session-started': { startedAt: number; phase: 'work' | 'break' };
  'session-completed': { completedAt: number; durationMinutes: number };
  'break-started': { startedAt: number; longBreak: boolean };
  'cycle-complete': { timestamp: number };
}

export interface TaskboardEventPayloadMap {
  'task-created': { id: string };
  'task-updated': { id: string };
  'task-moved': { id: string; from: string; to: string };
  'task-completed': { id: string };
}

