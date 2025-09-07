import WidgetSlot from './WidgetSlot';
import { WIDGETS } from '../config/widgets';

export default function Dashboard() {
  return (
    <main className="wrap">
      <h1 className="title">MyBoard (v0.1)</h1>
      <div className="grid">
        {WIDGETS.map((widget) => (
          <WidgetSlot key={widget.id} title={widget.title} tag={widget.tag} url={widget.url} />
        ))}
      </div>
    </main>
  );
}


