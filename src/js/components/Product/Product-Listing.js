import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import ProductData from './product-list/product-list';
import ProductFilter from './product-filter/product-filter';
import Axios from 'axios';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import queryString from 'query-string';
import ProductMobFilter from './product-filter/product-mobfilter';
import Spinner from '../Spinner/Spinner2';
import * as utility from '../utility/utility';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
} from "react-device-detect";
import { FormattedMessage } from 'react-intl';
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
			filterKey: {}
		};

		filters = {};
		sortbyv = 'relevance';
		searchValue = null;
		count = 0;
		mobileFilter = {};
	}

	static getDerivedStateFromProps = (props, state) => {
		// console.log('getDerivedStateFromProps Called!!');

		// console.log('new state', state);
	};

	_closeSlider = () => {
		document.getElementById('cd-cart').classList.remove('speed-in');
		const values = queryString.parse(this.props.location.search);
		let searchQuery = values.query;
		if (searchQuery)
			this._fetchSearchedProducts(searchQuery, filters)
		else
			this._fetchProducts(filters)
	};

	_callFilters = () => {
		//console.log('call filters!!');
		document.getElementById('cd-cart').classList.add('speed-in');
	};
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
		}, 9000)
	};

	_fetchProducts = async (filters = {}) => {

		
		const {
			match: { params },
		} = this.props;
		//console.log('params', params.category_path);
		if (params.category_path === "search") {
			return;
		}
		const mainCat = params.category_path.split('-');

		const data1 = Object.keys(mainCat)
			.filter(function (item) {
				return item > 0;
			})
			.map(function (item, index) {
				return mainCat[item];
			});
		const cat = data1.join('-').toString();

		let newCat = cat;
		if ((cat === 'style') || (cat === 'collection')) {
			newCat = mainCat[0];
		}

		const data = {
			customerid: typeof this.props.customer_details.customer_id !== 'undefined' ? parseInt(this.props.customer_details.customer_id) : " ",
			url_key: newCat ? newCat : mainCat[0],
			sortby: sortbyv,
			storeid: this.props.globals.currentStore,
			filters: filters,
		};
		this.setState({ loading: true });

		
		await this.props.onGetProductList(data);

		setTimeout(() => {
			this.setState({ loading: false });
		}, 9000)

	};

	componentDidUpdate(prevProps, prevState) {
		const values = queryString.parse(this.props.location.search);
		let searchQuery = values.query;
		if (searchQuery && searchValue !== searchQuery) {
			searchValue = searchQuery;
			this.clearFilter();
			this._fetchSearchedProducts(searchQuery, filters);
		}
		if (prevProps.match.params.category_path !== this.props.match.params.category_path) {
			this.clearFilter();
			this._fetchProducts();
		}

		if (prevProps.globals.currentStore !== this.props.globals.currentStore) {
			this.clearFilter();
			if (searchQuery) {
				searchValue = searchQuery;
				this._fetchSearchedProducts(searchQuery, filters);
			} else {
				this._fetchProducts();
			}

		}

		if (document.getElementsByTagName('html')[0].getAttribute('dir') == 'rtl') {
			document.getElementById('sortFilterId').setAttribute('style', "float:left");
		} else {
			document.getElementById('sortFilterId').setAttribute('style', "float:right");
		}

	}

	componentDidMount() {
		//console.log('currProps', this.props.match);
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

	getFilteredData = (el, item = null) => {
		debugger;
		this.setState({ price: el.target.value });
		if (item && !isMobile) {
			this.createFilterObject(item.code, item.value);
		} else {
			this.createFilterObjectForMobile(item.code, item.value);
		}
	};

	clearFilter = () => {
		var clist = document.getElementsByTagName("input");
		for (var i = 0; i < clist.length; ++i) { clist[i].checked = false; }
		const values = queryString.parse(this.props.location.search);
		mobileFilter = {};
		filters = {};
		this.setState({ filters: {} });
		let searchQuery = values.query;
		if (searchQuery) {
			searchValue = searchQuery;
			this._fetchSearchedProducts(searchQuery, filters);
		} else {
			this._fetchProducts();
		}
	}

	getFilteredDataForMobile = (el, item = null) => {
		this.setState({ price: el.target.value });
		if (item) {
			this.createFilterObjectForMobile(item.code, el.target.value);
		}
	};

	createFilterObject = (name, value) => {
    debugger;
		let array = [];

		if (filters[name]) {
			array = filters[name].split(',');
		}

		if (array.indexOf(value) !== -1) {
			array.splice(array.indexOf(parseInt(value)), 1);
			mobileFilter[name] = array;
			this.setState({ filters: mobileFilter });
			filters[name] = array.toString();

			if (filters[name] === "") {
				delete filters[name]
			}

		} else {
			let mobileArray = [];
			if (filters[name]) {
				filters[name] = `${filters[name]},${value}`;
				mobileArray = filters[name].split(',');
				mobileFilter[name] = mobileArray;
				this.setState({ filters: mobileFilter });
			} else {
				filters[name] = `${value}`;
				mobileArray.push(value);
				mobileFilter[name] = mobileArray;
				this.setState({ filters: mobileFilter });
			}
		}
		const values = queryString.parse(this.props.location.search);
		let searchQuery = values.query;
		if (searchQuery)
			this._fetchSearchedProducts(searchQuery, filters)
		else
			this._fetchProducts(filters)
	}

	createFilterObjectForMobile = (name, value) => {

		let array = [];

		if (filters[name]) {
			array = filters[name].split(',');
		}

		if (array.indexOf(value) !== -1) {
			array.splice(array.indexOf(parseInt(value)), 1);
			mobileFilter[name] = array;
			this.setState({ filters: mobileFilter });
			filters[name] = array.toString();

			if (filters[name] === "") {
				delete filters[name]
			}

		} else {
			let mobileArray = [];
			if (filters[name]) {
				filters[name] = `${filters[name]},${value}`;
				mobileArray = filters[name].split(',');
				mobileFilter[name] = mobileArray;
				this.setState({ filters: mobileFilter });
			} else {
				filters[name] = `${value}`;
				mobileArray.push(value);
				mobileFilter[name] = mobileArray;
				this.setState({ filters: mobileFilter });
			}
		}
	}
	 

	
    
	 sortByPrice=(arr)=> {
      debugger;
		for(let  x = 0; x < arr.length; x++){
			arr[x] = arr[x].price.sort(function(a,b){
				return parseFloat(a.price) - parseFloat(b.price);
			});
		}
	
		return arr;
	}

	
	

	getSortBy = (value) => {
		

		if(this.props.productDetails)
		{
			let data= this.props.productDetails.products;
			console.log("data", this.props.productDetails)
			let sorted = Object.assign({}, data);  // Copy the data object
			console.log("Data Before sort",sorted);

			let sortedByPriceAsc=[];
			sortedByPriceAsc= _.sortBy(Object.keys(sorted).map(k => ({id:k, ...sorted[k]})), (d)=> d.price.price);
			let sortedByPriceDesc=[];

			sortedByPriceDesc=_.sortBy(Object.keys(sorted).map(k => ({id:k, ...sorted[k]})), (d)=> d.price.price).reverse();
			if(value==='price_asc')
			{
				this.setState({filters:sortedByPriceAsc});
				//this.props.productDetails.filters=sortedByPriceAsc;
				console.log("Sorted Asc Data",sortedByPriceAsc);
			}else
			{
				//this.props.productDetails.filters=sortedByPriceDesc;
				console.log("Sorted Desc  Data",sortedByPriceDesc);
				this.setState({filters:sortedByPriceDesc})
			}

		}
		// <filter item = {this.state.sortedByPriceDesc}/>
	    // this.props

	//this.props.productDetails.products=newWSortedData;
	//console.log("Price Data",this.data);
	//this.props.productDetails.filters=this.productDetails.products;
		// sortbyv = value;
		// const values = queryString.parse(this.props.location.search);
		// let searchQuery = values.query;
		// if (searchQuery)
		// 	this._fetchSearchedProducts(searchQuery, filters)
		// else
		// 	this._fetchProducts(filters)
	}



	render() {
		const values = queryString.parse(this.props.location.search);
		let searchQuery = values.query;
		let filterKey = {}
		Object.keys(this.props.productDetails.filters).map((item, index)=> {
			filterKey[item] = this.props.productDetails.filters[item][0].code;
			console.log(this.props.productDetails.filters)
		});

		
         
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
					<div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
						<Breadcrumb name={searchQuery ? searchQuery : this.props.category_name ? this.props.category_name : this.props.match.params.category_path} />

						{/* Product filter goes here */}
 
						<ProductFilter
							productFilters={this.props.productDetails.filters}
							getFilteredData={this.getFilteredData}
							getSortBy={this.getSortBy}
							filters={mobileFilter}
							isEmpty={utility.emptyObj(filters)}
							clearFilter={this.clearFilter}
							filterKey={filterKey}
							
						/> 

						{Object.keys(this.props.productDetails.products).length > 0 && (
						<div
							id="R29005156978427060"
							className="t-BreadcrumbRegion h-hidden-desktop t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle"
						>
							<div className="t-BreadcrumbRegion-body">
								<div className="t-BreadcrumbRegion-breadcrumb">
									<ul className="mobile-filter">
										<li id="cd-cart-trigger" onClick={this._callFilters}>
											<FormattedMessage id="Product.Listing.FilterBy" defaultMessage="Filter by" />
										</li>
										<li>
											<div><FormattedMessage id="Product.Listing.SortBy" defaultMessage="Sort by" /></div>
											<div className="dropdown-content" id="mobile-sort-by-content-div">
												<div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--checkbox ">
													<div className="t-Form-inputContainer">
														<div className="t-Form-itemWrapper">
															<div
																className="radio_group apex-item-group apex-item-group--rc apex-item-radio"
																role="group"
															>
																<fieldset
																	className="radio_group apex-item-radio"
																	style={{ width: '300px' }}
																>
																	<input
																		type="radio"
																		id="mob_sortprice_1"
																		defaultChecked="checked"
																		name="mob_SORTPRICE"
																		onClick={(e) => this.getSortBy('relevance')}
																		defaultValue="relevance"
																	/>
																	<label htmlFor="mob_sortprice_1"><FormattedMessage id="Product.Listing.Relevance" defaultMessage="Relevance" /></label>
																	<br />
																	<input
																		type="radio"
																		id="mob_sortprice_2"
																		name="mob_SORTPRICE"
																		onClick={(e) => this.getSortBy('price_desc')}
																		defaultValue="price_desc"
																	/>
																	<label htmlFor="mob_sortprice_2">
																		<FormattedMessage id="Product.Listing.PriceHTL" defaultMessage="PriceHTL" />
																	</label>
																	<br />
																	<input
																		type="radio"
																		id="mob_sortprice_3"
																		name="mob_SORTPRICE"
																		onClick={(e) => this.getSortBy('price_asc')}
																		defaultValue="price_asc"
																	/>
																	<label htmlFor="mob_sortprice_3">
																		<FormattedMessage id="Product.Listing.PriceLTH" defaultMessage="PriceLTH" />
																	</label>
																</fieldset>
															</div>
														</div>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</div>
							</div>
							<div className="t-BreadcrumbRegion-buttons" />
						</div>
						)}
					</div>

					<div className="t-Body-content" id="t_Body_content">
						<div id="t_Body_content_offset" style={{ height: '139px' }} />
						<span
							id="APEX_SUCCESS_MESSAGE"
							data-template-id="33770911730796245_S"
							className="apex-page-success u-hidden"
						/>
						<span
							id="APEX_ERROR_MESSAGE"
							data-template-id="33770911730796245_E"
							className="apex-page-error u-hidden"
						/>

						<div className="t-Body-contentInner">
							<div>
								<div >
									<div >
										{/* Product List Component gose here*/}
										{this.props.spinnerProduct ? <Spinner /> : <ProductData Data={this.props.productDetails.products} loading1={this.props.spinnerProduct} />}
									</div>
								</div>
								<div className="row">
									<div className="col col-12 apex-col-auto">
										<div
											className="t-Region h-hidden-desktop  t-Region--noPadding t-Region--scrollBody"
											id="cd-cart"
										>
											<div className="t-Region-header">
												<div className="t-Region-headerItems t-Region-headerItems--title">
													<span className="t-Region-headerIcon">
														<span className="t-Icon " aria-hidden="true" />
													</span>
													<h5 className="t-Region-title" id="cd-cart_heading">
														Filters
													</h5>
												</div>
												<div className="t-Region-headerItems t-Region-headerItems--buttons">
													<button
														onClick={this._closeSlider}
														className="t-Button t-Button--hot "
														type="button"
														id="B29004859664427057"
													>
														<span className="t-Button-label">Done</span>
													</button>
													<span className="js-maximizeButtonContainer" />
												</div>
											</div>
											<div className="t-Region-bodyWrap">
												<div className="t-Region-buttons t-Region-buttons--top">
													<div className="t-Region-buttons-left" />
													<div className="t-Region-buttons-right" />
												</div>

												<ProductMobFilter
													productFilters={this.props.productDetails.filters}
													getFilteredDataForMobile={this.getFilteredDataForMobile}
													filters={this.state.filters}
												/>

												<div className="t-Region-buttons t-Region-buttons--bottom">
													<div className="t-Region-buttons-left" />
													<div className="t-Region-buttons-right" />
												</div>
											</div>
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
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Product);
