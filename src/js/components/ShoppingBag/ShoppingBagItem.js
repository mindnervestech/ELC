import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import freeDelivery from '../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../assets/images/header/Mouse.svg';
import { Row, Col, Button } from 'reactstrap';
import logo1 from '../../../assets/images/you_may_also_like_1.png'

class ShoppingBagItem extends Component {

   constructor(props) {
      super(props);
   }

   render() {
      const product = this.props.product;
      const store_locale = this.props.store_locale;

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
         <div className="homePage cardPage padding30" style={{ color: '#407ec9' }}>
            <div>
               <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                  <span className="titleHover">Home</span>
               </Link>
               <span>  > Basket</span>
            </div>
            <div className="wishlist-title">
               <label>
                  Basket
               </label>
            </div>
            <div className="displayDivOnWeb">
               <Row className="row-5 changeRow">
                  <Col xs="6">
                     <div className="blackTitle" style={{ fontSize: 22 }}>
                        Select Delivery
                     </div>
                     <div className="prod-color">
                        <div className="row del-options">
                           <div className="row home-deli">
                           <div style={{width: "100%", textAlign: 'center'}}>
                           <img src={freeDelivery} />
                           </div>
                              <div style={{width: "100%", textAlign: 'center', padding: '10px 10px'}}>
                                 <span>Home delivery</span>
                              </div>
                              <div style={{width: "100%", textAlign: 'center', padding: '10px 10px'}}>
                              <span style={{ margin: '10px', color: '#ee0E19' }}>
                                 Out of stock
                              </span>
                              </div>
                           </div>
                           <div className="row click-collect">
                           <div style={{width: "100%", textAlign: 'center'}}>
                           <img src={freeCollect}/>
                           </div>
                              <div style={{width: "100%", textAlign: 'center', padding: '10px 10px'}}>
                                 <span>Click & Collect</span>
                              </div>
                              <div style={{width: "100%", textAlign: 'center', padding: '10px 10px'}}>
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
                           <Link to={`/saudi-en/new-check-out`}>
                              <button className="alsoLikeCardButton">Check out</button>
                           </Link>
                        </div>
                     </div>
                  </Col>
               </Row>
               <Row className="row-1 changeRow" style={{textAlign: 'start'}}>
                  <Col xs="3">

                  </Col>
                  <Col xs="4">
                     <span className="blackTitle" style={{ fontSize: 14 }}>Item</span>
                  </Col>
                  <Col xs="1">
                     <span className="blackTitle" style={{ fontSize: 14 }}>Price</span>
                  </Col>
                  <Col xs="1">
                     <span className="blackTitle" style={{ fontSize: 14 }}>Qty</span>
                  </Col>
                  <Col xs="1">
                     <span className="blackTitle" style={{ fontSize: 14 }}>Total</span>
                  </Col>
                  <Col xs="2">

                  </Col>
               </Row>
               <Row className="row-2 changeRow" style={{textAlign: 'start'}}>
                  <Col xs="3">
                     <img src={logo1} className="cardImage"></img>
                  </Col>
                  <Col xs="4">
                     <span className="blackTitle" style={{ fontSize: 16 }}>L.O.L SURPRISE 2-IN-1 GLAMPER PLAYSET</span>
                  </Col>
                  <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 16 }}>
                     <span>£99.99</span>
                  </Col>
                  <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 16 }}>
                     <span className="qut">1</span>
                  </Col>
                  <Col xs="1" className="row-3 blackTitle" style={{ fontSize: 22 }}>
                     <span>£99.99</span>
                  </Col>
                  <Col xs="2" className="row-3 blackTitle" style={{ textAlign: 'end' }}>
                     <span className="remove" style={{ fontSize: 14 }}>Remove</span>
                  </Col>
               </Row>
               <Row className="changeRow">
                  <Col xs="6">
                     <div style={{ paddingTop: 30, textAlign: 'start'}}>
                        <input type="text" placeholder="Enter promo code" className="email-field"></input>
                        <input type="submit" value="submit" className="submit-button"></input>
                     </div>
                  </Col>
                  <Col xs="6">
                     <div className="row-4">
                        <div style={{ padding: '15px 25px', fontFamily: 'VAG Rounded ELC Light' }}>
                           <span>Subtotal:</span><span className="floatRight">£99.99</span>
                        </div>
                        <div style={{ backgroundColor: '#e9f7ff', padding: '15px 25px' }}>
                           <span>Order Total</span><span className="floatRight">£99.99</span>
                        </div>
                     </div>
                  </Col>
               </Row>
               <Row className="changeRow">
                  <Col xs="9"></Col>
                  <Col xs="3" style={{ textAlign: 'end' }}>
                     <Link to={`/saudi-en/new-check-out`}>
                        <button className="alsoLikeCardButton">Check out</button>
                     </Link>
                  </Col>
               </Row>
            </div>
            <div className="hideDivOnMobile">
               <div className="blackTitle" style={{ fontSize: 20, paddingTop: 10 }}>
                  <span>Select Delivery</span><span className="floatRight">1 item | £99.99</span>
               </div>
               <div className="prod-color">
                  <div className="row del-options" style={{textAlign: 'center'}}>
                     <div className="row home-deli" style={{display: 'block'}}>
                        <img src={freeDelivery} />
                        <div style={{padding: "30px 0px"}}>
                           <span>Home delivery</span>
                        </div>
                        <div style={{padding: "20px 0px"}}>
                        <span style={{color: '#ee0E19' }}>Out of stock</span>
                        </div>
                     </div>
                     <div className="row click-collect" style={{display: 'block'}}>
                        <img src={freeCollect} />
                        <div style={{padding: "30px 0px"}}>
                           <span>Click & Collect</span>
                        </div>
                        <div style={{padding: "20px 0px"}}>
                           <a href=''>Change store</a>
                        </div>
                     </div>
                  </div>
               </div>
               <div>
                  <Link to={`/saudi-en/new-check-out`}>
                     <button className="alsoLikeCardButton">Check out</button>
                  </Link>
               </div>
               <div style={{ marginTop: 10 }}>
                  <span className="remove blackTitle floatRight" style={{ fontSize: 14, lineHeight: 1 }}>Remove</span>
               </div>
               <div style={{ padding: '20px 0px', borderBottom: 'solid 1px #b1b1b1' }}>
                  <div>
                     <img src={logo1} className="cardImage"></img>
                  </div>
                  <div style={{ marginTop: 20 }}>
                     <span className="blackTitle" style={{ fontSize: 16 }}>L.O.L SURPRISE 2-IN-1 GLAMPER PLAYSET</span>
                  </div>
                  <div className="row-3 blackTitle" style={{ fontSize: 16 }}>
                     <span>£99.99</span>
                  </div>
                  <div className="row-3 blackTitle" style={{ fontSize: 16 }}>
                     <span>Qty: </span><span className="qut">1</span>
                     <span className="floatRight" style={{ fontSize: 22 }}>£99.99</span>
                  </div>
               </div>
               <div style={{ paddingTop: 30 }}>
                  <input type="text" placeholder="Enter promo code" className="email-field"></input>
                  <input type="submit" value="submit" className="submit-button"></input>
               </div>
               <div className="row-4">
                  <div style={{ padding: '10px 10px', fontFamily: 'VAG Rounded ELC Light', fontSize: 20 }}>
                     <span>Subtotal:</span><span className="floatRight">£99.99</span>
                  </div>
                  <div style={{ backgroundColor: '#e9f7ff', padding: '10px 10px', fontSize: 25}}>
                     <span>Order Total</span><span className="floatRight">£99.99</span>
                  </div>
               </div>
               <div>
                  <Link to={`/saudi-en/new-check-out`}>
                     <button className="alsoLikeCardButton">Check out</button>
                  </Link>
               </div>
            </div>
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

export default ShoppingBagItem;