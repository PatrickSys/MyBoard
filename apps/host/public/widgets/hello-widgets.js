class HelloNotes extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<div>Quick Notes (demo)</div>`;
    console.log('HelloNotes connectedCallback');
    queueMicrotask(() => this.dispatchEvent(new CustomEvent('widget-ready', { bubbles: true })));
  }
}

class HelloPomodoro extends HTMLElement {
  connectedCallback() {
    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<div>Pomodoro (demo)</div>`;
    queueMicrotask(() => this.dispatchEvent(new CustomEvent('widget-ready', { bubbles: true })));
  }
}

if (!customElements.get('hello-notes')) {
  customElements.define('hello-notes', HelloNotes);
}
if (!customElements.get('hello-pomodoro')) {
  customElements.define('hello-pomodoro', HelloPomodoro);
}


