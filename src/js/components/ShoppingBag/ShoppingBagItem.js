import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class ShoppingBagItem extends Component {



   render() {
      const product = this.props.product;
      const store_locale = this.props.store_locale;

      let cartProductPrice;

      if (product.special_price !== null) {
         cartProductPrice = (
            <td className="price"><span className="p-price">
               <span className="p-desc"><FormattedMessage id="Now.Text" defaultMessage="Now" /></span>
               <span className="p-currency">{product.currency}</span> {Math.round(parseFloat(product.special_price * product.qty))}</span>
               <br />
               <del className="p-desc"><FormattedMessage id="Was.Text" defaultMessage="Was" /><strong><span className="p-currency">{product.currency}</span> {parseFloat(product.price *  product.qty)}</strong></del><br />
               <span className="p-price-saving"><span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings"/></span>
                  <span className="p-currency">{Math.round(( (product.price - product.special_price) / product.price) * 100)} %</span></span>
            </td>
         )
      } else if(parseInt(product.price) == 0 ){
         cartProductPrice = (
            <td className="price">
               <FormattedMessage id="Free.text" defaultMessage="Free" /><br />
            </td>
         )
      } else {
            cartProductPrice = (
                  <td className="price">
                     <span className="p-currency">{product.currency}</span> {parseInt(product.price *  product.qty)}<br />
                  </td>
               )
      }

      return (<>
         <tr>
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
         </tr>

      </>)
   }
}

export default ShoppingBagItem;