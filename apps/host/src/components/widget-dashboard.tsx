'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './widget-dashboard.module.scss';

// Mock widget system for demo (in real implementation, import from @myboard/widget-system)
interface MockWidget {
  id: string;
  name: string;
  type: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

const MOCK_WIDGETS: MockWidget[] = [
  {
    id: 'notes-1',
    name: 'Quick Notes',
    type: 'notes',
    position: { x: 20, y: 20 },
    size: { width: 300, height: 200 }
  },
  {
    id: 'todo-1',
    name: 'Todo List',
    type: 'todo',
    position: { x: 340, y: 20 },
    size: { width: 280, height: 250 }
  },
  {
    id: 'calendar-1',
    name: 'Mini Calendar',
    type: 'calendar',
    position: { x: 20, y: 240 },
    size: { width: 250, height: 200 }
  }
];

export function WidgetDashboard() {
  const [widgets, setWidgets] = useState<MockWidget[]>(MOCK_WIDGETS);
  const [draggedWidget, setDraggedWidget] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dashboardRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent, widgetId: string) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setDraggedWidget(widgetId);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggedWidget || !dashboardRef.current) return;

    const dashboardRect = dashboardRef.current.getBoundingClientRect();
    const newX = e.clientX - dashboardRect.left - dragOffset.x;
    const newY = e.clientY - dashboardRect.top - dragOffset.y;

    setWidgets(prev => prev.map(widget => 
      widget.id === draggedWidget 
        ? { ...widget, position: { x: Math.max(0, newX), y: Math.max(0, newY) } }
        : widget
    ));
  };

  const handleMouseUp = () => {
    setDraggedWidget(null);
  };

  const addWidget = (type: string) => {
    const newWidget: MockWidget = {
      id: `${type}-${Date.now()}`,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Widget`,
      type,
      position: { x: 50, y: 50 },
      size: { width: 300, height: 200 }
    };
    setWidgets(prev => [...prev, newWidget]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
  };

  const renderWidgetContent = (widget: MockWidget) => {
    switch (widget.type) {
      case 'notes':
        return (
          <div className={styles.widgetContent}>
            <h4>📝 {widget.name}</h4>
            <textarea
              placeholder="Start typing your notes..."
              className={styles.notesTextarea}
              defaultValue="This is a demo notes widget with real-time editing capabilities."
            />
          </div>
        );
      case 'todo':
        return (
          <div className={styles.widgetContent}>
            <h4>✅ {widget.name}</h4>
            <div className={styles.todoList}>
              <div className={styles.todoItem}>
                <input type="checkbox" /> Implement widget system
              </div>
              <div className={styles.todoItem}>
                <input type="checkbox" defaultChecked /> Create dashboard UI
              </div>
              <div className={styles.todoItem}>
                <input type="checkbox" /> Add drag & drop
              </div>
              <input 
                type="text" 
                placeholder="Add new task..." 
                className={styles.todoInput}
              />
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className={styles.widgetContent}>
            <h4>📅 {widget.name}</h4>
            <div className={styles.calendar}>
              <div className={styles.calendarHeader}>
                <span>December 2024</span>
              </div>
              <div className={styles.calendarGrid}>
                {Array.from({ length: 31 }, (_, i) => (
                  <div key={i} className={styles.calendarDay}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={styles.widgetContent}>
            <h4>{widget.name}</h4>
            <p>Widget type: {widget.type}</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.toolbar}>
        <h2>🎯 Widget Dashboard</h2>
        <div className={styles.widgetControls}>
          <button 
            onClick={() => addWidget('notes')}
            className={styles.addButton}
          >
            + Notes
          </button>
          <button 
            onClick={() => addWidget('todo')}
            className={styles.addButton}
          >
            + Todo
          </button>
          <button 
            onClick={() => addWidget('calendar')}
            className={styles.addButton}
          >
            + Calendar
          </button>
        </div>
      </div>

      <div 
        ref={dashboardRef}
        className={styles.dashboard}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {widgets.map(widget => (
          <div
            key={widget.id}
            className={`${styles.widget} ${draggedWidget === widget.id ? styles.dragging : ''}`}
            style={{
              left: widget.position.x,
              top: widget.position.y,
              width: widget.size.width,
              height: widget.size.height
            }}
          >
            <div 
              className={styles.widgetHeader}
              onMouseDown={(e) => handleMouseDown(e, widget.id)}
            >
              <span className={styles.widgetTitle}>{widget.name}</span>
              <button 
                onClick={() => removeWidget(widget.id)}
                className={styles.removeButton}
              >
                ×
              </button>
            </div>
            {renderWidgetContent(widget)}
          </div>
        ))}
      </div>

      <div className={styles.features}>
        <div className={styles.featureCard}>
          <h3>🔧 Developer Features</h3>
          <ul>
            <li>✅ Type-safe widget communication</li>
            <li>✅ Hot module replacement</li>
            <li>✅ Performance monitoring</li>
            <li>✅ Framework-agnostic widgets</li>
            <li>✅ Built-in debugging tools</li>
          </ul>
        </div>
        
        <div className={styles.featureCard}>
          <h3>👥 User Features</h3>
          <ul>
            <li>✅ Drag & drop dashboard</li>
            <li>✅ Real-time widget updates</li>
            <li>✅ Customizable themes</li>
            <li>✅ Layout persistence</li>
            <li>✅ Widget marketplace ready</li>
          </ul>
        </div>
      </div>
    </div>
  );
}