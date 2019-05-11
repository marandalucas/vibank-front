import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '../visor-movimientos/visor-movimientos.js';
import '../visor-operaciones/visor-operaciones.js';
import '../visor-usuario/visor-usuario.js'
import '../visor-login/visor-login.js'
import '../visor-cuentas/visor-cuenta.js'
import '../visor-alta-usuario/visor-alta-usuario.js'

/**
 * @customElement
 * @polymer
 */

class FrontvibankApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>


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
          <div class="col-md-8"><h1>ViBank</h1></div>
          <div class="col-md-2" align="right">
              <span hidden$="[[!isLogged]]">
                  <visor-usuario></visor-usuario>
              </span>
          </div>
          <div class="col-md-1">
              <span hidden$="[[isEnterLogin]]">
                  <span hidden$="[[isLogged]]">
                      <button on-click="doLogin" class="btn btn-info">Login</button>
                  </span>
              </span>
              <span hidden$="[[!isLogged]]">
                  <button on-click="doLogout" class="btn btn-info">Logout</button>
              </span>
          </div>
      </div>
      <br>

      <iron-pages selected="[[routeData.resource]]" attr-for-selected="component-name">

          <div component-name="visor-login">
              <visor-login id="visorLogin"></visor-login>
          </div>

          <div component-name="visor-movimientos">
              <template is="dom-if" if="{{isEqual(routeData.resource, 'visor-movimientos')}}" restamp="true">
                  <visor-cuenta id="visorCuenta"></visor-cuenta>
                  <visor-movimientos on-myevent="processEvent" id="visorMovimientos"></visor-movimientos>
              </template>
          </div>

          <div component-name="visor-operaciones">
              <visor-operaciones id="visorOperaciones"></visor-operaciones>
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

    if (this.routeData.resource == "visor-operaciones") {
        this.$.visorOperaciones.idAccount = e.detail.idAccount;
        this.$.visorOperaciones.operType = e.detail.operType;

        if (e.detail.operType == 1 || e.detail.operType == 2){
            this.$.visorOperaciones.isDoTransfer = false;
        }else{
            this.$.visorOperaciones.isDoTransfer = true;
        }
    }

  }

  doLogin() {
    console.log("ha presionado el boton");
      this.set('route.path', '/visor-login');
      this.isEnterLogin = true;
  }

  isEqual(x, y) {
      return x === y;
  }

} // End class

window.customElements.define('frontvibank-app', FrontvibankApp);
