import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-if.js';

/**
 * @customElement
 * @polymer
 */

class VisorUsuario extends PolymerElement {
  static get template() {
  return html`

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div align="right">[[first_name]] [[last_name]]</div>

    <template is="dom-if" if="[[doRefresh]]" restamp="true">
        <iron-ajax
          auto
          id="getUser"
          url="http://localhost:3000/vibank/v1/user/{{idUser}}"
          handle-as="json"
          on-response="showDataUser"
        >
        </iron-ajax>
    </template>
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
      type: Number,
      value: 0
    },doRefresh: {
      type: Boolean,
      value: false
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
