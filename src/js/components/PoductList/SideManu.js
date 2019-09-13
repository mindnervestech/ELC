import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Collapsible from 'react-collapsible';
import { Link, Redirect, withRouter } from 'react-router-dom';

var _ = require('lodash');

let productListingData = {}
let productList = {}
let filterData = []
let filterOptionArray = []
let filterOptionArrayForCheck = []
let filterOptionArrayForCheckValidate = []
let filterOptionArraySubCategary = []
let filterList = {}
let filterOptionCheck = true

class SideManu extends Component {
	constructor(props) {
		super(props);
		productListingData = this.props.productDetails.products.product_data;
		productList = this.props.productDetails.products.product_data;
		filterList = this.props.productDetails.filters;
		this.state = {
			list: {},
			filterOptionCheck: true,
			narrowResult: [],
			clearAllOption: false,
		};
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentWillMount() {
		if (Object.keys(this.props.productDetails.products).length > 0) {
			if (filterOptionCheck == true) {
				filterOptionCheck = false;
				const filterOptionList = this.props.productDetails.filters;
				for (let Categary in filterOptionList) {
					for (let subCategary in filterOptionList[Categary]) {
						filterOptionArrayForCheck.push(filterOptionList[Categary][subCategary].code + "/" + filterOptionList[Categary][subCategary].name);
						filterOptionArraySubCategary.push(filterOptionList[Categary][subCategary].name)
					}
				}
				for (let value in filterOptionArrayForCheck) {
					let splitValue = filterOptionArrayForCheck[value].split("/");
					let checkSubmanu = 0
					let remove = value
					for (let item in productListingData) {
						if (splitValue[0] == "color") {
							if (splitValue[1] == productListingData[item].json.color_english) {
								if (checkSubmanu == 0) {
									checkSubmanu = 1
									filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
								}
							}
						} else {
							for (let filter in productListingData[item].json.filtersdata) {
								for (let age in productListingData[item].json.filtersdata[filter]) {
									if (checkSubmanu == 0) {
										if (splitValue[1] == productListingData[item].json.filtersdata[filter][age]) {
											filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
											checkSubmanu = 1
										}
									}
								}
							}
						}
					}
				}
				this.setState({ list: filterList });
			}
		}
	}

	hideFilterOtionThoseNotInProduct(){
		filterOptionArrayForCheckValidate = []
				const filterOptionList = this.props.productDetails.filters;
				for (let Categary in filterOptionList) {
					for (let subCategary in filterOptionList[Categary]) {
						filterOptionArrayForCheck.push(filterOptionList[Categary][subCategary].code + "/" + filterOptionList[Categary][subCategary].name);
						filterOptionArraySubCategary.push(filterOptionList[Categary][subCategary].name)
					}
				}
				for (let value in filterOptionArrayForCheck) {
					let splitValue = filterOptionArrayForCheck[value].split("/");
					let checkSubmanu = 0
					let remove = value
					for (let item in productList) {
						if (splitValue[0] == "color") {
							if (splitValue[1] == productList[item].json.color_english) {
								if (checkSubmanu == 0) {
									checkSubmanu = 1
									filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
								}
							}
						} else {
							for (let filter in productList[item].json.filtersdata) {
								for (let age in productList[item].json.filtersdata[filter]) {
									if (checkSubmanu == 0) {
										if (splitValue[1] == productList[item].json.filtersdata[filter][age]) {
											filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
											checkSubmanu = 1
										}
									}
								}
							}
						}
					}
				}
				this.setState({ list: filterList });
	}

	getFilterData(filterValue, code) {
		for (let value in productList) {
			if (productList[value].json.filtersdata) {
				for (let item in productList[value].json.filtersdata[code]) {
					if (productList[value].json.filtersdata[code][item] == filterValue) {
						filterData.push(productList[value])
					}
				}
			}
		}
	}

	applyFilter = (value, check) => {
		let find = true
		let remove = -1
		for (let data in filterOptionArray) {
			if (filterOptionArray[data] == value) {
				find = false
				remove = data
			}
		}
		if (find) {
			filterOptionArray.push(value)
		}
		if (remove != -1) {
			filterOptionArray.splice(remove, 1);
			remove = -1
		}
		this.setState({ narrowResult: filterOptionArray })
		if (filterOptionArray.length == 0) {
			this.setState({clearAllOption: false });
			productList = productListingData;
			filterData = [];
			this.props.action(productListingData);
			this.hideFilterOtionThoseNotInProduct()
		} else {
			this.setState({clearAllOption: true });
			let checkForMultipalFilter = true
			for (let categrayData in filterOptionArray) {
				let splitData = filterOptionArray[categrayData].split('/')
				if (splitData[0] == "brand") {
					let filterValue = splitData[1]
					this.getFilterData(filterValue, splitData[0])
				}
			}
			let uniqueNames2 = Array.from(new Set(filterData));
			if(Object.keys(uniqueNames2).length != 0){
				productList = uniqueNames2
			}
			for (let categrayData in filterOptionArray) {
				let splitData = filterOptionArray[categrayData].split('/')
				if (splitData[0] == "age") {
					if(checkForMultipalFilter){
						checkForMultipalFilter = false
						filterData = []
					}
					let filterValue = splitData[1]
					this.getFilterData(filterValue, splitData[0])
				}
			}
			checkForMultipalFilter = true
			uniqueNames2 = Array.from(new Set(filterData));
			if(Object.keys(uniqueNames2).length != 0){
				productList = uniqueNames2
			}
			for (let categrayData in filterOptionArray) {
				let splitData = filterOptionArray[categrayData].split('/')
				if (splitData[0] == "gender") {
					if(checkForMultipalFilter){
						checkForMultipalFilter = false
						filterData = []
					}
					let filterValue = splitData[1]
					this.getFilterData(filterValue, splitData[0])
				}
			}
			checkForMultipalFilter = true
			uniqueNames2 = Array.from(new Set(filterData));
			if(Object.keys(uniqueNames2).length != 0){
				productList = uniqueNames2
			}
			for (let categrayData in filterOptionArray) {
				let splitData = filterOptionArray[categrayData].split('/')
				if (splitData[0] == "subcategory") {
					if(checkForMultipalFilter){
						checkForMultipalFilter = false
						filterData = []
					}
					let filterValue = splitData[1]
					this.getFilterData(filterValue, splitData[0])
				}
			}
			checkForMultipalFilter = true
			uniqueNames2 = Array.from(new Set(filterData));
			if(Object.keys(uniqueNames2).length != 0){
				productList = uniqueNames2
			}

			for (let categrayData in filterOptionArray) {
				let splitData = filterOptionArray[categrayData].split('/')
				if (splitData[0] == "color") {
					if(checkForMultipalFilter){
						checkForMultipalFilter = false
						filterData = []
					}
					let filterValue = splitData[1]
						for (let value in productList) {
							if (productList[value].json.color_english) {
								if (productList[value].json.color_english == filterValue) {
									filterData.push(productList[value])
								}
							}
						}
				}
			}
			checkForMultipalFilter = true
			uniqueNames2 = Array.from(new Set(filterData));
			if(Object.keys(uniqueNames2).length != 0){
				productList = uniqueNames2
			}
			this.props.action(filterData)
			filterData = []
			this.hideFilterOtionThoseNotInProduct()
		}
	}

	clearFilter = () =>{
		this.props.action(productListingData)
		this.setState({ narrowResult: [], clearAllOption: false })
		filterOptionArray = []
		filterData = []
		productList = productListingData;
	}

	checkFilterIsAvailable = (value, code) => {
		for (let item in filterOptionArrayForCheckValidate) {
			let splitData = filterOptionArrayForCheckValidate[item].split('/')
			if (splitData[1] == value) {
				//  render(){
				return (
					<div>
						<input type="checkbox" onClick={() => this.applyFilter(code + "/" + value, "")} value={value} /> {value}
					</div>
				)
			}
			// }
		}
	}

	checkSubCategaryValue(data){
		return(Object.keys(data).map((keyName) => {
			for(let item in filterOptionArrayForCheckValidate){
				let splitData = filterOptionArrayForCheckValidate[item].split('/')
				if (splitData[1] == data[keyName].name) {
					return(
						this.assignFilterdata(data[keyName].name,data[keyName].code)
					);
				}
			}
		}));
	}

	assignFilterdata(name,code) {
		let Checked = 0
			// return (Object.keys(data).map((keyName, index) => {
			for(let item in this.state.narrowResult){
				if(this.state.narrowResult[item] == code + "/" + name){
					Checked++;
				}
			}
			if(Checked == 0){
				return (
					<div>
						<input type="checkbox" checked={false} onClick={() => this.applyFilter(code + "/" + name, "")} value={name} /> {name}
					</div>
					);
			}else{
				Checked = 0;
				return (
					<div>
						<input type="checkbox" checked={true} onClick={() => this.applyFilter(code + "/" + name, "")} value={name} /> {name}
					</div>
					);		
			}
		// )
	}

	checkMainFilterName(value) {
		let checkManu = 0
		for (let item in filterOptionArrayForCheckValidate) {
			let splitData = filterOptionArrayForCheckValidate[item].split('/')
			if (splitData[0] == value.toLowerCase().replace(/\s/g,'')) {
				if (checkManu == 0) {
					checkManu = 1
					
					return (
						<div className="bottomBorder" style={{ paddingTop: 10 }}>
							<Collapsible trigger={value} >
								<div style={{ textAlign: 'start' }}>{this.checkSubCategaryValue(this.state.list[value])}</div>
							</Collapsible>
						</div>
					);
				}
			}
		}
	}

	render() {
		const list = this.props.productDetails.filters;
		return (
			<div>
				<div>
					<div className="row-2" style={{ paddingTop: 21, borderBottom: 'solid 1px #b1b1b1', textAlign: 'start' }}>
						<span className="blackTitle">Narrow your Results</span>
						<span className="clearAll floatRight" style={this.state.clearAllOption ? {display: 'block'} : {display: 'none'}} onClick={() => this.clearFilter()}>Clear All</span>
					</div>
					<div style={{height: 55, overflow: 'auto'}}>
                    <ul className="filter" id="PRDSEL-CAT">                
                        {this.state.narrowResult.map((keyName) =>
                         <li style={{width: 'auto', margin: '0px 10px 0px 0px'}}>
                            <div className="chip">
                                    {keyName}
                                    <i className="close fa fa-times" aria-hidden="true" onClick={() => this.applyFilter(keyName, "")}/>
                            </div>
                          </li>
                        )}
                    </ul>
					</div>
					<div>
						{Object.keys(this.state.list).map((keyName) =>
						this.checkMainFilterName(keyName)
							// <div className="bottomBorder" style={{ paddingTop: 10 }}>
							// 	<Collapsible trigger={keyName} >
							// 		<div style={{ textAlign: 'start' }}> {this.assignFilterdata(list[keyName])} </div>
							// 	</Collapsible>
							// </div>
						)}
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
		category_name: state.productDetails.category_name,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetProductList: payload => dispatch(actions.getProductList(payload)),
		onGetProductSearchList: payload => dispatch(actions.getProductSearchList(payload)),
	};
};

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(SideManu));
