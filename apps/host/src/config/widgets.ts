export type WidgetConfigEntry = {
  id: string;
  title: string;
  tag: string;
  url: string;
};

export const WIDGETS: ReadonlyArray<WidgetConfigEntry> = [
  {
    id: 'notes',
    title: 'Notes',
    tag: 'mb-notes',
    url: '/widgets/mb-notes.js',
  },
  {
    id: 'timer',
    title: 'Pomodoro',
    tag: 'mb-timer',
    url: '/widgets/mb-timer.js',
  },
];


