import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import freeDelivery from '../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../assets/images/header/Mouse.svg';
import { Row, Col, Button } from 'reactstrap';
import logo1 from '../../../assets/images/you_may_also_like_1.png'

class ShoppingBagItem extends Component {



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
      <div className="homePage cardPage">
         <Row className="row-5">
            <Col xs="6">
            <div className="blackTitle" style={{fontSize:22}}>
               Select Delivery
            </div>
            <div className="prod-color">
               <div className="row del-options">
                  <div className="row home-deli">
                     <img src={freeDelivery}/>
                     <span>Home delivery</span>
                     <span style={{margin:'10px', color: '#ee0E19'}}>
                        Out of stock
                     </span>
                  </div>
                  <div className="row click-collect">
                        <img src={freeCollect}/>
                           <span>Click & Collect</span>
                           <span className="in-stock">In stock</span>
                           <span style={{margin:'10px'}}>
                              <a href=''>Change store</a>
                           </span>
                  </div>
               </div>
				</div>
            </Col>
            <Col xs="3"></Col>
            <Col xs="3" style={{textAlign: 'end'}}>
            <div>
               <div className="blackTitle" style={{fontSize:22}}>
                  <span>1 item | £99.99</span>
               </div>
               <div>
                  <button className="alsoLikeCardButton">Check out</button>
               </div>
            </div>
            </Col>
         </Row>
         <Row className="row-1">
            <Col xs="3">
               
            </Col>
            <Col xs="4">
               <span className="blackTitle" style={{fontSize:14}}>Item</span>
            </Col>
            <Col xs="1">
               <span className="blackTitle" style={{fontSize:14}}>Price</span>
            </Col>
            <Col xs="1">
               <span className="blackTitle" style={{fontSize:14}}>Qty</span>
            </Col>
            <Col xs="1">
               <span className="blackTitle" style={{fontSize:14}}>Total</span>
            </Col>
            <Col xs="2">
               
            </Col>
         </Row>
         <Row className="row-2">
            <Col xs="3">
               <img src={logo1} className="cardImage"></img>
            </Col>
            <Col xs="4">
               <span className="blackTitle" style={{fontSize:16}}>L.O.L SURPRISE 2-IN-1 GLAMPER PLAYSET</span>
            </Col>
            <Col xs="1" className="row-3 blackTitle" style={{fontSize:16}}>
               <span>£99.99</span>
            </Col>
            <Col xs="1" className="row-3 blackTitle" style={{fontSize:16}}>
               <span className="qut">1</span>
            </Col>
            <Col xs="1" className="row-3 blackTitle" style={{fontSize:22}}>
               <span>£99.99</span>
            </Col>
            <Col xs="2" className="row-3 blackTitle" style={{textAlign: 'end'}}>
            <span className="remove" style={{fontSize:14}}>Remove</span>
            </Col>
         </Row>
         <Row style={{paddingRight: 25}}>
            <Col xs="6"></Col>
            <Col xs="6">
               <Row className="row-4">
               <Col xs="4">Order Total</Col>
               <Col xs="4"></Col>
               <Col xs="4">£99.99</Col>
               </Row>
            </Col>
         </Row>
         <Row style={{padding: 20}}>
            <Col xs="9"></Col>
            <Col xs="3" style={{textAlign: 'end'}}>
               <button className="alsoLikeCardButton">Check out</button>
            </Col>
         </Row>
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