
import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col } from 'reactstrap';
import { Helmet } from 'react-helmet';
import ProductImage from '../product-zoom/Product-image';
import freeDelivery from '../../../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../../../assets/images/header/Mouse.svg';
import Popup from 'react-popup';
import {Redirect } from 'react-router-dom';
import { initializeF, trackF } from '../../../utility/facebookPixel';
import Spinner from '../../../../components/Spinner/Spinner2';
import { AddToCartEvent } from "../../../utility/googleTagManager";

const wait = require('../../../../../assets/images/wait.gif');

class AddToBasketModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultQty: 1,
			showAlert: false,
			item_added_message: '',
			cartModelFlag: false,
			disabledFlag: false
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
		if (this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp && !this.state.cartModelFlag) {
			if (this.props.item_added.add_cart_error) {
				if(!this.props.item_added.item_added.message.includes('Cannot read property')){
					this.setState({
						item_added_message: this.props.item_added.item_added.message ? this.props.item_added.item_added.message : 'added',
						cartModelFlag: true,
						disabledFlag: false
					});
					if (this.state.showAlert) {
						setTimeout(() => {
							this.closeAlert();
						}, 5000);
					}
				}
			}
		}
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
		this.setState({showAlert: true, cartModelFlag: false, disabledFlag: true})
		if (totalQty < this.state.defaultQty) {
			addQty = totalQty;
		} else {
			addQty = this.state.defaultQty;
		}
		let currency = '';
		if (this.props.globals.country === 'KSA' || this.props.globals.country === 'ksa') {
			currency = 'SAR';
		} else {
			currency = 'AED';
		}
		let content_ids = []
		let obj = {
			id: data.sku,
		}
		content_ids.push(obj);
		let price = data.price && (data.price.toFixed(2)) * addQty;
		// initializeF()
		// trackF('AddToCart', { content_type: 'product', currency: currency, content_ids: content_ids, value: price });

		if (isUserLoggedIn) {
			if (data.type === 'simple') {
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
			if (data.type === 'simple') {
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
		AddToCartEvent(this.props.data,this.state.defaultQty)

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
			if (currentStore === 1 || currentStore === 3 || currentStore === 5) {
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
		if (e.target.value.match("^[0-9]*$") != null) {
			this.setState({ defaultQty: e.target.value });
		}
	}

	closeAlert = () => {
		this.setState({ showAlert: false });
	}

	showDiscountPrise(offerData , orignalPrise, currency){
		if (Object.keys(offerData).length === 1) {
			for (let value in offerData) {
				if (value === '1') {
					return (
						<div>
							<span className="product-price" style={{fontSize:20}}>{currency}&nbsp;{offerData[value]}</span>
							<span className="product-price-line" style={{fontSize:20}}>{currency}&nbsp;{Number(orignalPrise).toFixed(2)}</span>
						</div>
					);
				} else {
					return (
						<div>
							<span className="product-price">{currency}&nbsp;{Number(orignalPrise).toFixed(2)}</span>
						</div>
					);
				}
			}
		} else {
			return (
				<div>
					<span className="product-price">{currency}&nbsp;{Number(orignalPrise).toFixed(2)}</span>
				</div>
			);
		}
	}

	checkBuyAndMore(offer, currency) {
		if (Object.keys(offer).length === 1) {
			for (let value in offer) {
				if (value === '1') {
					return (
						<div />
					);
				} else {
					return (
						<div style={{width: '100%', paddingBottom: 10}}>
							<div className="buyAndSaveMOreText">
								<span><FormattedMessage id="BuyMore.Text" defaultMessage="BUY MORE SAVE MORE" /></span>
							</div>
							<div>
								<span>{value}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{offer[value]}</span>
							</div>
						</div>
					);
				}
			}
		} else {
			let showOffer = []
			let count = 0
			for (let value in offer) {
				if(count < 2){
					showOffer.push(value)
					showOffer.push(offer[value])
				}
				count++
			}
			count = 0
			return (
				<div style={{width: '100%', paddingBottom: 10}}>
					<div className="buyAndSaveMOreText">
						<span><FormattedMessage id="BuyMore.Text" defaultMessage="BUY MORE SAVE MORE" /></span>
					</div>
					<div>
						<span>{showOffer[0]}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{showOffer[1]} | {showOffer[2]}&nbsp;<FormattedMessage id="For.Text" defaultMessage="For" />&nbsp;{currency}&nbsp;{showOffer[3]}</span>
					</div>
				</div>
			);
		}
	}

	render() {
		let data = this.props.data;	

		let newImageArray = [];

		if (this.state.islogged) {
			return <Redirect to={{
				pathname: `/${this.props.globals.store_locale}/sign-in-register`,
			}} />;
		}

		if (data.simpleproducts) {
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
		if (newImageArray.length === 0) {
			if (data.imageUrl)
				image_array['default'] = data.imageUrl;
		}

		for (let i = 0; i < newImageArray.length; i++) {
			image_array[newImageArray[i].text] = newImageArray[i].image;
		}
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
			<div>
				<Helmet>
					<script src="/global/css/magiczoomplus/magiczoomplus.js"></script>
					<script src="/global/css/magicscroll/magicscroll.js"></script>
				</Helmet>
				{respo_message}
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
												{data.offers && data.offers.status === 1 ?
													this.showDiscountPrise(data.offers.data,data.price,data.currency)
													:
													<span className="product-price">{data.currency}&nbsp;{Number(data.price).toFixed(2)}</span>}
												</div>
												{data && data.visible_on_store ?
													<div style={{ width: '100%' }}>
														<div className="choose-dil">
															<FormattedMessage id="choose.your.delivery" defaultMessage="Choose your delivery options" />
														</div>
														<div className="row del-options">
															<div className="row home-deli">
																<img src={freeDelivery} alt=""/>
																<span style={{ fontSize: '15px', fontWeight: 'bold' }}>
																	<FormattedMessage id="delivery-details.HomeDelivery.Title" defaultMessage="Home Delivery" />
																</span>
																<span style={{ margin: '10px', color: '#ee0E19' }}>
																	{data.simplestatus === 1 || (newImageArray[0] && newImageArray[0].stock === 1) ?
																		<span className="in-stock" style={{ color: '#0D943F' }}>
																			<FormattedMessage id="PDP.InStock" defaultMessage="In Stock" />
																		</span> :
																		<span style={{ margin: '10px', color: '#ee0E19', fontSize: '15px' }}>
																			<FormattedMessage id="PDP.OutOfStock" defaultMessage="Out of Stock" />
																		</span>}
																</span>
															</div>
															<div className="row click-collect">
																<img src={freeCollect} alt=""/>
																<span style={{ marginTop: '15px', fontSize: '15px' }}>
																	<FormattedMessage id="delivery-details.Click&Collect.Title" defaultMessage="Click&Collect" />
																</span>

																<span className="commingSoonText">
																	<span><FormattedMessage id="Comingsoon" defaultMessage="Coming soon" /></span>
																</span>
															</div>
														</div>
													</div> : ''}
													{data.offers && data.offers.status === 1 &&
														this.checkBuyAndMore(data.offers.data, data.currency)
													}
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
																disabled="disabled"
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
														{data.simplestatus === 1 || (newImageArray[0] && newImageArray[0].stock === 1) ?
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
														{this.state.disabledFlag ?
															<button className="alsoLikeCardButton" style={{ marginTop: 0 }} type="button" disabled={true}>
																<img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} alt=""/>
																<span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
															</button> :
															<button disabled={(data.simplestatus === 0 || (newImageArray[0] && newImageArray[0].stock === 0)) || this.state.defaultQty === 0} onClick={() => this.addToCart()} className="alsoLikeCardButton" style={{ marginTop: 0 }}>
															<FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" />
														</button>}
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
