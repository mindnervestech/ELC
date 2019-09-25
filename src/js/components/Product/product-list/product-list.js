import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import ProductListData from '../../PoductList/ProductListData';
import SideManu from '../../PoductList/SideManu';

import { Container, Row, Col, Button } from 'reactstrap';

class ProductData extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			selectedProduct: ''
		};
	}

	componentWillMount() {
		if (this.props.productDetails) {
			this.props.onClearProductDetails(this.props.productDetails);
		}
	}

	handleClick(el) {
		this.setState({ selectedProduct: el });
	}

	hidepromopopup(el) {
		document.getElementById(el).style.display = 'none';
	}

	handleProductClick = item => {
		const data = {
			customerid: 2,
			store: 2,
			url_key: item.url_key,
		};
		this.props.onGetProductDetails(data);
	};

	_checkOfferPrice = (item, itemOfferPrice) => {

		if (parseInt(item.price.price) !== parseInt(itemOfferPrice)) {
			return (
				<span style={{ fontWeight: "normal" }}>
					<del>{item.currency} {item.price.price}</del>
					&nbsp;
					</span>
			);
		}
	}

	render() {
		const { Data, loading1 } = this.props;
		return (
			<div id="PROD" className="prdcontainers">
				{Object.keys(Data).length > 0 && (
					<ul
						className="products  grid-4-column"
						style={{
							touchAction: 'pan-y',
							userSelect: 'none',
							WebkitUserDrag: 'none',
							WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',

						}}
					>
						<div className="divShowOnWeb">
							<ProductListData list={Data} />
						</div>
						<div className="divShowOnMobile">
							<ProductListData list={Data} />
						</div>
					</ul>)}
				{ Data.length === 0 && !loading1 && (<p style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 500, padding: '20px 16px 10px' }}><FormattedMessage id="NoData.Text" defaultMessage="No Data available." />{loading1}</p>)}
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
)(ProductData);
