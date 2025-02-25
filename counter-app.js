/**
 * Copyright 2025 luckyshearer
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `counter-app`
 * 
 * @demo index.html
 * @element counter-app
 */
export class CounterApp extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 5;
    this.min = 5;
    this.max = 25;                                                                                                    

    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/counter-app.ar.json", import.meta.url).href +
        "/../",
      locales: ["ar", "es", "hi", "zh"],
    });
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      count: { type: Number, reflect: true },
      min: { type: Number },
      max: { type: Number },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation);
      }
      :host([count="18"]) .counter {
        color: var(--ddd-theme-default-athertonViolet);
      }
      :host([count="21"]) .counter{
        color: var(--ddd-theme-default-skyBlue);
      }
      :host([count="5"]) .counter {
        color: var(--ddd-theme-default-futureLime);
      }
      :host([count="25"]) .counter{
        color: var(--ddd-theme-default-original87Pink);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      .counter{
        font-size: var(--counter-app-label-font-size, var(--ddd-font-size-xxl));
      }
      button {
        cursor: pointer;
      }

      button:hover {
        background-color: var(--ddd-theme-default-discoveryCoral);
      }

      button:focus {
        background-color: var(--ddd-theme-default-globalNeon);
      }

    `];
  }

  updated (changedProperties) {
    super.updated(changedProperties);
    if(changedProperties.has("count")){
      console.log(this.count);
      if(this.count === 21){
        this.makeItRain();
      };
    }
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(
      (module) => {
        setTimeout(() => {
          this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
        }, 0);
      }
    );
  }

  // Lit render the HTML
  render() {
    return html`
      <confetti-container id="confetti" class="wrapper">
      <div class="counter">${this.count}</div>
      <div class="buttons">
          <button class = "minusButton" @click="${this.decrease}" ?disabled="${this.min === this.count}">-1</button>
          <button class = "plusButton" @click="${this.increase}" ?disabled="${this.max === this.count}">+1</button>
          <button class = "resetButton" @click="${this.reset}">Reset</button>
        </div>
    </confetti-container>
    `;
  }

  increase(){
    if(this.count < this.max) {
      this.count++;
    }
  }

  decrease(){
    if (this.count > this.min) {
      this.count--;
    }
  }
  reset(){
    this.count=5;
  }


  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);