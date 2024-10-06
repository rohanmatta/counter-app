import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class counterApp extends DDDSuper(LitElement) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.title = "";
    this.count = 0;
  }

  static get properties() {
    return {
      title: { type: String },
      count: { type: Number },
    };
  }

  static get styles() {
    return [super.styles,
      css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
        font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      div {
        padding: 0;
        margin: 0;
      }
    `];
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  render() {
    return html`
    <div class="wrapper">
      <div>${this.count}</div>
      <button @click="${this.increment}">+</button>
      <button @click="${this.decrement}">-</button>
      <div>${this.title}</div>
      <slot></slot>
      <!-- Confetti container -->
      <confetti-container id="confetti"></confetti-container>
    </div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }

  updated(changedProperties) {
    if (changedProperties.has('count')) {
      if (this.count === 5) {
        this.makeItRain();  // Trigger confetti when count is 5
      }
    }
  }

  makeItRain() {
    // import confetti-container
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }
}

globalThis.customElements.define(counterApp.tag, counterApp);