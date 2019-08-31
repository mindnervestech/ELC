import React, { Component } from 'react';
import * as actions from '../../../../redux/actions/index';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import imagination_icon from '../../../../../assets/images/social/imagination_icon.png';
import facebook from '../../../../../assets/images/social/Facebook.svg';
import instagram from '../../../../../assets/images/social/instagram.svg';
import youtube from '../../../../../assets/images/social/youtube.svg';
import twitter from '../../../../../assets/images/social/twitter.svg';

import {
  
	FacebookShareButton,
	LinkedinShareButton,
	TwitterShareButton,
	PinterestShareButton,
	VKShareButton,
	OKShareButton,
	TelegramShareButton,
	WhatsappShareButton,
	RedditShareButton,
	EmailShareButton,
	TumblrShareButton,
	LivejournalShareButton,
	MailruShareButton,
	ViberShareButton,
	WorkplaceShareButton,
	LineShareButton,
	WeiboShareButton,
	PocketShareButton,
	InstapaperShareButton,
  
	FacebookIcon,
	TwitterIcon,
	LinkedinIcon,
	PinterestIcon,
	VKIcon,
	OKIcon,
	TelegramIcon,
	WhatsappIcon,
	RedditIcon,
	TumblrIcon,
	MailruIcon,
	EmailIcon,
	LivejournalIcon,
	ViberIcon,
	WorkplaceIcon,
	LineIcon,
	PocketIcon,
	InstapaperIcon,
  } from 'react-share';


let selectSizeOnFirst = true;
class ProductSize extends Component {
	constructor(props) {
		super(props);
		this.state = {
			size: [],
		};
		selectSizeOnFirst = true;

	}

	componentDidUpdate(prevProps, prevState) {
		// //console.log(this.props.productSize)
		// const { productSize } = this.props;

		// if (productSize.type === "simple") {
		// 	let arr = [];

		// 	Object.keys(this.props.productSize).map((item, index) => {
		// 		arr.push(
		// 			Object.assign(this.props.productSize.simplesize, {
		// 				sizeInStock: this.props.productSize.simpleqty,
		// 			})
		// 		);
		// 	});
		// 	const newArr = this._getUnique(arr, 'text');

		// 	if (selectSizeOnFirst && newArr.length > 0) {
		// 		selectSizeOnFirst = false;
		// 		//console.log("newArr[0]", newArr[0])
		// 		this._onSimpleSizeClick(newArr[0]);
		// 	}
		// }

		// if (productSize.simpleproducts) {
		// 	let selectedColor = this.props.productDetails.productColor.selectedColor;

		// 	let arr = [];
		// 	Object.keys(productSize.simpleproducts).map((item, index) => {
		// 		if (productSize.simpleproducts[item].color.text === selectedColor) {
		// 			arr.push(
		// 				Object.assign(productSize.simpleproducts[item].size, {
		// 					sizeInStock: productSize.simpleproducts[item].stockstatus,
		// 				})
		// 			);
		// 		}
		// 	});

		// 	const newArr = this._getUnique(arr, 'text');
		// 	if (selectSizeOnFirst && newArr.length > 0) {
		// 		selectSizeOnFirst = false;
		// 		this._onSizeClick(newArr[0]);
		// 	}
		// }

	}

	_getSortedQtyAndSize = products => {
		let arr = [];
		products.map((item, index) => {
			arr.push({ qty: item.qty, color: item.color.text, size: item.size.text });
		});
		return arr;
	};

	_getQty = (color, size, products) => {
		//console.log('products', products);

		const res = products
			.filter(data1 => data1.color == color && data1.size == size)
			.reduce((a, b) => a + (b['qty'] || 0), 0);
		return res;
	};

	_onSizeClick = item => {
		const color = this.props.productDetails.productColor;
		const sortedProducts = this._getSortedQtyAndSize(this.props.productDetails.productData.simpleproducts);
		const totalQty = this._getQty(color.selectedColor, item.text, sortedProducts);

		const sizeOpt = { option_id: item.option_id, option_value: item.option_value };
		const final = this.props.productDetails.configurable_item_options.push(sizeOpt);

		const data = {
			selectedSize: item.text,
			selectedVal: true,
			totalQty: totalQty,
		};

		//console.log('sizeData', data);

		this.props.onGetSize(data);
	};

	_onSimpleSizeClick = item => {
		const data = {
			selectedSize: item.text,
			selectedVal: true,
			totalQty: item.sizeInStock,
		};

		this.props.onGetSize(data);
	}

