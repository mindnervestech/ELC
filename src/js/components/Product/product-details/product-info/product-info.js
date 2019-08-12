import React, { Component } from 'react';

import ProductColor from './product-color';
import ProductSize from './product-size';
import ProductBandSize from './product-bandsize';
import ProductCupSize from './product-cup-size';
import ProductOffer from './product-offer';
import ProductQty from './product-qty';
import ProductBasic from './product-basic';
import ProductPayment from './product-payment';

import SizeGuide from './product-sizeGuide';
import { FormattedMessage } from 'react-intl';
import Modal from 'react-responsive-modal';
import * as utility from '../../../utility/utility';

class ProductInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			openSizeChatModel: false,
      isBandCup: false
		};
	}

	componentDidUpdate(prevProps, prevState) {
		const { data } = this.props;
		let isBandSize = this._onBandSizeCheck(data);
		if (this.state.isBandCup != isBandSize) {
			this.setState({
				isBandCup: isBandSize
			})
		}

	}

	_onBandSizeCheck = obj => {
		if (!(utility.emptyObj(obj)) && ('simpleproducts' in obj)) {
			if (obj.simpleproducts.length > 0) {
				let bandsize = obj.simpleproducts[0].band_size;
				let cupsize = obj.simpleproducts[0].cup_size;
				if (!(utility.emptyObj(bandsize)) && !(utility.emptyObj(cupsize))) {
					return true
				} else {
					return false;
				}
			} else {
				return false;
			}
		} else {
			return false;
		}

	}
	onCloseFirstModal = () => {
		this.setState({ openSizeChatModel: false })
	}

	render() {
		const { data } = this.props;
		const { type } = this.props;
		console.log(this.props);
		const sizeComponent = this.state.isBandCup ? <><ProductBandSize productSize={data} />
			<ProductCupSize productSize={data} /></> : <ProductSize productSize={data} />;

		return (
			<div className="col col-12 apex-col-auto">
				{/* <div
					className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow t-Form--stretchInputs"
					id="R33790003785169837"
				>
					<div className="t-Region-header">
						<div className="t-Region-headerItems t-Region-headerItems--title">
							<span className="t-Region-headerIcon">
								<span className="t-Icon " aria-hidden="true" />
							</span>
							<h5 className="t-Region-title" id="R33790003785169837_heading">
								Product Details
							</h5>
						</div>
						<div className="t-Region-headerItems t-Region-headerItems--buttons">
							<span className="js-maximizeButtonContainer" />
						</div>
					</div>
					<div className="t-Region-bodyWrap">
						<div className="t-Region-buttons t-Region-buttons--top">
							<div className="t-Region-buttons-left" />
							<div className="t-Region-buttons-right" />
						</div>
						<div className="t-Region-body">
							<ProductBasic productbasic={data} currentStore={this.props.currentStore}/>
							<hr aria-hidden="true" />

							<ProductColor productColor={data} />
							{sizeComponent}
							{(data.category_desc != "Beauty" &&  data.category_desc != "تشكيلة بيوتي") && (<section data-selector-wrapper>
								<div className="ruler">
									<a onClick={() => this.setState({ openSizeChatModel: true })}>
										<span>
											<img src="https://storage.googleapis.com/nay/icons/ruler.svg" alt="Kiwi standing on oval" />
										</span>
										<FormattedMessage id="Product.Details.SizeFit" defaultMessage="Size & Fit" />
									</a>
								</div>
							</section>)}
							{(data.category_desc != "Beauty" && data.category_desc != "تشكيلة بيوتي") && (<div>
								<Modal open={this.state.openSizeChatModel} onClose={this.onCloseFirstModal}>
									<h3><FormattedMessage id="Product.Details.SizeFit" defaultMessage="Size & Fit" /></h3>
									<SizeGuide />
								</Modal>
							</div>)}

							<ProductOffer productOffer={data} showBeginItems={2} />
							{(data.category_desc == "Beauty" || data.category_desc == "تشكيلة بيوتي") && data.exclude_international == 'No' && ( <ProductQty productQtyAndStackStatus={data} /> )}
							{(data.category_desc != "Beauty" && data.category_desc != "تشكيلة بيوتي") && ( <ProductQty productQtyAndStackStatus={data} /> )}
						</div>
						<div className="t-Region-buttons t-Region-buttons--bottom">
							<div className="t-Region-buttons-left" />
							<div className="t-Region-buttons-right" />
						</div>
					</div>
				</div>
				<div
					className="t-Region t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow"
					id="R33790486933169842"
				>
					<div className="t-Region-header">
						<div className="t-Region-headerItems t-Region-headerItems--title">
							<span className="t-Region-headerIcon">
								<span className="t-Icon " aria-hidden="true" />
							</span>
							<h5 className="t-Region-title" id="R33790486933169842_heading">
								INFO
							</h5>
						</div>
						<div className="t-Region-headerItems t-Region-headerItems--buttons">
							<span className="js-maximizeButtonContainer" />
						</div>
					</div>
					<div className="t-Region-bodyWrap">
						<div className="t-Region-buttons t-Region-buttons--top">
							<div className="t-Region-buttons-left" />
							<div className="t-Region-buttons-right" />
						</div>

						<ProductPayment />

						<div className="t-Region-buttons t-Region-buttons--bottom">
							<div className="t-Region-buttons-left" />
							<div className="t-Region-buttons-right" />
						</div>
					</div>
				</div>
			 */}
			 	{type == 'Product Information' ? <div style={{marginBottom: '5rem', marginTop:40}}>
				 	<p className="detail-info">{type}</p>
					<p className="detail-info">Product code: 148138 </p>

					<p className="detail-info">At a Glance </p>

					<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

					<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
				 </div> : type == 'Delivery options' ?
				 <div style={{marginBottom: '5rem'}}>
					<p className="detail-info">{type}</p>
					<p className="detail-info">Product code: 148138 </p>

					<p className="detail-info">At a Glance </p>

					<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

					<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
				</div> : type == 'Questions' ?
				<div style={{marginBottom: '5rem'}}>
					<p className="detail-info">{type}</p>
					<p className="detail-info">Product code: 148138 </p>

					<p className="detail-info">At a Glance </p>

					<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

					<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
				</div> : ''}
			</div>
		);
	}
}

export default ProductInformation;
