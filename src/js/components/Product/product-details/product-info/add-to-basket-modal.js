
import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';
import ProductImage from '../product-zoom/Product-image';
import freeDelivery from '../../../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../../../assets/images/header/Mouse.svg';
import ShareUrl from '../product-info/product-size';
import Popup from 'react-popup';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import Spinner from '../../../../components/Spinner/Spinner2';

class AddToBasketModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultQty: 1,
		};

	}

	componentDidMount() {
		const data = {
			customerid: this.props.customerDetails.customer_id ? parseInt(this.props.customerDetails.customer_id) : '',
			store: this.props.globals.currentStore,
			url_key: this.props.url_key,
		};
		this.props.onGetProductDetails(data);
	}

	_getUnique = (arr, comp) => {
		const unique = arr
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e])
			.map(e => arr[e]);
		return unique;
	};

	componentDidUpdate(prevProps){
		
	}
	
	componentWillMount() {
		if (this.props.data && !window.location.href.includes('products-details')) {
			this.props.onClearProductDetails(this.props.data);
		}
	}

	addToCart() {
		const { data, customerDetails, guest_user, isUserLoggedIn } = this.props;
		
		let prodData = {};
		let totalQty = this.props.data.type === 'simple' ? parseInt(this.props.data.simpleqty) : this.props.data.simpleproducts[0].qty;
		let addQty = 0;
		if (totalQty < this.state.defaultQty) {
			addQty = totalQty;
		} else {
			addQty = this.state.defaultQty;
		}
		if (isUserLoggedIn) {
			if (data.type == 'simple') {
				prodData = {
					"quote_id": customerDetails.quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": addQty,
					"product_option": {
						"extension_attributes": {}
					}
				}
			} else {
				prodData = {
					"quote_id": customerDetails.quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": addQty,
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
					"qty": addQty,
					"product_option": {
						"extension_attributes": {}
					}
				}
			} else {
				prodData = {
					"quote_id": guest_user.temp_quote_id,
					"product_type": data.type,
					"sku": data.sku,
					"qty": addQty,
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
		this.props.onCloseAddCartModal();
	}

	decrement = totalQty => {
		let currQty = this.state.defaultQty;
		let decrementedQty = currQty - 1;
		if ((totalQty > 0) && (decrementedQty > 0)) {
			if (currQty <= 0) {
			}
			else {
				this.setState({ defaultQty: currQty - 1 });
			}
		}
	};

	increment = totalQty => {
		// this.setState({ defaultQty: totalQty + 1 });
		let currQty = this.state.defaultQty;
		if (currQty >= totalQty) {
			let popupMessage = null;
			let currentStore = this.props.globals.currentStore;
			if (currentStore == 1 || currentStore == 3 || currentStore == 5) {
				popupMessage = Popup.register({
					title: 'محزر',
					content: `الحد الأقصى لكمية الطلب من هذا المنتج هي ${parseInt(totalQty)} يرجى تغيير الكمية المحددة لتكون ضمن هذا العدد. لطلب كمية أكثر من ${parseInt(totalQty)} يرجى اللاتصال بنا.`,
					buttons: {
						right: [{
							text: 'حسنا',
							action: function () {
								Popup.close();
							}
						}]
					}
				});
				Popup.queue(popupMessage);
			} else {
				popupMessage = Popup.register({
					title: 'Alert',
					content: `This product has a maximum orderable quantity of ${parseInt(totalQty)} Please update your selected quantity to be within this limit.To order quantity more than ${parseInt(totalQty)} please contact us.`,
					buttons: {
						right: [{
							text: 'OK',
							action: function () {
								Popup.close();
							}
						}]
					}
				});
				Popup.queue(popupMessage);
			}
		} else {
			this.setState({ defaultQty: currQty + 1 });
		}
	};

	handleChange(e) {
		let totalQty = this.props.data.type === 'simple' ? parseInt(this.props.data.simpleqty) : this.props.data.simpleproducts[0].qty;
		if (e.target.value.match("^[0-9]*$") != null) {
			this.setState({ defaultQty: e.target.value });
		}
	}

	render() {

		// const store_locale=this.props.globals.store_locale
		let data = this.props.data;		
		// const { data } = this.props;
		const store_locale = this.props.globals.store_locale;

		let newImageArray = [];

		if (this.state.islogged) {
			return <Redirect to={{
				pathname: `/${this.props.globals.store_locale}/sign-in-register`,
			}} />;
		}

		if (data.simpleproducts) {
			let arr = [];
			let imageArray = [];
			Object.keys(data.simpleproducts).map((item, index) => {
				let img = {
					text: data.simpleproducts[item].color.text,
					image: data.simpleproducts[item].simple_image,
					video: data.simpleproducts[item].simple_video,
					qty: data.simpleproducts[item].qty,
					stock: data.simpleproducts[item].stockstatus
				}
				imageArray.push(img);
			});

			newImageArray = this._getUnique(imageArray, 'text');
		}

		let image_array = {
		};
		if (newImageArray.length == 0) {
			if (data.imageUrl)
				image_array['default'] = data.imageUrl;
		}

		for (let i = 0; i < newImageArray.length; i++) {
			image_array[newImageArray[i].text] = newImageArray[i].image;
		}

		return (
			<div>
				<Helmet>
					<script src="/global/css/magiczoomplus/magiczoomplus.js"></script>
					<script src="/global/css/magicscroll/magicscroll.js"></script>
				</Helmet>
				{data.name ?
				<div>
					<Popup />
					<Row className="apex-col-auto carpusel-dots">
						<Col xs="12" md="7" lg="7" className="pdoductImageSpasing">
							<h2 className="product-title2">
								{data.name}
							</h2>
							<div>
								<ProductImage />

							</div>
						</Col>
						<Col xs="12" md="5" lg="5" className="pdoductDetailSpasing">

							<div
								className="t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-md"
								id="R33789882492169835"
							>
								<div className="t-Region-bodyWrap">
									<div className="t-Region-body">
										<div className="container" style={{ overflow: 'hidden' }}>
											<div className="row details-body">
												<div className="prod-price">
													{data.special_price ?
														<div>
															<span className="product-price">{data.currency}&nbsp;{data.special_price}</span>
															<span className="product-price-line">{data.currency}&nbsp;{Number(data.price).toFixed(2)}</span>
														</div> :
														<span className="product-price">{data.currency}&nbsp;{Number(data.price).toFixed(2)}</span>}
												</div>
												{data && data.visible_on_store ?
													<div style={{ width: '100%' }}>
														<div className="choose-dil">
															<FormattedMessage id="choose.your.delivery" defaultMessage="Choose your delivery options" />
														</div>
														<div className="row del-options">
															<div className="row home-deli">
																<img src={freeDelivery} />
																<span style={{ fontSize: '15px', fontWeight: 'bold' }}>
																	<FormattedMessage id="delivery-details.HomeDelivery.Title" defaultMessage="Home Delivery" />
																</span>
																<span style={{ margin: '10px', color: '#ee0E19' }}>
																	{data.simplestatus == 1 || (newImageArray[0] && newImageArray[0].stock == 1) ?
																		<span className="in-stock" style={{ color: '#0D943F' }}>
																			<FormattedMessage id="PDP.InStock" defaultMessage="In Stock" />
																		</span> :
																		<span style={{ margin: '10px', color: '#ee0E19', fontSize: '15px' }}>
																			<FormattedMessage id="PDP.OutOfStock" defaultMessage="Out of Stock" />
																		</span>}
																</span>
															</div>
															<div className="row click-collect">
																<img src={freeCollect} />
																<span style={{ marginTop: '15px', fontSize: '15px' }}>
																	<FormattedMessage id="delivery-details.Click&Collect.Title" defaultMessage="Click&Collect" />
																</span>

																<span className="commingSoonText">
																	<span><FormattedMessage id="Comingsoon" defaultMessage="Coming soon" /></span>
																</span>
															</div>
														</div>
													</div> : ''}
												{data && data.visible_on_store ?
													<div className="t-Form-inputContainer qantityNumberDiv row quantity-mob" style={{ marginBottom: 20, marginLeft: 0, padding: 0 }}>
														<div className="t-Form-itemWrapper" style={{ border: '0.1rem solid #EAEAEA', borderRadius: '0.2rem' }}>
															<span className="t-Form-itemText t-Form-itemText--pre">
																<i
																	className="icon min qty-dec-inc"
																	onClick={e => this.decrement(this.state.defaultQty)}
																>
																	-
																</i>
															</span>

															<input
																type="text"
																id="P3_QTY"
																name="P3_QTY"
																maxLength="3"
																min={1}
																value={this.state.defaultQty}
																// readOnly
																onChange={this.handleChange.bind(this)}
																className="input-qty"
															/>

															<span className="t-Form-itemText t-Form-itemText--post">
																<i
																	className="icon max qty-dec-inc"
																	onClick={e => this.increment(data.type === 'simple' ? parseInt(data.simpleqty) : newImageArray[0].qty)}
																>
																	+
																</i>
															</span>
														</div>
													</div>
													: ''}
												{data && data.visible_on_store ?
													<div style={{ width: '100%', marginBottom: 20 }}>
														{data.simplestatus == 1 || (newImageArray[0] && newImageArray[0].stock == 1) ?
															<span className="in-stock" style={{ color: '#0D943F' }}>
																<FormattedMessage id="PDP.InStock" defaultMessage="In Stock" />
															</span> :
															<span style={{ margin: '10px', color: '#ee0E19' }}>
																<FormattedMessage id="PDP.OutOfStock" defaultMessage="Out of Stock" />
															</span>}
													</div>
													: ''}
												{data && data.visible_on_store ?
													<div className="alsoLikeCard add-cart">
														<div className="homePage">
															<button disabled={(data.simplestatus === 0 || (newImageArray[0] && newImageArray[0].stock == 0)) || this.state.defaultQty == 0} onClick={() => this.addToCart()} className="alsoLikeCardButton" style={{ marginTop: 0 }}>
																<FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" /></button>
														</div>
													</div>
													:
													<div style={{ fontSize: '18px', color: 'red', marginBottom: '30px' }}>
														<FormattedMessage id="NotAvailableforcurrentstoreDelivery " defaultMessage="Not Available for current store Delivery" />
													</div>}
											</div>
										</div>
									</div>
								</div>
							</div>
						</Col>

					</Row></div> : <Spinner />}
				
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isUserLoggedIn: state.login.isUserLoggedIn,
		globals: state.global,
		user_details: state.login.customer_details,
		data: state.productDetails.productData,
		customerDetails: state.login.customer_details,
		// productWishDetail: state.productDetails.productWishDetail,
		// removeWishListDetail:state.productDetails.productWishDetail,
		// productDetails: state.productDetails.productData,
		wishlistItem: state.wishList,
		// productDetailLoader: state.productDetails.productDetailLoader,
		// addToCardLoader: state.productDetails.addToCardLoader,
		cart_details: state.myCart,
		guest_user: state.guest_user,
		item_added: state.item_added

	};
};

const mapDispatchToProps = dispatch => {
	return {
		onClearProductDetails: payload => dispatch(actions.clearProductDetails(payload)),
		onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
		// OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
		onAddToCart: payload => dispatch(actions.addToCart(payload)),
		onGuestAddToCart: (payload, myCart) => dispatch(actions.guestAddToCart(payload, myCart)),

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToBasketModal);
