import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */

class VisorCuenta extends PolymerElement {
  static get template() {
  return html`

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div class="row">
        <div class="col-md-2"></div>
        <div class="col-md-1" align="right"><h5>IBAN</h5></div>
        <div class="col-md-4" align="left"><h5>[[IBAN]]</h5></div>
        <div class="col-md-1" align="right"><h5>Saldo</h5></div>
        <div class="col-md-1" align="left"><h5>[[balance]] €</h5></div>
    </div>

    <iron-ajax
      auto
      id="getAccount"
      url="http://localhost:3000/vibank/v1/account/{{idAccount}}"
      handle-as="json"
      on-response="showData"
    >
    </iron-ajax>
  `;
}
static get properties() {
  return {
    IBAN: {
      type: String
    },
    idAccount: {
      type: Number,
      value: 1
    },
    balance: {
      type: Number
    }
  };
} // End properties

showData(data) {

  console.log("showData");
  console.log(data.detail.response);

  this.IBAN = data.detail.response.IBAN;
  this.balance = data.detail.response.balance;

}

} // End class

window.customElements.define('visor-cuenta', VisorCuenta);
