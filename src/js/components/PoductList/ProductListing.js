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
import Collapsible from 'react-collapsible';

import ProductListData from './ProductListData';
import SideManu from './SideManu';

var _ = require('lodash');

const triggerSiblingExample = () => <div className="Collapsible__custom-sibling">This is a sibling to the trigger which wont cause the Collapsible to open!</div>;
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
								<Row style={{paddingTop:20}}>
									<Col xs="12">
										<Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
											<span className="titleHover">Home</span>
										</Link>
										<span>  > PLP</span>
									</Col>
								</Row>
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
										<SideManu></SideManu>
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
