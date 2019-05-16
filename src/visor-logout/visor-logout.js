import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-route/app-location.js';

/**
 * @customElement
 * @polymer
 */
class visorLogout extends PolymerElement {
  static get template() {
    return html`

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <br>
      <div class="row">
          <div class="col-md-12" align="center"><h5>Desea salir de Vibank?</h5></div>
      </div>
      <br>
      <br>
      <div class="row">
          <div class="col-md-6" align="right"><a href="#" on-click="logout">Si</a></div>
          <div class="col-md-6" align="left"><a href="#" on-click="cancelLogout">No</a></div>
      </div>

      <iron-ajax
        id="doLogout"
        url="http://localhost:3000/vibank/v1/logout/{{idUser}}"
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
      },
      route: {
        type: Object
      }
    };
  } // End Properties

  logout() {

    var logoutData = {
    }

    this.$.doLogout.body = JSON.stringify(logoutData);
    this.$.doLogout.generateRequest();

  }

  manageAJAXResponse(data) {

      this.set('route.path', '/visor-login');

      this.dispatchEvent(
        new CustomEvent(
          "myevent",
          {
            "detail" : {
              "isLogged": false
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

  cancelLogout() {

    this.set('route.path', '/visor-movimientos');
    // this.set('route.path', '/visor-cuentas');

  }

} // End Class

window.customElements.define('visor-logout', visorLogout);
