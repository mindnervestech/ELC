import React, { Component } from 'react';
import '../CheckOut.css';
import './Confirmation.css'
import { Link, Redirect } from 'react-router-dom'
import OrderDetails from './OrderDetails';
import { connect } from 'react-redux';
import queryString from 'query-string'
import Spinner from '../../Spinner/Spinner';
import Spinner2 from '../../Spinner/Spinner2';
import * as actions from '../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col } from 'reactstrap';

const wait = require('../../../../assets/images/wait.gif');

let isClickOnPlaceOrder = false;
class Confirmation extends Component {

    constructor(props) {
        super(props);
        //console.log(props);
        this.state = {
            isClickOnPlaceOrder: false
        }
    }

    componentDidMount() {
        if (this.props.cart_details.is_payment_details_rec) {
            let obj = this.props.user_details.customer_details;
            if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
                if (this.props.cart_details.is_payment_details_rec &&
                    (this.props.cart_details.is_order_conf_details_rec === false)) {
                    this.props.OnGetOrderDetails({
                        quote_id: this.props.cart_details.quote_id,
                        store_id: this.props.global.currentStore
                    });
                }
            } else {
                if (this.props.guest_checkout.startGuestCheckout) {
                    if (this.props.cart_details.is_payment_details_rec &&
                        (this.props.cart_details.is_order_conf_details_rec === false)) {
                        this.props.OnGetOrderDetails({
                            quote_id: this.props.cart_details.quote_id,
                            store_id: this.props.global.currentStore
                        });
                    }
                } else {
                    this.props.history.push(`/${this.props.global.store_locale}/login`);
                }
            }
        } else {
            this.props.history.push(`/${this.props.global.store_locale}/cart`);
        }


    }

    goToCartDetails = () => {
        //console.log('goToCartDetails');
        this.props.onRedirectToCart();
        this.props.history.push(`/${this.props.global.store_locale}/cart`);
    }

    goToDeliveryDetails = () => {
        this.props.onRedirectToDelivery();
        this.props.history.push(`/${this.props.global.store_locale}/delivery-details`);
    }

    goToPaymentDetails = () => {
        //console.log('goToPaymentDetails');
        this.props.onRedirectToPayment();
        this.props.history.push(`/${this.props.global.store_locale}/checkout-payment`);
    }

    placeOrder = async () => {
        let obj = this.props.cart_details.order_details;
        isClickOnPlaceOrder = false
        if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
            const values = queryString.parse(this.props.location.search);
            let payment_type = values.payment_type;
            if (payment_type == "CC") {
                await this.props.getPlaceOrder({
                    quote_id: this.props.cart_details.quote_id,
                    store_id: this.props.global.currentStore
                });
                isClickOnPlaceOrder = true;
            } else {
                await this.props.OnplaceOrder({ store_id: this.props.global.currentStore, quote_id: this.props.cart_details.quote_id });
            }
        }
    }


    gotoProductScreen = (item) => {
        const store_locale = this.props.global.store_locale;

        const data = {
            customerid: typeof this.props.user_details.customer_id !== 'undefined' ? parseInt(this.props.user_details.customer_id) : " ",
            store: this.props.global.currentStore,
            url_key: item.url_key,
        };

        this.props.onGetProductDetails(data);
        this.props.getSizeChart({
            store_id: this.props.global.currentStore,
        });
        this.props.history.push(`/${this.props.global.store_locale}/products-details/${item.url_key}`);
    }


    payFortPayment = () => {

        const { payfort_data } = this.props;

        fetch("https://sbcheckout.payfort.com/FortAPI/paymentPage", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payfort_data)
        });
    }

    priceView = (product) => {
        let cartProductPrice = null;

        if (product.special_price !== null) {
            cartProductPrice = (
                <td className="price"><span className="p-price">
                    <span className="p-desc"><FormattedMessage id="Now.Text" defaultMessage="Now" /></span>
                    <span className="p-currency">{product.currency}</span> {Math.round(parseFloat(product.special_price * product.qty))}</span>
                    <br />
                    <del className="p-desc"><FormattedMessage id="Was.Text" defaultMessage="Was" /><strong><span className="p-currency">{product.currency}</span> {parseFloat(product.price * product.qty)}</strong></del><br />
                    <span className="p-price-saving"><span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings" /></span>
                        <span className="p-currency">{Math.round(((product.price - product.special_price) / product.price) * 100)} %</span>
                        <p> <FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {product.qty}</p>
                    </span>

                </td>
            )
        } else if (parseInt(product.price) == 0) {
            cartProductPrice = (
                <td className="price">
                    <FormattedMessage id="Free.text" defaultMessage="Free" /><br />
                </td>
            )
        } else {
            cartProductPrice = (
                <td className="price">
                    <span className="p-currency">{product.currency}</span> {parseInt(product.price * product.qty)}<br />
                    <p> <FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {product.qty}</p>
                </td>
            )
        }

        return cartProductPrice;
    }

    render() {
        const { payfort_data } = this.props;
        let paymentData = null;
        if (payfort_data) {
            paymentData = Object.keys(payfort_data).map(function (key) {
                return <input name={key} id={`payfort_${key}`} value={payfort_data[key]} />
            });
        }

        if (payfort_data && isClickOnPlaceOrder && paymentData != null) {
            setTimeout(() => {
                if (document.getElementById("payfort_access_code").getAttribute("value") != "") {
                    document.getElementById('placeorderbycard').click();
                    isClickOnPlaceOrder = false;
                } else {
                    this.forceUpdate();
                }
            }, 1000);

        }

        const values = queryString.parse(this.props.location.search);
        let payment_type = values.payment_type;
        /////Redirect to Order Summary
        const order_summ_obj = this.props.order_summary;
        if (this.props.cart_details.is_order_placed && payment_type !== 'CC') {
            if (!((Object.entries(order_summ_obj).length === 0) && (order_summ_obj.constructor === Object))) {
                return <Redirect to={`/${this.props.global.store_locale}/order-summary?paytype=COD&order_id=${order_summ_obj.order_id}`} />
            }
        }

        let order_details_comp = null;
        let cart_product_details = null;
        let cart_price_details = null;
        let obj = this.props.cart_details.order_details;

        if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {

            order_details_comp = <OrderDetails history={this.props.history} />;

            cart_product_details = obj.cart_details.products.map((item, index) => {
                return (<>
                    <tr key={index}>
                        <td className="t-Report-cell" headers="PRODUCT_DESC">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="prdimg">
                                            <a onClick={() => this.gotoProductScreen(item)} style={{ cursor: 'pointer' }}>
                                                <img src={item.image[0]} alt={item.image[0]} />
                                            </a>
                                        </td>
                                        <td className="prddesc">
                                            <h2>{item.name}</h2>
                                            {item.color && (<p><FormattedMessage id="product.color" defaultMessage="Color" />: {item.color}</p>)}
                                            {item.size && (<p><FormattedMessage id="product.size" defaultMessage="Size" />: {item.size}</p>)}
                                            <p>{item.id}</p>
                                            {item.sku != 'freeproduct' && (<Link to={`/${this.props.global.store_locale}/cart`} onClick={this.goToCartDetails}><FormattedMessage id="Edit.Text" defaultMessage="Edit" /></Link>)}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td className="t-Report-cell" align="right" headers="SUBTOTAL">
                            <table className="qty">
                                <tbody>
                                    <tr>
                                        {this.priceView(item)}
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </>)
            });

            cart_price_details = <>
                <tbody>
                    <tr>
                        <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" /></td>
                        <td className="t-Report-cell" align="right" headers="PRICE">{obj.cart_price.currency} <span>{obj.cart_price.Subtotal}</span></td>
                    </tr>

                    <tr>
                        <td className="t-Report-cell" headers="TYPE">
                            <FormattedMessage id="delivery-details.Savings.Title" defaultMessage="Savings" /></td>
                        <td className="t-Report-cell" align="right" headers="PRICE"><span className="p-price">{obj.cart_price.currency} {obj.cart_price.Savings}</span></td>

                    </tr>

                    <tr>
                        <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="Checkout.Shipping" defaultMessage="Shipping" /></td>
                        <td className="t-Report-cell" align="right" headers="PRICE">{obj.cart_price.currency} <span>{obj.cart_price.Shipping}</span></td>
                    </tr>

                    <tr>
                        <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="Checkout.COD" defaultMessage="COD" /></td>
                        <td className="t-Report-cell" align="right" headers="PRICE">{obj.cart_price.currency} <span>{obj.cart_price.COD}</span></td>
                    </tr>

                    <tr>
                        <td className="t-Report-cell" headers="TYPE"><span className="order-total"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span></td>
                        <td className="t-Report-cell" align="right" headers="PRICE">
                            <span className="order-total">{obj.cart_price.currency}</span>
                            <span className="order-total">{obj.cart_price.Total}</span>
                        </td>
                    </tr>

                    <tr>
                        <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="VAT.Message" defaultMessage="VAT Message" /></td>
                        <td className="t-Report-cell" align="right" headers="PRICE">{obj.cart_price.currency} <span>{obj.cart_price.VAT}</span>
                        </td>
                    </tr>
                </tbody>


            </>;

        }

        return (<><Spinner>
            <div className="t-Body-contentInner">
                {!this.props.orderDetailLoader && (<div className="Confirmation container">
                    <div className="row">
                        <form
                            id="main-login"
                            onSubmit={() => this.payFortPayment}
                            action="https://sbcheckout.payfort.com/FortAPI/paymentPage"
                            method='post'>
                            <div style={{ display: 'none' }}>
                                {paymentData}
                            </div>
                            <div className="col col-12 apex-col-auto" style={{ display: 'none' }}>
                                <button id="placeorderbycard" type="submit" className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop"><span className="t-Button-label">Place Order</span></button>
                            </div>
                        </form>
                        <div className="col col-12 apex-col-auto">
                            <div className="t-Wizard t-Wizard--showTitle t-Wizard--hideStepsXSmall" id="R284563376065624084">
                                <div className="t-Wizard-header">
                                    <h1 className="t-Wizard-title"><FormattedMessage id="delivery-details.Confirmation.Title" defaultMessage="Confirmation" /></h1>
                                    <div className="u-Table t-Wizard-controls">
                                        <div className="u-Table-fit t-Wizard-buttons" />
                                        <div className="u-Table-fill t-Wizard-steps">
                                            <input type="hidden" id="P9_TRD" name="P9_TRD" defaultValue={6598871} /><h2 className="u-VisuallyHidden">Current Progress</h2>
                                            <ul className="t-WizardSteps " id={34894189712949009}>
                                                <li className="t-WizardSteps-step is-complete" id="L34894440806949010">
                                                    <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker">
                                                        <span className="t-Icon a-Icon icon-check" /></span>
                                                        <span className="t-WizardSteps-label"><FormattedMessage id="signin.title" defaultMessage="Sign in" /> <span className="t-WizardSteps-labelState">(Completed)</span></span></div></li><li className="t-WizardSteps-step is-complete" id="L34894862176949011"><div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker"><span className="t-Icon a-Icon icon-check" /></span>
                                                            <span className="t-WizardSteps-label"><FormattedMessage id="delivery-details.Delivery.Title" defaultMessage="Delivery" /> <span className="t-WizardSteps-labelState">(Completed)</span></span></div></li><li className="t-WizardSteps-step is-complete" id="L34895210921949011"><div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker"><span className="t-Icon a-Icon icon-check" /></span><span className="t-WizardSteps-label"><FormattedMessage id="login.Payment.Title" defaultMessage="Payment" /> <span className="t-WizardSteps-labelState">(Completed)</span></span></div></li><li className="t-WizardSteps-step is-active" id="L34895615146949011"><div className="t-WizardSteps-wrap">
                                                                <span className="t-WizardSteps-marker" />
                                                                <span className="t-WizardSteps-label">
                                                                    <FormattedMessage id="delivery-details.Confirmation.Title" defaultMessage="Confirmation" />
                                                                    <span className="t-WizardSteps-labelState">(Active)</span></span></div></li></ul>
                                        </div>
                                        <div className="u-Table-fit t-Wizard-buttons" />
                                    </div>
                                </div>
                                <div className="t-Wizard-body">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg" id="R49007807511324853">
                                <div className="t-Region-header">
                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                        <h2 className="t-Region-title" id="R49007807511324853_heading">Order</h2>
                                    </div>
                                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                </div>
                                <div className="t-Region-bodyWrap">
                                    <div className="t-Region-buttons t-Region-buttons--top">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                    </div>
                                    <div className="t-Region-body">
                                        <div className="container">
                                            <Row className="row">
                                                <Col xs="12" lg="8" md="12">
                                                    <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none margin-left-none margin-right-none" id="R42439841578375836" style={{ borderTop: '1px solid #e1e1e1 !important', paddingTop: '15px' }}>
                                                        <div className="t-Region-header">
                                                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                <h2 className="t-Region-title" id="R42439841578375836_heading">New</h2>
                                                            </div>
                                                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                        </div>
                                                        <div className="t-Region-bodyWrap">
                                                            <div className="t-Region-buttons t-Region-buttons--top">
                                                                <div className="t-Region-buttons-left" />
                                                                <div className="t-Region-buttons-right" />
                                                            </div>
                                                            <div className="t-Region-body">
                                                                <div className="container">
                                                                    <Row className="row">



                                                                        {order_details_comp}


                                                                    </Row>



                                                                    <div className="row">
                                                                        <div className="col col-12 apex-col-auto">
                                                                            <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-bottom-none margin-right-none" id="PRDBASKET" aria-live="polite">
                                                                                <div className="t-Region-header">
                                                                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                        <h2 className="t-Region-title" id="PRDBASKET_heading"><FormattedMessage id="delivery-details.ShoppingBag.Title" defaultMessage="Shopping Bag" /></h2>
                                                                                    </div>
                                                                                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                </div>
                                                                                <div className="t-Region-bodyWrap">
                                                                                    <div className="t-Region-buttons t-Region-buttons--top">
                                                                                        <div className="t-Region-buttons-left" />
                                                                                        <div className="t-Region-buttons-right" />
                                                                                    </div>
                                                                                    <div className="t-Region-body">
                                                                                        <div id="report_241486053969939791_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_PRDBASKET" data-region-id="PRDBASKET">
                                                                                            <div className="t-Report-wrap">
                                                                                                <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                                                <div className="t-Report-tableWrap">
                                                                                                    <table className="t-Report-report" summary="Shopping Bag">
                                                                                                        <tbody>


                                                                                                            {cart_product_details}



                                                                                                        </tbody>
                                                                                                    </table>
                                                                                                </div>
                                                                                                <div className="t-Report-links" />
                                                                                                <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                                                                            </div>
                                                                                        </div></div>
                                                                                    </div>
                                                                                    <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                        <div className="t-Region-buttons-left" />
                                                                                        <div className="t-Region-buttons-right" />
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                <div className="t-Region-buttons-left" />
                                                                <div className="t-Region-buttons-right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xs="12" lg="4" md="12" className="apex-col-auto">
                                                    <div id="PRDSUMMARY" style={{ background: '#f4f4f4' }} className="margin-bottom-sm" aria-live="polite">
                                                        <div id="report_642869750741877756_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_PRDSUMMARY" data-region-id="PRDSUMMARY">
                                                            <div className="t-Report-wrap">
                                                                <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                <div className="t-Report-tableWrap">
                                                                    <table className="t-Report-report" summary="Order Summary">
                                                                        {cart_price_details}
                                                                    </table>
                                                                </div>
                                                                <div className="t-Report-links" />
                                                                <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                                            </div>
                                                        </div></div><div className="t-Region h-hidden-mobile  t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R42440385383375842" style={{ background: '#f4f4f4' }}>
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h2 className="t-Region-title" id="R42440385383375842_heading"><FormattedMessage id="OrderSummary.Text" defaultMessage="Order Summary" /></h2>
                                                                </div>
                                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                            </div>
                                                            <div className="t-Region-bodyWrap">
                                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                                <div className="t-Region-body">
                                                                    <hr />
                                                                    <h4 style={{ fontSize: '14px', lineHeight: '18px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal' }}>
                                                                        <FormattedMessage id="Customs.Text" defaultMessage="Customs Title" /></h4>
                                                                    <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal' }}>
                                                                        <FormattedMessage id="Customs.content" defaultMessage="Customs content" /></p>
                                                                    <hr /><div className="container">
                                                                        <div className="row">



                                                                            <div className="col col-12 apex-col-auto">
                                                                                {isClickOnPlaceOrder ?
                                                                                    <button className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" disabled={true}>
                                                                                        <img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} />
                                                                                        <span className="t-Button-label">Please wait.......</span>
                                                                                    </button> :
                                                                                    <button onClick={this.placeOrder} className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" id="COD_D">
                                                                                        <span className="t-Button-label"><FormattedMessage id="Place.Order.Text" defaultMessage="Place Order" /></span>
                                                                                    </button>
                                                                                }
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="t-Region-buttons t-Region-buttons--bottom">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div className="t-ButtonRegion t-Form--floatLeft hidden-desktop hide-buttons t-ButtonRegion--stickToBottom t-ButtonRegion--noPadding t-ButtonRegion--noUI t-Form--noPadding t-Form--xlarge t-Form--stretchInputs margin-top-none margin-bottom-none margin-left-none margin-right-none is-anchored" id="mobile-buttons" style={{ bottom: '0px' }}>
                                <div className="t-ButtonRegion-wrap">
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                        <h2 className="t-ButtonRegion-title" id="mobile-buttons_heading">Mobile Button</h2>
                                        <div className="Confirmation container">
                                            <div className="row">
                                                <div className="col col-2 ">
                                                    <button onClick={this.goToPaymentDetails} className="t-Button t-Button--noLabel t-Button--icon js-ignoreChange t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29297167193605136" title="Continue Shopping" aria-label="Continue Shopping"><span className="t-Icon fa fa-angle-left" aria-hidden="true" /></button>
                                                </div>

                                                <div className="col col-10 ">
                                                    <button onClick={this.placeOrder} className="t-Button t-Button--hot t-Button--large t-Button--stretch t-Button--gapTop" type="button" id="COD_D_M">{isClickOnPlaceOrder ? <span className="t-Button-label">Please wait.......</span> : <span className="t-Button-label"><FormattedMessage id="Place.Order.Text" defaultMessage="Place Order" /></span>}</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="t-ButtonRegion-buttons" />
                                    </div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
                {this.props.orderDetailLoader && <Spinner2 />}
            </div>
        </Spinner>
        </>);
    }
}

const mapStateToProps = state => {
    return {
        guest_checkout: state.guest_user,
        user_details: state.login,
        cart_details: state.myCart,
        global: state.global,
        order_summary: state.myCart.order_summary,
        payfort_data: state.productDetails.payfort_data,
        orderDetailLoader: state.myCart.orderDetailLoader
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnGetOrderDetails: (payload) => dispatch(actions.getOrderDetails(payload)),
        OnplaceOrder: (payload) => dispatch(actions.placeOrder(payload)),
        getPlaceOrder: (data) => dispatch(actions.getPlaceOrder(data)),
        onRedirectToPayment: () => dispatch(actions.redirectToPayment()),
        onRedirectToDelivery: () => dispatch(actions.redirectToDelivery()),
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        getSizeChart: payload => dispatch(actions.getSizeChart(payload)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
