import fs from 'node:fs';
import path from 'node:path';
import { WIDGET_CATALOG } from '../src/config/widget-catalog';

function readWorkspaceFile(relativePath: string): string {
  return fs.readFileSync(
    path.resolve(__dirname, '../../../', relativePath),
    'utf8'
  );
}

function resolveWorkspacePath(relativePath: string): string {
  return path.resolve(__dirname, '../../../', relativePath);
}

describe('widget contract drift guards', () => {
  it('wires taskboard into the host build graph', () => {
    const projectJson = JSON.parse(
      readWorkspaceFile('apps/host/project.json')
    ) as {
      implicitDependencies: string[];
      targets: { build: { options: { commands: string[] } } };
    };

    expect(projectJson.implicitDependencies).toContain('@myboard/mb-taskboard');
    expect(projectJson.targets.build.options.commands).toContain(
      'pnpm exec vite build --config packages/mb-taskboard/vite.config.ts'
    );
  });

  it('keeps the catalog and widget sources aligned on declared actions', () => {
    const expectations = new Map<
      string,
      { file: string; actions: string[]; legacyAliases?: string[] }
    >([
      [
        'notes',
        {
          file: 'packages/mb-notes/src/index.tsx',
          actions: ['note.create', 'note.pin-latest'],
          legacyAliases: ['add-note', 'clear-notes'],
        },
      ],
      [
        'pomodoro',
        {
          file: 'packages/mb-pomodoro/src/index.ts',
          actions: ['timer.start', 'timer.pause', 'timer.reset'],
          legacyAliases: ['start-work', 'pause-timer', 'reset-timer'],
        },
      ],
      [
        'counter',
        {
          file: 'packages/mb-counter/src/index.ts',
          actions: ['insight.reset-today'],
        },
      ],
      [
        'taskboard',
        {
          file: 'packages/mb-taskboard/src/index.ts',
          actions: ['task.create', 'task.move-next'],
          legacyAliases: ['add-task', 'clear-done'],
        },
      ],
    ]);

    for (const [widgetId, expectation] of expectations.entries()) {
      const manifest = WIDGET_CATALOG.widgets.find(
        (widget) => widget.id === widgetId
      );
      expect(manifest).toBeDefined();
      const declaredActions =
        manifest?.automation?.actions.map((action) => action.key) ?? [];
      expect(declaredActions).toEqual(expectation.actions);

      const source = readWorkspaceFile(expectation.file);
      expect(source).toContain('registerWidgetCommandHandler');
      for (const action of expectation.actions) {
        expect(source).toContain(action);
      }
      for (const alias of expectation.legacyAliases ?? []) {
        expect(source).not.toContain(alias);
      }
    }
  });

  it('includes taskboard as a default-installed catalog widget', () => {
    const taskboard = WIDGET_CATALOG.widgets.find(
      (widget) => widget.id === 'taskboard'
    );

    expect(taskboard).toBeDefined();
    expect(taskboard?.defaultInstalled).toBe(true);
    expect(taskboard?.tag).toBe('mb-taskboard');
    expect(taskboard?.url).toBe('/widgets/mb-taskboard.js');
  });

  it('keeps generated widget bundles present in public/widgets', () => {
    for (const bundle of [
      'mb-notes.js',
      'mb-pomodoro.js',
      'mb-counter.js',
      'mb-taskboard.js',
    ]) {
      expect(
        fs.existsSync(
          resolveWorkspacePath(`apps/host/public/widgets/${bundle}`)
        )
      ).toBe(true);
    }
  });
});
