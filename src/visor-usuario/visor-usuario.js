import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */

class VisorUsuario extends PolymerElement {
  static get template() {
  return html`

    <div align="right">[[first_name]] [[last_name]]</div>

    <iron-ajax
      auto
      id="getUser"
      url="http://localhost:3000/vibank/v1/user/{{idUser}}"
      handle-as="json"
      on-response="showDataUser"
    >
    </iron-ajax>
  `;
}
static get properties() {
  return {
    first_name: {
      type: String
    },last_name: {
      type: String
    },email: {
      type: String
    },idUser: {
      type: Number
    }
  };
} // End properties

showDataUser(data) {

  this.first_name = data.detail.response.first_name;
  this.last_name = data.detail.response.last_name;
  this.email = data.detail.response.email;

}

} // End class

window.customElements.define('visor-usuario', VisorUsuario);
