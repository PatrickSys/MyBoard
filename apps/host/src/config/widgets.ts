export type WidgetConfigEntry = {
  id: string;
  title: string;
  tag: string;
  url: string;
};

export const WIDGETS: ReadonlyArray<WidgetConfigEntry> = [
  {
    id: 'tasks',
    title: 'Tasks',
    tag: 'mb-tasks',
    url: '/widgets/mb-tasks.js',
  },
  {
    id: 'notes',
    title: 'Notes',
    tag: 'mb-notes',
    url: '/widgets/mb-notes.js',
  },
  {
    id: 'pomodoro',
    title: 'Pomodoro',
    tag: 'mb-pomodoro',
    url: '/widgets/mb-pomodoro.js',
  },
];


