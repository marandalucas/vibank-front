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

      <br>

      <div class="row">
          <div class="col-md-10">
              <div class="row flex-parent">
                  <div class="col-md-3"></div>
                  <div class="col-md-8 bluecell flex-child"><h5><strong>&nbsp;&nbsp;&nbsp;Posición de cuentas</strong></h5></div>
              </div>
              <div class="row">
                  <div class="col-md-3"></div>
                  <div class="col-md-5 bluecell"><strong>&nbsp;&nbsp;&nbsp;IBAN</strong></div>
                  <div class="col-md-3 bluecell" align="right"><strong>Balance</strong></div>
              </div>
              <template is="dom-repeat" items="[[userAccounts]]">
                  <div class="row flex-parent">
                      <div class="col-md-3"></div>
                      <div class="col-md-5 greycell">
                          <a href="#" class="btn tooltip-test" title="Consulta Cuenta" on-click="consultaMovimientos" id="[[item.idAccount]]">
                            <img src="../../images/icon-lupa.png" alt="Consulta Cuenta" width="20" height="20" id="[[item.idAccount]]"/>
                          </a>
                          [[item.IBAN]]
                      </div>
                      <div class="col-md-3 greycell flex-child" align="right">[[item.balance]] €</div>
                  </div>
              </template>
          </div>

          <div class="col-md-1">
              <div align="center"><h5>Operaciones</h5></div>
              <div class="lineaAzul"></div>
              <button on-click="newAccount" id="btn-newaccount" class="optionsbutton">Alta Cuenta</button>
          </div>

      </div>

      <br>

      <template is="dom-if" if="[[doRefresh]]" restamp="true">
          <iron-ajax
            auto
            id="getUserAccounts"
            url="http://localhost:3000/vibank/v1/accounts/{{idUser}}"
            handle-as="json"
            headers={{headers}}
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

  showDataUserAccounts(data) {

    this.userAccounts = data.detail.response;

    for(var i=0; i<this.userAccounts.length; i++) {
        this.userAccounts[i].balance = new Intl.NumberFormat("de-DE").format(this.userAccounts[i].balance);
    }

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
