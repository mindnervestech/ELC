import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'reactstrap';

class OrderedItem extends Component {
    constructor(props) {
        super(props);
        this.setState = {}

    }
    render() {
        let {globals} = this.props;
        let item_details = this.props.item.product_options.map((c, index) => {
            return (
                <>
                    {(c.label == 'Color' || c.label == 'اللون') && <p key={index}><FormattedMessage id="Cart.Color.Title" defaultMessage="Color" />: {c.value}</p>}
                    {(c.label == 'Size' || c.label == 'المقاس') && <p key={index}><FormattedMessage id="Cart.Size.Title" defaultMessage="Size" /> : {c.value}</p>}
                </>
            )
        }

        )
        return (
            <div>
                <div className="divShowOnMobile">
                    <table>
                        <tbody>
                            <tr>
                                <td className="prdimg">
                                    <Link to={`/${globals.store_locale}/products-details/${this.props.item.url_key}`}>
                                        <img src={this.props.item.image[0]} />
                                    </Link>
                                </td>
                                <td className="prddesc">
                                    <h2>{this.props.item.name}</h2>
                                    {item_details}
                                    <p>{this.props.item.sku}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <table className="qty" style={{ textAlign: 'start' }}>
                        <tr>
                            <td className="price" style={{ padding: "0px 10px" }}>
                                {this.props.item.special_price ?
                                    <div>
                                        <span className="p-price">
                                            <span className="p-desc">Now </span>
                                            <span className="p-currency">{this.props.item.currency}</span> {Math.round(this.props.item.special_price)}
                                        </span>
                                        <br />
                                        <del className="p-desc">
                                            <span>Was </span>
                                            <strong><span className="p-currency">{this.props.item.currency} </span> {this.props.item.price}</strong>
                                        </del>
                                        <br />
                                        <span className="p-price-saving">
                                            <span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings" /></span>
                                            <span className="p-currency"> {Math.round(((this.props.item.price - this.props.item.special_price) / this.props.item.price) * 100)} %</span>
                                        </span>
                                    </div>
                                    : <del className="p-desc" style={{ textDecoration: 'unset' }}>
                                        <strong><span className="p-currency">{this.props.item.currency} </span> {this.props.item.price}</strong>
                                    </del>}
                                    <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> 
                                    <span>{parseInt(this.props.item.qty_orderded)}</span></p>
                            </td>
                            {/* <td className="price">
                                            <span className="p-price">
                                                <span className="p-currency">{this.props.item.currency}</span> {parseInt(this.props.item.price)}
                                            </span>
                                            <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {parseInt(this.props.item.qty_orderded)}</p>
                                        </td> */}
                        </tr>
                    </table>
                </div>
                <table className="t-Report-report divShowOnWeb" summary="BASKET" key={this.props.key}>
                    <tbody>
                        <tr>
                            <td className="t-Report-cell" headers="PRODUCT_DESC">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="prdimg">
                                                <Link to={`/${globals.store_locale}/products-details/${this.props.item.url_key}`}>
                                                    <img src={this.props.item.image[0]} />
                                                </Link>
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
                                            <td className="price">
                                                {this.props.item.special_price ?
                                                    <div>
                                                        <span className="p-price">
                                                            <span className="p-desc">Now </span>
                                                            <span className="p-currency">{this.props.item.currency}</span> {Math.round(this.props.item.special_price)}
                                                        </span>
                                                        <br />

                                                        <del className="p-desc">
                                                            <span>Was </span>
                                                            <strong><span className="p-currency">{this.props.item.currency} </span> {this.props.item.price}</strong>
                                                        </del>
                                                        <br />

                                                        <span className="p-price-saving">
                                                            <span className="p-desc"><FormattedMessage id="Savings.title" defaultMessage="Savings" /></span>
                                                            <span className="p-currency"> {Math.round(((this.props.item.price - this.props.item.special_price) / this.props.item.price) * 100)} %</span>
                                                        </span>
                                                    </div> :
                                                    <del className="p-desc p-price" style={{ textDecoration: 'unset' }}>
                                                        <strong><span className="p-currency">{this.props.item.currency} </span> {this.props.item.price}</strong>
                                                    </del>
                                                }
                                                <p><FormattedMessage id="Item.Qty" defaultMessage="Qty" /> <span>{parseInt(this.props.item.qty_orderded)}</span></p>
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
                </table>
            </div>
        )
    }
}

export default OrderedItem;
