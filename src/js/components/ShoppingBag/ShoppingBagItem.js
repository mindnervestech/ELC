import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import freeDelivery from '../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../assets/images/header/Mouse.svg';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
//import { confirmAlert } from 'react-confirm-alert'; // Import
//import 'react-confirm-alert/src/react-confirm-alert.css';
import NumericInput from 'react-numeric-input';
import Popup from 'react-popup';
import Spinner from '../Spinner/Spinner2';
import Alert from './AlertMsg';
import cookie from 'react-cookies';

let successFlag = false;
let stockSortageFlag = false;
let invalidValue = false
let stockSortageQTY = 0;
let productCount = 0
class ShoppingBagItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prod_qty: {
                item: '',
            },
            timeout: 0,
        }
    }
    remove = (index) => {
        //    confirmAlert({
        //   title: 'Confirm to yes',
        //   message: 'Are you sure to remove this product.',
        //   buttons: [
        //     {
        //       label: 'Yes',
        //       onClick: () => this.props.OnremoveProduct({ index: index })
        //     },
        //     {
        //       label: 'No',

        //     }
        //   ],
        //   closeOnEscape: true,
        //   closeOnClickOutside: true,
        //   willUnmount: () => {},
        //   onClickOutside: () => {},
        //   onKeypressEscape: () => {}
        // });
        this.props.OnremoveProduct({ index: index })
    }

    checkOut() {
        if (this.props.isUserLoggedIn) {
            // this.props.history.push(`/${this.props.globals.store_locale}/new-check-out`);
            this.props.history.push(`/${this.props.globals.store_locale}/delivery-details`);
        } else {
            this.props.history.push(`/${this.props.globals.store_locale}/checkout-login`);
        }
    }

    componentDidMount() {
        successFlag = false;
        stockSortageFlag = false;
        invalidValue = false;
    }

    handleChange(item, index, value) {
        let { user_details, globals } = this.props;
        const { timeout } = this.state
        let qty = value.target.value;
        if (timeout) {
            clearTimeout(timeout);
        }
        stockSortageFlag = false;
        successFlag = false;
        invalidValue = false;
        if (item.is_in_stock && qty > 0) {
            if (parseInt(item.is_in_stock.stock) < parseInt(qty)) {
                this.setState({
                    timeout: setTimeout(() => {
                        stockSortageQTY = item.is_in_stock.stock;
                        let obj = {
                            product_id: item.id,
                            qty: item.is_in_stock.stock,
                            quote_id: user_details.isUserLoggedIn ? user_details.customer_details.quote_id : this.props.guest_user.new_quote_id,
                            sku: item.sku,
                            store_id: globals.currentStore
                        }
                        this.props.OnChangeQty(obj);
                        stockSortageFlag = true;
                    }, 3000)
                });
            } else {
                this.setState({
                    timeout: setTimeout(() => {
                        let obj = {
                            product_id: item.id,
                            qty: qty,
                            quote_id: user_details.isUserLoggedIn ? user_details.customer_details.quote_id : this.props.guest_user.new_quote_id,
                            sku: item.sku,
                            store_id: globals.currentStore
                        }
                        successFlag = true;
                        this.props.OnChangeQty(obj);
                    }, 3000)
                });
            }
        } else {
            this.setState({
                timeout: setTimeout(() => {
                    let obj = {
                        product_id: item.id,
                        qty: qty,
                        quote_id: user_details.isUserLoggedIn ? user_details.customer_details.quote_id : this.props.guest_user.new_quote_id,
                        sku: item.sku,
                        store_id: globals.currentStore
                    }
                    invalidValue = true;
                    this.props.OnChangeQty(obj);
                }, 3000)
            });
        }
    }

    closeModal(type) {
        stockSortageFlag = false;
        successFlag = false;
        invalidValue = false
        this.setState({
            stockSortageFlag: true,
        })
    }

    render() {
        // const product = this.props.cart_details.products;
        const store_locale = this.props.globals.store_locale;
        let product = [];
        let myCartItem = {};
        
        if(localStorage.getItem('myCartItem') !== ''){
            myCartItem = JSON.parse(localStorage.getItem('myCartItem'));
            if(myCartItem){
                product = myCartItem.products;
            }
        }
        
        // console.log(cookie.load('myCartItem'));
        // console.log("this.props.cart_details this.props.cart_details",this.props.cart_details);
        let cartProductPrice;
        // if (product.special_price !== null) {
        //    cartProductPrice = (
        //       <td className="price"><span className="p-price">
        //          <span className="p-desc"><FormattedMessage id="Now.Text" defaultMessage="Now" /></span>
        //          <span className="p-currency">{product.currency}</span> {Math.round(parseFloat(product.special_price * product.qty))}</span>
        //          <br />
        //          <del className="p-desc"><FormattedMessage id="Was.Text" defaultMessage="Was" /><strong><span className="p-currency">{product.currency}</span> {parseFloat(product.price *  product.qty)}</strong></del><br />
        //          <span className="p-price-saving"><span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings"/></span>
        //             <span className="p-currency">{Math.round(( (product.price - product.special_price) / product.price) * 100)} %</span></span>
        //       </td>
        //    )
        // } else if(parseInt(product.price) == 0 ){
        //    cartProductPrice = (
        //       <td className="price">
        //          <FormattedMessage id="Free.text" defaultMessage="Free" /><br />
        //       </td>
        //    )
        // } else {
        //       cartProductPrice = (
        //             <td className="price">
        //                <span className="p-currency">{product.currency}</span> {parseInt(product.price *  product.qty)}<br />
        //             </td>
        //          )
        // }
        if(product){
            productCount = product.length
        }
        let visible_on_store = true;
        for (var i in product) {
            if (product[i].visible_on_store === false) {
                visible_on_store = false;
                break;
            }
        }
        let OutOfStockFlag = false;
        if (product) {
            for (var i in product) {
                if (product[i].is_in_stock.status == 0) {
                    OutOfStockFlag = true;
                }
            }
        }
        let outOfStockAlert = null;
        if (!visible_on_store || OutOfStockFlag) {
            outOfStockAlert = <Alert />
        }

        return (<>
            <div className="homePage cardPage padding30" style={{ color: '#0D943F' }}>
                {this.props.updateLoader && <Spinner />}
                <Popup />
                {outOfStockAlert}
                {!this.props.updateLoader && product && product.length != 0 ?
                    <div>
                        <div className="cart-breadcrumb">
                            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                <span className="titleHover" style={{ fontSize: 15 }}>
                                    <FormattedMessage id="Checkout.Home" defaultMessage="Home" />&nbsp;\&nbsp;&nbsp;
                                </span>
                            </Link>
                            <span style={{ fontSize: 15, color: "#000", fontWeight: 'bold' }}><FormattedMessage id="header.mybasket" defaultMessage="My Basket" /></span>
                        </div>
                        <div className="modal-cart-update">
                            {successFlag ?
                                <div className="updated-qty-msg">
                                <i className="close fa fa-times close-icon-update" aria-hidden="true" onClick={() => this.closeModal("stockSortageFlag")} />
                                    <FormattedMessage id="Productquantityhasbeenupdated" defaultMessage="Product quantity has been updated." />
                                </div>
                                : ''}
                            {stockSortageFlag ?
                                <div className="sort-storage-qty-msg" style={{position: 'relative'}}>
                                    <FormattedMessage id="StockShortage1" defaultMessage="STOCK SHORTAGE - we have added " />
                                    {stockSortageQTY}
                                    <i className="close fa fa-times close-icon-sort" aria-hidden="true" onClick={() => this.closeModal("successFlag")} />
                                    <FormattedMessage id="StockShortage2" defaultMessage=" units to your basket because we do not have enough stock." />
                                </div>
                                : ''}
                            {invalidValue ?
                                <div className="sort-storage-qty-msg">
                                <i className="close fa fa-times close-icon-sort" aria-hidden="true" onClick={() => this.closeModal("invalidValue")} />
                                    <FormattedMessage id="InvalidvalueQty" defaultMessage="Please provide a positive number to update the quantity of an item." />
                                </div>
                                : ''}
                        </div>
                        <div className="wishlist-title cart-breadcrumb">
                            <label>
                                <FormattedMessage id="header.mybasket" defaultMessage="My Basket" />
                            </label>
                        </div>
                        <div className="displayDivOnWeb">
                            <Row className="row-5 changeRow">
                                <Col xs="6" lg="6" md="8">
                                    <div className="blackTitle" style={{ fontSize: 22, textAlign: 'start', color: "#4f4f4f" }}>
                                        <FormattedMessage id="SelectDelivery" defaultMessage="Select Delivery" />
                                    </div>
                                    <div className="prod-color">
                                        <div className="row del-options">
                                            <div className="home-deli2">
                                                <div className="blockImage">
                                                    <img src={freeDelivery} />
                                                </div>
                                                <div className="blockTextColor">
                                                    <span><FormattedMessage id="delivery-details.HomeDelivery.Title" defaultMessage="Home Delivery" /></span>
                                                </div>
                                                <div className="webAvalebalText">
                                                    <span>
                                                        <FormattedMessage id="available" defaultMessage="Available" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="click-collect3">
                                                <div className="blockImage">
                                                    <img src={freeCollect} style={{ height: 60,verticalAlign: 'middle' }} />
                                                </div>
                                                <div className="blockTextColor" style={{ color: 'gray' }}>
                                                    <span><FormattedMessage id="ClickCollectatselectedELCStore" defaultMessage="Click & Collect at selected ELC Store" /></span>
                                                </div>
                                                <div className="webOutOfStockTetx" style={{ fontWeight: 'bold', color: 'gray' }}>
                                                    <span><FormattedMessage id="Comingsoon" defaultMessage="Coming soon" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="3" lg="3" md="0" className="divNotShowOnIpad"></Col>
                                <Col xs="3" lg="3" md="4" style={{ textAlign: 'end' }}>
                                    <div>
                                        <div className="blackTitle" style={{ fontSize: 22, color: "#4f4f4f" }}>
                                            <span>{productCount}&nbsp; <FormattedMessage id="Item.text" defaultMessage="Item" /> &nbsp; | &nbsp;{myCartItem.currency}&nbsp;{myCartItem.grand_total}</span>
                                        </div>
                                        <div>
                                            <button disabled={!visible_on_store || OutOfStockFlag} className="alsoLikeCardButton" onClick={() => this.checkOut()}><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="row-1 changeRow" style={{ textAlign: 'start', color: "#4f4f4f", fontSize: 14 }}>
                                <Col xs="3"></Col>
                                <Col xs="4">
                                    <span className="blackTitle">
                                        <FormattedMessage id="Item" defaultMessage="Item (style number)" />
                                    </span>
                                </Col>
                                <Col xs="1">
                                    <span className="blackTitle">
                                        <FormattedMessage id="cart.Price" defaultMessage="Price" />
                                    </span>
                                </Col>
                                <Col xs="1">
                                    <span className="blackTitle">
                                        <FormattedMessage id="Item.Qty" defaultMessage="Qty" />
                                    </span>
                                </Col>
                                <Col xs="1">
                                    <span className="blackTitle">
                                        <FormattedMessage id="delivery-details.Total.Title" defaultMessage="Total" />
                                    </span>
                                </Col>
                                <Col xs="2"></Col>
                            </Row>
                            {product && product.map((item, index) => (
                                <Row className="row-2 changeRow" style={{ textAlign: 'start' }}>
                                    <Col xs="3">
                                        <Link to={`/${store_locale}/products-details/${item.url_key}`}>
                                            <img src={item.image[0]} className="cardImage"></img>
                                        </Link>
                                    </Col>
                                    <Col xs="4">
                                        <div>
                                            <Link to={`/${store_locale}/products-details/${item.url_key}`}>
                                                <span className="blackTitle" style={{ fontSize: 16, color: "#0D943F" }}>{item.name}</span>
                                            </Link>
                                        </div>
                                        <div>
                                            <span className="blackTitle" style={{ fontSize: 14, color: '#4f4f4f' }}><FormattedMessage id="product" defaultMessage="Product" /> # : </span>
                                            <span style={{ fontSize: 14, color: '#4f4f4f' }}>{item.sku}</span>
                                        </div>
                                    </Col>
                                    {item.visible_on_store ?
                                        <Col xs="1" className="row-3" style={{ fontSize: 16, color: "#4f4f4f" }}>
                                            {item.special_price ?
                                                <div>
                                                    <span>{item.currency}&nbsp;{item.special_price}</span>
                                                    <div style={{ "text-decoration-line": "line-through", color: '#b3b3b3' }}>{item.currency}&nbsp;{item.price}</div>
                                                </div>
                                                :
                                                <span>{item.currency}&nbsp;{item.price}</span>
                                            }
                                        </Col>
                                        : ''}
                                    {item.visible_on_store && item.is_in_stock.status == 1 ?
                                        <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 22, color: "#4f4f4f" }}>
                                            {/* <span className="qut">{item.qty}</span> */}
                                            {/* <NumericInput max={500} min={1} className="increse-item-qty"
                                            onChange={this.handleChange.bind(this, item, index)} placeholder={item.qty}></NumericInput> */}
                                            <input
                                                type="text"
                                                id="P3_QTY"
                                                name="P3_QTY"
                                                maxLength="7"
                                                min={1}
                                                placeholder={item.qty}
                                                onChange={this.handleChange.bind(this, item, index)}
                                                className="increse-item-qty"
                                            />
                                        </Col> : ""}
                                    {item.visible_on_store && item.is_in_stock.status == 1 ?
                                        <Col xs="2" className="row-3 blackTitle" style={{ fontSize: 22, marginTop: '4.7%' }}>
                                            {item.special_price ?
                                                <span>{item.currency}&nbsp;{item.special_price * item.qty}</span>
                                            :<span>{item.currency}&nbsp;{item.price * item.qty}</span>}
                                        </Col>
                                        : ''
                                    }
                                    {!item.visible_on_store ?
                                        <Col xs="3" className="row-9">
                                            <div style={{ fontSize: '18px', color: 'red', marginBottom: '30px' }}>
                                                <FormattedMessage id="NotAvailableforcurrentstoreDelivery" defaultMessage="Not Available for current store Delivery" />
                                            </div>
                                        </Col> : ''}
                                    {item.is_in_stock.status == 0 ?
                                        <Col xs="1" className="row-9" style={{ marginTop: '64px', padding: 0 }}>
                                            <span style={{ fontSize: '18px', color: '#ee0E19', marginBottom: '30px' }}>
                                                <FormattedMessage id="PDP.OutOfStock" defaultMessage="Out of Stock" />
                                            </span>
                                        </Col> : ''}
                                    <Col xs="1" className="row-3 blackTitle" style={{ textAlign: 'end' }}>
                                        <span className="remove" style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => this.remove(index)}>
                                            <FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" />
                                        </span>
                                    </Col>
                                </Row>
                            ))}
                            <Row className="changeRow">
                                <Col xs="6">
                                    {/* <div style={{ paddingTop: 30, textAlign: 'start' }}>
                                        <input type="text" placeholder="Enter promo code" className="email-field"></input>
                                        <FormattedMessage id="ResetPassword.Apply.Text" defaultMessage="Apply">
                                            {(message) =>
                                                <input type="submit" value={message} className="submit-button"></input>
                                            }</FormattedMessage>
                                    </div> */}
                                </Col>
                                <Col xs="6">
                                    <div className="row-4" style={{ textAlign: 'start' }}>
                                        <div className="cart-subtotal">
                                            <span><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" />:</span>
                                            <span className="floatRight">{myCartItem.currency}&nbsp;{myCartItem.subtotal}</span>
                                        </div>
                                        <div style={{ backgroundColor: '#eef8f2', padding: '15px 25px' }}>
                                            <span><FormattedMessage id="profile.OrderTotal.Title" defaultMessage="Order Total" /></span>
                                            <span className="floatRight">{myCartItem.currency}&nbsp;{myCartItem.grand_total}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="changeRow">
                                <Col xs="9"></Col>
                                <Col xs="3" style={{ textAlign: 'end' }}>
                                    {/* <Link to={`/${store_locale}/new-check-out`}> */}
                                    <div>
                                        <button disabled={!visible_on_store || OutOfStockFlag} onClick={() => this.checkOut()} className="alsoLikeCardButton" style={{ marginTop: 30 }}><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                                    </div>
                                    {/* </Link> */}
                                </Col>
                            </Row>
                        </div>
                        <div className="hideDivOnMobile">
                            <div className="blackTitle" style={{ fontSize: 18, padding: '10px 0px', color: "#4f4f4f" }}>
                                <span><FormattedMessage id="SelectDelivery" defaultMessage="Select Delivery" /></span><span className="floatRight">{productCount}&nbsp; <FormattedMessage id="Item.text" defaultMessage="Item" /> &nbsp;|&nbsp;{myCartItem.currency}&nbsp;{myCartItem.grand_total}</span>
                            </div>
                            <div className="prod-color" style={{ color: "#4f4f4f" }}>
                                <div>
                                    <div id="mobile-home-deli" className="home-deli" style={{ display: 'block', display: 'inline-block', textAlign: 'center', width: "48%" }}>
                                        <img src={freeDelivery} />
                                        <div style={{ padding: "30px 10px", height: 140, width: '100%' }} className="blockTextColor">
                                            <span><FormattedMessage id="delivery-details.HomeDelivery.Title" defaultMessage="Home Delivery" /></span>
                                        </div>
                                        <div>
                                            <span style={{ color: '#0D943F', fontWeight: 'bold' }}><FormattedMessage id="available" defaultMessage="Available" /></span>
                                        </div>
                                    </div>
                                    <div id="mobile-click-colect" className="click-collect" style={{ display: 'inline-block', textAlign: 'center', verticalAlign: 'top', width: "48%" }}>
                                        <img src={freeCollect} />
                                        <div style={{ padding: "30px 10px", height: 140, width: '100%', color: 'gray' }} className="blockTextColor">
                                            <span><FormattedMessage id="ClickCollectatselectedELCStore" defaultMessage="Click & Collect at selected ELC Store" /></span>
                                        </div>
                                        <div style={{ fontWeight: 'bold', color: 'gray' }}>
                                            <span><FormattedMessage id="Comingsoon" defaultMessage="Coming soon" /></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button disabled={!visible_on_store || OutOfStockFlag} onClick={() => this.checkOut()} className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                            </div>

                            {product && product.map((item, index) => (

                                <div style={{ padding: '20px 0px', borderBottom: 'solid 1px #b1b1b1', color: "#4f4f4f" }}>
                                    <div style={{ display: 'inline-block', width: "80%" }}>
                                        <Link to={`/${store_locale}/products-details/${item.url_key}`}>
                                            <img src={item.image[0]} className="cardImage"></img>
                                        </Link>
                                    </div>
                                    <div style={{ display: 'inline-block', width: "18%", verticalAlign: 'top' }} >
                                        <span onClick={() => this.remove(index)} className="remove blackTitle floatRight" style={{ fontSize: 14, lineHeight: 1 }}>
                                            <FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" />
                                        </span>
                                    </div>
                                    <div style={{ marginTop: 20 }}>
                                        <div>
                                            <Link to={`/${store_locale}/products-details/${item.url_key}`}>
                                                <span className="blackTitle" style={{ fontSize: 16, color: "#0D943F" }}>{item.name}</span>
                                            </Link>
                                        </div>
                                        <div>
                                            <span className="blackTitle" style={{ fontSize: 14, color: '#4f4f4f' }}><FormattedMessage id="product" defaultMessage="Product" /> # : </span>
                                            <span style={{ fontSize: 14, color: '#4f4f4f' }}>{item.sku}</span>
                                        </div>
                                    </div>
                                    {item.is_in_stock.status == 0 ? <span style={{ fontSize: '18px', color: '#ee0E19' }}>
                                        <FormattedMessage id="PDP.OutOfStock" defaultMessage="Out of Stock" />
                                    </span> : ''}
                                    {item.visible_on_store && item.is_in_stock.status == 1 ?
                                        <div className="row-3 blackTitle" style={{ fontSize: 16 }}>
                                            <span>{item.currency}&nbsp;{item.price}</span>
                                        </div> : ''}
                                    {item.visible_on_store && item.is_in_stock.status == 1 ?
                                        <div className="row-3 blackTitle" style={{ fontSize: 16, textAlign: 'start', color: "#4f4f4f" }}>
                                            <span><FormattedMessage id="Item.Qty" defaultMessage="Qty" />: </span>
                                            {/* <span className="qut">{item.qty}</span> */}
                                            {/* <input type="number" className="increse-item-qty"
                                            onChange={this.handleChange.bind(this, item, index)} value={this.state.prod_qty["item" + index]} placeholder={item.qty}></input> */}
                                            {/* <NumericInput max={500} min={1} className="increse-item-qty"
                                            onChange={this.handleChange.bind(this, item, index)} placeholder={item.qty}></NumericInput> */}
                                            <input
                                                type="number"
                                                id="P3_QTY"
                                                name="P3_QTY"
                                                maxLength="8"
                                                min={1}
                                                value={this.state.defaultQty}
                                                placeholder={item.qty}
                                                onChange={this.handleChange.bind(this, item, index)}
                                                className="increse-item-qty"
                                            />
                                            <span className="floatRight" style={{ fontSize: 22, color: "#0D943F" }}>{item.currency}&nbsp;{item.price * item.qty}</span>
                                        </div> :
                                        ''
                                    }
                                    {!item.visible_on_store ?
                                        <div style={{ fontSize: '18px', color: 'red', marginBottom: '30px' }}>
                                            <FormattedMessage id="NotAvailableforcurrentstoreDelivery" defaultMessage="Not Available for current store Delivery" />
                                        </div> : ''}
                                </div>
                            ))}
                            {/* <div style={{ paddingTop: 30, textAlign: 'start' }}>
                                <input type="text" placeholder="Enter promo code" className="email-field"></input>
                                <input type="submit" value="Apply" className="submit-button"></input>
                            </div> */}
                            <div className="row-4" style={{ textAlign: 'start' }}>
                                <div style={{ padding: '10px 10px', fontFamily: 'VAG Rounded ELC Light', fontSize: 18, color: '#4f4f4f' }}>
                                    <span><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" />:</span>
                                    <span className="floatRight">{myCartItem.currency}&nbsp;{myCartItem.subtotal}</span>
                                </div>
                                <div style={{ backgroundColor: '#eef8f2', padding: '10px 10px', fontSize: 24 }}>
                                    <span><FormattedMessage id="profile.OrderTotal.Title" defaultMessage="Order Total" /></span>
                                    <span className="floatRight">{myCartItem.currency}&nbsp;{myCartItem.grand_total}</span>
                                </div>
                            </div>
                            <div >
                                <button disabled={!visible_on_store || OutOfStockFlag} onClick={() => this.checkOut()} className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                            </div>
                        </div>
                    </div> :
                    !this.props.updateLoader ?
                        <div style={{ fontSize: 24, marginLeft: '5%', color: "#4f4f4f" }}>
                            <FormattedMessage id="Cart.YBE" defaultMessage="Your basket is empty." />
                        </div> : <div />}
            </div>
        </>)
    }
}

const mapStateToProps = state => {
    return {
        cart_details: state.myCart,
        user_details: state.login,
        guest_user: state.guest_user,
        change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        cartLoader: state.myCart.loader,
        updateLoader: state.myCart.update_loader,
        qtyData: state.myCart.qtyData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onStartGuestCheckout: () => dispatch(actions.startGuestCheckout()),
        OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        OnChangeQty: (quoteId) => dispatch(actions.changeQty(quoteId)),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
        OnremoveProduct: (quoteId) => dispatch(actions.removeProduct(quoteId)),
        onGetStoreIds: () => dispatch(actions.getStoreIds()),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(ShoppingBagItem)));

// export default ShoppingBagItem;