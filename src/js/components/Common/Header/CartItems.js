import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';


class CartItems extends Component {
    constructor(props) {
        super(props)

    }
    render() {

        const cartItemList = this.props.cartItems.products;

        let cartItem = cartItemList.map((item, index) => {
            return (<li className="clearfix" key={index}>
                <div className="flyout-image">
                    <img src={item.image[0]} alt={item.sku} />
                </div>
                <div className="flyout-description">
                    <div className="flyout-desc">
                        <h4 tabIndex={-1}>{item.name}</h4>
                        <p>{item.sku}</p>
                        <table>
                            <tbody>
                                {item.color && (<tr>
                                    <th><FormattedMessage id="Cart.Color.Title" defaultMessage="Color" />:</th>
                                    <td>{item.color}</td>
                                </tr>)}
                                {item.size && (<tr>
                                    <th><FormattedMessage id="Cart.Size.Title" defaultMessage="Size" />:</th>
                                    <td>{item.size}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="flyout-price">
                        {item.price !=null && parseInt(item.price) != 0  ? <p className="fab-h4">{item.currency} {item.special_price ? Math.round(parseFloat(item.special_price  *  item.qty)) : Math.round(parseInt(item.price *  item.qty))}</p>:<p className="fab-h4"><FormattedMessage id="Free.text" defaultMessage="Free" /></p>} 
                        <p> <FormattedMessage id="Item.Qty" defaultMessage="Qty" /> {item.qty}</p>
                    </div>
                </div>
            </li>)
        });


        return (<>
            {cartItem}
        </>);
    }
}
export default CartItems;