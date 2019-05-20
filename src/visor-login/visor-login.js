import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class visorLogin extends PolymerElement {
  static get template() {
    return html`

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <app-location route="{{route}}"></app-location>

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
        <div class="col-md-12" align="center"><a href="#" on-click="goNewUser">Registrar nuevo usuario</a></div>
    </div>

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
      },email: {
        type: String
      },idUser: {
        type: Number
      },route: {
        type: Object
      }
    };
  } // End Properties

  login() {

    //validations

    if (this.email === undefined || this.email == ""){
       alert("Email no informado");
       return;
    }

    if (this.password === undefined || this.password == ""){
       alert("Contraseña no informada");
       return;
    }

    var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var emailReg = new RegExp(test);

    if (!emailReg.test(this.email)){
        alert("Formato de email incorrecto");
        return;
    }

    //end validations

    var loginData = {
      "email": this.email,
      "password": this.password
    }
    this.$.doLogin.body = JSON.stringify(loginData);
    this.$.doLogin.generateRequest();

  }

  manageAJAXResponse(data) {

      localStorage.setItem("token", "Bearer " + data.detail.response.token);

      this.idUser = data.detail.response.UserID
      this.password = "";
      this.email = "";

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

  showError(error){

    this.email = "";
    this.password = "";
    alert("Login incorrecto");

  }

  goNewUser() {

    this.set('route.path', '/visor-alta-usuario');

  }


  valRequire(valor){

      if (valor == ""){
         return false;
      }

     return true;
  }

  valEmail(valor){

     if (!val_campo_obligatorio(valor)){return true;}

     var test = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
     var emailReg = new RegExp(test);
     return emailReg.test(valor);
  }


} // End Class

window.customElements.define('visor-login', visorLogin);
