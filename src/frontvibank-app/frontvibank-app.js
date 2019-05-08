import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/iron-pages/iron-pages.js'
import '../visor-movimientos/visor-movimientos.js'
import '../visor-ingresos/visor-ingresos.js'
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

      <iron-pages selected="[[viewName]]" attr-for-selected="component-name">
          <div component-name="visor-ingresos"><visor-ingresos on-myevent="processEvent" id="visorIngresos"></visor-ingresos></div>
          <div component-name="visor-movimientos"><visor-movimientos on-myevent="processEvent" id="visorMovimientos"></visor-movimientos></div>
          <div component-name="visor-login"><visor-login on-myevent="processEvent" id="visorLogin"></visor-login></div>
          <div component-name="visor-alta-usuario"><visor-alta-usuario on-myevent="processEvent" id="visorAltaUsuario"></visor-alta-usuario></div>
      </iron-pages>

    `;
  }


  static get properties() {
    return {
      viewName:{
          type: String,
          value: "visor-alta-usuario"
      }
    };
  } // End properties


  processEvent(e){

    console.log("Capturado evento del emisor");
    console.log(e);

    this.viewName= e.detail.view
    if (e.detail.view == "visor-movimientos") {
        this.$.visorMovimientos.idAccount = e.detail.idAccount;
    }

    if (e.detail.view == "visor-ingresos") {
        this.$.visorIngresos.idAccount = e.detail.idAccount;
        this.$.visorIngresos.operType = e.detail.operType;
    }

    if (e.detail.view == "visor-login") {
      this.$.visorLogin.UserID = e.detail.UserID;
  }

  if (e.detail.view == "visor-alta-usuario") {
    this.$.visorLogin.UserID = e.detail.UserID;
}

  }

} // End class

window.customElements.define('frontvibank-app', FrontvibankApp);
