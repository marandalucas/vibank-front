import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-location.js';
import '@polymer/polymer/lib/elements/dom-if.js';

/**
 * @customElement
 * @polymer
 */

class VisorOperaciones extends PolymerElement {
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
            margin-bottom: 3px;
          }

      </style>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <span hidden$="[[isDoOper]]">

        <div class="row flex-parent">
            <div class="col-md-4"></div>
            <div class="col-md-5 bluecell flex-child"><h5>
                <iron-pages selected="[[operType]]" attr-for-selected="component-name">
                    <div component-name="1">Realizar Ingreso</div>
                    <div component-name="2">Realizar Reintegro</div>
                    <div component-name="3">Realizar Transferencia</div>
                    <div component-name="4">Realizar Traspaso</div>
                </iron-pages>
            </div></h5>
        </div>

        <span hidden$="[[!isDoTransfer]]">
            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-2" align="left"><h5>IBAN destino</h5></div>
                <div class="col-md-3" align="rigth"><input name="IBAN" value="{{IBAN::input}}" style="width:300px;height:24px;" /></div>
            </div>

            <div class="row flex-parent">
                <div class="col-md-4"></div>
                <div class="col-md-2" align="left"><h5>Asunto</h5></div>
                <div class="col-md-3" align="rigth"><input name="concept" value="{{concept::input}}" style="width:300px;height:24px;"/></div>
            </div>

            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-2" align="left"><h5>Nombre destinatario</h5></div>
                <div class="col-md-3" align="rigth"><input name="destinationName" value="{{destinationName::input}}" style="width:300px;height:24px;"/></div>
            </div>
        </span>

        <span hidden$="[[!isDoTraspas]]">

            <div class="row flex-parent">
                <div class="col-md-4"></div>
                <div class="col-md-2 flex-child" align="left"><h5>IBAN destino</h5></div>
                <div class="col-md-3" align="rigth">
                    <select id="selectAccount" name="selectAccount" class="browser-default custom-select">
                        <option selected>Seleccione cuenta destino</option>
                        <template is="dom-repeat" items="[[userAccounts]]">
                            <option value="[[item.IBAN]]">[[item.IBAN]]</option>
                        </template>
                    </select>
                </div>
            </div>

            <div class="row">
                <div class="col-md-4"></div>
                <div class="col-md-2" align="left"><h5>Asunto</h5></div>
                <div class="col-md-3" align="rigth"><input type="text" name="concept" value="{{concept::input}}" style="width:300px;height:24px;margin-top:7px" /></div>
            </div>

        </span>

        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-2" align="left"><h5>Importe operación</h5></div>
            <div class="col-md-3" align="rigth"><input type="number" name="amount" min="1" max="999999999" step="0.01" value="{{amount::input}}" style="margin-top:3px"/></div>
        </div>

        <br><br><br>
        <div class="row">
            <div class="col-md-5"></div>
            <div class="col-md-2" align="rigth">
                <button on-click="doOper" class="btn btn-info">Aceptar</button>&nbsp;<button on-click="exitOper" class="btn btn-info">Volver</button>
            </div>
        </div>

      </span>

      <span hidden$="[[!isDoOper]]">

          <div class="row">
              <div class="col-md-12" align="center"><h5>Operación realizada con éxito!</h5></div>
          </div>
          <br><br><br>
          <div class="row">
              <div class="col-md-12" align="center"><button on-click="exitOper" class="btn btn-info">Continuar</button></div>
          </div>

      </span>

      <iron-ajax
              id="doOper"
              url="http://localhost:3000/vibank/v1/oper/"
              handle-as="json"
              content-type="application/json"
              method="POST"
              headers={{headers}}
              on-response="manageAJAXResponse"
              on-error="showErrordoOper"
        >
        </iron-ajax>

        <template is="dom-if" if="[[doRefresh]]" restamp="true">
            <iron-ajax
                  id="getAccounts"
                  auto
                  url="http://localhost:3000/vibank/v1/accounts/{{idUser}}"
                  handle-as="json"
                  content-type="application/json"
                  headers={{headers}}
                  on-response="showDataAccounts"
                  on-error="showErrorGetAccounts"
              >
              </iron-ajax>
        </template>

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
      },doRefresh:{
          type: Boolean,
          value: false
      },route: {
          type: Object
      },headers: {
          type: Object,
          value: { authorization: {
                    type: String
                  }

                }
      }
    };
  } // End properties

  manageAJAXResponse(data) {
    this.isDoOper = true;
  }

  showErrordoOper(error) {
    alert("Se ha producido un error, inténtelo de nuevo.");
  }

  showDataAccounts(data) {
      this.userAccounts = data.detail.response;
  }

  showErrorGetAccounts(error) {
      this.userAccounts = [];
  }

  doOper() {

    //validaciones de inputs de entrada

    if (this.operType == 3 || this.operType == 4){

        if (this.operType == 3) {

            if (this.IBAN === undefined || this.IBAN == ""){
               alert("IBAN no informado");
               return;
            }

                    if (this.destinationName === undefined || this.destinationName == ""){
               alert("Destinatario no informado");
               return;
            }
        }

        if (this.operType == 4){

            if (this.$.selectAccount.value === undefined || this.$.selectAccount.value == ""){
               alert("IBAN no informado");
               return;
            }

        }

        if (this.concept === undefined || this.concept == ""){
           alert("Asunto no informado");
           return;
        }

    }

    if (this.amount === undefined){
       alert("Importe no informado");
       return;
    }

    if (Number.parseFloat(this.amount) < 1){
       alert("El importe debe ser superior a 1");
       return;
    }

    //end validations

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
