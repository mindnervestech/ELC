import React, { Component } from 'react';
import glam from '../../../../assets/images/product-details/nay-sp19-glam-table-bra.jpg';

import dblpushup from '../../../../assets/images/product-details/double-pushup-bra.jpg';
import ReactImageMagnify from 'react-image-magnify';
import ProductZoom from './product-zoom/Product-zoom';
import ProductInformation from './product-info/product-info';
import ProductSocial from './product-social/product-social';
import { Carousel } from 'react-responsive-carousel';

import freeDelivery from '../../../../assets/images/header/Truck1.svg';
import freeCollect from '../../../../assets/images/header/Mouse.svg';
import home from '../../../../assets/images/social/Hero.png';
import favoriteImg from '../../../../assets/images/header/favorite.svg'
import Modal from 'react-responsive-modal';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import discovertheworld_icons from '../../../../assets/images/social/discovertheworld_icons.png';
import socialskills_icon from '../../../../assets/images/social/socialskills_icon.png';
import imagination_icon from '../../../../assets/images/social/imagination_icon.png';

import ShareUrl from '../product-details/product-info/product-size';
import Popup from 'react-popup';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';
import { FormattedMessage } from 'react-intl';

const mediaVideo = 'https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-nicoline-pajamaset-212884961.mp4';

class ProductInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultQty: 1,
			openShareModel: false,
		};
		this.addToCart = this.addToCart.bind(this);
	}

	decrement = totalQty => {
		let currQty = this.state.defaultQty;
		let decrementedQty = currQty - 1;
		if ((totalQty > 0) && (decrementedQty > 0)) {
			if (currQty <= 0) {
			} else {
				this.setState({ defaultQty: currQty - 1 });
			}
		}
	};

	addToCart(e) {
		console.log("working", this.props);
		const {data, customerDetails} = this.props;
		const prodData = {

			"quote_id": customerDetails.quote_id,
			"product_type": data.type,
			"sku": data.sku,
			"qty": this.state.defaultQty,
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
		console.log("cart", prodData);

		// const data = {
		// 	customer_id: 13, // this.props.customerDetails.customer_id,
		// 	product_id: productId,





		// };
		this.props.onAddToCart(prodData);
	}

	increment = totalQty => {
		// this.setState({ defaultQty: totalQty + 1 });
		let currQty = this.state.defaultQty;
		if (currQty >= totalQty) {
			let popupMessage = null;
			let currentStore = this.props.currentStore;

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

	onCloseFirstModal = () => {
		this.setState({ openShareModel: false })
	}


	_handleClick = async () => {
		 if (this.props.customerDetails.customer_id === undefined) {
		 return <Redirect to={{
				pathname: `/${store_locale}/login`,
			}} />;}


	

		else if (document.getElementById('Capa_1').getAttribute('class').includes('active')) {
			document.getElementById('Capa_1').setAttribute('class', 'naylove-icon');
			if (this.props.productWishDetail.wishlist_itemid) {
				this.props.onRemoveWishList({
					index: null,
					wishlist_id: this.props.productWishDetail.wishlist_itemid
				})
			}
		} else {
			document.getElementById('Capa_1').setAttribute('class', 'naylove-icon active');
			const data = {
				customer_id:this.props.customerDetails.customer_id,
				product_id:this.props.productZoomDetails.id
			};
			this.props.onAddToWishList(data);
	
		

		}
	};


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

	render() {
		const { data } = this.props;
	 const store_locale = this.props.globals.store_locale;

		let newImageArray = [];

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
			if (this.props.data.imageUrl)
				image_array['default'] = this.props.data.imageUrl;
		}

		for (let i = 0; i < newImageArray.length; i++) {
			image_array[newImageArray[i].text] = newImageArray[i].image;
		}

		return (
			<div className="row">
				<Helmet>
					<script src="/global/css/magiczoomplus/magiczoomplus.js"></script>
					<script src="/global/css/magicscroll/magicscroll.js"></script>
				</Helmet>
				<Row className="apex-col-auto carpusel-dots" style={{ paddingTop: '20px' }}>
					<Col xs="12" md="7" lg="7">
						<h2 className="product-title" style={{ marginBottom: 20 }}>
							{data.name}
						</h2>
						<div className="write-review" style={{ marginBottom: 20 }}>
							{/* <span className="write-a-re">
								<i className="fa fa-pencil"></i>
								Write a review
							</span>
							<span> | </span> */}
							<span className="age-sec">
								Age: {data.age}
							</span>
						</div>
						<div>
							<ProductZoom />
							{/* <Carousel showStatus={false}
                        showThumbs={true}
                        infiniteLoop={true}
						emulateTouch={true}
						>
                            <div>
                                <img style={{height: '100%'}} src={home} />
                            </div>
                            <div>
                                <img style={{height: '100%'}} src={home} />
                            </div>
                            <div>
                                <img style={{height: '100%'}} src={home} />
                            </div>
							<div>
								<video style={{height: '100%'}} controls autoplay="autoplay" loop muted preload style={{width: '100%',height: '100%'}}>
									<source src={mediaVideo} type="video/mp4" />
								</video>
							</div>
                        </Carousel> */}
						</div>
					</Col>
					<Col xs="12" md="5" lg="5" className="padding-mob">

						<div
							className="t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-md"
							id="R33789882492169835"
						>

							{/* <div className="t-Region-header">
							<div className="t-Region-headerItems t-Region-headerItems--title">
								<span className="t-Region-headerIcon">
									<span className="t-Icon " aria-hidden="true" />
								</span>
								<h5 className="t-Region-title" id="R33789882492169835_heading">
									Main Section
								</h5>
							</div>
							<div className="t-Region-headerItems t-Region-headerItems--buttons">
								<span className="js-maximizeButtonContainer" />
							</div>
						</div> */}
							<div className="t-Region-bodyWrap">
								<div className="t-Region-body">
									<div className="container" style={{ overflow: 'hidden' }}>
										<div className="row details-body">
											{/* <div className="available-by">
												<span>available friday 26th july</span>
											</div>
											<div className="available-by" style={{ color: '#009BCB' }}>
												<span>Buy One Get On free</span>
											</div> */}

											<div className="prod-price">
												{data.special_price ?
													<div>
														<span className="product-price">{data.currency}&nbsp;{data.special_price}</span>
														<span className="product-price-line">{data.currency}&nbsp;{Number(data.price).toFixed(2)}</span>
													</div> :
													<span className="product-price">{data.currency}&nbsp;{Number(data.price).toFixed(2)}</span>}
											</div>
											<div className="prod-color">
												<div>
													<FormattedMessage id="Cart.Color.Title" defaultMessage="Color" /> :
												{newImageArray[0] ? <span>{newImageArray[0].text}</span> : <div />}
												</div>
											</div>

											<div className="color-img">
												<div>
													{/* <img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/n/u/nude_1_.jpg'></img>
													<img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/b/l/black_1_.jpg'></img> */}
													{/* <img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/m/o/mocha_1_.jpg'></img>
												<img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/w/h/white_1_.jpg'></img> */}
												</div>
											</div>
											{/* <div style={{width:'100%'}}>
											<div className="choose-dil">
												Choose your delivery option:
											</div>
											<div className="row del-options">
												<div className="row home-deli">
													<img src={freeDelivery}/>
													<span>
														Home delivery
													</span>
													<span style={{margin:'10px', color: '#ee0E19'}}>
														Out of stock
													</span>
												</div>
												<div className="row click-collect">
													<img src={freeCollect}/>
													<span>
														Click & Collect
													</span>

													<span className="in-stock">
														In stock
													</span>
													<span style={{margin:'10px'}}>
														<a href=''>Change store</a>
													</span>
												</div>
											</div>
											<div className="free-uk-dly">
												This product includes free UK delivery
											</div>
										</div> */}

											<div className="t-Form-inputContainer col col-5 row quantity-mob" style={{ marginBottom: 20, marginLeft: 0, padding: 0 }}>
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
														value={this.state.defaultQty}
														readOnly
														className="input-qty"
													/>

													<span className="t-Form-itemText t-Form-itemText--post">
														<i
															className="icon max qty-dec-inc"
															onClick={e => this.increment(newImageArray[0].qty)}
														>
															+
													</i>
													</span>
												</div>
											</div>
											<div style={{ width: '100%', marginBottom: 20 }}>
												{newImageArray[0] && newImageArray[0].stock == 0 ?
													<span style={{ margin: '10px', color: '#ee0E19' }}>
														<FormattedMessage id="PDP.OutOfStock" defaultMessage="Out of Stock" />
											</span> :
													<span className="in-stock" style={{ color: '#0D943F' }}>
														<FormattedMessage id="PDP.InStock" defaultMessage="In Stock" />
											</span>}
											</div>
											<Popup />
											<div className="alsoLikeCard add-cart">
												<div className="homePage">
													<button onClick={this.addToCart} className="alsoLikeCardButton" style={{ marginTop: 0 }}>
														<FormattedMessage id="Product.Detail.addToBasket" defaultMessage="Add to basket" /></button>
												</div>
											</div>

											<div className="share-wishlist">
											<span onClick={this._handleClick} style={{display:"inline-flex"}}> 
											<svg
												xmlns="http://www.w3.org/2000/svg"
												xmlnsXlink="http://www.w3.org/1999/xlink"
												version="1.1"
												id="Capa_1"
												x="0px"
												y="0px"
												viewBox="0 0 50 50"
												style={{ enableBackground: 'new 0 0 50 50' }}
												xmlSpace="preserve"
												width="20px"
												height="20px"
												className={"naylove-icon " + (data.is_in_wishlist ? 'active' : '')}
												
											>
												<g transform="matrix(0.94148 0 0 0.94148 1.46299 1.46299)">
													<path
														d="M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543  c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503  c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z"
														className="naylove"
													/>
												</g>{' '}
											</svg>
												 <span style={{margingRight:"35px"}}><FormattedMessage id="PageTitle.add-wishlist" defaultMessage="Add to wishlist" /></span>: <span style={{margingRight:"35px"}}><FormattedMessage id="PageTitle.remove-wishlist" defaultMessage="Remove to wishlist" /></span>
											</span>
											
													
												<a onClick={() => this.setState({ openShareModel: true })} className="hover-on-favorite">
													<i className='fa fa-share-alt' style={{ fontSize: 25, marginRight: 13 }}></i>
													<span ><FormattedMessage id="Share" defaultMessage="Share" /></span>
												</a>
											</div>

											{this.state.openShareModel ? <div>
												<Modal open={this.state.openShareModel} onClose={this.onCloseFirstModal}>
													<ShareUrl />
												</Modal>
											</div> : ''}
											{/* <div className="deliy-free">
												<span>this product includes free UK delivery</span>
											</div> */}
											<div className="learn-skill">
												<span><FormattedMessage id="LearningSkills" defaultMessage="Learning skills" />:</span>

											</div>
											<div className="learn-skill-img">
												{data.learning_skills === 'Imagination' || data.learning_skills_2 === 'Imagination' || data.learning_skills_3 === 'Imagination' ?
													<img src={imagination_icon} /> : null }
												{data.learning_skills === 'Social Skills' || data.learning_skills_2 === 'Social Skills' || data.learning_skills_3 === 'Social Skills' ?
													<img src={socialskills_icon} /> : null }
												{/* <img src={discovertheworld_icons} /> */}
											</div>
											{/* <div className="col col-6 apex-col-auto">
											<div
												className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody"
												id="R28333438492179550"
											>
												<div className="t-Region-header">
													<div className="t-Region-headerItems t-Region-headerItems--title">
														<span className="t-Region-headerIcon">
															<span className="t-Icon " aria-hidden="true" />
														</span>
														<h5 className="t-Region-title" id="R28333438492179550_heading">
															Product Zoom
														</h5>
													</div>
													<div className="t-Region-headerItems t-Region-headerItems--buttons">
														<span className="js-maximizeButtonContainer" />
													</div>
												</div>
												
												<div className="t-Region-bodyWrap">
													<div className="t-Region-body">
														<ProductZoom />
														<div className="container">
															<div className="row">
																<div className="col col-12 apex-col-auto">
																	<div
																		className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-top-none margin-bottom-none margin-left-none margin-right-none"
																		id="R28333491897179551"
																	>
																		<div className="t-Region-bodyWrap">
																		
																			<div className="t-Region-body">
																				<ProductSocial data={data} currentStore={this.props.currentStore} />
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div> */}
											{/* <ProductInformation data={data}  currentStore={this.props.currentStore}/> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isUserLoggedIn: state.login.isUserLoggedIn,
		globals: state.global,
		productZoomDetails: state.productDetails.productData,
		customerDetails: state.login.customer_details,
		productWishDetail: state.productDetails.productWishDetail,
		productDetails: state.productDetails.productColor,
		productDetailLoader: state.productDetails.productDetailLoader,
		addToCardLoader: state.productDetails.addToCardLoader,
		cart_details: state.myCart,
	};
};



const mapDispatchToProps = dispatch => {
	return {
		onAddToWishList: payload => dispatch(actions.addToWishlist(payload)),
		onRemoveWishList: (payload) => dispatch(actions.removeWishList(payload)),
		onAddToCart: payload => dispatch(actions.addToCart(payload))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);

// export default ProductInfo;
