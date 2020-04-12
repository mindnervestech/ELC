import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import ProductListData from '../../PoductList/ProductListData';

class ProductData extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
		if (this.props.productDetails) {
			this.props.onClearProductDetails(this.props.productDetails);
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
						<div>
							<ProductListData   listForGTM={this.props.listForGTM} list={Data} />
						</div>
					</ul>)}
				 { Data.length === 0 && !loading1 && (<p className="review-description" style={{ fontSize: '22px', letterSpacing: '0.04em', fontWeight: 500, padding: '20px 16px 10px' }}><FormattedMessage id="NewProductCommingSoon.Text" defaultMessage="New products coming soon!" />{loading1}</p>)} 
			</div>
		);
	}
}

const mapStateToProps = state => {
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
