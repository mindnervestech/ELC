import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Collapsible from 'react-collapsible';

var _ = require('lodash');

class SideManu extends Component {
	constructor(props, context) {
		super(props, context);
		
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentDidMount() {
		
	}

	render() {
		return (
			<div>
				<div className="row-2">
				    <span className="blackTitle">Narrow your Results</span>
				</div>
				<div className="bottomBorder">
					<Collapsible trigger="Type of Toy" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
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
)(SideManu);
