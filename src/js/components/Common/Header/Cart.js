import React, { Component } from 'react';
import ZeroItem from './ZeroItem';
import CartItems from './CartItems';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCart: this.props.showCart,
        }
        //console.log(this.props);
    }


    render() {
        //let toggleCart = this.toggleCart();
        let styleProp = this.props.showCart ? 'block' : 'none';
        const styles = {
            display: styleProp,
        };
        let store_locale = this.props.store_locale;


        //console.log('cartItemCount', this.props.showCart.cartItemCount);
        const cartItem = (this.props.cartDetails.products.length <= 0) ? <ZeroItem /> : <CartItems cartItems={this.props.cartDetails} />

        return (<>
            <div id="cart-drop" style={styles} className="shopping-cart h-hidden-mobile" aria-live="polite">
                <input type="hidden" id="P0_RW_C" name="P0_RW_C" defaultValue="Y" /><input type="hidden" id="P0_RW_D" name="P0_RW_D" defaultValue="N" />
                <div id="report_34422539084836319_catch">
                    <ul className="shopping-cart-items">
                        {cartItem}

                        <div className="flyout-total">
                            <p>{this.props.cartDetails.cart_count} <FormattedMessage id="Cart.item.count.msg" defaultMessage="Cart Msg Count" /><Link to={`/${store_locale}/cart`} onClick={this.props.toggleCart}><FormattedMessage id="view.all" defaultMessage="View All" /></Link></p>
                            <div className="flyout-subtotal"><FormattedMessage id="Cart.Subtotal.Title" defaultMessage="Subtotal" /> <strong>{this.props.cartDetails.currency} {Math.round(parseInt(this.props.cartDetails.grand_total))}</strong></div>
                        </div>
                        <div className="flyout-buttons">
                            <Link to={`/${store_locale}/`} className="fab-btn--secondary" onClick={this.props.toggleCart}><FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" /></Link>
                            <Link to={`/${store_locale}/cart`} className="backGreen" onClick={this.props.toggleCart}><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="CheckOut" /></Link>
                        </div>
                    </ul>

                </div>
            </div>
        </>);
    }
}

export default Cart;