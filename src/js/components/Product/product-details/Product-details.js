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

import { trackF, initializeF } from '../../utility/facebookPixel';
import { live } from '../../../api/globals';
import ProductRecentlyViewed from '../product-details/product-info/product-color';

let productDataDetail = {
	"code": 200,
	"status": true,
	"message": "Product Details.",
	"product": [
	  {
		"category_id": false,
		"id": "67",
		"sku": "MH01",
		"name": "Chaz Kangeroo Hoodie",
		"imageUrl": "http://nayomidev.iksulalive.com/pub/media/catalog/product/m/h/mh01-gray_main.jpg",
		"mouseoverImageUrl": "http://nayomidev.iksulalive.com/pub/static/webapi_rest/_view/ar_SA/Magento_Catalog/images/product/placeholder/.jpg",
		"you_save": "",
		"you_save_value": "",
		"percentage": "",
		"type": "configurable",
		"created_at": "2019-03-28 05:20:20",
		"updated_at": "2019-03-28 05:20:20",
		"description": "<p>Ideal for cold-weather training or work outdoors, the Chaz Hoodie promises superior warmth with every wear. Thick material blocks out the wind as ribbed cuffs and bottom band seal in body heat.</p>\n<p>&bull; Two-tone gray heather hoodie.<br />&bull; Drawstring-adjustable hood. <br />&bull; Machine wash/dry.</p>",
		"short_description": null,
		"price": "52.0000",
		"special_price": null,
		"quantity_and_stock_status": {
		  "is_in_stock": true,
		  "qty": 1
		},
		"low_in_stock": true,
		"products_images": [
		  "http://nayomidev.iksulalive.com/pub/media/catalog/product/cache/a7b76a329f79f431476513a7aba75d0b/m/h/mh01-gray_main.jpg",
		  "http://nayomidev.iksulalive.com/pub/media/catalog/product/cache/a7b76a329f79f431476513a7aba75d0b/m/h/mh01-gray_alt1.jpg",
		  "http://nayomidev.iksulalive.com/pub/media/catalog/product/cache/a7b76a329f79f431476513a7aba75d0b/m/h/mh01-gray_back.jpg"
		],
		"product_details": {
		  "sku": {
			"label": "SKU",
			"value": "MH01",
			"code": "sku"
		  },
		  "weight": {
			"label": "Weight",
			"value": null,
			"code": "weight"
		  },
		  "material": {
			"label": "Material",
			"value": "Wool",
			"code": "material"
		  },
		  "pattern": {
			"label": "Pattern",
			"value": "Color-Blocked",
			"code": "pattern"
		  },
		  "climate": {
			"label": "Climate",
			"value": "All-Weather, Cool, Indoor, Spring, Windy",
			"code": "climate"
		  }
		},
		"is_in_wishlist": false,
		"wishlist_itemid": "",
		"similar_products": []
	  }
	]
  }

class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productData: [],
			productDetailTab: 'Product Information',
		};
	}

	componentWillMount() {
		if (this.props.productDetails) {
			this.props.onClearProductDetails(this.props.productDetails);
		}
	}

	componentDidMount() {
		//console.log('params', this.props.match);

		const {
			match: { params },
		} = this.props;
		const data = {
			customerid: typeof this.props.customer_details.customer_id !== 'undefined' ? parseInt(this.props.customer_details.customer_id) : " ",
			store: this.props.globals.currentStore,
			url_key: params.category,
		};
		
		this.props.onGetProductDetails(data);
		this.props.getSizeChart({
			store_id: this.props.globals.currentStore,
		});
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
	}

	getProductInfoDetail(type){
		console.log(type);
		console.log(this.props);
		this.setState({productDetailTab : type});
		
	}

	render() {
		//console.log('pdp details', this.props.productDetails);
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
		return (
			<div className="t-Body">
				{meta_tag}
				<div className="t-Body-main" style={{ marginTop: '0px !important' }}>
					<div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
						{this.props.productDetails.name && (<Breadcrumb name={`${this.props.productDetails.category_desc}-${this.props.productDetails.short_description}`} />)}
					</div>
					<div className="t-Body-content" id="t_Body_content">
						<div id="t_Body_content_offset" style={{ height: '85px' }} />
						<div className="t-Body-contentInner">
							{this.props.productDetailLoader ? <Spinner /> : (<div className="container" style={{maxWidth: '85%'}}>
								<ProductInfo productDataDetail={productDataDetail.product[0]} data={this.props.productDetails} currentStore={this.props.globals.currentStore} />

								{this.props.productDetails.similar_products && (
									<ProductSlider currency={this.props.productDetails.currency} store_name={this.props.globals.store_locale} similar_product={this.props.productDetails.similar_products} />
								)}

							</div>)}
						</div>
						<div className="col col-12 product-tab">
							<div>
								<ul style={{marginBottom:0}}>
									<li style={{width:184, marginRight:25}} className={this.state.productDetailTab == "Product Information" ? "active-tab" : ''}>
										<a onClick={() => this.getProductInfoDetail('Product Information')} className="product-des">Product Information</a>
									</li>
									<li style={{width:184, marginRight:25}} className={this.state.productDetailTab == "Delivery options" ? "active-tab" : ''}>
										<a onClick={() => this.getProductInfoDetail('Delivery options')} className="product-des">Delivery options</a>
									</li>
									<li style={{width:184, marginRight:25}} className={this.state.productDetailTab == "Questions" ? "active-tab" : ''}>
										<a onClick={() => this.getProductInfoDetail('Questions')} className="product-des">Questions</a>
									</li>
								</ul>
							</div>
						</div>
						{this.state.productDetailTab !== '' ?
						<div className="col col-12">
							<div className="product-info">
								<ProductInformation data={data} type={this.state.productDetailTab} productDataDetail={productDataDetail.product[0]}  currentStore={this.props.currentStore}/>
							</div>
						</div>
						: ''}
						{/* You may also like */}
						<ProductSlider currency={this.props.productDetails.currency} store_name={this.props.globals.store_locale} similar_product={this.props.productDetails.similar_products} />
					
						{/* Product Review */}

						<ProductReview />

						{/* recentely Viewed */}
						<ProductRecentlyViewed productColor={data} />
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	//console.log('pdpstate', state);

	return {
		globals: state.global,
		menu: state.menu.menuNavData,
		productDetails: state.productDetails.productData,
		productDetailLoader: state.productDetails.productDetailLoader,
		customer_details: state.login.customer_details
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onClearProductDetails: payload => dispatch(actions.clearProductDetails(payload)),
		onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
		getSizeChart: payload => dispatch(actions.getSizeChart(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductDetails);
