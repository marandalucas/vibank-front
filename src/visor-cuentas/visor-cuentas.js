import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */

class visorCuentas extends PolymerElement {
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
                          <button class="btn" on-click="consultaMovimientos" id="[[item.idAccount]]">
                            <img src="../../images/icon-lupa.png" alt="Consulta Movimiento Cuentas" width="20" height="20" id="[[item.idAccount]]"/>
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

      <template is="dom-if" if="[[doRefresh]]" restamp="true">
          <iron-ajax
            auto
            id="getUserAccounts"
            url="http://localhost:3000/vibank/v1/accounts/{{idUser}}"
            handle-as="json"
            on-response="showDataUserAccounts"
            on-error="showError"
          >
          </iron-ajax>
      </template>
    `;
  }

  static get properties() {
    return {
      idUser: {
        type: Number,
        value: 0
      },
      userAccounts: {
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

  showDataUserAccounts(data) {

    this.userAccounts = data.detail.response;

  }

  showError(error) {
    console.log("Hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);

    this.userAccounts = [];
  }

  consultaMovimientos(e) {

    this.set('route.path', '/visor-movimientos');

    this.dispatchEvent(
        new CustomEvent(
            "myevent",
            {
                "detail" : {
                    "idAccount": e.srcElement.id
                }
            }
        )
    )
}

newAccount(e) {

  this.set('route.path', '/visor-alta-cuenta');

  this.dispatchEvent(
      new CustomEvent(
          "myevent",
          {
              "detail" : {
                  "idUser":this.idUser
              }
          }
      )
  )
}

} // End class

window.customElements.define('visor-cuentas', visorCuentas);
