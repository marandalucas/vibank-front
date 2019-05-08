import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */

class VisorMovimiento extends PolymerElement {
  static get template() {
  return html`

    <h4>IBAN: [[IBAN]]</h4>
    <h4>Operación: [[descopertype]]</h4>
    <h4>Nombre destinatario: [[destinationname]]</h4>
    <h4>Concepto: [[concept]]</h4>
    <h4>Importe: [[sign]][[amount]]</h4>

    <iron-ajax
      auto
      id="getOper"
      url="http://localhost:3000/vibank/v1/oper/{{id}}"
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
    },id: {
      type: Number
    }
  };
} // End properties

showData(data) {

  console.log("showData");
  console.log(data.detail.response);

  this.IBAN = data.detail.response.IBAN;
  this.descopertype = data.detail.response.descOperType;
  this.destinationname = data.detail.response.destinationName;
  this.concept = data.detail.response.concept;
  this.amount = data.detail.response.amount;
  this.sign = data.detail.response.sign;

}

} // End class

window.customElements.define('visor-movimiento', VisorMovimiento);
