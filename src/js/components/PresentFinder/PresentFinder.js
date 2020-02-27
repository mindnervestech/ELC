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
var _ = require('lodash');
let checkBoxSelection = [];
let productData = {}
let total_count = 0;
let priceArray = {}
let present_finder_age_array = {};
let arrayForPriceRangeCheck = [];
let productDataSendToPfRedirect = {};
var last_element = ''
var priceTo = 0;
let message=''
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
			isReadyToClick: false,
			isDisabled:true,
			resFlag: false,
			showAlert:false,
			getData: false
		}


	}
	componentDidMount() {
		let storeid = this.props.globals.currentStore && this.props.globals.currentStore;
		let data = { storeid: storeid }

		this.props.OnGetPresentFinderData(data)
	}
	componentWillMount() {

		checkBoxSelection = [];
	    productData = {}
		
		this.setState({ sortByText: '', showCheckBoxSelected: false })
	}
	// componentWillUnmount() {
	// 	this.setState({ sortByText: '', showCheckBoxSelected: false })
	// }

	_getUnique = (arr, comp) => {
		const unique = Object.entries(arr)
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e])
			.map(e => arr[e]);
		return unique;
	};

	closeAlert = () => {
        this.setState({ showAlert: false,resFlag:false});
         
    }
	componentWillReceiveProps(nextProps) {
		let filters = {};
		if (total_count === 0) {
		
		}
		if (nextProps.present_finder_age_data.present_finder_data) {
			present_finder_age_array = nextProps.present_finder_age_data.present_finder_data
		}
		let obj1 = {};
		// if (nextProps.present_finder_product_data.productData) {
		// 	if (nextProps.present_finder_product_data.productData.status !== false) {
		// 		obj1 = nextProps.present_finder_product_data.productData.data.filters
		// 		filters = _.uniqBy(obj1, 'name');
		// 		//filters = this._getUnique(obj1, 'name')
		// 	}

		// }
		let obj = nextProps.present_finder_product_data.productData;
		if (obj) {
			productData = obj;

		}

		if (this.state.isClickedOnSubmit && nextProps.present_finder_product_data.productData) {
			this.setState({
				getData: true
			});
		}

		if(nextProps.present_finder_product_data && nextProps.present_finder_product_data.productData &&  nextProps.present_finder_product_data.productData.status===false){
			message=nextProps.present_finder_product_data.productData.message;
			this.setState({ showAlert: true })
			setTimeout(() => {
				this.closeAlert()
			}, 2000);
		}
	}

	setPriceRange = (item, index) => {
		this.setState({isDisabled:false})
		let temp = arrayForPriceRangeCheck
		let flag = false;
		for (var i = 0; i < (temp.length || 1); i++) {

			if (arrayForPriceRangeCheck[i] === item) {
				flag = true;
			} else if (arrayForPriceRangeCheck[i]) {
				arrayForPriceRangeCheck.pop(arrayForPriceRangeCheck[i]);
			}
		}
		if (flag) {
			arrayForPriceRangeCheck.pop(item)
		}
		else {
			arrayForPriceRangeCheck.push(item);
		}
		last_element = arrayForPriceRangeCheck[arrayForPriceRangeCheck.length - 1];
		if (last_element!==0) {
			var split = last_element.split(" ")
			if(split){
				this.setState({ priceFrom: parseInt(split[1]), priceTo: parseInt(split[4]) })
			}

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
			} else {
				checkBoxSelection[i] = false;
			}
		}
		priceTo = parseInt(this.state.priceTo)
		let data = {
			storeid: this.props.globals.currentStore,
			age: this.state.age,
			priceFrom: this.state.priceFrom,
			priceTo: this.state.priceTo

		}
		
	}
	callforgetProductsData = () => {

		priceTo = parseInt(this.state.priceTo)
		var priceToValue=0;
		if(this.state.priceFrom===450){
			priceToValue=10000
		}else{
			priceToValue=priceTo
		}
		
	//	setTimeout(() => {
			let data = {
				storeid: this.props.globals.currentStore,
				age: parseInt(this.state.age),
				priceFrom: this.state.priceFrom,
				priceTo: priceToValue
			}
			this.props.OnGetPresentFinderProducts(data)	
		// }, 1000);
		
		this.setState({ isClickedOnSubmit: true, resFlag: true });
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
		this.setState({isDisabled:false})
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

		let data = {
			storeid: this.props.globals.currentStore,
			age: this.state.age,
			priceFrom: 0,
			priceTo: 0
		}

		// if (data) {
		// 	setTimeout(() => {
		// 		this.props.OnGetPresentFinderProducts(data)
		// 	}, 500);
		// }

		//this.forceUpdate()
	}


	_renderPresentFinderInfo = () => {

	}
	render() {
		let respo_message=null;

		if (this.state.showAlert) {
			respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
				<div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
					<div className="t-Alert-wrap">
						<div className="t-Alert-icon">
							<span className="t-Icon" />
						</div>
						<div className="t-Alert-content">
							<div className="t-Alert-header">
								<h2 className="t-Alert-title">{message}</h2>
							</div>
						</div>
						<div className="t-Alert-buttons">
							<button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={() => this.closeAlert()}><span className="t-Icon icon-close" /></button>
						</div>
					</div>
				</div>
			</div></span>;
		}

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
		if (productData.data !== undefined && this.state.isClickedOnSubmit && this.state.getData) {
			this.setState({ resFlag: false })
			return <Redirect to={{ pathname: `/${store_locale}/products/present_finder`, state: { productdatafromPF: productData.data, reDirect: true } }} />
		}

		let _renderAgeArray = present_finder_age_array && Object.values(present_finder_age_array).map((item, index) => (
			<div key={index} onClick={() => this.showSelectedMonths(item)} style={{ cursor: 'pointer' }} className="sortByOptionText" >
				<span >{item}</span>
			</div>
		));

		let _renderPriceArray = Object.values(priceArray).map((item, index) => (

			<li key={index}>
				<div className="checkbox">
					<div style={{ position: 'relative' }}>
						<div onClick={() => this.setPriceRange(item, index)} className={(checkBoxSelection[index] ? "likeAInputSelected" : "likeAInputNotSelected")}>
							<div className="likeAInput"></div></div>
						<div className="likeAInputName"><label className="lable-class" forName="present_finder2_gender2_0">{item}</label></div></div>
					<br />
				</div>
			</li>

		));

		return (
			<Spinner>
				<Row className="removepad">
				{respo_message}
					<Col xs={1} lg={4} md={2}>
						<div style={{ margin: 10 }} className="padding-right-ar">
							<Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
								<span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span><span>&nbsp;\&nbsp;&nbsp;</span>
							</Link>
							<span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="presentfinder.text" defalutMessage="Present Finder"/></span>
						</div>
					</Col>
					<Col xs={10} lg={4} md={8} className="mobile-width-class" >

						<div style={{ margin: 10 }}>
							<div className="present-finder-text-align">
								<h1 className="present_finder_header"><FormattedMessage id="presentfinder.text" defalutMessage="Present Finder"/></h1>
							</div>
							<div>
								<div  className="present-finder-text-align">
									<h2 className="present_finder_age_header"><FormattedMessage id="filter.categary.title.Age" defaultMessage="Age"/></h2>
								</div>
								<div>
									<div style={{ position: 'relative', cursor: 'pointer', marginBottom: 30 }}>
										<div className={this.state.sortByShowOption ? "sortBySelectedText open present-finder-h" : "sortBySelectedText present-finder-h"} onClick={() => this.showSortByOption()}>
											<span>{this.state.sortByText != "" ? this.state.sortByText : <span><FormattedMessage id="please.select" defaultMessage="Please Select"/></span>}</span>
											<i className="icon-down sortBySelectedTextIcon" ></i>
										</div>
										<div >
											<div className="sortByOption" style={this.state.sortByShowOption ? { display: 'block', overflow: 'scroll' } : { display: 'none' }}>
												{_renderAgeArray}

											</div>
										</div>
									</div>
									<div style={{paddingBottom:60}}>
										<h2 className="present_finder_age_header review-description"><FormattedMessage id="budget" defaultMessage="Budget" />:</h2>
									</div>
									<div>
										<ul>
											{_renderPriceArray}


										</ul>
									</div>
									<div>
										<div className="borderLine"></div>
										<div class="multi_holder button_holder results">
											{/* <p>{productData && productData.data && total_count !== 0 ? <span>&nbsp;{productData.data.total_count} results found</span> : <span style={{ color: 'red' }}>Zero data found</span>}</p> */}
											{this.state.resFlag ?
												<button className="findPresentButton"><span><FormattedMessage id="findpresent.text" defaultMessgae="Find Presents"/></span>
													<img src={wait} style={{ width: 25, height: 20, marginTop: -4 }} alt="" /> </button>
												:
												<button disabled={this.state.isDisabled} onClick={() => this.callforgetProductsData()} className="findPresentButton"><FormattedMessage id="findpresent.text" defaultMessgae="Find Presents"/></button>}
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