import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */

class VisorOperaciones extends PolymerElement {
  static get template() {
  return html`

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <span hidden$="[[isDoOper]]">

        <h4>Importe operación
            <input type="number" name="amount" min="1" max="999999999" step="0.01" required="required" value="{{amount::input}}" />
        </h4>
        <br></br>

        <span hidden$="[[!isDoTransfer]]">
            <br>
            <h4>IBAN
                <input  name="IBAN"  required="required" value="{{IBAN::input}}" />
            </h4>
            <h4>Concepto
                <input  name="concept"  required="required" value="{{concept::input}}" />
            </h4>
            <h4>Nombre destinatario
                <input  name="destinationName"  required="required" value="{{destinationName::input}}" />
            </h4>
        </span>

        <span hidden$="[[!isDoTraspas]]">
        traspaso
            <select id="selectAccount" name="selectAccount">

              <template is="dom-repeat" items="[[userAccounts]]">
                  <option value="[[item.IBAN]]">[[item.IBAN]]</option>
              </template>

            </select>

            <h4>Concepto
                <input  name="concept"  required="required" value="{{concept::input}}" />
            </h4>
        </span>

        <br>
        <button on-click="doOper" class="btn btn-info">Aceptar</button>
        <br>
      </span>

      <span hidden$="[[!isDoOper]]">
        Operación realizada.
        <button on-click="exitOper" class="btn btn-info">Continuar</button>
      </span>

      <iron-ajax
              id="doOper"
              url="http://localhost:3000/vibank/v1/oper/"
              handle-as="json"
              content-type="application/json"
              method="POST"
              on-response="manageAJAXResponse"
              on-error="showErrordoOper"
        >
        </iron-ajax>

        <iron-ajax
              id="getAccounts"
              auto
              url="http://localhost:3000/vibank/v1/accounts/{{idUser}}"
              handle-as="json"
              content-type="application/json"
              on-response="showDataAccount"
              on-error="showErrorGetAccounts"
          >
          </iron-ajax>

    `;
  }

  static get properties() {
    return {
      idUser: {
          type: Number
      },
      idAccount: {
          type: Number
      },operType: {
          type: Number
      },amount: {
          type: Number,
          value: 0
      },IBAN: {
          type: String,
          value:""
      },concept: {
          type: String,
          value:""
      },destinationName: {
          type: String,
          value:""
      },userAccounts: {
          type: Array
      },isDoOper:{
          type: Boolean,
          value: false
      },isDoTransfer:{
          type: Boolean,
          value: false
      },isDoTraspas:{
          type: Boolean,
          value: false
      },route: {
          type: Object
      }
    };
  } // End properties

  manageAJAXResponse(data) {
    this.isDoOper = true;
  }

  showErrordoOper(error) {
    console.log("Hubo un error al realizar la operación");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }

  showDataAccount(data) {
      this.userAccounts = data.detail.response;
  }

  showErrorGetAccounts(error) {
    console.log("Hubo un error al obtener las cuentas");
    console.log(error);
    console.log(error.detail.request.xhr.response);

    this.userAccounts = [];
  }

  doOper() {

    if (this.operType == 1 || this.operType == 2){
      var operData = {
          "idAccount":this.idAccount,
          "operType":this.operType,
          "amount":this.amount
      }
    }

    if (this.operType == 3){
      var operData = {
          "idAccount":this.idAccount,
          "operType":this.operType,
          "amount":this.amount,
          "IBAN":this.IBAN,
          "concept":this.concept,
          "destinationName":this.destinationName
      }
    }

    if (this.operType == 4){
      var operData = {
          "idAccount":this.idAccount,
          "operType":this.operType,
          "amount":this.amount,
          "IBAN":this.$.selectAccount.value,
          "concept":this.concept,
      }
    }

    this.$.doOper.body = JSON.stringify(operData);
    this.$.doOper.generateRequest();
    console.log("el cuerpo de la oper es: " + this.$.doOper.body);

  }

  exitOper(e) {

      this.isDoOper = false;
      this.amount = 0;
      this.IBAN = "";
      this.concept = "";
      this.destinationName = "";
      this.set('route.path', '/visor-movimientos');

      this.dispatchEvent(
          new CustomEvent(
                "myevent",
                {
                    "detail" : {
                        "idAccount":this.idAccount
                    }
                }
            )
        )

  }

} // End class

window.customElements.define('visor-operaciones', VisorOperaciones);
