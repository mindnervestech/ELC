import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import freeDelivery from '../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../assets/images/header/Mouse.svg';
import { Row, Col, Button } from 'reactstrap';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
// import { confirmAlert } from 'react-confirm-alert'; // Import
// import 'react-confirm-alert/src/react-confirm-alert.css'; 
import logo1 from '../../../assets/images/you_may_also_like_1.png'
import Popup from 'react-popup';
import Spinner from '../Spinner/Spinner2';
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

    handleChange(item, index, e) {
        console.log(this.props);
        let { user_details, globals } = this.props;
        const { timeout } = this.state
        if (timeout) {
            clearTimeout(timeout);
        }

        // this.setState({
            // timeout: setTimeout(() => {
                // if (item.is_in_stock) {
                //     console.log("hererer121212", e.target.value)
                //     if (parseInt(item.is_in_stock.stock) <= e.target.value) {
                //         console.log("hererer121212", e.target.value)
                //         let popupMessage = null;
                //         let currentStore = this.props.globals.currentStore;
                //         if (currentStore == 1 || currentStore == 3 || currentStore == 5) {
                //             popupMessage = Popup.register({
                //                 title: 'محزر',
                //                 content: `الحد الأقصى لكمية الطلب من هذا المنتج هي ${item.is_in_stock.stock} يرجى تغيير الكمية المحددة لتكون ضمن هذا العدد. لطلب كمية أكثر من ${item.is_in_stock.stock} يرجى اللاتصال بنا.`,
                //                 buttons: {
                //                     right: [{
                //                         text: 'حسنا',
                //                         action: function () {
                //                             Popup.close();
                //                         }
                //                     }]
                //                 }
                //             });
                //             Popup.queue(popupMessage);
                //         } else {
                //             popupMessage = Popup.register({
                //                 title: 'Alert',
                //                 content: `This product has a maximum orderable quantity of ${parseInt(item.is_in_stock.stock)} Please update your selected quantity to be within this limit.To order quantity more than ${parseInt(item.is_in_stock.stock)} please contact us.`,
                //                 buttons: {
                //                     right: [{
                //                         text: 'OK',
                //                         action: function () {
                //                             Popup.close();
                //                         }
                //                     }]
                //                 }
                //             });
                //             Popup.queue(popupMessage);
                //         }
                //         return;
                //     }
                // }
            // }, 3000)
        // });
        let obj = {
            product_id: item.id,
            qty: e.target.value,
            quote_id:user_details.isUserLoggedIn ? user_details.customer_details.quote_id : this.props.guest_user.new_quote_id,
            sku: item.sku,
            store_id: globals.currentStore
        }
        timeout: setTimeout(() => {
            this.props.OnChangeQty(obj);
        }, 3000)
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
                            {/* <Row className="row-5 changeRow">
                     <Col xs="6">
                        <div className="blackTitle" style={{ fontSize: 22 }}>
                           Select Delivery
                     </div>
                        <div className="prod-color">
                           <div className="row del-options">
                              <div className="row home-deli">
                                 <div style={{ width: "100%", textAlign: 'center' }}>
                                    <img src={freeDelivery} />
                                 </div>
                                 <div style={{ width: "100%", textAlign: 'center', padding: '10px 10px' }}>
                                    <span>Home delivery</span>
                                 </div>
                                 <div style={{ width: "100%", textAlign: 'center', padding: '10px 10px' }}>
                                    <span style={{ margin: '10px', color: '#ee0E19' }}>
                                       Out of stock
                              </span>
                                 </div>
                              </div>
                              <div className="row click-collect">
                                 <div style={{ width: "100%", textAlign: 'center' }}>
                                    <img src={freeCollect} />
                                 </div>
                                 <div style={{ width: "100%", textAlign: 'center', padding: '10px 10px' }}>
                                    <span>Click & Collect</span>
                                 </div>
                                 <div style={{ width: "100%", textAlign: 'center', padding: '10px 10px' }}>
                                    <span className="in-stock">In stock</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </Col>
                     <Col xs="3"></Col>
                     <Col xs="3" style={{ textAlign: 'end' }}>
                        <div>
                           <div className="blackTitle" style={{ fontSize: 22 }}>
                              <span>1 item | £99.99</span>
                           </div>
                           <div>
                              <Link to={`/${store_locale}/new-check-out`}>
                                 <button className="alsoLikeCardButton">Check out</button>
                              </Link>
                           </div>
                        </div>
                     </Col>
                  </Row> */}
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
                                            <span className="blackTitle" style={{ fontSize: 14, color: '#4f4f4f' }}>Product # : </span>
                                            <span style={{ fontSize: 14, color: '#4f4f4f' }}>{item.sku}</span>
                                        </div>
                                    </Col>
                                    <Col xs="1" className="row-3" style={{ fontSize: 16, color: "#4f4f4f" }}>
                                        <span>{item.currency}&nbsp;{item.price}</span>
                                    </Col>
                                    <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 22, color: "#4f4f4f" }}>
                                        {/* <span className="qut">{item.qty}</span> */}
                                        <input type="text" className="increse-item-qty"
                                            onChange={this.handleChange.bind(this, item, index)} value={this.state.prod_qty["item" + index]} placeholder={item.qty}></input>
                                    </Col>
                                    <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 22, marginTop: '4.7%' }}>
                                        <span>{item.currency}&nbsp;{item.price * item.qty}</span>
                                    </Col>
                                    <Col xs="2" className="row-3 blackTitle" onClick={() => this.remove(index)} style={{ textAlign: 'end', cursor: 'pointer' }}>
                                        <span className="remove" style={{ fontSize: 14 }}>
                                            <FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" />
                                        </span>
                                    </Col>
                                </Row>
                            ))}
                            <Row className="changeRow">
                                <Col xs="6">
                                    <div style={{ paddingTop: 30, textAlign: 'start' }}>
                                        <input type="text" placeholder="Enter promo code" className="email-field"></input>
                                        <input type="submit" value="Apply" className="submit-button"></input>
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
                                    <div style={{ marginTop: 10 }} onClick={() => this.remove(index)}>
                                        <span className="remove blackTitle floatRight" style={{ fontSize: 14, lineHeight: 1 }}>
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
                                            <span className="blackTitle" style={{ fontSize: 14, color: '#4f4f4f' }}>Product # : </span>
                                            <span style={{ fontSize: 14, color: '#4f4f4f' }}>{item.sku}</span>
                                        </div>
                                    </div>
                                    <div className="row-3 blackTitle" style={{ fontSize: 16 }}>
                                        <span>{item.currency}&nbsp;{item.price}</span>
                                    </div>
                                    <div className="row-3 blackTitle" style={{ fontSize: 16, textAlign: 'start', color: "#4f4f4f" }}>
                                        <span><FormattedMessage id="Item.Qty" defaultMessage="Qty" />: </span>
                                        <span className="qut">{item.qty}</span>
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
                            <FormattedMessage id="Cart.YBE" defaultMessage="Your bag is emapty." />
                        </div> : <div />}
            </div>

            {/* <tr>
            <td className="t-Report-cell" headers="PRODUCT_DESC">
               <table>
                  <tbody>
                     <tr>

                        <td className="Cart prdimg">
                              <a onClick={this.props.gotoProductDetail} style={{cursor: "pointer"}}>
                                    <img src={product.image[0]} />
                              </a>
                        </td>
                        <td className="prddesc">
                           <h2>{product.name}</h2>
                           {product.color && (<p><FormattedMessage id="Cart.Color.Title" defaultMessage="Color" />: {product.color}</p>)}
                           {product.size && (<p><FormattedMessage id="Cart.Size.Title" defaultMessage="Size" />: {product.size}</p>)}
                           <p>{product.sku}</p>
                           {parseInt(product.price)!=0 && (<a style={{ width: '80px' }} href="#" onClick={this.props.remove}><FormattedMessage id="Cart.Remove.Title" defaultMessage="Remove" /></a>)}
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
            <td className="t-Report-cell" align="right" headers="SUBTOTAL">
               <table className="qty">
                  <tbody>
                     <tr>
                        {cartProductPrice}
                     </tr>
                     <tr>
                        <td className="qtyid">
                          {parseInt(product.price)!=0  ? 
                           <FormattedMessage id="RemoveQuantity.Text" defaultMessage="Add Quantity">
                           {(message)=>  
                           <button className="t-Button t-Button--noLabel t-Button--icon  t-Button--noUI " onClick={this.props.dec} type="button" id="ITMBTN_2" title={message} aria-label="Dec" disabled={product.qty <= 1}>
                           <span className="t-Icon fa fa-minus" aria-hidden="true" /></button> 
                            }
                            </FormattedMessage>
                           : <span style={{width: 43}}></span> }
                           <input type="text" name="f02" size={3} maxLength={2000} defaultValue={product.qty} className="qtybox apex_disabled" qtyval="ITMBTN_2" min={1} max={10} id="a2"  value={product.qty}/>
                           {parseInt(product.price)!=0 ? 
                           <FormattedMessage id="AddQuantity.Text" defaultMessage="Add Quantity">
                           {(message)=>  
                            <button className="t-Button t-Button--noLabel t-Button--icon  t-Button--noUI" onClick={this.props.inc} type="button" id={2} title={message} aria-label="Add Quantity">
                            <span className="t-Icon fa fa-plus" aria-hidden="true" />
                            </button>
                            }
                            </FormattedMessage> : <span style={{width: 43}}></span> }
                        </td>
                     </tr>
                  </tbody>
               </table>
            </td>
         </tr> */}

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