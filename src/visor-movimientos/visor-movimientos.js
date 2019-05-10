import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-repeat.js';

/**
 * @customElement
 * @polymer
 */

class VisorMovimientos extends PolymerElement {
  static get template() {
    return html`

      <style>
          :host {
            display: block;
            border: solid blue;
          }
      </style>

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <template is="dom-repeat" items="[[operations]]">
          <div class="row greybg">
              <div class="col">[[item.descOperType]]</div>
              <div class="col">[[item.sign]][[item.amount]]</div>
              <div class="col">[[item.balance]] <img src="../../images/icon-lupa.png" alt="Consulta movimiento" width="20" height="20"></div>
          </div>
      </template>




      <button on-click="sendEvent" class="btn btn-success">Realizar ingreso</button>

      <iron-ajax
        auto
        id="getOpers"
        url="http://localhost:3000/vibank/v1/accountopers/{{idAccount}}"
        handle-as="json"
        on-response="showDataOpers"
        on-error="showError"
      >
      </iron-ajax>

    `;
  }

  static get properties() {
    return {
      idAccount: {
        type: Number,
        value:1
      },
      operations: {
        type: Array
      },
      route: {
        type: Object
      }
    };
  } // End properties

  showDataOpers(data) {
    console.log("showDataOper");
    console.log(data.detail.response);

    this.operations = data.detail.response;

  }

  showError(error) {
    console.log("Hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }

  sendEvent(e) {
      console.log("Botón pulsado");

      this.set('route.path', '/visor-ingresos');
      this.dispatchEvent(
          new CustomEvent(
              "myevent",
              {
                  "detail" : {
                      "idAccount":1,
                      "operType":1
                  }
              }
          )
      )
  }

  isEqual(x, y) {
    return x === y;
  }

} // End class

window.customElements.define('visor-movimientos', VisorMovimientos);
