import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/polymer/lib/elements/dom-if.js';

/**
 * @customElement
 * @polymer
 */

class VisorMoneda extends PolymerElement {
  static get template() {
  return html`

    <style>

        .contenedor {
          background-image: url('../../images/cryptomoneda.png');
          color: white;
          border-radius: 4px;
        }

    </style>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <div class="row">
        <div class="col-md-4"></div>
        <div class="col-md-2 contenedor" align="center"><h5>Su cryptomoneda</h5></div>
        <div class="col-md-2" align="left">
            <select id="currencies" on-change="getCurrencyData" class="browser-default custom-select">
              <template is="dom-repeat" items="[[currencies]]">
                  <option value="[[item.value]]">[[item.title]]</option>
              </template>
            </select>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12" align="center"><h5>&nbsp; [[currentChange]] [[code]]</h5></div>
    </div>


    <iron-ajax
      id="coinbase"
      url="https://api.coinbase.com/v2/prices/{{code}}-USD/spot"
      handle-as="json"

      on-response="ConvertedPrice">
    </iron-ajax>
  `;
}

static get properties() {
  return {
      code: {
        type: String
    },currentChange: {
        type: String
    },currencies: {
        type: Array,
        value: () => [{value: 'BTC',
                       title: 'Bitcoin'
                      },
                      {value: 'ETH',
                       title: 'Ethereum'
                      },
                      {value: 'LTC',
                       title: 'Litecoin'
                      }]
    }
  };
} // End properties

ConvertedPrice(data) {
  const currencyData = data.detail.response.data;
  this.currentChange = currencyData.amount
}

getCurrencyData() {
  this.code = this.currencies[this.$.currencies.selectedIndex].value;
  this.$.coinbase.generateRequest();
}

} // End class

window.customElements.define('visor-moneda', VisorMoneda);
