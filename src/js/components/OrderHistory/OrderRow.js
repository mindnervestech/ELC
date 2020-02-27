import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';

class OrderRow extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
    }
    render() {
        let shipping_type = this.props.value.shipping_type;
        let payment_type = this.props.value.payment_type;
        if (payment_type == 'Cash On Delivery') {
            payment_type = this.myIntl.formatMessage({ id: 'OrderHistory.Payment.CashOnDel', defaultMessage:"Cash On Delivery" });
        } else if (payment_type == 'Pay By Card') {
            payment_type = this.myIntl.formatMessage({ id: 'OrderHistory.Payment.PayByCard', defaultMessage:"Pay By Card" });
        }

        if (shipping_type == 'Deliver to Address') {
            shipping_type = this.myIntl.formatMessage({ id: 'OrderHistory.Shipping.DelToAddress', defaultMessage:"Deliver to Address" });
        } else if (shipping_type == 'Pickup from Store') {
            shipping_type = this.myIntl.formatMessage({ id: 'OrderHistory.Shipping.PickUpFromStore', defaultMessage:"Pickup from Store" });
        }

        return (<tr>
            <td className="t-Report-cell" headers="ORDERED_ON">{this.props.value.order_date}</td>
            <td className="t-Report-cell" headers="ORDER_ID">
                <Link to={`/${this.props.store_locale}/view-voucher?order-id=${this.props.value.order_id}&order_increment_id=${this.props.value.order_increment_id}`}>{this.props.value.order_increment_id}</Link>
            </td>

            <td className="t-Report-cell" headers="CODE_DESC">{shipping_type}</td>

            <td className="t-Report-cell" headers="PAYMENT_METHOD">{payment_type}</td>

            <td className="t-Report-cell" align="left" headers="ORDER_TOTAL">{this.props.value.currency} {this.props.value.order_total}</td>

        </tr >);
    }
}

export default injectIntl(OrderRow);