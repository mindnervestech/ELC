import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class OrderedItem extends Component {
    constructor(props) {
        super(props);
        //console
    }
    render() {

        let cartProductPrice;

        let product = this.props.item;

        if (product.special_price !== null) {
            cartProductPrice = (
                <td className="price">
                    <span className="p-price">
                        <span className="p-desc"><FormattedMessage id="Now.Text" defaultMessage="Now" /></span>
                        <span className="p-currency">{product.currency}</span> {Math.round(parseFloat(product.special_price * product.qty_ordered))}</span>
                <br />
                <del style={{color:'#3b3b3b'}} className="p-desc"><FormattedMessage id="Was.Text" defaultMessage="Was" /><strong><span className="p-currency">{product.currency}</span> {parseFloat(product.price *  product.qty_ordered)}</strong></del><br />
                <span className="p-price-saving"><span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings"/></span>
                    <span className="p-currency">{Math.round(( (product.price - product.special_price) / product.price) * 100)} %</span></span>
                    <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {this.props.item.qty_ordered}</p>
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
                        <span className="p-currency">{product.currency}</span> {parseInt(product.price *  product.qty_ordered)}<br />
                        <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {this.props.item.qty_ordered}</p>
                    </td>
                )
        }

        let item_details = null;
        if (Array.isArray(this.props.item.details)) {
            item_details = this.props.item.details.map((c, index) => { return (
                <>
                  {(c.label == 'Color' || c.label == 'اللون') &&  <p key={index}><FormattedMessage id="Cart.Color.Title" defaultMessage="Color" />: {c.value}</p>}
                  {(c.label == 'Size' || c.label == 'المقاس') && <p key={index}><FormattedMessage id="Cart.Size.Title" defaultMessage="Size" /> : {c.value}</p> } 
               </> 
            )} )
        }

        return (
            <table className="t-Report-report" summary="BASKET">
                <tbody>
                    <tr>
                        <td className="t-Report-cell" headers="PRODUCT_DESC">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="prdimg">
                                            <a onClick={() => this.props.gotoProductDetails(this.props.item)} style={{cursor: "pointer"}}>
                                                <img src={this.props.item.image[0]} />
                                            </a>
                                        </td>

                                        <td className="prddesc">
                                            <h2>{this.props.item.name}</h2>
                                            {item_details}
                                            <p>{this.props.item.sku}</p>

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
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>)
    }
}

export default OrderedItem;
