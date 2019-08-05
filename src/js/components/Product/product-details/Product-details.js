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
import Spinner from '../../Spinner/Spinner2'

import { trackF, initializeF } from '../../utility/facebookPixel';
import { live } from '../../../api/globals';


class ProductDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			productData: [],
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

	render() {
		//console.log('pdp details', this.props.productDetails);

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
							{this.props.productDetailLoader ? <Spinner /> : (<div className="container">
								<ProductInfo data={this.props.productDetails} currentStore={this.props.globals.currentStore} />

								{this.props.productDetails.similar_products && (
									<ProductSlider currency={this.props.productDetails.currency} store_name={this.props.globals.store_locale} similar_product={this.props.productDetails.similar_products} />
								)}

							</div>)}
						</div>
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
