import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Collapsible from 'react-collapsible';
import { Link, Redirect, withRouter } from 'react-router-dom';

var _ = require('lodash');

let productList = {}

class SideManu extends Component {
	constructor(props) {
		super(props);
		
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentDidMount() {
		
	}

	applyFilter = (value) =>{
		console.log(value)
		let splitData = value.split('/')
		console.log(splitData)
		if(splitData[0] == "price"){

		}else if(splitData[0] == "color"){

		}else if(splitData[0] == "age"){

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
