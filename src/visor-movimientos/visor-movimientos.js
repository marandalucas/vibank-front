import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */

class VisorMovimientos extends PolymerElement {
  static get template() {
    return html`

      <style>

          .bluecell {
              background-color: #015C80;
              color: white;
          }

      </style>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <br><br><br><br>

      <div class="row">
          <div class="col-md-10">
              <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-4"><h5>&nbsp;&nbsp;&nbsp; Movimientos de cuenta</h5></div>
              </div>
              <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-4 bluecell">&nbsp;&nbsp;&nbsp; Tipo operación</div>
                  <div class="col-md-1 bluecell">Importe</div>
                  <div class="col-md-1 bluecell">Saldo</div>
              </div>
              <br>
              <template is="dom-repeat" items="[[operations]]">
                  <div class="row">
                      <div class="col-md-3"></div>
                      <div class="col-md-4">
                          <button class="btn" on-click="consultaMovimiento" id="[[item.idOper]]">
                            <img src="../../images/icon-lupa.png" alt="Consulta movimiento" width="20" height="20" id="[[item.idOper]]"/>
                          </button>
                          [[item.descOperType]]
                      </div>
                      <div class="col-md-1">[[item.sign]][[item.amount]]</div>
                      <div class="col-md-1">[[item.balance]]</div>
                  </div>
              </template>
          </div>

          <div class="col-md-2">
              <h5>Operaciones</h5>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-ingreso" heigh="5" class="btn btn-info">Ingreso</button>
              </div>
              <br>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-reintegro" heigh="10" class="btn btn-info">Reintegro</button>
              </div>
              <br>
              <div class="row">
                  <button on-click="realizarOperacion" id="btn-transferencia" heigh="10" class="btn btn-info">Transferencia</button>
              </div>
          </div>
      </div>

      <br>

      <iron-ajax
        auto
        id="getOpers"
        url="http://localhost:3000/vibank/v1/accountopers/{{idAccount}}"
        handle-as="json"
        on-response="showDataOpers"
        on-error="showError"
      >
      </iron-ajax>

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
  }

  realizarOperacion(e) {

      if (e.srcElement.id == "btn-ingreso"){
          var operType = 1;
      } else if (e.srcElement.id == "btn-reintegro"){
          var operType = 2;
      } else if (e.srcElement.id == "btn-transferencia"){
          var operType = 3;
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

      console.log("Botón consulta movimiento pulsado");

      this.dispatchEvent(
          new CustomEvent(
              "myevent",
              {
                  "detail" : {
                      "idOper":e.srcElement.id
                  }
              }
          )
      )

      this.set('route.path', '/visor-movimiento');
  }



} // End class

window.customElements.define('visor-movimientos', VisorMovimientos);
