import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';

/**
 * @customElement
 * @polymer
 */

class VisorIngresos extends PolymerElement {
  static get template() {
  return html`

      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

      <app-location route="{{route}}"></app-location>

      <span hidden$="[[isDoOper]]">
        Introduzca el importe a ingresar
        <input type="number" name="amount" min="1" max="999999999" step="0.01" required="required" value="{{amount::input}}" />
        <br></br>
        <button on-click="doOper" class="btn btn-success">Aceptar</button>
        <br></br>
      </span>

      <span hidden$="[[!isDoOper]]">Operación realizada.
        <button on-click="exitOper" class="btn btn-success">Aceptar</button>
      </span>

      <iron-ajax
              id="doOper"
              url="http://localhost:3000/vibank/v1/oper/"
              handle-as="json"
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
      idAccount: {
          type: Number
      },operType: {
          type: Number
      },amount: {
          type: Number,
          value: 0
      },isDoOper:{
          type: Boolean,
          value: false
      },route: {
          type: Object
      }
    };
  } // End properties

  doOper() {

    console.log("El usuario ha pulsado el botón");

    var operData = {
        "idAccount":this.idAccount,
        "operType":this.operType,
        "amount":this.amount,
    }

    console.log(JSON.stringify(operData));
    this.$.doOper.body = JSON.stringify(operData);
    this.$.doOper.generateRequest();

    console.log(operData);

  }

  manageAJAXResponse(data) {

    console.log("Llegaron los resultados");
    console.log(data.detail.response);

    this.isDoOper = true;

  }

  showError(error) {
    console.log("Hubo un error");
    console.log(error);
    console.log(error.detail.request.xhr.response);
  }

  exitOper(e) {
      console.log("Botón pulsado");
      console.log(e);

      this.set('route.path', '/visor-movimientos');
      this.isDoOper = false;
      this.amount = 0;
  }

} // End class

window.customElements.define('visor-ingresos', VisorIngresos);
