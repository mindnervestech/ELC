import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Collapsible from 'react-collapsible';
import { Link, Redirect, withRouter } from 'react-router-dom';

var _ = require('lodash');

let productList = {}
let list = {}

class SideManu extends Component {
	constructor(props) {
		super(props);
		productList = this.props.productDetails.products.product_data
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentDidMount() {
		
	}

	getFilterData(filterValue, code){
		let count = 1
		for(let value in productList){
			if(productList[value].json.filtersdata){
				for(let item in productList[value].json.filtersdata[code]){
					if(productList[value].json.filtersdata[code][item] == filterValue){
						list[count] = productList[value]
						count++
					}
				}
			}
		}
		console.log(list)
	}

	applyFilter = (value) =>{
		//console.log(value)
		let splitData = value.split('/')
		//console.log(splitData)
		if(splitData[0] == "price"){

		}else if(splitData[0] == "color"){
			let filterValue = splitData[1]
			let count = 1
			list = {}
			for(let value in productList){
				if(productList[value].json.color_english){
					if(productList[value].json.color_english == filterValue){
						list[count] = productList[value]
						count++
					}
				}
			}
			console.log(list)
		}else if(splitData[0] == "age"){
			let filterValue = splitData[1]
			list = {}
			this.getFilterData(filterValue, splitData[0])

		}else if(splitData[0] == "brand"){
			let filterValue = splitData[1]
			list = {}
			this.getFilterData(filterValue, splitData[0])
		}
	}

	assignFilterdata(data){
		return (
			<div>
			{Object.keys(data).map((keyName) =>
					<div onClick={() => this.applyFilter(data[keyName].code + "/" + data[keyName].name)}>{data[keyName].name}</div>
			)}
			</div>
		);
	}

	render() {
		const list  = this.props.productDetails.filters;
		productList = this.props.productDetails.products.product_data
		return (
			<div>
				<div className="row-2" style={{padding: '22px 0px'}}>
				    <span className="blackTitle">Narrow your Results</span>
				</div>
				{Object.keys(list).map((keyName) =>
				<div className="bottomBorder" style={{paddingTop: 10}}>
					<Collapsible trigger={keyName} >
					<div>{this.assignFilterdata(list[keyName])}</div>
					{/* <div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div> */}
					</Collapsible>
				</div>
				)}
                {/* <div className="bottomBorder">
					<Collapsible trigger="Brands" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Age" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Other Options" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Price" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div> */}
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
