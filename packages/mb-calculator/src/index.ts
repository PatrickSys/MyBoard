import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady } from '@myboard/widget-utils';

@customElement('mb-calculator')
export class CalculatorWidget extends LitElement {
  @state() private display = '0';
  @state() private previousValue = 0;
  @state() private operation: string | null = null;
  @state() private waitingForOperand = false;

  static styles = css`
    :host {
      display: block;
      height: 100%;
      font-family: system-ui, -apple-system, sans-serif;
    }

    .container {
      height: 100%;
      background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      color: white;
    }

    .display {
      background: rgba(0, 0, 0, 0.3);
      border-radius: 8px;
      padding: 20px;
      text-align: right;
      font-size: 32px;
      font-weight: 600;
      margin-bottom: 16px;
      word-wrap: break-word;
      min-height: 60px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      flex: 1;
    }

    .btn {
      background: rgba(255, 255, 255, 0.1);
      border: none;
      border-radius: 8px;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s;
      min-height: 50px;
    }

    .btn:hover {
      background: rgba(255, 255, 255, 0.2);
      transform: scale(1.05);
    }

    .btn:active {
      transform: scale(0.95);
    }

    .btn.operator {
      background: rgba(59, 130, 246, 0.5);
    }

    .btn.operator:hover {
      background: rgba(59, 130, 246, 0.7);
    }

    .btn.equals {
      background: rgba(16, 185, 129, 0.6);
      grid-column: span 2;
    }

    .btn.equals:hover {
      background: rgba(16, 185, 129, 0.8);
    }

    .btn.clear {
      background: rgba(239, 68, 68, 0.5);
    }

    .btn.clear:hover {
      background: rgba(239, 68, 68, 0.7);
    }

    @media (max-width: 768px) {
      .display {
        font-size: 24px;
        padding: 16px;
      }
      .btn {
        font-size: 16px;
        min-height: 40px;
      }
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    queueMicrotask(() => emitReady(this));
  }

  private inputDigit(digit: string) {
    if (this.waitingForOperand) {
      this.display = digit;
      this.waitingForOperand = false;
    } else {
      this.display = this.display === '0' ? digit : this.display + digit;
    }
  }

  private inputDecimal() {
    if (this.waitingForOperand) {
      this.display = '0.';
      this.waitingForOperand = false;
    } else if (this.display.indexOf('.') === -1) {
      this.display = this.display + '.';
    }
  }

  private clearDisplay() {
    this.display = '0';
    this.previousValue = 0;
    this.operation = null;
    this.waitingForOperand = false;
  }

  private performOperation(nextOperation: string) {
    const inputValue = parseFloat(this.display);

    if (this.operation && this.waitingForOperand) {
      this.operation = nextOperation;
      return;
    }

    if (this.previousValue === 0) {
      this.previousValue = inputValue;
    } else if (this.operation) {
      const currentValue = this.previousValue;
      let newValue = currentValue;

      switch (this.operation) {
        case '+':
          newValue = currentValue + inputValue;
          break;
        case '-':
          newValue = currentValue - inputValue;
          break;
        case '×':
          newValue = currentValue * inputValue;
          break;
        case '÷':
          newValue = currentValue / inputValue;
          break;
      }

      this.display = String(newValue);
      this.previousValue = newValue;
    }

    this.waitingForOperand = true;
    this.operation = nextOperation;
  }

  render() {
    return html`
      <div class="container">
        <div class="display">${this.display}</div>
        <div class="buttons">
          <button class="btn clear" @click=${this.clearDisplay}>C</button>
          <button class="btn operator" @click=${() => this.performOperation('÷')}>÷</button>
          <button class="btn operator" @click=${() => this.performOperation('×')}>×</button>
          <button class="btn operator" @click=${() => this.performOperation('-')}>−</button>

          <button class="btn" @click=${() => this.inputDigit('7')}>7</button>
          <button class="btn" @click=${() => this.inputDigit('8')}>8</button>
          <button class="btn" @click=${() => this.inputDigit('9')}>9</button>
          <button class="btn operator" @click=${() => this.performOperation('+')}>+</button>

          <button class="btn" @click=${() => this.inputDigit('4')}>4</button>
          <button class="btn" @click=${() => this.inputDigit('5')}>5</button>
          <button class="btn" @click=${() => this.inputDigit('6')}>6</button>
          <button class="btn" @click=${this.inputDecimal}>.</button>

          <button class="btn" @click=${() => this.inputDigit('1')}>1</button>
          <button class="btn" @click=${() => this.inputDigit('2')}>2</button>
          <button class="btn" @click=${() => this.inputDigit('3')}>3</button>
          <button class="btn" @click=${() => this.inputDigit('0')}>0</button>

          <button class="btn equals" @click=${() => this.performOperation('=')}>=</button>
        </div>
      </div>
    `;
  }
}
