import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

class ProductBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
			cartModelFlag : false,
			showAlert: false,
			item_added_message: ''
        };

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.addToCardLoader !== this.props.addToCardLoader) {
			setTimeout(() => {
				// if (this.props.isUserLoggedIn) {
				// 	this.props.OngetMyCart({
				// 		quote_id: this.props.user_details.quote_id,
				// 		store_id: this.props.globals.currentStore
				// 	})
				// } else {
				// 	this.props.OngetMyCart({
				// 		quote_id: this.props.guest_user.new_quote_id,
				// 		store_id: this.props.globals.currentStore
				// 	})
	
				// }
			}, 2000);


			if (this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp && !this.state.cartModelFlag) {
				if (this.props.item_added.add_cart_error) {
					this.setState({
						item_added_message: this.props.item_added.item_added.message ? this.props.item_added.item_added.message : 'added',
						cartModelFlag: true
					});
					if (this.state.showAlert) {
						setTimeout(() => {
							this.closeAlert();
						}, 5000);
					}
				} else {
					this.setState({
						cartModelFlag: true,
						item_added_message: '',
					})
					if (this.state.showAlert) {
						setTimeout(() => {
							this.closeAlert();
						}, 4000);
					}
				}
			}
		}
    }

    
	addToCart(e) {
        const { customerDetails, guest_user, isUserLoggedIn } = this.props;
        let data = e;
		let prodData = {};
		this.setState({showAlert: true, cartModelFlag: false})
		if (isUserLoggedIn) {
			if (data.type == 'simple') {
				prodData = {
					"quote_id": customerDetails.quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": 1,//this.state.defaultQty,
					"product_option": {
						"extension_attributes": {}
					}
				}
			} else {
				prodData = {
					"quote_id": customerDetails.quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": 1, //this.state.defaultQty,
					"product_option": {
						"extension_attributes": {
							"configurable_item_options": [
								{
									"option_id": data.simpleproducts[0].color.option_id,
									"option_value": data.simpleproducts[0].color.option_value
								}
							]
						}
					}
				}
			}
			this.props.onAddToCart(prodData);
		} else {
			if (data.type == 'simple') {
				prodData = {
					"quote_id": guest_user.temp_quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": 1, //this.state.defaultQty,
					"product_option": {
						"extension_attributes": {}
					}
				}
			} else {
				prodData = {
					"quote_id": guest_user.temp_quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": 1, //this.state.defaultQty,
					"product_option": {
						"extension_attributes": {
							"configurable_item_options": [
								{
									"option_id": data.simpleproducts[0].color.option_id,
									"option_value": data.simpleproducts[0].color.option_value
								}
							]
						}
					}
				}
			}
			const myCart = {
				quote_id: guest_user.temp_quote_id,
				store_id: this.props.globals.currentStore,
			};
			this.props.onGuestAddToCart(prodData, myCart);
			
		}
	}

	closeAlert = () => {
		this.setState({ showAlert: false });
	}

    checkOut = () => {
		this.props.onCloseCartModal();
	}
	
	gotoCheckOutPage = () =>{
		if (this.props.isUserLoggedIn) {
			this.props.OngetMyCart({
				quote_id: this.props.user_details.quote_id,
				store_id: this.props.globals.currentStore
			})
		} else {
			this.props.OngetMyCart({
				quote_id: this.props.guest_user.new_quote_id,
				store_id: this.props.globals.currentStore
			})
		}
		this.props.onCloseCartModal();
	}

    render() {

		const store_locale=this.props.globals.store_locale;
		
		let respo_message = null;
		if (this.state.showAlert && this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp && this.props.item_added.add_cart_error) {
			respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
				<div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
					<div className="t-Alert-wrap">
						<div className="t-Alert-icon">
							<span className="t-Icon" />
						</div>
						<div className="t-Alert-content">
							{this.state.item_added_message !== 'added' ? <div className="t-Alert-header">
								<h2 className="t-Alert-title">{this.state.item_added_message}</h2>
							</div> :
							<div className="t-Alert-header">
								<h2 className="t-Alert-title">
								<FormattedMessage id="Addedtoyourbasket" defaultMessage="Added to your basket" />
								</h2>
							</div> }
						</div>
						<div className="t-Alert-buttons">
							<button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.closeAlert} ><span className="t-Icon icon-close" /></button>
						</div>
					</div>
				</div>
			</div></span>;
		}
        return (
            <div className="col addToCardPopup">
				{respo_message}
                <div className="text-align-rtl" style={{marginBottom:15}}>
                    <span>
                        <i className="fa fa-check cbox-icon-success right-icon-fa">
                            <span><FormattedMessage id="Addedtoyourbasket" defaultMessage="Added to your basket" />  </span>
                        </i>
                    </span>
                </div>
                <div className="row padding-model removeRowCss">
                    <div className="button-model" onClick={() => this.checkOut()}>
                        <button className="contunue-shopping-btn"><FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" /></button>
                    </div>

                    <div className="button-model" onClick={() => this.gotoCheckOutPage()}>
                        <Link to={`/${this.props.globals.store_locale}/cart`}>
                            <button style={{backgroundColor:'#EE0E19 !important',border:'solid 1px #EE0E19 !important'}} className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                        </Link>
                    </div>
                </div>
                <div className="row cart_modeal">
                    <h2 />
                </div>

                <div className="col" style={{ padding: 0, overflow: 'auto', maxHeight: 300 }}>
                    <div className="button-model on-mobile">
                        <span className="related-title"><FormattedMessage id="RelatedProducts" defaultMessage="Related Products" /></span>
                    </div>
                    {this.props.cart_details.similar_products.map((item, index) =>
                        (
                            <div className="related-item productListDiv" key={index}>
                                <div className="productImageDiv">
                                <Link to={`/${store_locale}/products-details/${this.props.cart_details.similar_products[index].url_key}`} >
                                    <img  onClick={() => this.checkOut()} className="related-item-img" src={this.props.cart_details.similar_products[index].productImageUrl[0]} />
                                 </Link>
                                </div>
                                <div className="productDetailDiv" >
                                    <div className="related-title">
                                         <Link to={`/${store_locale}/products-details/${this.props.cart_details.similar_products[index].url_key}`}>
                                        <span onClick={() => this.gotoCheckOutPage()}>{this.props.cart_details.similar_products[index].name}</span>
                                         </Link> 
                                    </div>
                                    <div className="related-title">
                                        <span>{this.props.cart_details.similar_products[index].currency} {this.props.cart_details.similar_products[index].price}</span>
                                        {/* <span className="special_price">£49.99</span> */}
                                    </div>
                                </div>

                                <div className="alsoLikeCard add-cart addTocardButtonDiv">
                                    <div className="homePage">
                                        <button disabled={this.props.cart_details.similar_products[index].simplestatus === 0 || this.state.defaultQty == 0 || this.state.showAlert} onClick={() => this.addToCart(this.props.cart_details.similar_products[index])} className="alsoLikeCardButton" style={{ marginLeft: 10, width:'85%' }}>
										    <FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
		isUserLoggedIn: state.login.isUserLoggedIn,
		globals: state.global,
		user_details: state.login.customer_details,
		// productZoomDetails: state.productDetails.productData,
		customerDetails: state.login.customer_details,
		// productWishDetail: state.productDetails.productWishDetail,
		// removeWishListDetail:state.productDetails.productWishDetail,
		productDetails: state.productDetails.productColor,
		// wishlistItem:state.wishList,
		// productDetailLoader: state.productDetails.productDetailLoader,
		addToCardLoader: state.productDetails.addToCardLoader,
		cart_details: state.myCart,
		guest_user: state.guest_user,
		item_added: state.item_added
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // onGetSize: payload => dispatch(actions.getSize(payload)),
        OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        onAddToCart: payload => dispatch(actions.addToCart(payload)),
        onGuestAddToCart: (payload, myCart) => dispatch(actions.guestAddToCart(payload, myCart)),
	
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);
