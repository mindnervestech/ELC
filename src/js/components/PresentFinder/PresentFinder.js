import React, { Component } from 'react'
import './PresentFinder.css';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../redux/actions/index';
import Spinner from '../Spinner/Spinner';
import { store } from '../../redux/store/store'
import { getPresentFinderData } from '../../redux/actions/getAndSetPresentfinder';
import ProductListData from '../PoductList/ProductListData'
let checkBoxSelection = [];
let productData = {}
let total_count = 0;
let priceArray = {}
let present_finder_age_array = {};
let arrayForPriceRangeCheck = [];
let productDataSendToPfRedirect = {};
var last_element = ''
const wait = require('../../../assets/images/wait.gif');
class PresentFinder extends Component {

	constructor(props) {
		super(props);
		this.state = {
			sortByShowOption: false,
			showCheckBoxSelected: false,
			sortByText: '',
			age: 0,
			priceTo: 0,
			priceFrom: 0,
			isClickedOnSubmit: false,
			resFlag: false

		}


	}
	componentDidMount() {
		let storeid = this.props.globals.currentStore && this.props.globals.currentStore;
		let data = { storeid: storeid }

		this.props.OnGetPresentFinderData(data)
	}
	componentWillReceiveProps(nextProps) {
		if (total_count === 0) {

			this.setState({ resFlag: false })
		}
		if (nextProps.present_finder_age_data.present_finder_data) {
			present_finder_age_array = nextProps.present_finder_age_data.present_finder_data
		}
		let obj = nextProps.present_finder_product_data.productData;
		if (obj) {
			productData = obj;
			// Object.entries(productData).map((item,index)=>{

			// 	productDataSendToPfRedirect.push(item.json.filtersdata);
			// })
		}
	}

	setPriceRange = (item, index) => {
		let temp = arrayForPriceRangeCheck
		let flag = false;
		for (var i = 0; i < (temp.length || 1); i++) {

			if (arrayForPriceRangeCheck[i] === item) {
				flag = true;
			}
		}
		if (flag) {
			arrayForPriceRangeCheck.pop(item)
		}
		else {
			arrayForPriceRangeCheck.push(item);
		}
		last_element = arrayForPriceRangeCheck[arrayForPriceRangeCheck.length - 1];
		if (last_element !== undefined) {
			var split = last_element.split(" ")
			if (arrayForPriceRangeCheck.length === 5) {
				this.setState({ priceFrom: 0, priceTo: split[1] })
			} else {
				this.setState({ priceFrom: 0, priceTo: split[4] })
			}

		} else {
			this.setState({ priceFrom: 0, priceTo: 0 })
		}
		var totalLength = Object.keys(priceArray).reduce(function (total, key) {
			return total += priceArray[key].length;
		}, 0);
		for (let i = 0; i < totalLength; i++) {
			if (i === index) {
				if (checkBoxSelection[index] === true) {
					flag = true
					checkBoxSelection[index] = false;
				} else {
					checkBoxSelection[index] = true;
				}
			}
		}
		var priceTo = parseInt(this.state.priceTo)
		const data = {
			storeid: this.props.globals.currentStore,
			age: this.state.age,
			priceFrom: this.state.priceFrom,
			priceTo: priceTo

		}
		if (data) {
			this.props.OnGetPresentFinderProducts(data)
		}
		this.forceUpdate();
	}
	callforgetProductsData = () => {
	    setTimeout(() => {
			var priceTo = parseInt(this.state.priceTo)
			const data = {
				storeid: this.props.globals.currentStore,
				age: this.state.age,
				priceFrom: this.state.priceFrom,
				priceTo: priceTo
			}
			this.props.OnGetPresentFinderProducts(data)
			console.log("in mail call",data)
			this.setState({ isClickedOnSubmit: true, resFlag: true });
			// setTimeout(() => {
				
			// }, 1000);
		
		}, 1000);
		
	}

	showSortByOption = () => {

		if (this.state.sortByShowOption) {
			this.setState({ sortByShowOption: false })
		} else {
			this.setState({ sortByShowOption: true })
		}
		this.forceUpdate();
	}
	showSelectedMonths = (value) => {
		let present_finder_age = store.getState().presentfinder.present_finder_data
		let id = 0
		this.state.sortByText = value;

		this.setState({ sortByShowOption: false })
		Object.entries(present_finder_age).map((item, index) => {
			if (item[1] === value) {
				id = item[0];
			}
		})
		this.setState({ age: id })

		const data = {
			storeid: this.props.globals.currentStore,
			age: this.state.age,
			priceFrom: 0,
			priceTo: 0
		}

		if (data) {
			this.props.OnGetPresentFinderProducts(data)
		}

		this.forceUpdate()
	}


