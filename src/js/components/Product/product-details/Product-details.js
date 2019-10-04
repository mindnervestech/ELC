import React, { Component } from 'react';
import '../../../../styles/product-details/magicscroll.css';
import '../../../../styles/product-details/productdetail.css';
import '../../../../styles/product-details/magiczoomplus.css';
import '../../../../styles/product-details/magic.css';
import Axios from 'axios';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';
import { Helmet } from 'react-helmet';
import ProductInfo from './Product-info';
import ProductSlider from './Product-slider';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Spinner from '../../Spinner/Spinner2';
import ProductInformation from './product-info/product-info';
import ProductReview from '../product-details/product-info/product-sizeGuide';
import AddToCartModal from '../product-details/product-info/product-basic';
import { trackF, initializeF } from '../../utility/facebookPixel';
import { live } from '../../../api/globals';
import Modal from 'react-responsive-modal';
import ProductRecentlyViewed from '../product-details/product-info/product-color';
import { FormattedMessage } from 'react-intl';

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productData: [],
			productDetailTab: 'Product Information',
			addToCartModal: false,
			cartModelFlag: false,
			showForAddCartAlert: false,
			item_added_message: '',
		};
	}

	componentWillMount() {
		if (this.props.productDetails) {
			this.props.onClearProductDetails(this.props.productDetails);
		}
	}

	componentDidMount() {

		const {
			match: { params },
		} = this.props;
		const data = {
			customerid: typeof this.props.customer_details.customer_id !== 'undefined' ? parseInt(this.props.customer_details.customer_id) : " ",
			store: this.props.globals.currentStore,
			url_key: params.category,
			// url_key:'elc18-1'
		};

		this.props.onGetProductDetails(data);
		// this.props.getSizeChart({
		// 	store_id: this.props.globals.currentStore,
		// });
		if (this.props.guest_user.temp_quote_id == null) {
			this.props.onGetGuestCartId();
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.productDetails.id !== this.props.productDetails.id) {
			if (live) {
				initializeF();
				trackF('ViewContent', this.props.productDetails);
			}
		}

		if (prevProps.globals.currentStore !== this.props.globals.currentStore) {
			const { match: { params } } = this.props;
			const data = {
				customerid: this.props.customer_details.customer_id ? parseInt(this.props.customer_details.customer_id) : '',
				store: this.props.globals.currentStore,
				url_key: params.category,
			};

			this.props.onGetProductDetails(data);
		}

		if (prevProps.match.params.category != this.props.match.params.category) {
			const { match: { params } } = this.props;
			const data = {
				customerid: this.props.customer_details.customer_id ? parseInt(this.props.customer_details.customer_id) : '',
				store: this.props.globals.currentStore,
				url_key: params.category,
			};
			this.props.onGetProductDetails(data);
		}
		if (prevProps.addToCardLoader !== this.props.addToCardLoader) {
			setTimeout(() => {
				if (this.props.user_details.isUserLoggedIn) {
					this.props.OngetMyCart({
						quote_id: this.props.user_details.customer_details.quote_id,
						store_id: this.props.globals.currentStore
					})
				} else {
					this.props.OngetMyCart({
						quote_id: this.props.guest_user.new_quote_id,
						store_id: this.props.globals.currentStore
					})

				}
			}, 2000);
		}

		if (this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp && !this.state.cartModelFlag) {
			if (this.props.item_added.add_cart_error) {
				this.setState({
					item_added_message: this.props.item_added.item_added.message ? this.props.item_added.item_added.message : 'added',
					cartModelFlag: true
				});
				if (this.state.showForAddCartAlert) {
					setTimeout(() => {
						this.closeForAddCartAlert();
					}, 5000);
				}
			} else {
				this.setState({
					addToCartModal: true,
					cartModelFlag: true,
					item_added_message: '',
				})
				if (this.state.showForAddCartAlert) {
					setTimeout(() => {
						this.closeForAddCartAlert();
					}, 4000);
				}
			}
		}
	}

	onCloseCartModal = () => {
		this.setState({ addToCartModal: false })
	}


	closeForAddCartAlert = () => {
		this.setState({ showForAddCartAlert: false});
	}

	getProductInfoDetail(type) {
		this.setState({ productDetailTab: type });

	}

	alertFlag = () => {
		this.setState({
			showForAddCartAlert: true,
			cartModelFlag: false
		})
	}

	render() {
		const { data } = this.props;
		let meta_tag = null;
		if (('meta_title' in this.props.productDetails) && ('meta_keywords' in this.props.productDetails) && ('meta_description' in this.props.productDetails)) {

			meta_tag = <><Helmet>
				<meta name="tital" content={this.props.productDetails.meta_title} />
				<title>{this.props.productDetails.meta_title}</title>
				<meta name="keywords" content={this.props.productDetails.meta_keywords} />
				<meta name="description" content={this.props.productDetails.meta_description} />
			</Helmet></>;
		}

		let respo_ForAddCartAlertmessage = null;
		if (this.state.showForAddCartAlert && this.props.item_added.item_added && this.props.item_added.add_cart_open_popUp) {
			respo_ForAddCartAlertmessage = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
				<div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
					<div className="t-Alert-wrap">
						<div className="t-Alert-icon">
							<span className="t-Icon" />
						</div>
						<div className="t-Alert-content">
							{this.state.item_added_message !== '' ? <div className="t-Alert-header">
								<h2 className="t-Alert-title">{this.state.item_added_message}</h2>
							</div> :
								<div className="t-Alert-header">
									<h2 className="t-Alert-title">
										<FormattedMessage id="Addedtoyourbasket" defaultMessage="Added to your basket" />
									</h2>
								</div>}
						</div>
						<div className="t-Alert-buttons">
							<button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.closeAlert} ><span className="t-Icon icon-close" /></button>
						</div>
					</div>
				</div>
			</div></span>;
		}

		return (
			<div className="t-Body">
				{meta_tag}
				{respo_ForAddCartAlertmessage}
				<div className="t-Body-main" style={{ marginTop: '0px !important' }}>
					<div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
						{this.props.productDetails.name && (<Breadcrumb name={`${this.props.productDetails.category_names && this.props.productDetails.category_names.length > 0
							? this.props.productDetails.category_names : localStorage.getItem('current-categogy-name')}--${this.props.productDetails.short_description}`} />)}
					</div>
					<div className="t-Body-content" id="t_Body_content">
						<div id="t_Body_content_offset" style={{ height: '85px' }} />
						<div className="t-Body-contentInner">
							{this.props.productDetailLoader || this.props.addToCardLoader ? <Spinner /> : (<div className="container" style={{ maxWidth: '85%' }}>
								<ProductInfo alertFlag={this.alertFlag} data={this.props.productDetails} currentStore={this.props.globals.currentStore} />

								{/* {this.props.productDetails.similar_products && (
									<ProductSlider currency={this.props.productDetails.currency} store_name={this.props.globals.store_locale} similar_product={this.props.productDetails.similar_products} />
								)} */}

							</div>)}
						</div>
						<div className="col col-12 product-tab show-web">
							<div>
								<ul style={{ marginBottom: 0 }}>
									<li style={{ width: 184, marginRight: 25 }} className={this.state.productDetailTab == "Product Information" ? "active-tab" : ''}>
										<a onClick={() => this.getProductInfoDetail('Product Information')} className="product-des"><FormattedMessage id="Product.Details.ProductInfo" defaultMessage="Product Information" /></a>
									</li>
									<li style={{ width: 184, marginRight: 25 }} className={this.state.productDetailTab == "Shipping" ? "active-tab" : ''}>
										<a onClick={() => this.getProductInfoDetail('Shipping')} className="product-des">
											<FormattedMessage id="Checkout.Shipping" defaultMessage="Shipping" />
										</a>
									</li>
									{/*<li style={{width:184, marginRight:25}} className={this.state.productDetailTab == "Questions" ? "active-tab" : ''}>
										<a onClick={() => this.getProductInfoDetail('Questions')} className="product-des">Questions</a>
									</li> */}
								</ul>
							</div>
						</div>
						{this.state.productDetailTab !== '' ?
							<div className="col col-12">
								<div className="product-info">
									<ProductInformation data={this.props.productDetails} type={this.state.productDetailTab} currentStore={this.props.currentStore} />
								</div>
							</div>
							: ''}
						{this.state.addToCartModal && this.props.cart_details.similar_products ? <div>
							<Modal modalId="addToCartPopupID" open={this.state.addToCartModal} onClose={this.onCloseCartModal}>
								<AddToCartModal onCloseCartModal={this.onCloseCartModal} />
							</Modal>
						</div> : ''}
						{/* You may also like */}
						<ProductSlider currency={this.props.productDetails.currency} store_name={this.props.globals.store_locale} similar_product={this.props.productDetails.similar_products} />

						{/* Product Review */}

						{/* <ProductReview /> */}

						{/* recentely Viewed */}
						{/* <ProductRecentlyViewed productColor={data} /> */}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {

	return {
		globals: state.global,
		menu: state.menu.menuNavData,
		productDetails: state.productDetails.productData,
		productDetailLoader: state.productDetails.productDetailLoader,
		customer_details: state.login.customer_details,
		addToCardLoader: state.productDetails.addToCardLoader,
		cart_details: state.myCart,
		user_details: state.login,
		guest_user: state.guest_user,
		item_added: state.item_added
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onClearProductDetails: payload => dispatch(actions.clearProductDetails(payload)),
		onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
		// getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
		OngetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
		onGetGuestCartId: () => dispatch(actions.getGuestCartId()),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductDetails);
