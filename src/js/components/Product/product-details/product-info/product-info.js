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
import parse from 'html-react-parser';
import Collapsible from 'react-collapsible';
import { Link, withRouter } from 'react-router-dom';

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
		const { data, type } = this.props;
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
			 <div className="show-web">
			 	{type == 'Product Information' ? <div style={{marginBottom: '5rem', marginTop:40}}>
					 {/* <p className="detail-info">{type}</p> */}
					{/* <p className="detail-info">{producDetail.sku.label}: {producDetail.sku.value} </p>

					<p className="detail-info">{producDetail.weight.label}: {producDetail.weight.value}</p>

					<p className="detail-info">{producDetail.pattern.label}: {producDetail.pattern.value}</p>

					<p className="detail-info">{producDetail.material.label}: {producDetail.material.value}</p>

					<p className="detail-info">{producDetail.climate.label}: {producDetail.climate.value}</p> */}

					<p className="detail-info" style={{textAlign:'start'}}>{data.description}</p>
					{data.brand || data.age || data.assembly_req || data.battery_inc || data.battery_req? 
						<h3 className="specification-title" style={{textAlign:'start'}}>
							<FormattedMessage id="Specifications" defaultMessage="Specifications" /></h3> : <div/>}
					{data.age ?<div className="row specification-item-content">
						<span class="specification-item-key"><FormattedMessage id="Age" defaultMessage="Age" />:</span> 
						<span className="specification-item-value">{data.age}</span>
					</div> : <div/>}
					{data.assembly_req ?<div className="row specification-item-content">
						<span class="specification-item-key"><FormattedMessage id="AssemblyRequired" defaultMessage="Assembly Required" />:</span>
						<span className="specification-item-value">{data.assembly_req}</span>
					</div> : <div/>}
					{data.battery_inc ?<div className="row specification-item-content">
						<span class="specification-item-key"><FormattedMessage id="BatteryIncluded" defaultMessage="Battery Included" />:</span> 
						<span className="specification-item-value">{data.battery_inc}</span>
					</div> : <div/>}
					{data.battery_req ?<div className="row specification-item-content">
						<span class="specification-item-key"><FormattedMessage id="BatteryRequired" defaultMessage="Battery Required" />:</span> 
						<span className="specification-item-value">{data.battery_req}</span>
					</div> : <div/>}
					{data.brand ?<div className="row specification-item-content">
						<span class="specification-item-key"><FormattedMessage id="Brand" defaultMessage="Brand" />:</span> 
						<span className="specification-item-value">{data.brand}</span>
					</div> : <div/>}
				 </div> : type == 'Shipping' ?
				 <div style={{marginBottom: '5rem', marginTop:40}}>
					<p className="detail-info">{type}</p>
					<p className="detail-info">Product code: 148138 </p>

					<p className="detail-info">At a Glance </p>

					<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

					<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
				</div> : type == 'Questions' ?
				<div style={{marginBottom: '5rem', marginTop:40}}>
					<p className="detail-info">{type}</p>
					<p className="detail-info">Product code: 148138 </p>

					<p className="detail-info">At a Glance </p>

					<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

					<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
				</div> : ''}
				</div>
				<div className="footer-css  footer-line show-mobile">
                    
                    <div className="mobile-manu">
                        <Collapsible trigger={<FormattedMessage id="Product.Details.ProductInfo" defaultMessage="Product Information" />}>
						<div style={{marginBottom: '5rem', textAlign:'left'}}>
							{/* <p className="detail-info">{producDetail.sku.label}: {producDetail.sku.value} </p>

							<p className="detail-info">{producDetail.weight.label}: {producDetail.weight.value}</p>

							<p className="detail-info">{producDetail.pattern.label}: {producDetail.pattern.value}</p>

							<p className="detail-info">{producDetail.material.label}: {producDetail.material.value}</p>

							<p className="detail-info">{producDetail.climate.label}: {producDetail.climate.value}</p> */}

							<p className="detail-info">{data.description}</p>
						</div>
                        </Collapsible>
                        {/* <Collapsible trigger={<FormattedMessage id="Product.Details.DeliveryOption" defaultMessage="Delivery Options" />}>
						<div style={{marginBottom: '5rem', textAlign:'left'}}>
							<p className="detail-info">Delivery Options</p>
							<p className="detail-info">Product code: 148138 </p>

							<p className="detail-info">At a Glance </p>

							<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

							<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
						</div>
                        </Collapsible>
						<Collapsible trigger={<FormattedMessage id="Product.Details.Question" defaultMessage="Question" />}>
						<div style={{marginBottom: '5rem', textAlign:'left'}}>
							<p className="detail-info">Question</p>
							<p className="detail-info">Product code: 148138 </p>

							<p className="detail-info">At a Glance </p>

							<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

							<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
						</div>
                        </Collapsible> */}
                        
                    </div>
                    
                </div>
			</div>
		);
	}
}

export default ProductInformation;
