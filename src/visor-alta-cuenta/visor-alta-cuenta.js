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
              <div class="col-md-12" align="center"><button on-click="exitOper" class="btn btn-info">Continuar</button></div>
          </div>
      </span>

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
      idUser: {
        type: Number
      }, balance: {
        type: Number,
        value: 0
      }, isDoOper: {
        type: Boolean,
        value: false
      }, route: {
        type: Object,
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

  // vienen del on-response y error
  manageAJAXResponse(data) {

      this.isDoOper = true;
  }

  showError(error){
    console.log("hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
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
