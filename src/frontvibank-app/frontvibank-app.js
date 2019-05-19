import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '../visor-movimientos/visor-movimientos.js';
import '../visor-movimientos/visor-movimiento.js';
import '../visor-operaciones/visor-operaciones.js';
import '../visor-usuario/visor-usuario.js'
import '../visor-login/visor-login.js'
import '../visor-logout/visor-logout.js'
import '../visor-cuentas/visor-cuenta.js'
import '../visor-cuentas/visor-cuentas.js'
import '../visor-alta-usuario/visor-alta-usuario.js'
import '../visor-alta-cuenta/visor-alta-cuenta.js'

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

      <span hidden$="[[!isViewAccount]]">
          <visor-cuenta id="visorCuenta"></visor-cuenta>
      </span>

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

          <div component-name="visor-alta-cuenta">
              <visor-alta-cuenta on-myevent="processEvent" id="visorAltaCuenta"></visor-alta-cuenta>
          </div>

          <div component-name="visor-operaciones">
              <visor-operaciones on-myevent="processEvent" id="visorOperaciones"></visor-operaciones>
          </div>

          <div component-name="visor-cuentas">
              <visor-cuentas on-myevent="processEvent" id="visorCuentas"></visor-cuentas>
          </div>

          <div component-name="visor-movimiento">
              <visor-movimiento on-myevent="processEvent" id="visorMovimiento"></visor-movimiento>
          </div>

          <div component-name="visor-movimientos">
                  <visor-movimientos on-myevent="processEvent" id="visorMovimientos"></visor-movimientos>
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
      },isViewAccount:{
        type: Boolean,
        value:false
      },
      idUser: {
        type: Number
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

    if (this.routeData.resource == "visor-login") {
        this.isLogged = false;
        this.isEnterLogin = true;
        this.isViewAccount = false;
    }

    if (this.routeData.resource == "visor-cuentas") {

        if (!this.isLogged) {
             this.isLogged = true;
             this.idUser = e.detail.idUser;
             this.$.visorUsuario.idUser = e.detail.idUser;
             this.$.visorUsuario.doRefresh = true;
        }

        this.$.visorCuentas.idUser = this.idUser;
        this.$.visorCuentas.doRefresh = true;
        this.isViewAccount = false;
    }

    if (this.routeData.resource == "visor-movimientos") {
        this.$.visorCuenta.idAccount = e.detail.idAccount;
        this.$.visorMovimientos.idAccount = e.detail.idAccount;
        this.$.visorCuenta.doRefresh = true;
        this.$.visorCuentas.doRefresh = false;
        this.$.visorOperaciones.doRefresh = false;
        this.$.visorMovimiento.doRefresh = false;
        this.$.visorMovimientos.doRefresh = true;
        this.isViewAccount = true;
    }

    if (this.routeData.resource == "visor-movimiento") {
        this.$.visorCuenta.idAccount = e.detail.idAccount;
        this.$.visorMovimiento.idOper = e.detail.idOper;
        this.$.visorCuenta.doRefresh = true;
        this.$.visorMovimiento.doRefresh = true;
        this.isViewAccount = true;
    }

    if (this.routeData.resource == "visor-alta-cuenta") {
        this.$.visorAltaCuenta.idUser = e.detail.idUser;
        this.$.visorCuentas.doRefresh = false;
        this.isViewAccount = false;
    }

    if (this.routeData.resource == "visor-operaciones") {

        this.$.visorOperaciones.idAccount = e.detail.idAccount;
        this.$.visorOperaciones.operType = e.detail.operType;
        this.$.visorOperaciones.idUser = this.idUser;

        if (e.detail.operType == 1 || e.detail.operType == 2){
            this.$.visorOperaciones.isDoTransfer = false;
            this.$.visorOperaciones.isDoTraspas = false;
        }

        if (e.detail.operType == 3){
            this.$.visorOperaciones.isDoTransfer = true;
            this.$.visorOperaciones.isDoTraspas = false;
        }

        if (e.detail.operType == 4){
          this.$.visorOperaciones.isDoTransfer = false;
          this.$.visorOperaciones.isDoTraspas = true;
        }

        this.isViewAccount = false;
        this.$.visorCuenta.doRefresh = false;
        this.$.visorMovimientos.doRefresh = false;
        this.$.visorOperaciones.doRefresh = true;
    }

  }

  doLogin() {
      this.set('route.path', '/visor-login');
      this.isEnterLogin = true;
  }

  doLogout() {
      this.set('route.path', '/visor-logout');
      this.$.visorLogout.idUser = this.idUser;
      this.isViewAccount = false;
  }

} // End class

window.customElements.define('frontvibank-app', FrontvibankApp);
