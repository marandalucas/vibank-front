import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */
class visorLogin extends PolymerElement {
  static get template() {
    return html`

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <br>
      <br>
      <div class="row">
          <div class="col-md-12" align="center"><h5>Introduce tu usuario y clave de acceso</h5></div>
      </div>
      <br>
      <br>
      <div class="row">
          <div class="col-md-12" align="center"><input type="email" placeholder="Usuario (email)" value="{{email::input}}"/></div>
      </div>
      <br>
      <div class="row">
          <div class="col-md-12" align="center"><input type="password" placeholder="Clave de accceso" value="{{password::input}}" /></div>
      </div>
      <br>
      <div class="row">
          <div class="col-md-12" align="center"><button on-click="login" class="btn btn-info">Entrar</button></div>
      </div>
      <br>
      <div class="row">
          <div class="col-md-12" align="center">Registrar nuevo usuario</div>
      </div>

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
