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
              align-items: center;
          }

      </style>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <br><br>

      <div class="row">
          <div class="col-md-10">
              <div class="row flex-parent">
                  <div class="col-md-3"></div>
                  <div class="col-md-8 bluecell flex-child"><h5>&nbsp;&nbsp;&nbsp; Detalle de Movimientos</h5></div>
              </div>
              <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-4 bluecell">&nbsp;&nbsp;&nbsp; Tipo operación</div>
                  <div class="col-md-2 bluecell" align="right">Importe</div>
                  <div class="col-md-2 bluecell" align="right">Saldo</div>
              </div>

              <template is="dom-repeat" items="[[operations]]">
                  <div class="row flex-parent">
                      <div class="col-md-3"></div>
                      <div class="col-md-4 greycell">
                          <button class="btn" on-click="consultaMovimiento" id="[[item.idOper]]">
                            <img src="../../images/icon-lupa.png" alt="Consulta movimiento" width="20" height="20" id="[[item.idOper]]"/>
                          </button>
                          [[item.descOperType]]
                      </div>
                      <div class="col-md-2 greycell flex-child" align="right">[[item.sign]][[item.amount]] €</div>
                      <div class="col-md-2 greycell flex-child" align="right">[[item.balance]] €</div>
                  </div>
              </template>
          </div>


          <div class="col-md-2">
              <div class="row"><h5>&nbsp;Operaciones</h5></div>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-ingreso" class="btn btn-info btn-sm">Ingreso</button>
              </div>
              <br>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-reintegro" class="btn btn-info btn-sm">Reintegro</button>
              </div>
              <br>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-transferencia" class="btn btn-info btn-sm">Transferencia</button>
              </div>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-traspaso" class="btn btn-info btn-sm">Traspaso</button>
              </div>
              <br>
              <div class="row">
                  <button on-click="exitOper" class="btn btn-info">Volver</button>
              </div>
          </div>
      </div>

      <br>


      <template is="dom-if" if="[[doRefresh]]" restamp="true">
          <iron-ajax
            auto
            id="getOpers"
            url="http://localhost:3000/vibank/v1/accountopers/{{idAccount}}"
            handle-as="json"
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
      }
    };
  } // End properties

  showDataOpers(data) {

    this.operations = data.detail.response;

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
