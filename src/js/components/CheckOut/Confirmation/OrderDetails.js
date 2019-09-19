import React, { Component } from "react";
import { Route, Link, Switch } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { Container, Row, Col } from 'reactstrap';


class OrderDetails extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
        this.shipping_address = this.props.OrderDetails.shipping_address;
        this.delivery_type = this.props.OrderDetails.delivery_type;
        this.payment_method = this.props.OrderDetails.payment_method;


        //console.log(props);
    }

    goToDeliveryDetails = () => {
        this.props.onRedirectToDelivery();
        this.props.history.push(`/${this.props.global.store_locale}/delivery-details`);
    }

    goToPaymentDetails = () => {
        this.props.onRedirectToPayment();
        this.props.history.push(`/${this.props.global.store_locale}/checkout-payment`);
    }

    goToCartDetails = () => {
        this.props.onRedirectToCart();
        this.props.history.push(`/${this.props.global.store_locale}/cart`);
    }



    render() {

        let payment_method = this.payment_method;
        let delivery_type = this.delivery_type;

        // if (payment_method == 'Cash on Delivery') {
        //     payment_method = this.myIntl.formatMessage({ id: 'OrderHistory.Payment.CashOnDel' });
        // } else if (payment_method == 'Credit Card') {
        //     payment_method = this.myIntl.formatMessage({ id: 'OrderHistory.Payment.PayByCard' });
        // }

        // if (delivery_type == 'Deliver to Address') {
        //     delivery_type = this.myIntl.formatMessage({ id: 'OrderHistory.Shipping.DelToAddress' });
        // } else if (delivery_type == 'Click & Collect') {
        //     delivery_type = this.myIntl.formatMessage({ id: 'OrderHistory.Shipping.PickUpFromStore' });
        // }
        return (<>

            <Col xs="12" lg="4" md="12">
                <div className="t-Region confirmation-info-header  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R1261007701091374327">
                    <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                            <h2 className="t-Region-title" id="R1261007701091374327_heading"><FormattedMessage id="Addresses.Text" defaultMessage="Addresses" /></h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons">
                            <button className="t-Button js-ignoreChange t-Button--link" type="button" id="B35536008904010546" onClick={this.goToDeliveryDetails}>
                                <span className="t-Button-label" ><FormattedMessage id="Edit.Text" defaultMessage="Edit" /></span></button><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body">
                            <div id="caddress">
                                <p><span><strong><FormattedMessage id="DeliverTo.Text" defaultMessage="Deliver To" /></strong>
                                    {this.shipping_address.name}<br />
                                    {this.shipping_address.street}<br />
                                    {this.shipping_address.city},{this.shipping_address.region}<br />
                                    {this.shipping_address.country}<br />
                                    <Link to={`tel : ${this.shipping_address.telephone}`}>{this.shipping_address.telephone}</Link></span></p>
                            </div>
                        </div>
                        <div className="t-Region-buttons t-Region-buttons--bottom">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                    </div>
                </div>
            </Col>




            <Col xs="12" lg="4" md="12">
                <div className="t-Region confirmation-info-header  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R42440037778375838">
                    <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                            <h2 className="t-Region-title" id="R42440037778375838_heading">
                                <FormattedMessage id="login.Delivery.Title" defaultMessage="Delivery" /></h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><button className="t-Button js-ignoreChange t-Button--link" type="button" id="B35533450701010543" onClick={this.goToDeliveryDetails}><span className="t-Button-label"><Link to="/delivery-details"><FormattedMessage id="Edit.Text" defaultMessage="Edit" /> </Link></span></button><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body">
                            <p className="paddingOnMobile0px10px" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>
                            {delivery_type == 'Deliver to Address' ? 
                                <FormattedMessage id="OrderHistory.Shipping.DelToAddress" defaultMessage="Deliver to Address" />
                                : <FormattedMessage id="OrderHistory.Shipping.PickUpFromStore" defaultMessage="Pickup from Store" />
                            }
                            </p>
                        </div>
                        <div className="t-Region-buttons t-Region-buttons--bottom">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                    </div>
                </div>
            </Col>



            <Col xs="12" lg="4" md="12">
                <div className="t-Region confirmation-info-header-last  t-Region--noBorder t-Region--hiddenOverflow" id="R42440193724375840">
                    <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" />
                            </span>
                            <h2 className="t-Region-title" id="R42440193724375840_heading"><FormattedMessage id="login.Payment.Title" defaultMessage="Payment" /></h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><button className="t-Button js-ignoreChange t-Button--link" type="button" id="B35536757947010547" onClick={this.goToPaymentDetails}><span className="t-Button-label"><Link to="/checkout-payment"><FormattedMessage id="Edit.Text" defaultMessage="Edit" /> </Link></span></button><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body">
                            <p className="paddingOnMobile0px10px" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>
                            {payment_method == 'Cash on Delivery' ? 
                                <FormattedMessage id="OrderHistory.Payment.CashOnDel" defaultMessage="Cash On Delivery" />
                                : <FormattedMessage id="OrderHistory.Payment.PayByCard" defaultMessage="Pay By Card" />
                            }
                            </p>
                        </div>
                        <div className="t-Region-buttons t-Region-buttons--bottom">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                    </div>
                </div>
            </Col>

        </>)
    }
}

const mapStateToProps = state => {
    return {
        OrderDetails: state.myCart.order_details,
        global: state.global

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirectToPayment: () => dispatch(actions.redirectToPayment()),
        onRedirectToDelivery: () => dispatch(actions.redirectToDelivery()),
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderDetails));