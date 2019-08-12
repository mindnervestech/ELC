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

import discovertheworld_icons from '../../../../assets/images/social/discovertheworld_icons.png';
import socialskills_icon from '../../../../assets/images/social/socialskills_icon.png';
import imagination_icon from '../../../../assets/images/social/imagination_icon.png';

import ShareUrl from '../product-details/product-info/product-size';

const mediaVideo = 'https://storage.googleapis.com/nay/videos/product/au19/nay-au19-casual-nightwear-mainrange-nicoline-pajamaset-212884961.mp4';

class ProductInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultQty: 1,
			openShareModel: false,
		};
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

	increment = totalQty => {
			this.setState({ defaultQty: totalQty + 1 });
	};

	onCloseFirstModal = () => {
		this.setState({ openShareModel: false })
		
	}

	render() {
		const { data } = this.props;

		return (
			<div className="row">
			<Helmet>
					<script src="/global/css/magiczoomplus/magiczoomplus.js"></script>
					<script src="/global/css/magicscroll/magicscroll.js"></script>
				</Helmet>
				<div className="col col-12 apex-col-auto carpusel-dots" style={{paddingTop:'20px'}}>
					<div className="col col-7">
						<h2 className="product-title" style={{marginBottom: 20}}>
							elc wooden london bus with a very long title over two lines
						</h2>
						<div className="write-review" style={{marginBottom: 20}}>
							<span style={{marginRight: 10}}>
								<i className="fa fa-pencil" style={{marginRight: 10}}></i>
								Write a review 
							</span>
								|
							<span style={{marginLeft: 20}}>
								Age: 7 - 14 year
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
					</div>
					<div className="col col-5" style={{paddingLeft: '55px'}}>
					
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
								<div className="container" style={{overflow:'hidden'}}>
									<div className="row details-body">
										<div className="available-by">
											<span>available friday 26th july</span>
										</div>
										<div className="available-by" style={{color: '#009BCB'}}>
											<span>Buy One Get On free</span>
										</div>

										<div className="prod-price">
											<span className="product-price">£20.00</span>
											<span className="product-price-line">£25.00</span>
										</div>
										<div className="prod-color">
											<div>
												Color : 
												<span>Black</span>
											</div>
										</div>

										<div className="color-img">
											<div>
												<img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/n/u/nude_1_.jpg'></img>
												<img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/b/l/black_1_.jpg'></img>
												<img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/m/o/mocha_1_.jpg'></img>
												<img src='http://nayomidev.iksulalive.com/pub/media/attribute/swatch/w/h/white_1_.jpg'></img>
											</div>
										</div>
										<div style={{width:'100%'}}>
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
										</div>

										<div className="t-Form-inputContainer col col-5 row" style={{marginBottom: 20, marginLeft:0,padding:0}}>
											<div className="t-Form-itemWrapper" style={{border: '0.1rem solid #EAEAEA',borderRadius: '0.2rem'}}>
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
														onClick={e => this.increment(this.state.defaultQty)}
													>
														+
													</i>
												</span>
											</div>
										</div>
										<div className="alsoLikeCard add-cart">
											<div className="homePage">
												<button className="alsoLikeCardButton" style={{marginTop: 0}}>add to basket</button>
											</div>
										</div>

										<div className="share-wishlist">
											<a className="hover-on-favorite" style={{marginRight: 35}}>
												<img src={favoriteImg} />
												<span>add to wishlist</span>
											</a>
											<a onClick={() => this.setState({ openShareModel: true })} className="hover-on-favorite">
												<i className='fa fa-share-alt' style={{fontSize:25, marginRight:13}}></i>
												<span >Share</span>
											</a>
										</div>
										
										{this.state.openShareModel ? <div>
											<Modal open={this.state.openShareModel} onClose={this.onCloseFirstModal}>
											<ShareUrl />
											</Modal>
										</div> : ''}
										<div className="deliy-free">
											<span>this product includes free UK delivery</span>
										</div>
										<div className="learn-skill">
											<span> Learning Skills:</span>
											
										</div>
										<div className="learn-skill-img">
											<img src={imagination_icon} />
											<img src={discovertheworld_icons} />
											<img src={socialskills_icon} />
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
					</div>
				</div>
			</div>
		);
	}
}

export default ProductInfo;
