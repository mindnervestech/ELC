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
let filterOptionCheck = true
let filterList = {}
class SideManu extends Component {
	constructor(props) {
		super(props);
		productListingData = this.props.productDetails.products.product_data;
		productList = this.props.productDetails.products.product_data;
		filterList = this.props.productDetails.filters;
		this.state = {
			list: {},
		};
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentDidMount() {
		if(Object.keys(this.props.productDetails.products).length > 0){
			if(filterOptionCheck){
				filterOptionCheck = false;
				const filterOptionList = this.props.productDetails.filters;
				for(let Categary in filterOptionList){
					for(let subCategary in filterOptionList[Categary]){
						filterOptionArrayForCheck.push(filterOptionList[Categary][subCategary].code + "/" + filterOptionList[Categary][subCategary].name);
						filterOptionArraySubCategary.push(filterOptionList[Categary][subCategary].name)
					}
				}
				for(let value in filterOptionArrayForCheck){
					let splitValue = filterOptionArrayForCheck[value].split("/");
					let checkSubmanu = 0
					let remove = value
					for(let item in productListingData){
						if(splitValue[0] == "color"){
							if(splitValue[1] == productListingData[item].json.color_english){
								if(checkSubmanu == 0){
									checkSubmanu = 1
									filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
								}
							}
						}else if(splitValue[0] == "brand"){
							for (let filter in productListingData[item].json.filtersdata) {
								for (let age in productListingData[item].json.filtersdata[filter]) {
									if(checkSubmanu == 0){
										if(splitValue[1] == productListingData[item].json.filtersdata[filter][age]){
											filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
											checkSubmanu = 1
										}
									}
								}
							}
						}else if(splitValue[0] == "age"){
							for (let filter in productListingData[item].json.filtersdata) {
								for (let age in productListingData[item].json.filtersdata[filter]) {
									if(checkSubmanu == 0){
										if(splitValue[1] == productListingData[item].json.filtersdata[filter][age]){
											filterOptionArrayForCheckValidate.push(filterOptionArrayForCheck[value])
											checkSubmanu = 1
										}
									}
								}
							}
						}
					}
					
				}
				
				this.setState({ list: filterList })
			}
		}
	}

	getFilterData(filterValue, code) {
		let count = 1
		for (let value in productList) {
			if (productList[value].json.filtersdata) {
				for (let item in productList[value].json.filtersdata[code]) {
					if (productList[value].json.filtersdata[code][item] == filterValue) {
						filterData.push(productList[value])
						count++
					}
				}
			}
		}
	}

	applyFilter = (value, check) => {
		let find = true
		let remove = -1
		for(let data in filterOptionArray){
			if(filterOptionArray[data] == value){
				find = false
				remove = data
			}
		}
		if(find){
			filterOptionArray.push(value)
		}
		if(remove != -1){
			filterOptionArray.splice(remove, 1); 
			remove = -1
		}
		if(filterOptionArray.length == 0){
			productList = productListingData;
			filterData = [];
			this.props.action(productListingData);
		}else{
			for(let categrayData in filterOptionArray){
				let splitData = filterOptionArray[categrayData].split('/')
				if (splitData[0] == "price") {
	
				} else if (splitData[0] == "color") {
					let filterValue = splitData[1]
					for (let value in productList) {
						if (productList[value].json.color_english) {
							if (productList[value].json.color_english == filterValue) {
								filterData.push(productList[value])
							}
						}
					}
				} else if (splitData[0] == "age") {
					let filterValue = splitData[1]
					this.getFilterData(filterValue, splitData[0])
	
				} else if (splitData[0] == "brand") {
					let filterValue = splitData[1]
					this.getFilterData(filterValue, splitData[0])
				}
			}
			const uniqueNames = Array.from(new Set(filterData));
			filterData = uniqueNames
			this.props.action(filterData)
			filterData = []
		}
	}

	checkFilterIsAvailable = (value, code) => {
		for(let item in filterOptionArrayForCheckValidate){
			let splitData = filterOptionArrayForCheckValidate[item].split('/')
			if(splitData[1] == value){
			//  render(){
				return (
					<div>
						<input type="checkbox" onClick={() => this.applyFilter(code + "/" + value, "")} value={value}/> {value}
					</div>
				)
				}
			// }
		}
	}

	assignFilterdata(data) {
		return (
			<div>
				{Object.keys(data).map((keyName) =>
					// <div>
						this.checkFilterIsAvailable(data[keyName].name, data[keyName].code)
					// {/* </div> */}
				)}
			</div>
		);
	}

	checkMainFilterName(value){
		let checkManu = 0
		for(let item in filterOptionArrayForCheckValidate){
			let splitData = filterOptionArrayForCheckValidate[item].split('/')
			if(splitData[0] == value.toLowerCase()){
				if(checkManu == 0){
					checkManu = 1
					return (
						<div className="bottomBorder" style={{ paddingTop: 10 }}>
							<Collapsible trigger={value} >
								<div style={{textAlign: 'start'}}>{this.assignFilterdata(this.state.list[value])}</div>
							</Collapsible>
						</div>
						
					);
				}	
			}
		}
	}

	render() {
		//const list = this.props.productDetails.filters;
		//productList = this.props.productDetails.products.product_data
		return (
			<div>
				<div className="row-2" style={{ margin: '21px 0px', borderBottom: 'solid 1px #b1b1b1' }}>
					<span className="blackTitle">Narrow your Results</span>
				</div>
				<div style={{ paddingTop: 19 }}>
					{Object.keys(this.state.list).map((keyName) =>
						// <div className="bottomBorder" style={{ paddingTop: 10 }}>
							
							this.checkMainFilterName(keyName)
						// {/* </div> */}
					)}
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
