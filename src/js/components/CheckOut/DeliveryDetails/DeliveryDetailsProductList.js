import React, { Component } from "react";
import { Route, Link, Switch, Redirect } from 'react-router-dom'
import CouponCode from "../Payment/Coupon";
import ShippingSpinner from '../../Spinner/ShippingSpinner';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';

class DeliveryProductList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            redirectToCart: false
        }
    }

    redirectToCart = () => {
        //console.log(' redirecting cart');
        this.setState({
            redirectToCart: true
        })
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
        let coupan_code = null;
        //console.log('this.props.store_locale :', this.props.store_locale);
        if (this.state.redirectToCart) {
            this.props.onRedirectToCart();
            return <Redirect to={`/${this.props.store_locale}/cart`} />
        }

        if (this.props.coupan_code) {
            coupan_code = <CouponCode />
        }

        let productItems = this.props.cart_details.products;
        let productItem = productItems.map((item, index) => {
            return (<tr>
                <td className="t-Report-cell" headers="PRODUCT_DESC">
                    <table>
                        <tbody>
                            <tr>
                                <td className="prdimg">
                                    <a onClick={() => this.props.gotoProductScreen(item)} style={{ cursor: 'pointer' }}>
                                        <img src={item.image[0]} />
                                    </a></td>
                                <td className="prddesc">
                                    <h2>{item.name} </h2>
                                    {item.color && (<p><FormattedMessage id="product.color" defaultMessage="Color" />: {item.color}</p>)}
                                    {item.size && (<p><FormattedMessage id="product.size" defaultMessage="Size" />: {item.size}</p>)}
                                    <p>{item.sku}</p>
                                    {this.priceView(item)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
                {/* <td className="t-Report-cell" align="right" headers="SUBTOTAL">
          <table className="qty">
            <tbody>
              <tr>
                {this.priceView(item)}
              </tr>
            </tbody>
          </table>
        </td> */}
            </tr>)
        })



        return (<>
            <ShippingSpinner>
                <div className="t-Region t-Region--noPadding t-Region--scrollBody margin-bottom-sm" id="PRDBASKET">
                    <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                            <h2 className="t-Region-title" id="PRDBASKET_heading"><FormattedMessage id="delivery-details.ShoppingBag.Title" defaultMessage="Shopping Bag" /></h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><button className="t-Button t-Button--noLabel t-Button--icon  t-Button--hot" onClick={this.redirectToCart} type="button" id="P7_EDIT" title="Edit" aria-label="Edit"><span className="t-Icon fa fa-edit" aria-hidden="true" /></button><span className="js-maximizeButtonContainer" /></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body">
                            <div className="container">

                                {coupan_code}

                                <div className="row">

                                    <div className="col col-12 apex-col-auto">
                                        <div className="t-Region r-h480  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-bottom-none" id="R34425355779836347" aria-live="polite">
                                            <div className="t-Region-header">
                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                    <h2 className="t-Region-title" id="R34425355779836347_heading"><FormattedMessage id="delivery-details.ShoppingBag.Title" defaultMessage="Shopping Bag" /></h2>
                                                </div>
                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                            </div>
                                            <div className="t-Region-bodyWrap">
                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                    <div className="t-Region-buttons-left" />
                                                    <div className="t-Region-buttons-right" />
                                                </div>
                                                <div className="t-Region-body">
                                                    <div id="report_34425355779836347_catch">
                                                        <div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_R34425355779836347" data-region-id="R34425355779836347">
                                                            <div className="t-Report-wrap">
                                                                <table className="t-Report-pagination" role="presentation">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="t-Report-tableWrap" style={{ overflow: 'hidden' }}>
                                                                    <table className="t-Report-report" summary="Shopping Bag">
                                                                        <tbody>


                                                                            {productItem}




                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="t-Report-links" />
                                                                <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
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
                                <div className="row">
                                    <div className="col col-12 apex-col-auto">
                                        <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-top-none margin-bottom-none" id="R621308466133696681" aria-live="polite">
                                            <div className="t-Region-header">
                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                    <h2 className="t-Region-title" id="R621308466133696681_heading">
                                                        <FormattedMessage id="OrderSummary.Text" defaultMessage="Order Summary" />
                                                    </h2>
                                                </div>
                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                            </div>
                                            <div className="t-Region-bodyWrap">
                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                    <div className="t-Region-buttons-left" />
                                                    <div className="t-Region-buttons-right" />
                                                </div>
                                                <div className="t-Region-body">
                                                    <div id="report_621308466133696681_catch">
                                                        <div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_R621308466133696681" data-region-id="R621308466133696681">
                                                            <div className="t-Report-wrap">
                                                                <table className="t-Report-pagination" role="presentation">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td />
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                                <div className="t-Report-tableWrap">
                                                                    <table className="t-Report-report" summary="Order Summary">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" /></td>
                                                                                <td className="t-Report-cell" align="right" headers="PRICE">{this.props.cart_details.currency} <span>{this.props.cart_details.subtotal}</span></td>
                                                                            </tr>

                                                                            <tr><td class="t-Report-cell" headers="TYPE"><FormattedMessage id="Savings.title" defaultMessage="Savings" /></td><td class="t-Report-cell" align="right" headers="PRICE"><span class="p-price">{this.props.cart_details.currency} {this.props.cart_details.discount_amount}</span></td></tr>

                                                                            <tr>
                                                                                <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Shipping.Title" defaultMessage="Shipping" /></td>
                                                                                <td className="t-Report-cell" align="right" headers="PRICE">{this.props.cart_details.currency} <span>0</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="t-Report-cell" headers="TYPE"><span className="order-total"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span></td>
                                                                                <td className="t-Report-cell" align="right" headers="PRICE"><span className="order-total">{this.props.cart_details.currency}</span> <span className="order-total">{this.props.cart_details.grand_total}</span></td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="VAT.Message" defaultMessage="VAT Message" /></td>
                                                                                <td className="t-Report-cell" align="right" headers="PRICE">{this.props.cart_details.currency} <span>6.14</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="t-Report-links" />
                                                                <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
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
            </ShippingSpinner>

        </>);
    }
}



const mapDispatchToProps = dispatch => {
    return {
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
    }

}

export default connect(null, mapDispatchToProps)(DeliveryProductList);
