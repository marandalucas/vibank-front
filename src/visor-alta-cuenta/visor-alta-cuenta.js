import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class visorAltaCuenta extends PolymerElement {
  static get template() {
    return html`

      <style>
        :host {
          display: block;
        }
      </style>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <span hidden$="[[isDoOper]]">
          <div class="row">
              <div class="col-md-12" align="center"><h5>Desea continuar con el alta de su nueva cuenta</h5></div>
          </div>
          <br>

          <div class="row">
              <div class="col-md-6" align="right"><a href="#" on-click="createAccount">Si</a></div>
              <div class="col-md-6" align="left"><a href="#" on-click="cancelOper">No</a></div>
          </div>
      </span>

      <span hidden$="[[!isDoOper]]">
          <div class="row">
              <div class="col-md-12" align="center"><h5>Su cuenta ha sido dada de alta con éxito!</h5></div>
          </div>
          <br>
          <div class="row">
              <div class="col-md-12" align="center"><h5>IBAN [[IBAN]]</h5></div>
          </div>
          <br>
          <br>
          <div class="row">
              <div class="col-md-12" align="center"><button on-click="exitOper" class="btn btn-info">Continuar</button></div>
          </div>
      </span>

      <iron-ajax
        id="createAccount"
        url="http://localhost:3000/vibank/v1/account"
        content-type="application/json"
        method="POST"
        headers={{headers}}
        on-response="manageAJAXResponse"
        on-error="showError"
      >
      </iron-ajax>
    `;
  }

  static get properties() {
    return {
      idUser: {
        type: Number
      }, balance: {
        type: Number,
        value: 0
      }, IBAN: {
        type: String
      }, isDoOper: {
        type: Boolean,
        value: false
      }, route: {
        type: Object,
      },headers: {
        type: Object,
        value: { authorization: {
                  type: String
                }

              }
      }
    };
  } // End Properties+

  createAccount(){

    var createAccountData = {
      "idUser": this.idUser,
      "balance": this.balance
    }

    this.$.createAccount.body = JSON.stringify(createAccountData);
    this.$.createAccount.generateRequest();

  }

  manageAJAXResponse(data) {

      this.IBAN = data.detail.response.IBAN;
      this.isDoOper = true;
  }

  showError(error){
    alert("Hubo un error en la creación de la cuenta");
    this.set('route.path', '/visor-cuentas');
  }

  exitOper(e) {

      this.isDoOper = false;
      this.set('route.path', '/visor-cuentas');

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

  cancelOper() {

    this.set('route.path', '/visor-cuentas');

  }

} // End Class

window.customElements.define('visor-alta-cuenta', visorAltaCuenta);
