import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */

class VisorMovimiento extends PolymerElement {
  static get template() {
  return html`

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <app-location route="{{route}}"></app-location>

    <br><br>
    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-2" align="left"><h5>Operación</h5></div>
        <div class="col-md-6" align="rigth"><h5>[[descopertype]]</h5></div>
    </div>

    <span hidden$="[[!isTransfer]]">

        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-2" align="left"><h5>Nombre destinatario</h5></div>
            <div class="col-md-6" align="rigth"><h5>[[destinationname]]</h5></div>
        </div>
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-2" align="left"><h5>Concepto</h5></div>
            <div class="col-md-6" align="rigth"><h5>[[concept]]</h5></div>
        </div>
    </span>

    <span hidden$="[[!isTraspas]]">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-2" align="left"><h5>Concepto</h5></div>
            <div class="col-md-6" align="rigth"><h5>[[concept]]</h5></div>
        </div>
    </span>

    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-2" align="left"><h5>Importe</h5></div>
        <div class="col-md-6" align="rigth"><h5>[[sign]] [[amount]] €</h5></div>
    </div>

    <br>
    <button on-click="goOpers" class="btn btn-info">Volver</button>

    <iron-ajax
      auto
      id="getOper"
      url="http://localhost:3000/vibank/v1/oper/{{idOper}}"
      handle-as="json"
      on-response="showDataOper"
    >
    </iron-ajax>
  `;
}
static get properties() {
  return {
    descopertype: {
      type: String
    },
    destinationname: {
      type: String
    },
    concept: {
      type: String
    },
    amount: {
      type: String
    },
    sign: {
      type: String
    },
    idOper: {
      type: Number,
      value: 0
    },
    route: {
        type: Object
    },
    isTransfer:{
      type: Boolean,
      value:false
    },
    isTraspas:{
      type: Boolean,
      value:false
    }
  };
} // End properties

showDataOper(data) {

  this.descopertype = data.detail.response.descOperType;
  this.destinationname = data.detail.response.destinationName;
  this.concept = data.detail.response.concept;
  this.amount = data.detail.response.amount;
  this.sign = data.detail.response.sign;

  if (data.detail.response.operType == 3){
      this.isTransfer = true;
  }

  if (data.detail.response.operType == 4){
      this.isTraspas = true;
  }
}

goOpers(e) {
    console.log("Botón pulsado");
    console.log(e);

    this.set('route.path', '/visor-movimientos');
}

} // End class

window.customElements.define('visor-movimiento', VisorMovimiento);
