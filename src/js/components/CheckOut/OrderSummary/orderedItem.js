import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

class OrderedItem extends Component {
    constructor(props) {
        super(props);
        this.setState={}

    }
    render() {
        console.log('OrderedItem',this.props);
        let item_details = this.props.item.product_options.map((c, index) => {
            return (
                <>
                  {(c.label == 'Color' || c.label == 'اللون') &&  <p key={index}><FormattedMessage id="Cart.Color.Title" defaultMessage="Color" />: {c.value}</p>}
                  {(c.label == 'Size' || c.label == 'المقاس') && <p key={index}><FormattedMessage id="Cart.Size.Title" defaultMessage="Size" /> : {c.value}</p> } 
               </> 
            )  
        }
            
        )
        return (
            <table className="t-Report-report" summary="BASKET" key={this.props.key}>
                <tbody>
                    <tr>
                        <td className="t-Report-cell" headers="PRODUCT_DESC">
                            <table>
                                <tbody>
                                    <tr>
                                        <td className="prdimg">
                                            <a href="">
                                                <img src={this.props.item.image[0]} /></a></td>

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
                                        <td className="price">
                                            <span className="p-price">
                                                <span className="p-desc">Now </span>
                                                <span className="p-currency">{this.props.item.currency}</span> { Math.round(this.props.item.special_price) }
                                            </span>
                                            <br/>
                                            <del className="p-desc">
                                                <span>Was </span>
                                                <strong><span className="p-currency">{this.props.item.currency} </span> {this.props.item.price}</strong>
                                            </del>
                                            <br/>
                                            <span className="p-price-saving">
                                                <span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings"/></span>
                                                <span className="p-currency"> {Math.round( ( (this.props.item.price - this.props.item.special_price) / this.props.item.price) * 100)} %</span>
                                            </span>

                                            <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {this.props.item.qty_ordered}</p>
                                        </td>

                                        {/* <td className="price">
                                            <span className="p-price">
                                                <span className="p-currency">{this.props.item.currency}</span> {parseInt(this.props.item.price)}
                                            </span>
                                            <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {parseInt(this.props.item.qty_orderded)}</p>
                                        </td> */}
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
