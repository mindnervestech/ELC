import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import payment from '../../../../../assets/images/product-details/payment-security.svg';
import exchange from '../../../../../assets/images/product-details/exchange.svg';
import cashmoney from '../../../../../assets/images/product-details/cash-money.svg';
import delivery from '../../../../../assets/images/product-details/delivery.svg';

class ProductPayment extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return(
            <div className="t-Region-body">
                                <div className="row info-icons">
                                  <div className="ed-info col col-6">
                                    <img src={payment} />
                                    <FormattedMessage id="SecureShopping.Text" defaultMessage="Secure Shopping" />
                                  </div>
                                  <div className="ed-info col col-6">
                                    <img src={cashmoney} />
                                    <FormattedMessage id="CashOnDelivery.Text" defaultMessage="Cash On Delivery" />
                                  </div>
                                </div>
                                <div className="row info-icons">
                                  <div className="ed-info col col-6">
                                    <img src={exchange} />
                                    <FormattedMessage id="FreeClickCollect.Text" defaultMessage="Free Click &amp; Collect" />
                                  </div>
                                  <div className="ed-info col col-6">
                                    <img src={delivery} />
                                   <FormattedMessage id="DeliveryDays.Text" defaultMessage="Delivery Days" />
                                  </div>
                                </div>
                              </div>
        );
    }
}
export default ProductPayment;