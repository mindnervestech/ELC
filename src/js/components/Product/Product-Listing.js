import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import ProductData from './product-list/product-list';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import queryString from 'query-string';
import Spinner from '../Spinner/Spinner2';
import { Link, Redirect, withRouter } from 'react-router-dom';
var _ = require('lodash');
let filters = {};
let sortbyv = 'relevance';
let searchValue = null;
let count = 0;
let mobileFilter = {};
class Product extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			price: '0-600',
			products: [],
			filters: {},
			loading: true,
			filterKey: {},
			reDirectedFromPF: false,
			reDirectedFromBrowseAllBrand: false
		};

		filters = {};
		sortbyv = 'relevance';
		searchValue = null;
		count = 0;
		mobileFilter = {};
	}

	_fetchSearchedProducts = async (query, filters = {}) => {
		const data = {
			customerid: typeof this.props.customer_details.customer_id !== 'undefined' ? parseInt(this.props.customer_details.customer_id) : " ",
			q: query,
			page: 1,
			limit: 5,
			sortby: sortbyv,
			storeid: this.props.globals.currentStore,
			filters: filters,
		};
		this.setState({ loading: true });
		await this.props.onGetProductSearchList(data);
		setTimeout(() => {
			this.setState({ loading: false });
		}, 2000)
	};

	_fetchProducts = async (filters = {}) => {
		const {
			match: { params },
		} = this.props;
		if (params.category_path === "search") {
			return;
		}
		
		let category_path = this.props.location.pathname.split('/')
		let url = ''
		if(category_path[category_path.length - 2] == "products"){
			url = category_path[category_path.length - 1]
		}else{
			if(category_path[category_path.length - 2] !== 'uae-en' &&
				category_path[category_path.length - 2] !== 'uae-ar' &&
				category_path[category_path.length - 2] !== 'saudi-en' &&
				category_path[category_path.length - 2] !== 'saudi-ar'){
					url = category_path[category_path.length - 2] + '-' +category_path[category_path.length - 1]
			}else{
				url = category_path[category_path.length - 1]
			}
		}
		const data = {
			customerid: typeof this.props.customer_details.customer_id !== 'undefined' ? parseInt(this.props.customer_details.customer_id) : " ",
			url_key: url,//category_path[category_path.length - 1].trim(),//newCat ? newCat : mainCat[0],
			sortby: sortbyv,
			storeid: this.props.globals.currentStore,
			filters: filters,
		};
		this.setState({ loading: true });
		let pathName = this.props.location.pathname
		if (category_path[category_path.length - 1] !== "present_finder" && category_path[category_path.length - 2]!== "brand") {
			this.setState({ reDirectedFromPF: false, reDirectedFromBrowseAllBrand: false })
			await this.props.onGetProductList(data);
		}
		// else if (category_path[category_path.length - 1]!== "brand") {
		// 	this.setState({ reDirectedFromPF: false, reDirectedFromBrowseAllBrand: false })
		// 	await this.props.onGetProductList(data);
		// }


		setTimeout(() => {
			this.setState({ loading: false });
		}, 2000)

	};
	componentWillMount() {
		//this.props.onClearBrandProductDetails(this.props.productDetails)
		// if(this.props.location.state!==undefined){
		// 	this.props.onClearBrandProductDetails(this.props.location.state.filteredProductData)
		// }

		this.setState({ reDirectedFromBrowseAllBrand: false, reDirectedFromPF: false })

	}

	componentDidUpdate(prevProps, prevState) {

		if (this.props.location.pathname !== prevProps.location.pathname) {
			//	this.props.onClearBrandProductDetails(this.props.location.state.filteredProductData)

		}
		const values = queryString.parse(this.props.location.search);
		let searchQuery = values.query;
		if (searchQuery && searchValue !== searchQuery) {
			searchValue = searchQuery;
			this._fetchSearchedProducts(searchQuery, filters);
		}
		let url = this.props.location.pathname.split('/')
		let preUrl = prevProps.location.pathname.split('/')
		if (preUrl[preUrl.length - 1] !== url[url.length - 1]) {
			this._fetchProducts();
		}

		if (prevProps.globals.currentStore !== this.props.globals.currentStore) {
			if (searchQuery) {
				searchValue = searchQuery;
				this._fetchSearchedProducts(searchQuery, filters);
			} else {
				this._fetchProducts();
			}
		}
	}

	componentDidMount() {
		let pathname = this.props.location.pathname.split('/');

		if (pathname[pathname.length - 1] === "present_finder") {
			this.setState({ reDirectedFromPF: true })
		}
		if (pathname[pathname.length - 2] === "brand") {
			this.setState({ reDirectedFromBrowseAllBrand: true })
		}
		if (count == 0)
			this._fetchProducts();
		count++;
		filters = {};
		sortbyv = 'relevance';
		searchValue = null;
		const values = queryString.parse(this.props.location.search);
		let searchQuery = values.query;
		if (searchQuery) {
			this._fetchSearchedProducts(searchQuery, filters);
		}
	}

	getCatagoryName = (value) => {
		let replesUrl = value
		let url = []
		replesUrl = replesUrl.replace(/uae-ar|uae-en|saudi-en|saudi-ar|%20/gi,"")
		let index = replesUrl.split('/');
		for(let data in index){
			if(index[data] !== "" && index[data] !== " "){
				url.push(index[data])
			}
		}
		let bradCome = ""
		if(this.props.category_name != undefined){
			if(url[url.length-2] == "products"){
				bradCome = this.props.category_name //url[url.length-1]
			}else{
				bradCome = url[url.length-2] + "--" + this.props.category_name
			}
			return bradCome
		}else{
			return bradCome
		}
		// let catName = category_name.split(' ');
		// let catPath = category_path.split('-');
		// if (catName && catPath) {
		// 	if (catName[0].toUpperCase() == catPath[0].toUpperCase()) {
		// 		localStorage.setItem('current-categogy-name', category_name);
		// 		return category_name;
		// 	} else {
		// 		localStorage.setItem('current-categogy-name', category_path + '\'' + category_name);
		// 		return category_path + '--' + category_name;
		// 	}
		// } else {
		// 	localStorage.setItem('current-categogy-name', category_name);
		// 	return category_name;
		// }
	}

	render() {
		let store_locale = this.props.globals.store_locale
		let pathName = this.props.location.pathname
		let meta_tag = null;
		if (this.props.productDetails.metainfo.meta_title && this.props.productDetails.metainfo.meta_keywords && this.props.productDetails.metainfo.meta_description) {
			
			meta_tag = <><Helmet>
				<meta name="tital" content={this.props.productDetails.metainfo.meta_title} />
				<title>{this.props.productDetails.metainfo.meta_title}</title>
				<meta name="keywords" content={this.props.productDetails.metainfo.meta_keywords} />
				<meta name="description" content={this.props.productDetails.metainfo.meta_description} />
			</Helmet></>;
		}
		return (
			<div className="t-Body">
				{meta_tag}
				<div className="t-Body-main" style={{ marginTop: '0px !important' }}>
					<div className="t-Body-title" id="t_Body_title" style={{ top: '0px' }}>
					{this.props.location.pathname.split("/")[3] !== "present_finder" ?	<Breadcrumb name={this.getCatagoryName(pathName)} />:''}
					</div>
					<div className="t-Body-content" id="t_Body_content">
						<div id="t_Body_content_offset" style={{ height: '139px' }} />
						<div className="t-Body-contentInner">
							<div>
							
								{this.props.location.pathname.split("/")[3] === "present_finder" &&
								 this.props.location.state !== undefined && this.props.location.state.productdatafromPF ? 
								 <ProductData Data={this.props.location.state.productdatafromPF} datacomefrompf={true} /> :
								  this.props.spinnerProduct ? 
								  <Spinner />  : 
								  this.props.location.pathname.split("/")[3] === "brand" &&
								 this.props.location.state !== undefined && this.props.location.state.filteredProductData ? 
								 <ProductData Data={this.props.location.state.filteredProductData} datacomefrompf={true} />  : 
								  <ProductData Data={this.props.productDetails.products} loading1={this.props.spinnerProduct} />
								 }
								{/* {this.props.spinnerProduct ? <Spinner /> :  } */}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		globals: state.global,
		productDetails: state.productDetails,
		spinnerProduct: state.spinner.loadingProduct,
		customer_details: state.login.customer_details,
		category_name: state.productDetails.category_name
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProductList: payload => dispatch(actions.getProductList(payload)),
		onGetProductSearchList: payload => dispatch(actions.getProductSearchList(payload)),
		onClearBrandProductDetails: payload => dispatch(actions.clearProductDetailsBrands(payload)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);