	_renderPresentFinderInfo = () => {

	}
	render() {
		console.log("Product Data filter array", productData)
		let country = this.props.globals.country
		let currency = ''
		if (country === 'KSA') {
			currency = 'SAR'
		} else {
			currency = 'AED'
		}
		priceArray = {
			"0-49": `${currency} 0 - ${currency} 49`,
			"50-99": `${currency} 55 - ${currency} 99`,
			"100-249": `${currency} 100 - ${currency} 249`,
			"250-349": `${currency} 250 - ${currency} 349`,
			"350-449": `${currency} 350 - ${currency} 449`,
			"450-450": `${currency} 450 +`
		}

		let store_locale = this.props.globals.store_locale
		if (productData) {
			if (productData.data !== undefined) {
				total_count = productData.data.total_count


			}
		}
		console.log("count count", total_count)
		if (productData.data !== undefined && this.state.isClickedOnSubmit) {
			this.setState({ resFlag: false })
			return <Redirect to={{ pathname: `/${store_locale}/products/category_path`, state: { productdatafromPF: productData.data, reDirect: true } }} />
		}

		let _renderAgeArray = present_finder_age_array && Object.values(present_finder_age_array).map((item, index) => (
			<div onClick={() => this.showSelectedMonths(item)} style={{ cursor: 'pointer' }} className="sortByOptionText" >
				<span >{item}</span>
			</div>
		));


		let _renderPriceArray = Object.values(priceArray).map((item, index) => (

			<li>
				<div className="checkbox">
					<div style={{ position: 'relative' }}>
						<div onClick={() => this.setPriceRange(item, index)} className={(checkBoxSelection[index] ? "likeAInputSelected" : "likeAInputNotSelected")}>
							<div class="likeAInput"></div></div>
						<div class="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_0">{item}</label></div></div>
					<br />
				</div>
			</li>

		));

		return (
			<Spinner>
				<Row>
					<Col xs={1} lg={4} md={2}>
						<div style={{ margin: 10 }} className="padding-right-ar">
							<Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
								<span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span><span>&nbsp;\&nbsp;&nbsp;</span>
							</Link>
							<span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="presentfinder" defaultMessage="Present Finder" /></span>
						</div>
					</Col>
					<Col xs={10} lg={4} md={8} className="mobile-width-class" >

						<div style={{ margin: 10 }}>
							<div>
								<h1 className="present_finder_header">Present Finder</h1>
							</div>
							<div>
								<div>
									<h2 className="present_finder_age_header">Age</h2>
								</div>
								<div>
									<div style={{ position: 'relative', cursor: 'pointer', marginBottom: 30 }}>
										<div className={this.state.sortByShowOption ? "sortBySelectedText open present-finder-h" : "sortBySelectedText present-finder-h"} onClick={() => this.showSortByOption()}>
											<span>{this.state.sortByText != "" ? this.state.sortByText : <span>Please Select...</span>}</span>
											<i className="icon-down sortBySelectedTextIcon" ></i>
										</div>
										<div >
											<div className="sortByOption" style={this.state.sortByShowOption ? { display: 'block', overflow: 'scroll' } : { display: 'none' }}>
												{_renderAgeArray}

											</div>
										</div>
									</div>
									<div>
										<h2 className="present_finder_age_header"><FormattedMessage id="budget" defaultMessage="Budget" />:</h2>
									</div>
									<div>
										<ul>
											{_renderPriceArray}


										</ul>
									</div>
									<div>
										<div className="borderLine"></div>
										<div class="multi_holder button_holder results">
											<p>{total_count !== 0  ? <span>&nbsp;{productData.data.total_count} results found</span> : <span style={{ color: 'red' }}>Zero data found</span>}</p>
											{this.state.resFlag ?
												<button className="findPresentButton"><span>Find Presents</span>
													<img src={wait} style={{ width: 25, height: 20, marginTop: -4 }} alt="" /> </button>
												:
												<button onClick={() => this.callforgetProductsData()} className="findPresentButton">Find Presents</button>}
										</div>

									</div>
								</div>
							</div>
						</div>

						{/* {productData.data&& <ProductListData list={productData.data}/>} */}
					</Col>
					<Col xs={1} lg={4} md={2}></Col>
				</Row>
			</Spinner>

		)
	}
}


const mapStateToProps = state => {
	return {
		globals: state.global,
		present_finder_age_data: state.presentfinder,
		present_finder_product_data: state.presentfinder
	}
}
const mapDispatchToProps = dispatch => {
	return {
		OnGetPresentFinderData: payload => dispatch(actions.getPresentFinderData(payload)),
		OnGetPresentFinderProducts: payload => dispatch(actions.getAndSetPresentFinderProducts(payload))
	}
}


export default connect(mapStateToProps, mapDispatchToProps)(PresentFinder);