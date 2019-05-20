import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';
import '@polymer/polymer/lib/elements/dom-if.js';

/**
 * @customElement
 * @polymer
 */

class VisorMovimiento extends PolymerElement {
  static get template() {
  return html`

    <style>

        .flex-parent{
          display: -ms-flex;
          display: -webkit-flex;
          display: flex;
        }

        .flex-child{
          display: -ms-flex;
          display: -webkit-flex;
          display: flex;
          justify-content: center;
          flex-direction: column;
        }

        .bluecell {
            background-color: #015C80;
            color: white;
            border: white 1px solid;
            border-radius: 4px;
        }

        .greycell{
            background-color: #E4E4E4;
            border: white 1px solid;
            border-radius: 4px;
            align-items: center;
        }

    </style>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <app-location route="{{route}}"></app-location>

    <br><br>

    <div class="row flex-parent">
        <div class="col-md-3"></div>
        <div class="col-md-6 bluecell flex-child"><h5><strong>Detalle Movimiento</strong></h5></div>
    </div>

    <div class="row flex-parent">
        <div class="col-md-3"></div>
        <div class="col-md-3 flex-child" align="left"><h5><strong>Operación</strong></h5></div>
        <div class="col-md-3 flex-child" align="rigth"><h5>[[descopertype]]</h5></div>
    </div>

    <span hidden$="[[!isTransfer]]">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3" align="left"><h5><strong>IBAN Transferencia</strong></h5></div>
            <div class="col-md-3" align="rigth"><h5>[[IBAN]]</h5></div>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3" align="left"><h5><strong>Nombre destinatario</strong></h5></div>
            <div class="col-md-3" align="rigth"><h5>[[destinationname]]</h5></div>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3" align="left"><h5><strong>Asunto</strong></h5></div>
            <div class="col-md-3" align="rigth"><h5>[[concept]]</h5></div>
        </div>
    </span>

    <span hidden$="[[!isTraspas]]">
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3" align="left"><h5><strong>IBAN Traspaso</strong></h5></div>
            <div class="col-md-3" align="rigth"><h5>[[IBAN]]</h5></div>
        </div>
        <div class="row">
            <div class="col-md-3"></div>
            <div class="col-md-3" align="left"><h5><strong>Asunto</strong></h5></div>
            <div class="col-md-3" align="rigth"><h5>[[concept]]</h5></div>
        </div>
    </span>

    <div class="row">
        <div class="col-md-3"></div>
        <div class="col-md-3" align="left"><h5><strong>Importe</strong></h5></div>
        <div class="col-md-3" align="rigth"><h5>[[sign]] [[amount]] €</h5></div>
    </div>

    <br>

    <div class="row">
        <div class="col-md-12" align="center">
            <button on-click="goOpers" class="btn btn-info">Volver</button>
        </div>
    </div>

    <template is="dom-if" if="[[doRefresh]]" restamp="true">
        <iron-ajax
          auto
          id="getOper"
          url="http://localhost:3000/vibank/v1/oper/{{idOper}}"
          handle-as="json"
          headers={{headers}}
          on-response="showDataOper"
        >
        </iron-ajax>
    </template>
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
    IBAN: {
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
    },
    doRefresh:{
      type: Boolean,
      value:false
    },
    headers: {
      type: Object,
      value: { authorization: {
                type: String
              }

            }
    }
  };
} // End properties

showDataOper(data) {

  this.descopertype = data.detail.response.descOperType;
  this.amount = data.detail.response.amount;
  this.sign = data.detail.response.sign;

  if (data.detail.response.operType == 3){
      this.isTransfer = true;

      this.destinationname = data.detail.response.destinationName;
      this.concept = data.detail.response.concept;
      this.IBAN = data.detail.response.IBAN;
  }

  if (data.detail.response.operType == 4){
      this.isTraspas = true;

      this.concept = data.detail.response.concept;
      this.IBAN = data.detail.response.IBAN;
  }
}

goOpers(e) {

    this.isTraspas = false;
    this.isTransfer = false;
    this.set('route.path', '/visor-movimientos');
}

} // End class

window.customElements.define('visor-movimiento', VisorMovimiento);
