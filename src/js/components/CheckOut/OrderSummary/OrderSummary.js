import React, { Component } from 'react';

import OrderedItem from './orderedItem';
import Spinner from '../../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
 import { initializeF, trackF } from '../../utility/facebookPixel';
import { initializeGTMWithEvent } from '../../utility/googleTagManager';
import { live } from '../../../api/globals';
import { Row, Col } from 'reactstrap';
import cookie from 'react-cookies';
let Cryptr = require('cryptr');
let cryptr = null;

let success = 'true';
let orderNumber = '';
class OrderSummary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            order_id: null
        }
    }

    componentWillUnmount() {

        // this.props.onClearCartItem();
        //this.props.onClearCartItem();
    }

    componentDidUpdate(prevProps) {
        const query = new URLSearchParams(this.props.location.search);
        cryptr = new Cryptr(query.get('order_id'));
        if (prevProps.order_number != this.props.order_number) {
            let item = this.props.items_ordered;
            let ecomArray = [];
            for (let i = 0; i < item.length; i++) {
                console.log(item);
                ecomArray.push({
                    content_type: 'product',
                    sku: item[i].sku,
                    name: item[i].product_name ? item[i].product_name : 'Not set',
                    // category: this.props.facebook_catnames.length >= i ? this.props.facebook_catnames[i] : '',
                    price: parseInt(item[i].special_price) && (parseInt(item[i].special_price) !== parseInt(item[i].price)) ? parseFloat(item[i].special_price) : (parseInt(item[i].price)),
                    quantity: parseInt(item[i].qty_orderded)
                });
            }

            if (cookie.load('orderId') != this.props.order_number) {
                if (live) {
                    cookie.save('orderId', this.props.order_number, { path: '/' })
                    if (query.get('paytype') == 'COD') {
                        initializeGTMWithEvent({
                            event: 'ecom_transaction_completed',
                            transactionShipping: this.props.order_summary.shipping,
                            transactionTotal: this.props.order_summary.total,
                            transactionTax: this.props.order_summary.vat,
                            transactionCurrency: this.props.order_summary.currency,
                            transactionId: this.props.order_number,
                            transactionAffiliation: '',
                              transactionProducts: ecomArray
                        })
                    } else {
                        success = cryptr.decrypt(query.get('status'));
                        if (success == 'true') {
                            initializeGTMWithEvent({
                                event: 'ecom_transaction_completed',
                                transactionShipping: this.props.order_summary.shipping,
                                transactionTotal: this.props.order_summary.total,
                                transactionTax: this.props.order_summary.vat,
                                transactionCurrency: this.props.order_summary.currency,
                                transactionId: this.props.order_number,
                                transactionAffiliation: '',
                                transactionProducts: ecomArray
                            })
                        }
                    }
                }
            }
        }
    }
    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        cryptr = new Cryptr(query.get('order_id'));
        if (query.get('paytype') === 'COD') {
            this.props.orderJson({
                order_id: query.get('order_id')
            });
            this.props.setOrderSummary({
                store_id: this.props.globals.currentStore,
                order_id: query.get('order_id')
            });
            let string = window.location.href
            let data = string.split('=')
            orderNumber = data[data.length - 1];
            if (live) {
                initializeF()
                trackF('Purchase');
            }
        } else {
            //   success = query.get('status');
            success = cryptr.decrypt(query.get('status'));
            let string = window.location.href
            let data = string.split('=')
            orderNumber = data[2].split('&')[0]
            if (success === 'true') {
                this.props.orderJson({
                    order_id: query.get('order_id')
                });
                if (live) {
                    initializeF()
                    trackF('Purchase');
                }
            }
            if (query.get('order_id') && query.get('store_id')) {
                // success = query.get('status');
                success = cryptr.decrypt(query.get('status'));
                this.props.setOrderSummary({
                    store_id: this.props.globals.currentStore ? this.props.globals.currentStore : query.get('store_id'),
                    order_id: query.get('order_id')
                });
            }
        }
    }

    render() {
        let ordered_item = null;
        if (this.props.items_ordered) {
            ordered_item = this.props.items_ordered.map((c, index) => {
                return <OrderedItem
                    item={c}
                    key={index}
                    globals={this.props.globals}
                />
            });
        }
        let country = this.props.globals.country;

        return (<>
            {this.props.spinnerProduct ? <Spinner /> :
                <div className="t-Body-contentInner">
                    <div className="container">
                        <div className="row">
                            <div className="col col-12 apex-col-auto">
                                <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R56865384069397326">
                                    <div className="t-Region-header">
                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                            <h2 className="t-Region-title" id="R56865384069397326_heading">Orde</h2>
                                        </div>
                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                    </div>
                                    <div className="t-Region-bodyWrap">
                                        <div className="t-Region-buttons t-Region-buttons--top">
                                            <div className="t-Region-buttons-left" />
                                            <div className="t-Region-buttons-right" />
                                        </div>
                                        <div className="t-Region-body">
                                            {success === 'true' ?
                                                <p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 500, padding: '20px 16px 10px' }}>
                                                    <FormattedMessage id="Thankyou.Text" defaultMessage="Thankyou" />
                                                </p> :
                                                <p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 500, padding: '20px 16px 10px' }}>
                                                    <FormattedMessage id="Sorry.Text" defaultMessage="Sorry" />
                                                </p>}
                                            {success === 'true' ? <p style={{ padding: '0 16px 10px', fontSize: '15px' }}><FormattedMessage id="Thankyou.Content" defaultMessage="We have received your order, you'll receive a confirmation mail soon.." /></p> : <p style={{ padding: '0 16px 10px', fontSize: '15px' }}><FormattedMessage id="Sorry.Content" defaultMessage="Unable to process your order.You can try again or contact to our customer service agent for more information.." /></p>}

                                            <div className="container">
                                                <div className="row">
                                                    <div className="col col-12 apex-col-auto">
                                                        <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-left-none margin-right-none" id="R50297418136448309">
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h2 className="t-Region-title" id="R50297418136448309_heading">New</h2>
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
                                                                    <div className="container paddingRemove">
                                                                        <Row className="row">
                                                                            <Col xs="12" lg="3" md="3">
                                                                                <div className="t-Region confirmation-info-header2  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R35739985666996314">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="R35739985666996314_heading"><FormattedMessage id="profile.OrderNumber.Title" defaultMessage="OrderNumber" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            {orderNumber ?
                                                                                                <p className="paddingOnMobile0px10px" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>{orderNumber}</p>
                                                                                                : <p className="paddingOnMobile0px10px" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>{this.props.order_number}</p>}
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs="12" lg="3" md="3">
                                                                                <div className="t-Region confirmation-info-header2  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R1268865277649446800">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="R1268865277649446800_heading"><FormattedMessage id="Addresses.Text" defaultMessage="Addresses" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <div id="caddress">
                                                                                                <p style={{ fontSize: '12px', letterSpacing: '0.1em' }}><span><strong><FormattedMessage id="DeliverTo.Text" defaultMessage="Deliver To:" />&nbsp;</strong>
                                                                                                    {this.props.shipping_address.firstname ?
                                                                                                        this.props.shipping_address.firstname :
                                                                                                        this.props.shipping_address.deliver_to}
                                                                                                    {this.props.shipping_address.firstname ?
                                                                                                        this.props.shipping_address.lastname : ''}<br />
                                                                                                    {this.props.shipping_address.street}<br />
                                                                                                    {this.props.shipping_address.city},
                                                                                                    {this.props.shipping_address.country}<br />
                                                                                                    <a href={`tel:${this.props.shipping_address.telephone ?
                                                                                                        this.props.shipping_address.telephone : this.props.shipping_address.phone_number}`}>
                                                                                                        {this.props.shipping_address.telephone ?
                                                                                                            this.props.shipping_address.telephone : this.props.shipping_address.phone_number}</a></span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs="12" lg="3" md="3">
                                                                                <div className="t-Region confirmation-info-header2  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R50297614336448311">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="R50297614336448311_heading"><FormattedMessage id="login.Delivery.Title" defaultMessage="Delivery" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <p className="paddingOnMobile0px10px" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>
                                                                                                {this.props.shipping_type && <FormattedMessage id={`orderSummary.${(this.props.shipping_type.replace(/ /g, '')).toLowerCase()}.text`} defaultMessage={this.props.shipping_type} />}
                                                                                            </p>
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                            <Col xs="12" lg="3" md="3">
                                                                                <div className="t-Region confirmation-info-header-last confirmation-info-header2 t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none" id="R50297770282448313">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="R50297770282448313_heading"><FormattedMessage id="Payment.text" defaultMessage="Payment" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <p className="paddingOnMobile0px10px" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>
                                                                                                {this.props.payment_method && <FormattedMessage id={`orderSummary.${(this.props.payment_method.replace(/ /g, '')).toLowerCase()}.text`} defaultMessage={this.props.payment_method} />}</p>
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                        <div className="row">
                                                                            <div className="col col-12 apex-col-auto">
                                                                                <div id="R35740113307996315">
                                                                                    <hr />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <Row className="row">
                                                                            <Col xs="0" lg="2" md="2">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </Col>
                                                                            <Col xs="0" lg="8" md="8">
                                                                                <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-bottom-none margin-left-none margin-right-none" id="PRDBASKET" aria-live="polite">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="PRDBASKET_heading">BASKET</h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <div id="report_249343630528012264_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_PRDBASKET" data-region-id="PRDBASKET">
                                                                                                <div className="t-Report-wrap">
                                                                                                    <table className="t-Report-pagination" role="presentation"><tbody>


                                                                                                        <tr><td /></tr></tbody>

                                                                                                    </table>
                                                                                                    <div className="t-Report-tableWrap">


                                                                                                        {ordered_item}

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
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="row">
                                                                            <Col xs="0" lg="2" md="2">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </Col>
                                                                            <Col xs="12" lg="8" md="8">
                                                                                <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="TOTAL" style={{ background: '#f4f4f4' }} aria-live="polite">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="TOTAL_heading"><FormattedMessage id="OrderSummary.Text" defaultMessage="Order Summary" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <div id="report_650727327299950229_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--noBorders" id="report_TOTAL" data-region-id="TOTAL">
                                                                                                <div className="t-Report-wrap">
                                                                                                    <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                                                    <div className="t-Report-tableWrap">
                                                                                                        <table className="t-Report-report" summary="Order Summary">
                                                                                                            <tbody>
                                                                                                                <tr>
                                                                                                                    <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" /></td>
                                                                                                                    <td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.subtotal && Math.round(this.props.order_summary.subtotal)}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Shipping.Title" defaultMessage="Shipping" />
                                                                                                                    </td>
                                                                                                                    <td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.shipping && Math.round(this.props.order_summary.shipping)}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                {country !== 'UAE' && this.props.payment_method === 'Cash On Delivery' ?
                                                                                                                    <tr>
                                                                                                                        <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="Checkout.COD" defaultMessage="COD" />
                                                                                                                        </td>
                                                                                                                        <td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.COD && Math.round(this.props.order_summary.COD)}</span>
                                                                                                                        </td>
                                                                                                                    </tr> : ''}
                                                                                                                <tr>
                                                                                                                    <td className="t-Report-cell" headers="TYPE"><span className="order-total"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span>
                                                                                                                    </td>
                                                                                                                    <td className="t-Report-cell" align="right" headers="PRICE"><span className="order-total">{this.props.order_summary.currency}</span> <span className="order-total">{this.props.order_summary.total && Math.round(this.props.order_summary.total)}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                                <tr>
                                                                                                                    <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="VAT.Message" defaultMessage="VAT" />
                                                                                                                    </td>
                                                                                                                    <td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.vat}</span>
                                                                                                                    </td>
                                                                                                                </tr>
                                                                                                            </tbody>
                                                                                                        </table>
                                                                                                    </div>
                                                                                                    <div className="t-Report-links" />
                                                                                                    <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                                                                                </div>
                                                                                            </div></div><hr />
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="row">
                                                                            <Col xs="0" lg="2" md="2">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </Col>
                                                                            <Col xs="12" lg="8" md="8">
                                                                                <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="TOTAL" style={{ background: '#f4f4f4' }}>
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="TOTAL_heading"><FormattedMessage id="OrderStatus.Text" defaultMessage="Order Status" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <div id="report_35740345582996317_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--noBorders" id="report_TOTAL" data-region-id="TOTAL">
                                                                                                <div className="t-Report-wrap">
                                                                                                    <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                                                    <div className="t-Report-tableWrap">
                                                                                                        <table className="t-Report-report" summary="Order Status">
                                                                                                            <tbody><tr>
                                                                                                                <td className="t-Report-cell" headers="APEX_LANG.LANG('ORDERSTATUS')">
                                                                                                                    <FormattedMessage id="OrderStatus.Text" defaultMessage="Order Status" />
                                                                                                                </td>
                                                                                                                {/* {success == true ?  */}
                                                                                                                <td className="t-Report-cell" align="right" headers="CODE_DESC">{this.props.order_status}</td>
                                                                                                                {/*  : <td className="t-Report-cell" align="right" headers="CODE_DESC">
                                                                                                                    <FormattedMessage id="Paymentpending" defaultMessage="Payment pending" />
                                                                                                                    </td>
                                                                                                                 } */}
                                                                                                            </tr>
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
                                                                            </Col>
                                                                        </Row>
                                                                        <Row className="row">
                                                                            <Col xs="0" lg="2" md="2">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </Col>
                                                                            <Col xs="12" lg="8" md="8">
                                                                                <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="TOTAL" style={{ background: '#f4f4f4' }}>
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="TOTAL_heading"><FormattedMessage id="PaymentSummary.Text" defaultMessage="Payment Summary" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <div id="report_35740889716996323_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--noBorders" id="report_TOTAL" data-region-id="TOTAL">
                                                                                                <div className="t-Report-wrap">
                                                                                                    <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                                                                                    <div className="t-Report-tableWrap">
                                                                                                        <table className="t-Report-report" summary="Payment Summary">
                                                                                                            <tbody><tr><td className="t-Report-cell" headers="RESP_MSG">{this.props.payment_method && <FormattedMessage id={`orderSummary.${(this.props.payment_method.replace(/ /g, '')).toLowerCase()}.text`} defaultMessage={this.props.payment_method} />}</td><td className="t-Report-cell" align="right" headers="TOTAL">{this.props.order_summary.currency} {parseInt(this.props.order_summary.total)}</td></tr>
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
                                                                            </Col>
                                                                        </Row>
                                                                        {/* <div className="row">
                                                                            <div className="col col-12 apex-col-auto">
                                                                                <div id="R35741415174996328" style={{ background: '#f4f4f4' }}>
                                                                                    <input type="hidden" id="P10_ORD_SUM" name="P10_ORD_SUM" defaultValue="Y" />
                                                                                    <input type="hidden" data-for="P10_ORD_SUM" defaultValue="nNoXU_RWfdB-3xSaCI0b-EAj3b4rULax4TLbcPIz5CqX5Ff1XmJiLo_3G9WHVOKBNcbP9Xa247jUDfLupgKjRg" /><p style={{ fontSize: '12px', fontWeight: 200, textAlign: 'center' }}>
                                                                                        <FormattedMessage id="Customer.Service.text" defaultMessage="Customer Service" /></p>
                                                                                </div>
                                                                            </div>
                                                                        </div> */}
                                                                    </div>
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
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>)
    }
}

const mapStateToProps = state => {
    return {
        guest_checkout: state.guest_user,
        order_number: state.myCart.order_summary.order_data.order_number,
        order_status: state.orders.order_summary.order_data.status,
        order_summary: state.orders.order_summary.order_data.order_summary,
        items_ordered: state.orders.order_summary.order_data.product_details,
        payment_method: state.orders.order_summary.order_data.payment_type,
        shipping_type: state.orders.order_summary.order_data.delivery_type,
        shipping_address: state.orders.order_summary.order_data.address,
        globals: state.global,
        spinnerProduct: state.spinner.loading

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClearCartItem: () => dispatch(actions.clearCartItem()),
        setOrderSummary: (data) => dispatch(actions.setOrderSummary(data)),
        orderJson: (data) => dispatch(actions.orderJson(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);