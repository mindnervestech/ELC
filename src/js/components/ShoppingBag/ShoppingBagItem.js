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
import Popup from 'react-popup';
import Spinner from '../Spinner/Spinner2';

let productCount = 0
class ShoppingBagItem extends Component {

   constructor(props) {
      super(props);
      this.state={
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

    componentWillReceiveProps(nextProps){
        if(this.props.updateLoader){
            let popupMessage = null;
            popupMessage = Popup.register({
                title: 'Alert',
                content: `Quantity is updated`,
                buttons: {
                    right: [{
                        text: 'OK',
                        action: function () {
                            Popup.close();
                        }
                    }]
                }
            });
            Popup.queue(popupMessage);
        }
    }

    handleChange(item, index, e) {
        let { user_details, globals } = this.props;
        const { timeout } = this.state
        let qty =  e.target.value;
        if (timeout) {
            clearTimeout(timeout);
        }
        let popupMessage = null;
        this.setState({
            timeout: setTimeout(() => {
                if (item.is_in_stock && qty > 0) {
                    // this.setState({
                    //     prod_qty:{["item" + index] : qty}
                    // })
                    if (parseInt(item.is_in_stock.stock) <= parseInt(qty)) {
                        
                        let currentStore = this.props.globals.currentStore;
                        if (currentStore == 1 || currentStore == 3 || currentStore == 5) {
                            popupMessage = Popup.register({
                                title: 'محزر',
                                content: `الحد الأقصى لكمية الطلب من هذا المنتج هي ${parseInt(item.is_in_stock.stock)} يرجى تغيير الكمية المحددة لتكون ضمن هذا العدد. لطلب كمية أكثر من ${parseInt(item.is_in_stock.stock)} يرجى اللاتصال بنا.`,
                                buttons: {
                                    right: [{
                                        text: 'حسنا',
                                        action: function () {
                                            Popup.close();
                                        }
                                    }]
                                }
                            });
                            Popup.queue(popupMessage);
                        } else {
                            popupMessage = Popup.register({
                                title: 'Alert',
                                content: `This product has a maximum orderable quantity of ${parseInt(item.is_in_stock.stock)} Please update your selected quantity to be within this limit.To order quantity more than ${parseInt(item.is_in_stock.stock)} please contact us.`,
                                buttons: {
                                    right: [{
                                        text: 'OK',
                                        action: function () {
                                            Popup.close();
                                        }
                                    }]
                                }
                            });
                            Popup.queue(popupMessage);
                        }
                    }else{
                        let obj = {
                            product_id: item.id,
                            qty: qty,
                            quote_id:user_details.isUserLoggedIn ? user_details.customer_details.quote_id : this.props.guest_user.new_quote_id,
                            sku: item.sku,
                            store_id: globals.currentStore
                        }
                        this.props.OnChangeQty(obj);
                    }
                } else if(qty < 0){
                    // this.setState({
                    //     prod_qty:{["item" + index] : 0}
                    // })
                }
            }, 3000)
        });
        
    }

    render() {
        const product = this.props.cart_details.products;
        const store_locale = this.props.globals.store_locale;

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
        productCount = product.length
        return (<>
        
            <div className="homePage cardPage padding30" style={{ color: '#0D943F' }}>
                {this.props.updateLoader && <Spinner />}
                {!this.props.updateLoader && this.props.cart_details.products.length != 0 ?
                    <div>
                        <div className="cart-breadcrumb">
                            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                <span className="titleHover" style={{ fontSize: 15 }}>
                                    <FormattedMessage id="Checkout.Home" defaultMessage="Home" />&nbsp;\&nbsp;&nbsp;
                     </span>
                            </Link>
                            <span style={{ fontSize: 15, color: "#000", fontWeight: 'bold' }}><FormattedMessage id="header.mybasket" defaultMessage="My Basket" /></span>
                        </div>
                        <div className="wishlist-title cart-breadcrumb">
                            <label>
                                <FormattedMessage id="header.mybasket" defaultMessage="My Basket" />
                            </label>
                        </div>
                        <div className="displayDivOnWeb">
                            <Row className="row-5 changeRow">
                     <Col xs="6">
                        <div className="blackTitle" style={{ fontSize: 22, textAlign: 'start', color: "#4f4f4f" }}>
                           Select Delivery
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
                                 <div style={{ padding: '45px 20px 5px', fontWeight: 'bold' }}>
                                    <span>
                                    Available
                              </span>
                                 </div>
                              </div>
                              <div className="click-collect3">
                                 <div className="blockImage">
                                    <img src={freeCollect} style={{height: 60}}/>
                                 </div>
                                 <div className="blockTextColor">
                                    <span>Click & Collect at The Entertainer</span>
                                 </div>
                                 <div style={{ padding: '40px 20px 5px', fontWeight: 'bold' }}>
                                    <span><FormattedMessage id="Comingsoon" defaultMessage="Coming soon" /></span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Col>
                     <Col xs="3"></Col>
                     <Col xs="3" style={{ textAlign: 'end' }}>
                        <div>
                           <div className="blackTitle" style={{ fontSize: 22 }}>
                              <span>{productCount}&nbsp; <FormattedMessage id="Item.text" defaultMessage="Item" /> &nbsp; | &nbsp;{this.props.cart_details.currency}&nbsp;{this.props.cart_details.grand_total}</span>
                           </div>
                           <div>
                                <button className="alsoLikeCardButton" onClick={() => this.checkOut()}><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
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
                                    <Col xs="1" className="row-3" style={{ fontSize: 16, color: "#4f4f4f" }}>
                                        <span>{item.currency}&nbsp;{item.price}</span>
                                    </Col>
                                    <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 22, color: "#4f4f4f" }}>
                                        {/* <span className="qut">{item.qty}</span> */}
                                        <input type="number" className="increse-item-qty"
                                            onChange={this.handleChange.bind(this, item, index)} value={this.state.prod_qty["item" + index]} placeholder={item.qty}></input>
                                    </Col>
                                    <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 22, marginTop: '4.7%' }}>
                                        <span>{item.currency}&nbsp;{item.price * item.qty}</span>
                                    </Col>
                                    <Col xs="2" className="row-3 blackTitle"  style={{ textAlign: 'end'}}>
                                        <span className="remove" style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => this.remove(index)}>
                                            <FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" />
                                        </span>
                                    </Col>
                                </Row>
                            ))}
                            <Row className="changeRow">
                                <Col xs="6">
                                    <div style={{ paddingTop: 30, textAlign: 'start' }}>
                                        <input type="text" placeholder="Enter promo code" className="email-field"></input>
                                        <FormattedMessage id="ResetPassword.Apply.Text" defaultMessage="Apply">
                                        {(message) =>
                                        <input type="submit" value={message} className="submit-button"></input>
                                        }</FormattedMessage>
                                    </div>
                                </Col>
                                <Col xs="6">
                                    <div className="row-4" style={{ textAlign: 'start' }}>
                                        <div style={{ padding: '15px 25px', fontFamily: 'VAG Rounded ELC Light', color: "#4f4f4f" }}>
                                            <span><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" />:</span>
                                            <span className="floatRight">{this.props.cart_details.currency}&nbsp;{this.props.cart_details.subtotal}</span>
                                        </div>
                                        <div style={{ backgroundColor: '#eef8f2', padding: '15px 25px' }}>
                                            <span><FormattedMessage id="profile.OrderTotal.Title" defaultMessage="Order Total" /></span>
                                            <span className="floatRight">{this.props.cart_details.currency}&nbsp;{this.props.cart_details.grand_total}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                            <Row className="changeRow">
                                <Col xs="9"></Col>
                                <Col xs="3" style={{ textAlign: 'end' }}>
                                    {/* <Link to={`/${store_locale}/new-check-out`}> */}
                                    <div onClick={() => this.checkOut()}>
                                        <button className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                                    </div>
                                    {/* </Link> */}
                                </Col>
                            </Row>
                        </div>
                        <div className="hideDivOnMobile">
                            {/* <div className="blackTitle" style={{ fontSize: 20, paddingTop: 10 }}>
                     <span>Select Delivery</span><span className="floatRight">1 item | £99.99</span>
                  </div>
                  <div className="prod-color">
                     <div className="row del-options" style={{ textAlign: 'center' }}>
                        <div className="row home-deli" style={{ display: 'block' }}>
                           <img src={freeDelivery} />
                           <div style={{ padding: "30px 0px" }}>
                              <span>Home delivery</span>
                           </div>
                           <div style={{ padding: "20px 0px" }}>
                              <span style={{ color: '#ee0E19' }}>Out of stock</span>
                           </div>
                        </div>
                        <div className="row click-collect" style={{ display: 'block' }}>
                           <img src={freeCollect} />
                           <div style={{ padding: "30px 0px" }}>
                              <span>Click & Collect</span>
                           </div>
                           <div style={{ padding: "20px 0px" }}>
                              <a href=''>Change store</a>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div>
                     <Link to={`/${store_locale}/new-check-out`}>
                        <button className="alsoLikeCardButton">Check out</button>
                     </Link>
                  </div> */}

                            {product && product.map((item, index) => (

                                <div style={{ padding: '20px 0px', borderBottom: 'solid 1px #b1b1b1', color: "#4f4f4f" }}>
                                    <div style={{ marginTop: 10 }} >
                                        <span onClick={() => this.remove(index)} className="remove blackTitle floatRight" style={{ fontSize: 14, lineHeight: 1 }}>
                                            <FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" />
                                        </span>
                                    </div>
                                    <div>
                                        <Link to={`/${store_locale}/products-details/${item.url_key}`}>
                                            <img src={item.image[0]} className="cardImage"></img>
                                        </Link>
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
                                    <div className="row-3 blackTitle" style={{ fontSize: 16 }}>
                                        <span>{item.currency}&nbsp;{item.price}</span>
                                    </div>
                                    <div className="row-3 blackTitle" style={{ fontSize: 16, textAlign: 'start', color: "#4f4f4f" }}>
                                        <span><FormattedMessage id="Item.Qty" defaultMessage="Qty" />: </span>
                                        {/* <span className="qut">{item.qty}</span> */}
                                        <input type="number" className="increse-item-qty"
                                            onChange={this.handleChange.bind(this, item, index)} value={this.state.prod_qty["item" + index]} placeholder={item.qty}></input>
                                        <span className="floatRight" style={{ fontSize: 22, color: "#0D943F" }}>{item.currency}&nbsp;{item.price * item.qty}</span>
                                    </div>
                                </div>
                            ))}
                            <div style={{ paddingTop: 30, textAlign: 'start' }}>
                                <input type="text" placeholder="Enter promo code" className="email-field"></input>
                                <input type="submit" value="Apply" className="submit-button"></input>
                            </div>
                            <div className="row-4" style={{ textAlign: 'start' }}>
                                <div style={{ padding: '10px 10px', fontFamily: 'VAG Rounded ELC Light', fontSize: 20 }}>
                                    <span><FormattedMessage id="delivery-details.Subtotal.Title" defaultMessage="Subtotal" />:</span>
                                    <span className="floatRight">{this.props.cart_details.currency}&nbsp;{this.props.cart_details.subtotal}</span>
                                </div>
                                <div style={{ backgroundColor: '#eef8f2', padding: '10px 10px', fontSize: 25 }}>
                                    <span><FormattedMessage id="profile.OrderTotal.Title" defaultMessage="Order Total" /></span>
                                    <span className="floatRight">{this.props.cart_details.currency}&nbsp;{this.props.cart_details.grand_total}</span>
                                </div>
                            </div>
                            <div onClick={() => this.checkOut()}>
                                {/* <Link to={`/${store_locale}/new-check-out`}> */}
                                <button className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                                {/* </Link> */}
                            </div>
                        </div>
                    </div> :
                    !this.props.updateLoader ?
                        <div style={{ fontSize: 24, marginLeft: '5%', color: "#4f4f4f" }}>
                            <FormattedMessage id="Cart.YBE" defaultMessage="Your bag is empty." />
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
        updateLoader: state.myCart.update_loader
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