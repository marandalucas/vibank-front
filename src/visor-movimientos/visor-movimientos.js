import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */

class VisorMovimientos extends PolymerElement {
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
          }

          .optionsbutton{
              background-color: #015C80;
              border: white 1px solid;
              border-radius: 4px;
              align-items: center;
              color: white;
              width: 100px;
          }

          .lineaAzul{
              background-color: #015C80;
              border-radius: 4px;
              margin-bottom: 2px;
              width: 100px;
              height: 2px;
          }

      </style>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <br><br>

      <div class="row">
          <div class="col-md-10">
              <div class="row flex-parent">
                  <div class="col-md-3"></div>
                  <div class="col-md-8 bluecell flex-child"><h5>&nbsp;&nbsp;&nbsp; <strong>Detalle de Movimientos</strong></h5></div>
              </div>
              <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-4 bluecell">&nbsp;&nbsp;&nbsp; <strong>Operación</strong></div>
                  <div class="col-md-2 bluecell" align="right"><strong>Importe</strong></div>
                  <div class="col-md-2 bluecell" align="right"><strong>Saldo</strong></div>
              </div>

              <template is="dom-repeat" items="[[operations]]">
                  <div class="row flex-parent">
                      <div class="col-md-3"></div>
                      <div class="col-md-4 greycell">
                          <a href="#" class="btn tooltip-test" title="Consulta Movimiento" on-click="consultaMovimiento" id="[[item.idOper]]">
                            <img src="../../images/icon-lupa.png" width="20" height="20" id="[[item.idOper]]"/>
                          </a>
                          [[item.descOperType]]
                      </div>
                      <div class="col-md-2 greycell flex-child" align="right">[[item.sign]][[item.amount]] €</div>
                      <div class="col-md-2 greycell flex-child" align="right">[[item.balance]] €</div>
                  </div>
              </template>
          </div>


          <div class="col-md-1">
              <div align="center"><h5>Operaciones</h5></div>
              <div class="lineaAzul"></div>
              <button on-click="realizarOperacion" id="btn-ingreso" class="optionsbutton">Ingreso</button>
              <button on-click="realizarOperacion" id="btn-reintegro" class="optionsbutton">Reintegro</button>
              <button on-click="realizarOperacion" id="btn-transferencia" class="optionsbutton">Transferencia</button>
              <button on-click="realizarOperacion" id="btn-traspaso" class="optionsbutton">Traspaso</button>

              <br><br><br><br>
              <button on-click="exitOper" class="btn btn-info">Volver</button>
          </div>
      </div>

      <template is="dom-if" if="[[doRefresh]]" restamp="true">
          <iron-ajax
            auto
            id="getOpers"
            url="http://localhost:3000/vibank/v1/accountopers/{{idAccount}}"
            handle-as="json"
            headers={{headers}}
            on-response="showDataOpers"
            on-error="showError"
          >
          </iron-ajax>

      </template>

    `;
  }

  static get properties() {
    return {
      idAccount: {
        type: Number,
        value:0
      },
      operations: {
        type: Array
      },
      route: {
        type: Object
      },
      doRefresh: {
        type: Boolean,
        value: false
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

  showDataOpers(data) {

    this.operations = data.detail.response;

    for(var i=0; i<this.operations.length; i++) {
        this.operations[i].balance = new Intl.NumberFormat("de-DE").format(this.operations[i].balance);
    }

    for(var i=0; i<this.operations.length; i++) {
        this.operations[i].amount = new Intl.NumberFormat("de-DE").format(this.operations[i].amount);
    }

  }

  showError(error) {
    console.log("Hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
    this.operations = [];
  }

  realizarOperacion(e) {

      if (e.srcElement.id == "btn-ingreso"){
          var operType = 1;
      } else if (e.srcElement.id == "btn-reintegro"){
          var operType = 2;
      } else if (e.srcElement.id == "btn-transferencia"){
          var operType = 3;
      } else if (e.srcElement.id == "btn-traspaso"){
          var operType = 4;
      }

      this.set('route.path', '/visor-operaciones');

      this.dispatchEvent(
          new CustomEvent(
              "myevent",
              {
                  "detail" : {
                      "idAccount":this.idAccount,
                      "operType":operType
                  }
              }
          )
      )

  }

  consultaMovimiento(e) {

      this.set('route.path', '/visor-movimiento');

      this.dispatchEvent(
          new CustomEvent(
              "myevent",
              {
                  "detail" : {
                      "idOper": e.srcElement.id,
                      "idAccount": this.idAccount
                  }
              }
          )
      )

  }

  exitOper(e) {

      this.set('route.path', '/visor-cuentas');

      this.dispatchEvent(
          new CustomEvent(
                "myevent",
                {
                    "detail" : {
                    }
                }
            )
        )

  }



} // End class

window.customElements.define('visor-movimientos', VisorMovimientos);
