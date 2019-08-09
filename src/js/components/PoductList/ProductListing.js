import React, { Component } from 'react';
import '../../../styles/product/productlist.css';
import '../../../styles/product/productlist-filters.css';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import queryString from 'query-string';
import Spinner from '../Spinner/Spinner2';
import * as utility from '../utility/utility';
import {
	BrowserView,
	MobileView,
	isBrowser,
	isMobile
} from "react-device-detect";
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

import Gift from '../../../assets/images/product-details/gift.png';
import Delevary from '../../../assets/images/product-details/delevary.png';
import Return from '../../../assets/images/product-details/return.png';
import percentage from '../../../assets/images/product-details/percentage.png';
import save from '../../../assets/images/product-details/save.png';

import logo1 from '../../../assets/images/you_may_also_like_1.png'

import home from '../../../assets/images/social/Hero.png';
import ProductListData from './ProductListData';
var _ = require('lodash');

class ProductList extends Component {
	constructor(props, context) {
		super(props, context);
		
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentDidMount() {
		
	}

	render() {

		const settings = {
            className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500,
      rows: 2,
      slidesPerRow: 2,
		}
		
		return (
			<div className="t-Body product-list">
				<div className="t-Body-main" style={{ marginTop: '0px !important' }}>
					<div className="t-Body-content" id="t_Body_content">
						<Row>
							<Col xs="1"></Col>
							<Col xs="10">
								<Row className="row-1">
									<Col xs="4">
										<div className="box">
											<img src={Gift} className="logoImages"></img>
											<label>FREE GIFT WRAPPING</label>
										</div>
									</Col>
									<Col xs="4">
										<div className="box">
											<img src={Delevary} className="logoImages"></img>
											<label>FREE STANDARD DELIVERY</label>
										</div>
									</Col>
									<Col xs="4">
										<div className="box">
											<img src={Return} className="logoImages"></img>
											<label>FREE RETURNS</label>
										</div>
									</Col>
								</Row>

								<Row>
									<Col xs="3">
										<div className="row-2">
											<span className="blackTitle">Narrow your Results</span>
										</div>
										<div style={{position: 'relative'}}>
										<ul>
										<li>
											<span className="blackTitle">Type of Toy</span>
										</li>
										</ul>
										</div>
									</Col>
									<Col xs="9" style={{padding: 0}}>
									<div>
										<ProductListData/>
									</div>
									</Col>
								</Row>
							</Col>
							<Col xs="1"></Col>
						</Row>
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
)(ProductList);