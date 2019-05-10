import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/app-route/app-route.js';
import '@polymer/app-route/app-location.js';
import '@polymer/polymer/lib/elements/dom-if.js';
import '../visor-movimientos/visor-movimientos.js';
import '../visor-ingresos/visor-ingresos.js';
import '../visor-usuario/visor-usuario.js'
import '../visor-login/visor-login.js'
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

      <iron-pages selected="[[routeData.resource]]" attr-for-selected="component-name">

          <div component-name="visor-movimientos">

              <template is="dom-if" if="{{isEqual(routeData.resource, 'visor-movimientos')}}" restamp="true">
                  <visor-movimientos on-myevent="processEvent" id="visorMovimientos"></visor-movimientos>
              </template>

          </div>

          <div component-name="visor-ingresos">
              <visor-ingresos on-myevent="processEvent" id="visorIngresos"></visor-ingresos>
          </div>

          <div component-name="visor-movimiento">
              <visor-ingresos on-myevent="processEvent" id="visorMovimiento"></visor-ingresos>
          </div>

      </iron-pages>

    `;
  }


  static get properties() {
    return {
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

    if (this.routeData.resource == "visor-ingresos") {
        this.$.visorIngresos.idAccount = e.detail.idAccount;
        this.$.visorIngresos.operType = e.detail.operType;
    }

    if (e.detail.view == "visor-login") {
      this.$.visorLogin.UserID = e.detail.UserID;
  }

  if (e.detail.view == "visor-alta-usuario") {
    this.$.visorLogin.UserID = e.detail.UserID;
}

  if (e.detail.view == "visor-usuario") {
    this.$.visorUsuario.UserID = e.detail.UserID;
  }

  }

  isEqual(x, y) {
    return x === y;
  }

} // End class

window.customElements.define('frontvibank-app', FrontvibankApp);
