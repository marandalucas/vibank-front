import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * @customElement
 * @polymer
 */
class FrontvibankApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Bienvenido [[first_name]] [[last_name]] </h2>
    `;
  }
  static get properties() {
    return {
      first_name: {
        type: String
      },last_name: {
        type: String
      }
    };
  }
}

window.customElements.define('frontvibank-app', FrontvibankApp);
