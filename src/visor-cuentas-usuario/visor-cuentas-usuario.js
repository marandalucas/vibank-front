import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */

class visorCuentasUsuario extends PolymerElement {
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
                  <div class="col-md-4 bluecell">&nbsp;&nbsp;&nbsp; IBAN</div>
                  <div class="col-md-3 bluecell">Balance</div>
              </div>
              <br>
              <template is="dom-repeat" items="[[userAccounts]]">
                  <div class="row">
                      <div class="col-md-3"></div>
                      <div class="col-md-1">
                          <button class="btn" on-click="consultaMovimientosCuenta" id="[[item.id]]">
                            <img src="../../images/icon-lupa.png" alt="Consulta Movimiento Cuentas" width="20" height="20" id="[[item.id]]"/>
                          </button>
                      </div>
                      <div class="col-md-4">[[item.IBAN]]</div>
                      <div class="col-md-1">[[item.balance]]</div>

                  </div>
              </template>
          </div>

          <div class="col-md-2">
              <div class="row">
                  <button on-click="newAccount" id="btn-newaccount" heigh="5" class="btn btn-info">Nueva Cuenta</button>
              </div>
              <br>
          </div>
      </div>

      <br>

      <iron-ajax
        auto
        id="getUserAccounts"
        url="http://localhost:3000/vibank/v1/accounts/{{userID}}"
        handle-as="json"
        on-response="showDataUserAccounts"
        on-error="showError"
      >
      </iron-ajax>

    `;
  }

  static get properties() {
    return {
      userID: {
        type: Number,
        value:1
      },
      userAccounts: {
        type: Array
      },
      id: {
        type: Number
      },
      route: {
        type: Object
      }
    };
  } // End properties

  showDataUserAccounts(data) {

    console.log("showDataUserAccounts");
    console.log(data.detail.response);

    this.userAccounts = data.detail.response;

  }

  showError(error) {
    console.log("Hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }

  consultaMovimientosCuenta(e) {

    console.log("Botón consulta movimiento pulsado");
    console.log(e.srcElement.id);

    this.set('route.path', '/visor-movimientos');

    this.dispatchEvent(
        new CustomEvent(
            "myevent",
            {
                "detail" : {
                    "id":e.srcElement.id
                }
            }
        )
    )
}

newAccount(e) {

  console.log("Botón Nueva cuenta pulsado");


  this.set('route.path', '/visor-alta-cuenta');

  this.dispatchEvent(
      new CustomEvent(
          "myevent",
          {
              "detail" : {
                  "userID":this.userID
              }
          }
      )
  )
}

} // End class

window.customElements.define('visor-cuentas-usuario', visorCuentasUsuario);
