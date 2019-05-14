import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '../visor-movimientos/visor-movimientos.js';
import '../visor-movimientos/visor-movimiento.js';
import '../visor-operaciones/visor-operaciones.js';
import '../visor-usuario/visor-usuario.js'
import '../visor-alta-usuario/visor-alta-usuario.js'
import '../visor-login/visor-login.js'
import '../visor-logout/visor-logout.js'
import '../visor-cuentas/visor-cuenta.js'
import '../visor-alta-usuario/visor-alta-usuario.js'

/**
 * @customElement
 * @polymer
 */

class FrontvibankApp extends PolymerElement {
  static get template() {
    return html`

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <br/>

      <app-location route="{{route}}"></app-location>
      <app-route
            route="{{route}}"
            pattern="/:resource"
            data="{{routeData}}"
      >
      </app-route>

      <app-route
            route="{{route}}"
            pattern="/:resource/:id"
            data="{{routeData}}"
      >
      </app-route>

      <div class="row">
          <div class="col-md-1"></div>
          <div class="col-md-6"><img src="./images/logo.png" width="50%" height="80%" /></div>
          <div class="col-md-3" align="right">
              <span hidden$="[[!isLogged]]">
                  <visor-usuario on-myevent="processEvent" id="visorUsuario"></visor-usuario>
              </span>
          </div>
          <div class="col-md-2" align="rigth">
              <span hidden$="[[isEnterLogin]]">
                  <span hidden$="[[isLogged]]">
                      <button on-click="doLogin" class="btn btn-info">Entrar</button>
                  </span>
              </span>
              <span hidden$="[[!isLogged]]">
                  <button on-click="doLogout" class="btn btn-info">Salir</button>
              </span>
          </div>
      </div>
      <div class="row">
          <div class="col-md-12" align="center">
              <img src="./images/linea.png" />
          </div>
      </div>
      <br>

      <iron-pages selected="[[routeData.resource]]" attr-for-selected="component-name">

          <div component-name="visor-login">
              <visor-login on-myevent="processEvent" id="visorLogin"></visor-login>
          </div>

          <div component-name="visor-logout">
              <visor-logout on-myevent="processEvent" id="visorLogout"></visor-logout>
          </div>

          <div component-name="visor-alta-usuario">
              <visor-alta-usuario on-myevent="processEvent" id="visorAltaUsuario"></visor-alta-usuario>
          </div>

          <div component-name="visor-movimientos">
              <visor-cuenta id="visorCuenta"></visor-cuenta>
              <visor-movimientos on-myevent="processEvent" id="visorMovimientos"></visor-movimientos>
          </div>

          <div component-name="visor-operaciones">
              <visor-operaciones on-myevent="processEvent" id="visorOperaciones"></visor-operaciones>
          </div>

          <div component-name="visor-movimiento">
              <visor-cuenta id="visorCuenta"></visor-cuenta>
              <visor-movimiento on-myevent="processEvent" id="visorMovimiento"></visor-movimiento>
          </div>

      </iron-pages>

    `;
  }


  static get properties() {
    return {
      isLogged:{
        type: Boolean,
        value:false
      },
      isEnterLogin:{
        type: Boolean,
        value:false
      },
      route: {
        type: Object
      },
      routeData: {
        type: Object
      }
    };
  } // End properties


  processEvent(e){

    console.log("Capturado evento del emisor");
    console.log(e);

    if(e.detail.isLogged){

      this.isLogged = e.detail.isLogged;
      this.$.visorUsuario.idUser = e.detail.idUser;
      this.$.visorLogout.idUser = e.detail.idUser;
      this.idUser = e.detail.idUser;

    }else{

      this.isLogged = e.detail.isLogged
      this.idUser = 0;
      this.$.visorUsuario.idUser = 0;
      this.$.visorMovimientos.idAccount = 0;
      this.$.visorMovimiento.idOper = 0;
      this.isEnterLogin = true;
      console.log("hola");
    }

    if (this.routeData.resource == "visor-operaciones") {

        this.$.visorOperaciones.idAccount = e.detail.idAccount;
        this.$.visorOperaciones.operType = e.detail.operType;

        if (e.detail.operType == 1 || e.detail.operType == 2){
            this.$.visorOperaciones.isDoTransfer = false;
        }else{
            this.$.visorOperaciones.isDoTransfer = true;
        }
    }

    if (this.routeData.resource == "visor-movimiento") {
       this.$.visorMovimiento.idOper = e.detail.idOper;
    }

    if (this.routeData.resource == "visor-movimientos") {
       this.$.visorMovimientos.idAccount = e.detail.idAccount;
    }

  }

  doLogin() {
      this.set('route.path', '/visor-login');
      this.isEnterLogin = true;
  }

  doLogout() {

      this.set('route.path', '/visor-logout');
  }

} // End class

window.customElements.define('frontvibank-app', FrontvibankApp);
