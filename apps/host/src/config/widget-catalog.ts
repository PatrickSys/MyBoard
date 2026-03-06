import type { WidgetCatalogResponse } from '@myboard/sdk';

export const TRUSTED_WIDGET_ORIGINS: ReadonlyArray<string> = ['http://localhost:4200'];

export const WIDGET_CATALOG_VERSION = '2026.02.15';

export const WIDGET_CATALOG: WidgetCatalogResponse = {
  version: WIDGET_CATALOG_VERSION,
  generatedAt: new Date('2026-02-15T00:00:00.000Z').toISOString(),
  widgets: [
    {
      id: 'notes',
      title: 'Notes',
      description: 'Capture and organize notes with tags and pinning.',
      tag: 'mb-notes',
      url: '/widgets/mb-notes.js',
      version: '2.0.0',
      permissions: ['storage', 'events'],
      defaultInstalled: true,
      layoutDefaults: { x: 0, y: 0, w: 2, h: 3, minH: 2, minW: 1 },
      automation: {
        events: [
          {
            key: 'note-added',
            label: 'Note Added',
            description: 'Emitted when a note is created',
          },
          {
            key: 'note-updated',
            label: 'Note Updated',
            description: 'Emitted when a note is edited',
          },
          {
            key: 'note-archived',
            label: 'Note Archived',
            description: 'Emitted when a note is archived',
          },
        ],
        actions: [
          {
            key: 'note.create',
            label: 'Create Note',
            description: 'Create a new note with optional tags',
            payloadFields: [
              {
                key: 'text',
                label: 'Text',
                type: 'string',
              },
              {
                key: 'tags',
                label: 'Tags',
                type: 'string',
              },
            ],
          },
          {
            key: 'note.pin-latest',
            label: 'Pin Latest Note',
            description: 'Pin the most recently created note',
          },
        ],
      },
      settingsSchema: {
        title: 'Notes Settings',
        fields: [
          {
            key: 'showArchived',
            label: 'Show archived notes',
            type: 'boolean',
            defaultValue: false,
          },
        ],
      },
    },
    {
      id: 'pomodoro',
      title: 'Pomodoro',
      description: 'Focus timer with configurable work and break sessions.',
      tag: 'mb-pomodoro',
      url: '/widgets/mb-pomodoro.js',
      version: '2.0.0',
      permissions: ['storage', 'events'],
      defaultInstalled: true,
      layoutDefaults: { x: 2, y: 0, w: 2, h: 3, minH: 2, minW: 1 },
      automation: {
        events: [
          {
            key: 'session-started',
            label: 'Session Started',
            description: 'Emitted when a timer phase starts',
          },
          {
            key: 'session-completed',
            label: 'Session Completed',
            description: 'Emitted when a work session completes',
          },
          {
            key: 'break-started',
            label: 'Break Started',
            description: 'Emitted when a break starts',
          },
        ],
        actions: [
          {
            key: 'timer.start',
            label: 'Start Timer',
            description: 'Start timer with optional phase and duration override',
            payloadFields: [
              {
                key: 'phase',
                label: 'Phase',
                type: 'select',
                options: [
                  { label: 'Work', value: 'work' },
                  { label: 'Break', value: 'break' },
                ],
              },
              {
                key: 'minutes',
                label: 'Minutes',
                type: 'number',
              },
            ],
          },
          {
            key: 'timer.pause',
            label: 'Pause Timer',
            description: 'Pause the current timer',
          },
          {
            key: 'timer.reset',
            label: 'Reset Timer',
            description: 'Reset timer to idle',
          },
        ],
      },
      settingsSchema: {
        title: 'Pomodoro Settings',
        fields: [
          {
            key: 'workMinutes',
            label: 'Work minutes',
            type: 'number',
            defaultValue: 25,
            min: 5,
            max: 90,
          },
          {
            key: 'shortBreakMinutes',
            label: 'Short break minutes',
            type: 'number',
            defaultValue: 5,
            min: 1,
            max: 30,
          },
          {
            key: 'longBreakMinutes',
            label: 'Long break minutes',
            type: 'number',
            defaultValue: 15,
            min: 5,
            max: 45,
          },
        ],
      },
    },
    {
      id: 'counter',
      title: 'Productivity Insights',
      description: 'Aggregates notes, pomodoro, and task completion events.',
      tag: 'mb-counter',
      url: '/widgets/mb-counter.js',
      version: '2.0.0',
      permissions: ['storage', 'events'],
      defaultInstalled: true,
      layoutDefaults: { x: 0, y: 3, w: 2, h: 2, minH: 2, minW: 1 },
      automation: {
        events: [
          {
            key: 'insight-updated',
            label: 'Insight Updated',
            description: 'Emitted when productivity counters update',
          },
        ],
        actions: [
          {
            key: 'insight.reset-today',
            label: 'Reset Today Counters',
            description: 'Reset notes, pomodoro, and task counters for today',
          },
        ],
      },
    },
    {
      id: 'taskboard',
      title: 'Task Board',
      description: 'Kanban board for backlog, in-progress, and done tasks.',
      tag: 'mb-taskboard',
      url: '/widgets/mb-taskboard.js',
      version: '1.0.0',
      permissions: ['storage', 'events'],
      defaultInstalled: true,
      layoutDefaults: { x: 2, y: 3, w: 2, h: 3, minH: 2, minW: 1 },
      automation: {
        events: [
          {
            key: 'task-created',
            label: 'Task Created',
            description: 'Emitted when a task is added',
          },
          {
            key: 'task-moved',
            label: 'Task Moved',
            description: 'Emitted when a task changes status',
          },
          {
            key: 'task-completed',
            label: 'Task Completed',
            description: 'Emitted when a task reaches done',
          },
        ],
        actions: [
          {
            key: 'task.create',
            label: 'Create Task',
            description: 'Create a task in backlog',
            payloadFields: [
              {
                key: 'title',
                label: 'Title',
                type: 'string',
              },
              {
                key: 'priority',
                label: 'Priority',
                type: 'select',
                options: [
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ],
              },
            ],
          },
          {
            key: 'task.move-next',
            label: 'Move Task Forward',
            description: 'Move a task to the next board column',
            payloadFields: [
              {
                key: 'id',
                label: 'Task ID',
                type: 'string',
              },
            ],
          },
        ],
      },
      settingsSchema: {
        title: 'Task Board Settings',
        fields: [
          {
            key: 'showCompleted',
            label: 'Show completed tasks',
            type: 'boolean',
            defaultValue: true,
          },
          {
            key: 'defaultPriority',
            label: 'Default priority',
            type: 'select',
            defaultValue: 'medium',
            options: [
              { label: 'Low', value: 'low' },
              { label: 'Medium', value: 'medium' },
              { label: 'High', value: 'high' },
            ],
          },
        ],
      },
    },
  ],
};

