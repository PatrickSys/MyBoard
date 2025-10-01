import styles from './page.module.scss';
import { WidgetDashboard } from '../components/widget-dashboard';

export default function Index() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Welcome to </span>
              MyBoard 🎯
            </h1>
            <p>Your customizable productivity dashboard</p>
          </div>

          <div id="dashboard-section">
            <WidgetDashboard />
          </div>

          <div id="features" className="rounded shadow">
            <h2>🚀 Key Features</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <h3>🧩 Modular Widgets</h3>
                <p>Framework-agnostic widgets built with React, Vue, Angular, or vanilla JS</p>
              </div>
              <div className="feature-item">
                <h3>⚡ Real-time Communication</h3>
                <p>Type-safe event system for seamless widget interactions</p>
              </div>
              <div className="feature-item">
                <h3>📊 Performance Monitoring</h3>
                <p>Built-in metrics tracking and optimization suggestions</p>
              </div>
              <div className="feature-item">
                <h3>🎨 Customizable Themes</h3>
                <p>Dynamic theme system with user preferences</p>
              </div>
            </div>
          </div>

          <div id="developer-tools" className="rounded shadow">
            <h2>🔧 Developer Experience</h2>
            <div className="dev-tools">
              <div className="tool-item">
                <h4>Widget SDK</h4>
                <p>Comprehensive toolkit for building widgets</p>
              </div>
              <div className="tool-item">
                <h4>Hot Reload</h4>
                <p>Instant updates during development</p>
              </div>
              <div className="tool-item">
                <h4>Debug Tools</h4>
                <p>Built-in performance and event monitoring</p>
              </div>
            </div>
          </div>

          <p id="love">
            Carefully crafted with
            <svg
              fill="currentColor"
              stroke="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
