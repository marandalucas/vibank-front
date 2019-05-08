import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class visorAltaUsuario extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <input type="firstname" placeholder="firstname" value="{{firstname::input}}" />
      <br />
      <input type="lastname" placeholder="lastname" value="{{lastname::input}}" />
      <br />
      <input type="email" placeholder="email" value="{{email::input}}" />
      <br />
      <input type="password" placeholder="password" value="{{password::input}}" />
      <br />
      <button on-click="login">Sign Up</button>
      <span hidden$="[[!isSignUp]]">Dado de alta correctamente!</span>

      <iron-ajax
        id="doSingUP"
        url="http://localhost:3000/vibank/v1/user/"
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
      firstname: {
        type: String
      }, lastname: {
        type: String
      }, password: {
        type: String
      }, email: {
        type: String
      }, isSignUp: {
        type: Boolean,
        value: false
      }
    };
  } // End Properties+
  login() {
    console.log("El usuario ha pulsado el botón");

    var singUpData = {
      "first_name": this.firstname,
      "last_name": this.lastname,
      "email": this.email,
      "password": this.password
    }

    this.$.doSingUP.body = JSON.stringify(singUpData);
    this.$.doSingUP.generateRequest();

    console.log(singUpData);
  }
  // vienen del on-response y error
  manageAJAXResponse(data) {
      console.log("Llegaron los resultados");
      console.log(data.detail.response);

      this.isSignUp = true;

      this.dispatchEvent(
        new CustomEvent(
          "singUpSuccess",
          {
            "detail" : {
              "msg" : data.detail.response
            }
          }
        )
      )
  }
  showError(error){
    console.log("hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }
} // End Class

window.customElements.define('visor-alta-usuario', visorAltaUsuario);
