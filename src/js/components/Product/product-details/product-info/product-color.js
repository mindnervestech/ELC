import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

let selectColorOnFirst = true;
class ProductColor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			simpleproducts: [],
		};
		selectColorOnFirst = true;
	}

	componentDidUpdate(prevProps, prevState) {
		const { productColor } = this.props;
		if (productColor.simpleproducts && selectColorOnFirst) {
			let arr = [];
			Object.keys(productColor.simpleproducts).map((item, index) => {
				arr.push(productColor.simpleproducts[item].color);
			});
			const newArr = this._getUnique(arr, 'text');
			selectColorOnFirst = false;
			if (newArr.length > 0) {
				const data = {
					option: [
						{
							option_id: newArr[0].option_id,
							option_value: newArr[0].option_value,
						},
					],
					selectedColor: newArr[0].text,
					selectedVal: true,
				};
				this.props.onGetColor(data);
			}
		}
	}

	handleChange = item => {
		const data = {
			option: [
				{
					option_id: item.option_id,
					option_value: item.option_value,
				},
			],
			selectedColor: item.text,
			selectedVal: true,
		};
		//console.log('itemas', data);
		this.props.onGetColor(data);
	};

	__renderProductColors = (item, index) => {
		return (
			<a
				key={`${item.text}_color`}
				className="outerFocus"
				name="color-elem"
				data-color-media="https://storage.googleapis.com/nay/images/product/lg/sp19/nay-sp19-glam-table-bra-212395219-2491.jpg"
				data-value={1182}
				data-color-value="Floral"
				onClick={e => this.handleChange(item)}
				tabIndex={0}
				role="radio"
				aria-checked="false"
				aria-required="true"
				data-is-selected="false"
				aria-disabled="false"
			>
				<img src={item.url} alt />
				<svg aria-hidden="true" className="unavailable-short-icon base">
					<use xlinkHref="#unavailable-short-icon">
						<svg id="unavailable-short-icon" viewBox="0 0 612 612" width="100%" height="100%">
							<path fill="currentColor" d="M600.4-15l26.4 26.4L11.6 627l-26.4-26.4 600-600L600.4-15z" />
							<path d="M609.3-5.7l8.8 8.8L2.9 618.4l-8.8-8.8L593.9 9.5l15.4-15.2z" />
							<path fill="currentColor" d="M613.6-1.7L-1.6 613.7" />
							<path d="M613.6-1.7L-1.6 613.7" />
						</svg>
					</use>
				</svg>
			</a>
		);
	};

	_getUnique = (arr, comp) => {
		const unique = arr
			.map(e => e[comp])
			// store the keys of the unique objects
			.map((e, i, final) => final.indexOf(e) === i && i)
			// eliminate the dead keys & store unique objects
			.filter(e => arr[e])
			.map(e => arr[e]);
		return unique;
	};

	render() {
		const { productColor } = this.props;

		//console.log('Product Color', productColor);

		// Hide Color for Beauty Category (Simple Type)
		if (productColor.type === 'simple') {
			if ((productColor.simplecolor === '') || (productColor.simplecolor === null)) {
				return false;
			}
		}

		if (productColor.simpleproducts) {
			let arr = [];
			Object.keys(productColor.simpleproducts).map((item, index) => {
				arr.push(productColor.simpleproducts[item].color);
			});
			const newArr = this._getUnique(arr, 'text');
			return (
				<section id="color" data-name="color" data-selector-wrapper>
					<div data-selector-title-color>
						<em><FormattedMessage id="product.color" defaultMessage="Color" /></em>
						<span id="p3colordesc">
							<b>&nbsp;{this.props.productDetails.selectedColor}</b>
						</span>
					</div>
					<div data-selector="box" data-name="color" data-is-image-based="true" role="radiogroup">
						{newArr.map(this.__renderProductColors)}
					</div>
				</section>
			);
		} else {
			return false;
		}
	}
}

const mapStateToProps = state => {
	//console.log('color', state.productDetails.productColor);

	return {
		globals: state.global,
		productDetails: state.productDetails.productColor,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetColor: payload => dispatch(actions.getColor(payload)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductColor);
