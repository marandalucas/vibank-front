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

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>
      <app-route
            route="{{route}}"
            pattern="/:resource/:id"
            data="{{routeData}}"
      >
      </app-route>
      <h4>Movimientos</h4>
      <br>
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-4">Tipo operación</div>
          <div class="col-md-1">Importe</div>
          <div class="col-md-1">Saldo</div>
      </div>
      <template is="dom-repeat" items="[[operations]]">
          <div class="row">
              <div class="col-md-3"></div>
              <div class="col-md-4"><img src="../../images/icon-lupa.png" alt="Consulta movimiento" width="20" height="20">
                  [[item.descOperType]]
              </div>
              <div class="col-md-1">[[item.sign]][[item.amount]]</div>
              <div class="col-md-1">[[item.balance]]</div>
          </div>
      </template>

      <br>
      <button on-click="sendEvent" id="btn-ingreso" class="btn btn-info">Realizar ingreso</button>
      <button on-click="sendEvent" id="btn-reintegro" class="btn btn-info">Realizar reintegro</button>
      <button on-click="sendEvent" id="btn-transferencia" class="btn btn-info">Realizar transferencia</button>


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
      if (e.srcElement.id == "btn-ingreso"){
          var operType = 1;
      } else if (e.srcElement.id == "btn-reintegro"){
          var operType = 2;
      } else if (e.srcElement.id == "btn-transferencia"){
          var operType = 3;
      }

      this.set('route.path', '/visor-operaciones');

      this.dispatchEvent(
          new CustomEvent(
              "myevent",
              {
                  "detail" : {
                      "idAccount":this.idAccount,
                      "operType":operType
                  }
              }
          )
      )
  }


} // End class

window.customElements.define('visor-movimientos', VisorMovimientos);
