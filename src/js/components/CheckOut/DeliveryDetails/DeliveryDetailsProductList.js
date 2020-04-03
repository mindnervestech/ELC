import React, { Component } from "react";
import { Route, Link, Switch, Redirect, withRouter } from 'react-router-dom'
import CouponCode from "../Payment/Coupon";
import ShippingSpinner from '../../Spinner/ShippingSpinner';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import $ from 'jquery';

let show_gift_wrap_delivery_notes_area = false;
let path = null;
class DeliveryProductList extends Component {

    constructor(props) {
        super(props)


        this.state = {
            redirectToCart: false,
            subscribe_to_newsletter: 0,
            gift_wrap_delivery_notes: '',
            // is_same_day_delivery: false,
            // is_express_delivery: false,
            showTextAreaDiv:false


        }
        this.subscribe_to_newsletter = this.subscribe_to_newsletter.bind(this);
    }

    redirectToCart = () => {
        this.setState({
            redirectToCart: true
        })
    }

    // delivery_type = (value) => {

    //     setTimeout(() => {
    //         this.props.shipping_type(value)
    //     }, 100);

    // }

    // expreess_day_delivery = (e) => {

    // }

    priceView = (product) => {
        let cartProductPrice = null;

        if (product.special_price !== null) {
            cartProductPrice = (
                <td className="price"><span className="p-price" style={{fontSize:15}}>
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

    applyVoucode = (voucode) => {
        if (voucode == '') {
            return;
        }
        this.props.onApplyVoucode({
            store: this.props.global.currentStore,
            voucode: voucode,
            quoteid: this.props.cart_details.quote_id,
        });
    }

    removeVoucode = (voucode) => {
        this.props.onRemoveVoucode({
            store: this.props.global.currentStore,
            voucode: voucode,
            quoteid: this.props.cart_details.quote_id,
        });
    }

    subscribe_to_newsletter() {
        if (this.state.subscribe_to_newsletter === 0) {
            this.setState({ subscribe_to_newsletter: 1,showTextAreaDiv:true })

            setTimeout(() => {
                this.props.gift_wrap_required(this.state.subscribe_to_newsletter);
            }, 100);


        }
        else {
            this.setState({ subscribe_to_newsletter: 0,showTextAreaDiv:false })

            setTimeout(() => {
                this.props.gift_wrap_required(this.state.subscribe_to_newsletter);
            }, 100);
            // if(this.state.subscribe_to_newsletter===0){
            //     this.setState({show_gift_wrap_delivery_notes_area:true})
            // }
        }

    }

    handleGiftWrapText = (e) => {
        this.setState({ gift_wrap_delivery_notes: e.target.value })
        if (this.state.gift_wrap_delivery_notes !== ' ' && this.state.gift_wrap_delivery_notes !== undefined) {
            setTimeout(() => {
                this.props.gift_wrap_delivery_notes(this.state.gift_wrap_delivery_notes)
            }, 100);
        }
    }

    render() {

       let  pathname = this.props.location.pathname.split('/');
       path=pathname[pathname.length-1];
        $(document).ready(()=>{
        $("input").on("click", () => {
            if ($('#giftwrap').is(":checked")) {
                show_gift_wrap_delivery_notes_area = true;
            } else {
                show_gift_wrap_delivery_notes_area = false;
            }
        })
    });

        let coupan_code = null;
        if (this.state.redirectToCart) {
            this.props.onRedirectToCart();
            return <Redirect to={`/${this.props.store_locale}/cart`} />
        }

        if (this.props.coupan_code) {
            coupan_code = <CouponCode applyVoucode={this.applyVoucode} removeVoucode={this.removeVoucode} />
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
            {!this.props.cart_details.cart_data ? <ShippingSpinner /> :
                <div className="t-Region t-Region--noPadding t-Region--scrollBody margin-bottom-sm" id="PRDBASKET">
                    <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">

                            {/* <div className="row backWhite gift-wrap" >
                                <label class="checkBox gift-wrap-label">
                                    <FormattedMessage id="Giftwraprequired" defaultMessage="Gift wrap required" />
                                    <input type="checkbox" onClick={this.subscribe_to_newsletter}  ></input>
                                    <span class="checkmark"></span>
                                </label>
                            </div> */}
                        </div>

                    </div>
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
                                                                <div className="t-Report-tableWrap">
                                                                    <table className="t-Report-report" summary="Order Summary">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" /></td>
                                                                                <td className="t-Report-cell" align="right" headers="PRICE">{this.props.cart_details.currency} <span>{this.props.cart_details.cart_data.subtotal}</span></td>
                                                                            </tr>
                                                                            {this.props.cart_details.cart_data && this.props.cart_details.cart_data.discount_amount !== 0 ?
                                                                                <tr>
                                                                                    <td class="t-Report-cell" headers="TYPE"><FormattedMessage id="Savings.title" defaultMessage="Savings" /></td>
                                                                                    <td class="t-Report-cell" align="right" headers="PRICE"><span class="p-price">{this.props.cart_details.currency} {this.props.cart_details.cart_data.discount_amount}</span></td>
                                                                                </tr> : ''}
                                                                            {this.props.cart_details.cart_data && this.props.cart_details.cart_data.voucher_discount !== 0 ?
                                                                                <tr>
                                                                                    <td class="t-Report-cell" headers="TYPE"><FormattedMessage id="voucherdiscount" defaultMessage="voucher discount" /></td>
                                                                                    <td class="t-Report-cell" align="right" headers="PRICE"><span class="p-price">{this.props.cart_details.currency} {this.props.cart_details.cart_data.voucher_discount}</span></td>
                                                                                </tr> : ''}
                                                                             { path === 'checkout-payment' && this.props.cart_details.cart_data.shipping_amount !=0 ?
                                                                                <tr>
                                                                                    <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="delivery-details.Shipping.Title" defaultMessage="Shipping" /></td>
                                                                                    <td className="t-Report-cell" align="right" headers="PRICE">{this.props.cart_details.currency} <span>{this.props.cart_details.cart_data.shipping_amount}</span></td>
                                                                                </tr> : ''} 
                                                                            {path === 'delivery-details' ?
                                                                                <tr>
                                                                                    <td className="t-Report-cell" headers="TYPE"><span className="order-total"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span></td>
                                                                                    <td className="t-Report-cell" align="right" headers="PRICE"><span className="order-total">{this.props.cart_details.currency}</span> <span className="order-total">{this.props.cart_details.cart_data.grand_total_without_shipping_and_cod}</span></td>
                                                                                </tr> : ''}
                                                                            {path === 'checkout-payment' ? <tr>
                                                                                <td className="t-Report-cell" headers="TYPE"><span className="order-total"><FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" /></span></td>
                                                                                <td className="t-Report-cell" align="right" headers="PRICE"><span className="order-total">{this.props.cart_details.currency}</span> <span className="order-total">{this.props.cart_details.cart_data.grand_total_with_shipping}</span></td>
                                                                            </tr> : ''}
                                                                            {this.props.cart_details.cart_data && this.props.cart_details.cart_data.tax_amount !== 0 ?
                                                                                <tr>
                                                                                    <td className="t-Report-cell" headers="TYPE"><FormattedMessage id="VAT.Message" defaultMessage="VAT Message" /></td>
                                                                                    <td className="t-Report-cell" align="right" headers="PRICE">{this.props.cart_details.currency} <span>{this.props.cart_details.cart_data.tax_amount}</span></td>
                                                                                </tr> : ''}
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



                </div>}
            {path === 'delivery-details' ? <div>
                <div style={{ marginTop: 10, marginBottom: 10 }}>
                    <div className="row backWhite gift-wrap border-box" >
                  
                            <input id="giftwrap"  className="gift-box-checkmark checkBox gift-wrap-label" type="checkbox"  onClick={()=>this.subscribe_to_newsletter()}  ></input>
                            {/* <span className="checkmark"></span> */}
                        <label style={{top:1}} className="t-Form-label checkBox gift-wrap-label" >
                        <FormattedMessage id="Giftwraprequired" defaultMessage="Gift wrap required" />  
                        </label>
                        
                        { this.state.showTextAreaDiv ? <div>
                            <label style={{ paddingBottom: 10, paddingLeft: 0 }} className="padd-delivery-notes t-Form-label  gift-wrap-label" >
                                <FormattedMessage id="deliverynotes" defaultMessage="Delivery Notes" />
                            </label>
                            <textarea style={{ paddingTop: 10 }} disabled={!show_gift_wrap_delivery_notes_area} onChange={(e) => this.handleGiftWrapText(e)} >

                            </textarea>

                        </div>:<div></div>}


                    </div>
                </div>

                <div>
                {/* {this.props.same_day_delivery_allow === true || this.props.same_day_delivery === true ? <div>


                        <div className="t-Form-labelContainer">
                            <label style={{ fontWeight: 800 }} htmlFor="P7_ADDR_TYPE" id="P7_ADDR_TYPE_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.shippingmethods" defaultMessage="Shipping Methods" /></label>
                        </div>
                        <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel  apex-item-wrapper apex-item-wrapper--radiogroup " id="P7_ADDR_TYPE_CONTAINER">

                            <div className="t-Form-itemWrapper"><div tabindex="-1" id="P7_SHIPPING_METHOD" aria-labelledby="P7_SHIPPING_METHOD_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group"><div className="apex-item-grid radio_group"><div>
                               <div> <div className="shopping-div">
                                    <input type="radio" id="P7_SHIPPING_METHOD_0" name="P7_SHIPPING_METHOD" onClick={() => this.delivery_type("samedaydelivery_shipping_samedaydelivery_shipping")} /><label for="P7_SHIPPING_METHOD_0" className="shopping-method-text"><span>{this.props.data_shipping_methods_deliveryProductList[0].name}</span><span class="shopping-price">&nbsp;&nbsp;&nbsp;  {this.props.data_shipping_methods_deliveryProductList[0].charges} &nbsp;&nbsp;&nbsp; {this.props.cart_details.currency}</span>
                                    </label>
                                    <div className="shopping-sub-text-div">
                                        <label for="P7_SHIPPING_METHOD_0" className="shopping-sub-text"><span>{this.props.data_shipping_methods_deliveryProductList[0].description}</span></label></div></div> 
                                <div className="shopping-div">
                                    <input type="radio" id="P7_SHIPPING_METHOD_1" name="P7_SHIPPING_METHOD" onClick={() => this.delivery_type("express_shipping_express_shipping")} />
                                    <label for="P7_SHIPPING_METHOD_1" className="shopping-method-text"><span>{this.props.data_shipping_methods_deliveryProductList[1].name}</span>
                                        <span className="shopping-price">&nbsp;&nbsp;&nbsp;  {this.props.data_shipping_methods_deliveryProductList[1].charges} &nbsp;&nbsp;&nbsp; {this.props.cart_details.currency}</span></label><div class="shopping-sub-text-div"><label for="P7_SHIPPING_METHOD_1" class="shopping-sub-text"><span>{this.props.data_shipping_methods_deliveryProductList[1].description}</span></label>
                                    </div>
                                </div></div>
                            </div>
                            </div>
                            </div></div>
                           
                        </div>
                    </div>:<div></div>}
                </div> */}
                </div>
            </div> : <div />}


        </>);
    }
}

const mapStateToProps = state => {
    return {
        guest_checkout: state.guest_user,
        user_details: state.login,
        cart_details: state.myCart,
        global: state.global
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
        onApplyVoucode: (payload) => dispatch(actions.applyVoucode(payload)),
        onRemoveVoucode: (payload) => dispatch(actions.removeVoucode(payload))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeliveryProductList));
