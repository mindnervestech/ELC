import React, { Component } from 'react';

import OrderedItem from './orderedItem';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { FormattedMessage, injectIntl } from 'react-intl';
class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.myIntl = props.intl
        this.state = {
            order_id: new URLSearchParams(this.props.location.search).get('order-id'),
            order_increment_id: new URLSearchParams(this.props.location.search).get('order_increment_id')
        }

    }

    componentDidMount() {
    this.props.onGetOrderDetails({ 
                orderEntityid: this.state.order_id,
                store_id: this.props.globals.currentStore
            });
//        if (this.props.is_order_details_rec) {
//            
//        }
    }

    componentWillUnmount() {
        this.props.onClearState();
        //console.log('Unmounting');
    }

    gotoProductDetails = (item) => {
        const store_locale = this.props.globals.store_locale;

    const data = {
      customerid: typeof this.props.user_details.customer_id !== 'undefined' ? parseInt(this.props.user_details.customer_id) : " ",
      store: this.props.globals.currentStore,
      url_key: item.url_key,
    };

    this.props.onGetProductDetails(data);
    this.props.getSizeChart({
      store_id: this.props.globals.currentStore,
    });
    this.props.history.push(`/${this.props.globals.store_locale}/products-details/${item.url_key}`);
    }


    render() {
        //console.log('render : ', this.state);
        const ordered_item = this.props.items_ordered.map((c, index) => {
            return <OrderedItem
                item={c}
                key={index}
                gotoProductDetails={this.gotoProductDetails}
            />
        });

        let shipping_type = this.props.shipping_type;
        let payment_type = this.props.payment_method;
        let order_status = this.props.order_summary.order_status;
        if (payment_type == 'Cash On Delivery') {
        payment_type = <FormattedMessage id="OrderHistory.Payment.CashOnDel" defaultMessage="Cash On Delivery" />;
        } else if (payment_type == 'Pay By Card') {
            payment_type = <FormattedMessage id="OrderHistory.Payment.PayByCard" defaultMessage="Pay By Card" />;
        }

        if (shipping_type == 'Deliver to Address') {
            shipping_type = <FormattedMessage id="OrderHistory.Shipping.DelToAddress" defaultMessage="Deliver to Address" />;
        } else if (shipping_type == 'Pickup from Store') {
            shipping_type = <FormattedMessage id="OrderHistory.Shipping.PickUpFromStore" defaultMessage="Pickup from Store" />;
        }

        if (order_status == 'Ordered') {
            order_status = <FormattedMessage id="OrderHistory.OrderStatus.Ordered" defaultMessage="Ordered" />
        }

        return (<>
            <Spinner>
                <div className="t-Body-contentInner">
                    <div className="container">
                        <div className="row">
                            <div className="col col-12 apex-col-auto">
                                <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R56865384069397326">
                                    <div className="t-Region-header">
                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                            <h2 className="t-Region-title" id="R56865384069397326_heading">{this.myIntl.formatMessage({ id: 'OrderHistory.Order' })}</h2>
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
                                                <div className="row">
                                                    <div className="col col-12 apex-col-auto">
                                                        <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-left-none margin-right-none OrderSection" id="R50297418136448309">
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h2 className="t-Region-title" id="R50297418136448309_heading">{this.myIntl.formatMessage({ id: 'OrderHistory.New' })}</h2>
                                                                </div>
                                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                            </div>
                                                            <div className="t-Region-bodyWrap">
                                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                                <div className="t-Region-body">
                                                                    <hr className="divider-border" />
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col col-3 ">
                                                                                <div className="t-Region confirmation-info-header  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none ViewVoucher" id="R35739985666996314">
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
                                                                                            <p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>{this.state.order_increment_id}</p>
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div><div className="col col-3 ">
                                                                                <div className="t-Region confirmation-info-header  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none ViewVoucher" id="R1268865277649446800">
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
                                                                                                <p style={{ fontSize: '12px', letterSpacing: '0.1em' }}><span><strong>
                                                                                                <FormattedMessage id="DeliverTo.Text" defaultMessage="Deliver To" />:
                                                                                                </strong> {this.props.shipping_address.firstname}
                                                                                                    {this.props.shipping_address.lastname}<br />{this.props.shipping_address.street}<br />{this.props.shipping_address.city},{this.props.shipping_address.region}<br /> <a href={`tel:${this.props.shipping_address.telephone}`}>{this.props.shipping_address.telephone}</a></span></p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div><div className="col col-3 ">
                                                                                <div className="t-Region confirmation-info-header  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none ViewVoucher" id="R50297614336448311">
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
                                                                                            <p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>{shipping_type}</p>
                                                                                        </div>
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div><div className="col col-3 ">
                                                                                <div className="t-Region confirmation-info-header-last  t-Region--noBorder t-Region--hiddenOverflow margin-bottom-none ViewVoucher" id="R50297770282448313">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                            <h2 className="t-Region-title" id="R50297770282448313_heading"><FormattedMessage id="login.Payment.Title" defaultMessage="Payment" /></h2>
                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 200 }}>
                                                                                                {payment_type}</p>
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
                                                                                <div id="R35740113307996315" >
                                                                                    <hr className="divider" />
                                                                                </div>
                                                                            </div>
                                                                        </div><div className="row">
                                                                            <div className="col col-2 ">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </div><div className="col col-8 ">
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
                                                                                            <div id="report_249343630528012264_catch">
                                                                                            <div className="ViewVoucherSection t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_PRDBASKET" data-region-id="PRDBASKET">
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
                                                                            </div>
                                                                        </div><div className="row">
                                                                            <div className="col col-2 ">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </div><div className="col col-8 ">
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
                                                                                                                <tr><td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" /></td><td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.subtotal_incl_tax}</span></td></tr>
                                                                                                                <tr><td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Savings.Title" defaultMessage="Savings" /></td><td className="t-Report-cell" align="right" headers="PRICE"><span className="p-price"> {this.props.order_summary.currency} {this.props.order_summary.discount_amount}</span></td></tr>
                                                                                                                <tr><td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Shipping.Title" defaultMessage="Shipping" /></td><td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.shipping_amount}</span></td></tr>
                                                                                                                <tr><td className="t-Report-cell" headers="TYPE"><FormattedMessage id="Checkout.COD" defaultMessage="COD" /></td><td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.cod_charges}</span></td></tr>
                                                                                                                <tr><td className="t-Report-cell" headers="TYPE"><span className="order-total"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span></td><td className="t-Report-cell" align="right" headers="PRICE"><span className="order-total">{this.props.order_summary.currency}</span> <span className="order-total">{this.props.order_summary.grand_total}</span></td></tr>
                                                                                                                <tr><td className="t-Report-cell" headers="TYPE"><FormattedMessage id="VAT.Message" defaultMessage="VAT 5% Included" /></td><td className="t-Report-cell" align="right" headers="PRICE">{this.props.order_summary.currency} <span>{this.props.order_summary.tax_amount}</span></td></tr>
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
                                                                            </div>
                                                                        </div><div className="row">
                                                                            <div className="col col-2 ">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </div><div className="col col-8 ">
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
                                                                                                            <tbody><tr><td className="t-Report-cell" headers="APEX_LANG.LANG('ORDERSTATUS')"><FormattedMessage id="OrderStatus.Text" defaultMessage="Order Status" /></td><td className="t-Report-cell" align="right" headers="CODE_DESC"> {order_status} </td></tr>
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
                                                                        </div><div className="row">
                                                                            <div className="col col-2 ">
                                                                                <span className="apex-grid-nbsp">&nbsp;</span>
                                                                            </div><div className="col col-8 ">
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
                                                                                                            <tbody><tr><td className="t-Report-cell" headers="RESP_MSG">{payment_type}</td><td className="t-Report-cell" align="right" headers="TOTAL">{this.props.order_summary.currency} {this.props.order_summary.grand_total}</td></tr>
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
                                                                        </div><div className="row">
                                                                            <div className="col col-12 apex-col-auto">
                                                                                <div id="R35741415174996328" style={{ background: '#f4f4f4' }} className>
                                                                                    <input type="hidden" id="P10_ORD_SUM" name="P10_ORD_SUM" defaultValue="Y" />
                                                                                    <input type="hidden" data-for="P10_ORD_SUM" defaultValue="nNoXU_RWfdB-3xSaCI0b-EAj3b4rULax4TLbcPIz5CqX5Ff1XmJiLo_3G9WHVOKBNcbP9Xa247jUDfLupgKjRg" /><p style={{ fontSize: '12px', fontWeight: 200, textAlign: 'center' }}>
                                                                                      { this.props.order_summary.currency==="AED" ?
                                                                                        <FormattedMessage id="Customer.Service.text-uae" defaultMessage="Should you have any queries, contact our customer service by calling us at +8005654 or e-mail us to help@elctoys.com" />:
                                                                                        <FormattedMessage id="Customer.Service.text-ksa" defaultMessage="Should you have any queries, contact our customer service by calling us at +8001180009 or e-mail us to help@elctoys.com"/>}


                                                                                    </p>
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
            </Spinner>
        </>)
    }
}

const mapStateToProps = state => {
    return {
        is_order_details_rec: state.orders.is_order_details_rec,
        order_summary: state.orders.orders_details.order_summary,
        items_ordered: state.orders.orders_details.items_ordered,
        payment_method: state.orders.orders_details.payment_method,
        shipping_type: state.orders.orders_details.shipping_type,
        shipping_address: state.orders.orders_details.shipping_address,
        globals: state.global,
        user_details: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetOrderHistory: (payload) => dispatch(actions.getOrderHistory(payload)),
        onGetOrderDetails: (payload) => dispatch(actions.viewOrderDetails(payload)),
        onClearState: () => dispatch(actions.clearState()),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderDetails));