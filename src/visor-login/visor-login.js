import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class visorLogin extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <input type="email" placeholder="email" value="{{email::input}}" />
      <br />
      <input type="password" placeholder="password" value="{{password::input}}" />
      <br />
      <button on-click="login">Login</button>
      <span hidden$="[[!isLogged]]">Bienvenido/a de nuevo</span>

      <iron-ajax
        id="doLogin"
        url="http://localhost:3000/vibank/v1/login/"
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
      password: {
        type: String
      }, email: {
        type: String
      }, isLogged: {
        type: Boolean,
        value: false
      }
    };
  } // End Properties+
  login() {
    console.log("El usuario ha pulsado el botón");

    var loginData = {
      "email": this.email,
      "password": this.password
    }

    this.$.doLogin.body = JSON.stringify(loginData);
    this.$.doLogin.generateRequest();

    // console.log("loding data es" + loginData); PROBLEMA NOOOO!!
    // console.log(loginData);
  }
  // vienen del on-response y error
  manageAJAXResponse(data) {
      console.log("Llegaron los resultados2");
      console.log(data.detail.response);
      console.log(data.detail.response.UserID);

      this.isLogged = true;

      this.dispatchEvent(
        new CustomEvent(
          "loginSuccess",
          {
            "detail" : {
              "userid" : data.detail.response.UserID
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

window.customElements.define('visor-login', visorLogin);