	__renderProductSizes = (item, index) => {

		//console.log('In __renderProductSizes', item);
		return (
			<a
				key={`${item.text}_size`}
				className="outerFocus"
				name="band-size-elem"
				data-id={item.text}
				onClick={e => this._onSizeClick(item)}
				data-value={item.text}
				data-band-size-value={item.text}
				tabIndex={0}
				role="radio"
				aria-checked="true"
				aria-required="true"
				data-is-selected={this.props.productDetails.productSize.selectedSize === item.text ? true : false}
				aria-disabled={item.sizeInStock === 0 ? true : false}
			>
				<span className="fab-a11y-hide">Band Size</span>
				{item.text}
			</a>
		);
	};
	__renderSimpleProductSizes = (item, index) => {

		//console.log('In __renderProductSizes', item);
		return (
			<a
				key={`${item.text}_size`}
				className="outerFocus"
				name="band-size-elem"
				data-id={item.text}
				onClick={e => this._onSimpleSizeClick(item)}
				data-value={item.text}
				data-band-size-value={item.text}
				tabIndex={0}
				role="radio"
				aria-checked="true"
				aria-required="true"
				data-is-selected={this.props.productDetails.productSize.selectedSize === item.text ? true : false}
				aria-disabled={item.sizeInStock === 0 ? true : false}
			>
				<span className="fab-a11y-hide">Band Size</span>
				{item.text}
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

	_render

	render() {
		// const { productSize } = this.props;

		// if (productSize.type === 'simple') {
		// 	if ((productSize.simplesize === '') || (productSize.simplesize === null)) {
		// 		return false;
		// 	} else {

		// 		let arr = [];
		// 		if ((productSize.simplecolor === '') || (productSize.simplecolor === null)) {

		// 			Object.keys(productSize).map((item, index) => {
		// 				// if (productSize.simpleproducts[item].color.text === selectedColor) {
		// 				arr.push(
		// 					Object.assign(productSize.simplesize, {
		// 						sizeInStock: productSize.simpleqty,
		// 					})
		// 				);
		// 				// }
		// 			});

		// 		} else {

		// 			Object.keys(productSize).map((item, index) => {
		// 				// if (productSize.simpleproducts[item].color.text === selectedColor) {
		// 				arr.push(
		// 					Object.assign(productSize.simplesize, {
		// 						sizeInStock: productSize.simpleqty,
		// 					})
		// 				);
		// 				// }
		// 			});
		// 		}

		// 		const newArr = this._getUnique(arr, 'text');

		// 		return (
		// 			<section id="band-size" data-name="band-size" data-selector-wrapper>
		// 				<div data-selector-title-band-size>
		// 					<em><FormattedMessage id="product.size" defaultMessage="Size" /></em>
		// 					<span id="p3colordesc">
		// 						<b>&nbsp;{this.props.productDetails.productSize.selectedSize}</b>
		// 					</span>
		// 				</div>
		// 				<div data-selector="box" data-name="band-size" data-label-id role="radiogroup">
		// 					{newArr.map(this.__renderSimpleProductSizes)}
		// 				</div>
		// 			</section>
		// 		);
		// 	}
		// }


		// // if (productSize.simpleproducts) {
		// if (productSize.type === 'configurable') {
		// 	let selectedColor = this.props.productDetails.productColor.selectedColor;

		// 	let arr = [];
		// 	Object.keys(productSize.simpleproducts).map((item, index) => {
		// 		if (productSize.simpleproducts[item].color.text === selectedColor) {
		// 			arr.push(
		// 				Object.assign(productSize.simpleproducts[item].size, {
		// 					sizeInStock: productSize.simpleproducts[item].stockstatus,
		// 				})
		// 			);
		// 		}
		// 	});

		// 	const newArr = this._getUnique(arr, 'text');
		// console.log('sizearr', arr);
		// console.log('Newsizearr', newArr);

		const shareUrl = window.location.href;
		const title = 'ELC'

		return (
			// <section  data-selector-wrapper>
			// 	<div data-selector-title-band-size>
			// 			<em><FormattedMessage id="product.size" defaultMessage="Size" /></em>
			// 			<span id="p3colordesc">
			// 				<b>&nbsp;{this.props.productDetails.productSize.selectedSize}</b>
			// 			</span>
			// 		</div>
			// 		<div data-selector="box" data-name="band-size" data-label-id role="radiogroup">
			// 			{newArr.map(this.__renderProductSizes)}
			// 		</div>
				<div className="row" style={{padding: 40}}>
					{/* <div className="Demo__some-network share-icon">
						<FacebookShareButton
							url={shareUrl}
							quote={title}
							image={imagination_icon}
							imageURL={imagination_icon}
							className="Demo__some-network__share-button">
							<FacebookIcon
								size={32}
								round />
						</FacebookShareButton>
						<span>Facebook</span>
					</div>

					<div className="Demo__some-network share-icon">
						<TwitterShareButton
							url={shareUrl}
							title={title}
							className="Demo__some-network__share-button">
							<TwitterIcon
								size={32}
								round />
						</TwitterShareButton>
						<span>Twitter</span>
					</div>

					<div className="Demo__some-network share-icon">
						<TelegramShareButton
							url={shareUrl}
							title={title}
							className="Demo__some-network__share-button">
							<TelegramIcon size={32} round />
						</TelegramShareButton>
						<span>Telegram</span>
					</div>

					<div className="Demo__some-network share-icon">
						<WhatsappShareButton
							url={shareUrl}
							title={title}
							separator=":: "
							className="Demo__some-network__share-button">
							<WhatsappIcon size={32} round />
						</WhatsappShareButton>
						<span>Whatsapp</span>
					</div> */}

					<div className="Demo__some-network share-icon">
                        <a href="https://www.facebook.com/elctoys" target="_blank">
							<img style={{height:42, width:42}} src={facebook} className="icon" />
							<span>Facebook</span>
						</a>
                    </div>
					<div className="Demo__some-network share-icon">
                        <a href="https://www.twitter.com/elctoysme" target="_blank">
							<img style={{height:42, width:42}} src={twitter} className="icon" />
							<span>Twitter</span>
						</a> 
                    </div>
					<div className="Demo__some-network share-icon">
                        <a href="https://www.instagram.com/elctoys" target="_blank"> 
							<img style={{height:42, width:42}} src={instagram} className="icon" />
							<span>Insragram</span>
						</a>
						
                    </div>
					<div className="Demo__some-network share-icon">
                       	<a href="https://www.youtube.com/elctoysme" target="_blank">
							<img style={{height:42, width:42}} src={youtube} className="icon" />
							<span>You tube</span>
						</a>
						
                    </div>

				</div>
			// </section>
		);
		// } else {
		// 	return false;
		// }
	}
}

const mapStateToProps = state => {
	return {
		globals: state.global,
		productDetails: state.productDetails,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onGetSize: payload => dispatch(actions.getSize(payload)),
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ProductSize);
