// import React, { Component } from 'react';
// import ReadMoreAndLess from 'react-read-more-less';
// import parse from 'html-react-parser';
// import { FormattedMessage } from 'react-intl';

// class ProductBasic extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             readMoreText: "Read More",
//             readLessText: "Read Less"
//         }
//     }

//     componentDidMount() {
//         const currentStore = this.props.currentStore;
//         let readMoreText = "Read More";
//         let readLessText = "Read Less";
//         if(currentStore === 1 || currentStore === 3 || currentStore === 5){
//             readMoreText = "قراءة المزيد";
//             readLessText = "أقرأ أقل";
//         }
//         this.setState({ readMoreText,  readLessText})
//     }

//     _checkOfferPrice = (item, itemOfferPrice) => {
//         // console.log('item.price',item.price);
//         // console.log('itemOfferPrice',itemOfferPrice);

//         if ( parseInt(item.price) !== parseInt(itemOfferPrice) ) {
//             return(
//                 <del>{item.currency} {item.price}</del>
//             );
//         }
//     }

//     _renderProductDetails = (item) => {
//         const { readMoreText, readLessText} = this.state;
//         return (
//             <section id="prddetail">
//                 <p className="heading">{item.style_desc}</p>
//                 <p className="prdhead" /><p className="prdhead">{item.collection_desc}</p><p />
//                 <p className="prdcode"><FormattedMessage id="product.sku" defaultMessage="Sku" /><strong>{item.sku}</strong></p>
//                 {item.description && (<ReadMoreAndLess
//                     className="read-more-content"
//                     charLimit={200}
//                     readMoreText={this.state.readMoreText}
//                     readLessText={this.state.readLessText}
//                 >
//                     {parse(item.description)}
//                 </ReadMoreAndLess>)}
//                 {
//                     item.offers ? (item.offers.data && item.offers.data['1'] ? 
//                         <>
//                             {/* <del>{item.currency} {item.price}</del> */}

//                             { this._checkOfferPrice(item, item.offers.data['1']) }

//                             <p className="d-price" style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>
//                                 {item.currency} {item.offers.data['1']}
//                             </p>
//                         </>	
//                     : <p style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>{item.currency} {item.price}</p>)
//                     : <p style={{ fontSize: '2.4rem', margin: '0 0 1.2rem' }}>{item.currency} {item.price}</p>
//                 }

//             </section>
//         )
//     }
//     render() {
//         const { productbasic } = this.props;
//         if (productbasic) {
//             return ( this._renderProductDetails(productbasic));
//         }
//         else {
//             return false;
//         }

//     }
// }
// export default ProductBasic;

import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import logo1 from '../../../../../assets/images/you_may_also_like_1.png';

class ProductBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }

    componentDidUpdate(prevProps, prevState) {

    }

    
	addToCart(e) {
        const { customerDetails, guest_user, isUserLoggedIn } = this.props;
        let data = e;
		let prodData = {};
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
    checkOut(type) {
        // if(type === 'CheckOut'){
        //    // this.props.history.push(`/${this.props.globals.store_locale}/new-check-out`);
        //    this.props.history.push(`/${this.props.globals.store_locale}/cart`);
        // }else{
        this.props.onCloseCartModal();
        // }
    }

    render() {

        const store_locale=this.props.globals.store_locale
        return (
            <div className="col addToCardPopup">
                <div style={{marginBottom:15, textAlign: 'start'}}>
                    <span>
                        <i className="fa fa-check cbox-icon-success right-icon-fa">
                            <span><FormattedMessage id="Addedtoyourbasket" defaultMessage="Added to your basket" />  </span>
                        </i>
                    </span>
                </div>
                <div className="row padding-model removeRowCss">
                    <div className="button-model" onClick={() => this.checkOut('shopping')}>
                        <button className="contunue-shopping-btn"><FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" /></button>
                    </div>

                    <div className="button-model">
                        <Link to={`/${this.props.globals.store_locale}/cart`}>
                            <button className="alsoLikeCardButton"><FormattedMessage id="Cart.CheckOut.Title" defaultMessage="Check out" /></button>
                        </Link>
                    </div>
                </div>
                <div className="row cart_modeal">
                    <h2 />
                </div>

                <div className="col" style={{ padding: 0, overflow: 'scroll', maxHeight: 300 }}>
                    <div className="button-model on-mobile">
                        <span className="related-title"><FormattedMessage id="RelatedProducts" defaultMessage="Related Products" /></span>
                    </div>
                    {this.props.cart_details.similar_products.map((item, index) =>
                        (
                            <div className="related-item productListDiv" key={index}>
                                <div className="productImageDiv">
                                <Link to={`/${store_locale}/products-details/${this.props.cart_details.similar_products[index].url_key}`} >
                                    <img  onClick={() => this.checkOut('shopping')} className="related-item-img" src={this.props.cart_details.similar_products[index].productImageUrl[0]} />
                                 </Link>
                                </div>
                                <div className="productDetailDiv" >
                                    <div className="related-title">
                                         <Link to={`/${store_locale}/products-details/${this.props.cart_details.similar_products[index].url_key}`}>
                                        <span onClick={() => this.checkOut('shopping')}>{this.props.cart_details.similar_products[index].name}</span>
                                         </Link> 
                                    </div>
                                    <div className="related-title">
                                        <span>{this.props.cart_details.similar_products[index].currency} {this.props.cart_details.similar_products[index].price}</span>
                                        {/* <span className="special_price">£49.99</span> */}
                                    </div>
                                </div>

                                <div className="alsoLikeCard add-cart addTocardButtonDiv">
                                    <div className="homePage">
                                        <button disabled={this.props.cart_details.similar_products[index].simplestatus === 0 || this.state.defaultQty == 0} onClick={() => this.addToCart(this.props.cart_details.similar_products[index])} className="alsoLikeCardButton" style={{ marginLeft: 10, width:'85%' }}>
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
		productZoomDetails: state.productDetails.productData,
		customerDetails: state.login.customer_details,
		productWishDetail: state.productDetails.productWishDetail,
		removeWishListDetail:state.productDetails.productWishDetail,
		productDetails: state.productDetails.productColor,
		wishlistItem:state.wishList,
		productDetailLoader: state.productDetails.productDetailLoader,
		addToCardLoader: state.productDetails.addToCardLoader,
		cart_details: state.myCart,
		guest_user: state.guest_user,
    
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onGetSize: payload => dispatch(actions.getSize(payload)),
        OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        onAddToCart: payload => dispatch(actions.addToCart(payload)),
        onGuestAddToCart: (payload, myCart) => dispatch(actions.guestAddToCart(payload, myCart)),
	
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductBasic);
