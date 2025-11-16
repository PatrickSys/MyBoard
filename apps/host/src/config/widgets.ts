export type WidgetConfigEntry = {
  id: string;
  title: string;
  tag: string;
  url: string;
};

export const WIDGETS: ReadonlyArray<WidgetConfigEntry> = [
  {
    id: 'clock',
    title: 'Clock',
    tag: 'mb-clock',
    url: '/widgets/mb-clock.js',
  },
  {
    id: 'weather',
    title: 'Weather',
    tag: 'mb-weather',
    url: '/widgets/mb-weather.js',
  },
  {
    id: 'tasks',
    title: 'Tasks',
    tag: 'mb-tasks',
    url: '/widgets/mb-tasks.js',
  },
  {
    id: 'links',
    title: 'Quick Links',
    tag: 'mb-links',
    url: '/widgets/mb-links.js',
  },
  {
    id: 'calculator',
    title: 'Calculator',
    tag: 'mb-calculator',
    url: '/widgets/mb-calculator.js',
  },
  {
    id: 'stopwatch',
    title: 'Stopwatch',
    tag: 'mb-stopwatch',
    url: '/widgets/mb-stopwatch.js',
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


