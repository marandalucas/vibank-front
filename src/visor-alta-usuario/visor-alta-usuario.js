import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class visorAltaUsuario extends PolymerElement {
  static get template() {
    return html`

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <span hidden$="[[isSignUp]]">
          <br>
          <div class="row">
              <div class="col-md-12" align="center"><h5>Registro de nuevo usuario</h5></div>
          </div>
          <br>
          <br>
          <div class="row">
              <div class="col-md-12" align="center"><input type="firstname" placeholder="Nombre" value="{{firstname::input}}"/></div>
          </div>
          <br />
          <br />
          <div class="row">
              <div class="col-md-12" align="center"><input type="lastname" placeholder="Apellidos" value="{{lastname::input}}" /></div>
          </div>
          <br />
          <br />
          <div class="row">
              <div class="col-md-12" align="center"><input type="email" placeholder="Usuario (email)" value="{{email::input}}" /></div>
          </div>
          <br />
          <br />
          <div class="row">
              <div class="col-md-12" align="center"><input type="password" placeholder="Clave de acceso" value="{{password::input}}" /></div>
          </div>
          <br />
          <br />
          <div class="row">
              <div class="col-md-12" align="center"><button on-click="login" class="btn btn-info">Registrar</button></div>
          </div>
      </span>

      <span hidden$="[[!isSignUp]]">
        Registro realizado con éxito.
        <button on-click="exitSignUp" class="btn btn-info">Continuar</button>
      </span>


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
      }, route: {
        type: Object
      }
    };
  } // End Properties

  login() {

    var singUpData = {
      "first_name": this.firstname,
      "last_name": this.lastname,
      "email": this.email,
      "password": this.password
    }

    this.$.doSingUP.body = JSON.stringify(singUpData);
    this.$.doSingUP.generateRequest();

  }

  manageAJAXResponse(data) {

      this.isSignUp = true;
      this.idUser = data.detail.response.idUser;

  }

  showError(error){
    console.log("hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }

  exitSignUp(e) {

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

} // End Class

window.customElements.define('visor-alta-usuario', visorAltaUsuario);
