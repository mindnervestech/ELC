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
import { Row, Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

import Gift from '../../../assets/images/product-details/gift.png';
import Delevary from '../../../assets/images/product-details/delevary.png';
import Return from '../../../assets/images/product-details/return.png';

import ProductListData from './ProductListData';
import SideManu from './SideManu';

var _ = require('lodash');

class ProductList extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedProduct: ''
		};
	}

	componentDidUpdate(prevProps, prevState) {

	}

	componentDidMount() {
		
	}

	componentWillMount() {
		if (this.props.productDetails) {
			this.props.onClearProductDetails(this.props.productDetails);
		}
	}

	render() {
		const store_locale = this.props.globals.store_locale;
		const { Data, loading1 } = this.props;
		
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
										<ProductListData list={Data}/>
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
	// console.log('pdpstate', state);

	return {
		globals: state.global,
		menu: state.menu.menuNavData,
		productDetails: state.productDetails.productData,
		redirect: state.productDetails.redirect,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onClearProductDetails: payload => dispatch(actions.clearProductDetails(payload)),
		onGetProductDetails: payload => dispatch(actions.getProductDetails(payload))
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductList);
