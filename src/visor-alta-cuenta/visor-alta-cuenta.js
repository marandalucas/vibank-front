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

      <app-location route="{{route}}"></app-location>

      <h5>Confirmar Alta de Cuenta!!</h5>
      <button on-click="createAccountConfirm">Confirmar Alta Cuenta</button>
      <span hidden$="[[!isCreatedAccount]]">Cuenta Dada de alta de alta correctamente!</span>

      <iron-ajax
        id="createAccount"
        url="http://localhost:3000/vibank/v1/account"
        content-type="application/json"
        method="POST"
        on-response="manageAJAXResponse"
        on-error="showError"
      >
      </iron-ajax>
    `;
  }
  static get properties() {
    return {
      userID: {
        type: Number,
        value: 1
      }, balance: {
        type: Number,
        value: 0
      }, isCreatedAccount: {
        type: Boolean,
        value: false
      }, route: {
        type: Object,
      }
    };
  } // End Properties+

  createAccountConfirm(){
    var createAccountData = {
      "userID": this.userID,
      "balance": this.balance
    }

    this.$.createAccount.body = JSON.stringify(createAccountData);
    this.$.createAccount.generateRequest();

    console.log(createAccountData);
  }

  // vienen del on-response y error
  manageAJAXResponse(data) {
      console.log("Llegaron los resultados");

      console.log(data.detail.response);

      this.isCreatedAccount = true;

      this.dispatchEvent(
        new CustomEvent(
          "createAccountSuccess",
          {
            "detail" : {
              "msg" : data.detail.response
            }
          }
        )
      )
      this.set('route.path', '/visor-cuentas-usuario');

  }
  showError(error){
    console.log("hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }
} // End Class

window.customElements.define('visor-alta-cuenta', visorAltaCuenta);
