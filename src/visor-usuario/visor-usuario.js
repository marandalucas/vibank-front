import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */

class VisorUsuario extends PolymerElement {
  static get template() {
  return html`

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <button class="btn btn-success">Logout</button>

    <h2>Soy [[first_name]] [[last_name]] </h2>
    <h2>y mi email es [[email]] </h2>

    <iron-ajax
      auto
      id="getUser"
      url="http://localhost:3000/vibank/v1/user/{{id}}"
      handle-as="json"
      on-response="showData"
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
    },id: {
      type: Number
    }
  };
} // End properties

showData(data) {
  
  console.log("showData");
  console.log(data.detail.response);
  console.log(data.detail.response.first_name);

  this.first_name = data.detail.response.first_name;
  this.last_name = data.detail.response.last_name;
  this.email = data.detail.response.email;

}

} // End class

window.customElements.define('visor-usuario', VisorUsuario);
