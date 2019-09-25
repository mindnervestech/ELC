import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
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
					{type == 'Product Information' ? <div style={{ marginBottom: '5rem', marginTop: 40 }}>
						{/* <p className="detail-info">{type}</p> */}
						{/* <p className="detail-info">{producDetail.sku.label}: {producDetail.sku.value} </p>

					<p className="detail-info">{producDetail.weight.label}: {producDetail.weight.value}</p>

					<p className="detail-info">{producDetail.pattern.label}: {producDetail.pattern.value}</p>

					<p className="detail-info">{producDetail.material.label}: {producDetail.material.value}</p>

					<p className="detail-info">{producDetail.climate.label}: {producDetail.climate.value}</p> */}

						<p className="detail-info" style={{ textAlign: 'start' }}>{data.description}</p>
						{data.brand || data.age || data.assembly_req || data.battery_inc || data.battery_req ?
							<h3 className="specification-title" style={{ textAlign: 'start' }}>
								<FormattedMessage id="Specifications" defaultMessage="Specifications" /></h3> : <div />}
						{data.age ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="Age" defaultMessage="Age" />:</span>
							<span className="specification-item-value">{data.age}</span>
						</div> : <div />}
						{data.assembly_req ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="AssemblyRequired" defaultMessage="Assembly Required" />:</span>
							<span className="specification-item-value">{data.assembly_req}</span>
						</div> : <div />}
						{data.battery_inc ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="BatteryIncluded" defaultMessage="Battery Included" />:</span>
							<span className="specification-item-value">{data.battery_inc}</span>
						</div> : <div />}
						{data.battery_req ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="BatteryRequired" defaultMessage="Battery Required" />:</span>
							<span className="specification-item-value">{data.battery_req}</span>
						</div> : <div />}
						{data.brand ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="Brand" defaultMessage="Brand" />:</span>
							<span className="specification-item-value">{data.brand}</span>
						</div> : <div />}
					</div> : type == 'Shipping' ?
							<div style={{ marginBottom: '5rem', marginTop: 40 }}>
							{this.props.globals.country == 'UAE' ?
									<div className="uae">
										<h1 className="shipping-tab-h1 shipping-tab-border" style={{ marginBottom: 20, marginTop: 40 }}><FormattedMessage id="HowmuchdoesUAEdeliverycost?" defaultMessage="How much does UAE delivery cost?"></FormattedMessage></h1>
										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="StandardDelivery" defaultMessage="Standard Delivery"></FormattedMessage></h2>

										<h3 className="shipping-tab-h3"><FormattedMessage id="FREEwhenyouspendAED250orAED20forordersunderAED250" defaultMessage="FREE - when you spend AED 250, or AED 20 for orders under AED 250."/></h3>
										<div>
											<ul className="shipping-tab-ul">
												<li className="shipping-tab-li"><FormattedMessage id="Deliveryin2to3workingdays" defaultMessage="Delivery in 2 to 3 working days"/></li>
												<li className="shipping-tab-li"><FormattedMessage id="FreedeliveryoverAED250appliesforalloftheU.A.E" defaultMessage="Free delivery over AED 250 applies for all of the U.A.E."/></li>
											</ul>
										</div>
										<hr></hr>
										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="SameDayDeliverycomingsoon" defaultMessage="Same Day Delivery –coming soon"/></h2>
										<div>
											<ul className="shipping-tab-ul">
												<li className="shipping-tab-li"><FormattedMessage  id="ComingsoontoDubai" defaultMessage="Coming soon to Dubai"/></li>
											</ul></div>
										<hr></hr>

										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="ClickCollectcomingsoon" defaultMessage="Click & Collect –coming soon"/></h2>
										<div><ul className="shipping-tab-ul">
											<li className="shipping-tab-li"><FormattedMessage id="ComingsoontotheU.A.E.inselectedELCStores" defaultMessage="Coming soon to the U.A.E. in selected ELC Stores."/></li>

										</ul></div>
										<hr></hr>
										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="OutdoorItems" defaultMessage="Outdoor Items"/></h2>
										<h3 className="shipping-tab-h3"><FormattedMessage id="FREEASSEMBLYonOutdoorlineswhenyouspendAED1000andabove" defaultMessage="FREE ASSEMBLY –on Outdoor lines when you spend AED 1,000 and above"/></h3>

										<div><ul className="shipping-tab-ul">
											<li className="shipping-tab-li"><FormattedMessage id="Deliveryin5to7workingdays" defaultMessage="Delivery in 5 to 7 working days."/></li>
											<li className="shipping-tab-li"><FormattedMessage id="ServiceavailableinDubaiAbuDhabiAlAinAjmanRasAlKhaimahSharjah" defaultMessage="Service available in Dubai, Abu Dhabi, Al Ain, Ajman, Ras Al Khaimah, Sharjah"/></li>

										</ul></div>
									</div> : <div></div>

								}


{this.props.globals.country == 'KSA' ?
									<div className="ksa">


										<div className="ksa">
											<h1 className="shipping-tab-h1 shipping-tab-border" style={{ marginBottom: 20, marginTop: 40 }}><FormattedMessage id="HowmuchdoesKSAdeliverycost?" defaultMessage="How much does KSA delivery cost?"/></h1>
											<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="StandardDelivery" defaultMessage="Standard Delivery"/></h2>

											<h3 className="shipping-tab-h3"><FormattedMessage id="whenyouspendSAR250orSAR20forordersunderSAR250" defaultMessage="- when you spend SAR 250, or SAR 20 for orders under SAR 250."/></h3>
											<div>
												<ul className="shipping-tab-ul">
													<li className="shipping-tab-li"><FormattedMessage id="Deliveryin3to4workingdays" defaultMessage="Delivery in 3 to 4 working days."/></li>
													<li className="shipping-tab-li"><FormattedMessage id="FreedeliveryoverSAR250appliesforallofKSA" defaultMessage="Free delivery over SAR 250 applies for all of KSA ."/></li>
												</ul>
											</div>
											<hr></hr>
											<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}> <FormattedMessage id="SameDayDeliverycomingsoon" defaultMessage="Same Day Delivery –coming soon"/></h2>
											<div>
												<ul className="shipping-tab-ul">
													<li className="shipping-tab-li"><FormattedMessage id="ComingsoontoJeddah" defaultMessage="Coming soon to Jeddah"/></li>
												</ul></div>


											<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="OutdoorItems" defaultMessage="Outdoor Items"/></h2>
											<h3 className="shipping-tab-h3"><FormattedMessage id="FREEASSEMBLYonOutdoorlineswhenyouspendSAR1000andabove" defaultMessage="FREE ASSEMBLY –on Outdoor lines when you spend SAR 1,000 and above"/></h3>

											<div><ul className="shipping-tab-ul">
												<li className="shipping-tab-li"><FormattedMessage id="Deliveryin5to7workingdays" defaultMessage="Delivery in 5 to 7 working days."/></li>
												<li className="shipping-tab-li"><FormattedMessage id="ServiceavailableinJeddah" defaultMessage="Service available in Jeddah ."/></li>

											</ul></div>

										</div></div>
									: <div></div>
								}
							</div> : type == 'Questions' ?
								<div style={{ marginBottom: '5rem', marginTop: 40 }}>
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
							{/* <div style={{ marginBottom: '5rem', textAlign: 'left' }}>
								<p className="detail-info">{data.description}</p>
							</div> */}

							<p className="detail-info" style={{ textAlign: 'start' }}>{data.description}</p>
							{data.brand || data.age || data.assembly_req || data.battery_inc || data.battery_req ?
								<h3 className="specification-title" style={{ textAlign: 'start' }}>
									<FormattedMessage id="Specifications" defaultMessage="Specifications" /></h3> : <div />}
							{data.age ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="Age" defaultMessage="Age" />:</span>
								<span className="specification-item-value">{data.age}</span>
							</div> : <div />}
							{data.assembly_req ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="AssemblyRequired" defaultMessage="Assembly Required" />:</span>
								<span className="specification-item-value">{data.assembly_req}</span>
							</div> : <div />}
							{data.battery_inc ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="BatteryIncluded" defaultMessage="Battery Included" />:</span>
								<span className="specification-item-value">{data.battery_inc}</span>
							</div> : <div />}
							{data.battery_req ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="BatteryRequired" defaultMessage="Battery Required" />:</span>
								<span className="specification-item-value">{data.battery_req}</span>
							</div> : <div />}
							{data.brand ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="Brand" defaultMessage="Brand" />:</span>
								<span className="specification-item-value">{data.brand}</span>
							</div> : <div />}
						</Collapsible>
						<Collapsible trigger={<FormattedMessage id="Checkout.Shipping" defaultMessage="Shipping" />} className="textStartShippingTab">
							<div style={{ marginTop: 40 }}>
								{this.props.globals.country == 'UAE' ?
									<div className="uae">
										<h1 className="shipping-tab-h1 shipping-tab-border" style={{ marginBottom: 20, marginTop: 40 }}><FormattedMessage id="HowmuchdoesUAEdeliverycost?" defaultMessage="How much does UAE delivery cost?"></FormattedMessage></h1>
										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="StandardDelivery" defaultMessage="Standard Delivery"></FormattedMessage></h2>

										<h3 className="shipping-tab-h3"><FormattedMessage id="FREEwhenyouspendAED250orAED20forordersunderAED250" defaultMessage="FREE - when you spend AED 250, or AED 20 for orders under AED 250."/></h3>
										<div>
											<ul className="shipping-tab-ul">
												<li className="shipping-tab-li"><FormattedMessage id="Deliveryin2to3workingdays" defaultMessage="Delivery in 2 to 3 working days"/></li>
												<li className="shipping-tab-li"><FormattedMessage id="FreedeliveryoverAED250appliesforalloftheU.A.E" defaultMessage="Free delivery over AED 250 applies for all of the U.A.E."/></li>
											</ul>
										</div>
										<hr></hr>
										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="SameDayDeliverycomingsoon" defaultMessage="Same Day Delivery –coming soon"/></h2>
										<div>
											<ul className="shipping-tab-ul">
												<li className="shipping-tab-li"><FormattedMessage  id="ComingsoontoDubai" defaultMessage="Coming soon to Dubai"/></li>
											</ul></div>
										<hr></hr>

										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="ClickCollectcomingsoon" defaultMessage="Click & Collect –coming soon"/></h2>
										<div><ul className="shipping-tab-ul">
											<li className="shipping-tab-li"><FormattedMessage id="ComingsoontotheU.A.E.inselectedELCStores" defaultMessage="Coming soon to the U.A.E. in selected ELC Stores."/></li>

										</ul></div>
										<hr></hr>
										<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="OutdoorItems" defaultMessage="Outdoor Items"/></h2>
										<h3 className="shipping-tab-h3"><FormattedMessage id="FREEASSEMBLYonOutdoorlineswhenyouspendAED1000andabove" defaultMessage="FREE ASSEMBLY –on Outdoor lines when you spend AED 1,000 and above"/></h3>

										<div><ul className="shipping-tab-ul">
											<li className="shipping-tab-li"><FormattedMessage id="Deliveryin5to7workingdays" defaultMessage="Delivery in 5 to 7 working days."/></li>
											<li className="shipping-tab-li"><FormattedMessage id="ServiceavailableinDubaiAbuDhabiAlAinAjmanRasAlKhaimahSharjah" defaultMessage="Service available in Dubai, Abu Dhabi, Al Ain, Ajman, Ras Al Khaimah, Sharjah"/></li>

										</ul></div>
									</div> : <div></div>

								}

								{this.props.globals.country == 'KSA' ?
									<div className="ksa">


										<div className="ksa">
											<h1 className="shipping-tab-h1 shipping-tab-border" style={{ marginBottom: 20, marginTop: 40 }}><FormattedMessage id="HowmuchdoesKSAdeliverycost?" defaultMessage="How much does KSA delivery cost?"/></h1>
											<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="StandardDelivery" defaultMessage="Standard Delivery"/></h2>

											<h3 className="shipping-tab-h3"><FormattedMessage id="whenyouspendSAR250orSAR20forordersunderSAR250" defaultMessage="- when you spend SAR 250, or SAR 20 for orders under SAR 250."/></h3>
											<div>
												<ul className="shipping-tab-ul">
													<li className="shipping-tab-li"><FormattedMessage id="Deliveryin3to4workingdays" defaultMessage="Delivery in 3 to 4 working days."/></li>
													<li className="shipping-tab-li"><FormattedMessage id="FreedeliveryoverSAR250appliesforallofKSA" defaultMessage="Free delivery over SAR 250 applies for all of KSA ."/></li>
												</ul>
											</div>
											<hr></hr>
											<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}> <FormattedMessage id="SameDayDeliverycomingsoon" defaultMessage="Same Day Delivery –coming soon"/></h2>
											<div>
												<ul className="shipping-tab-ul">
													<li className="shipping-tab-li"><FormattedMessage id="ComingsoontoJeddah" defaultMessage="Coming soon to Jeddah"/></li>
												</ul></div>


											<h2 className="shipping-tab-h2" style={{ marginBottom: 10, marginTop: 20 }}><FormattedMessage id="OutdoorItems" defaultMessage="Outdoor Items"/></h2>
											<h3 className="shipping-tab-h3"><FormattedMessage id="FREEASSEMBLYonOutdoorlineswhenyouspendSAR1000andabove" defaultMessage="FREE ASSEMBLY –on Outdoor lines when you spend SAR 1,000 and above"/></h3>

											<div><ul className="shipping-tab-ul">
												<li className="shipping-tab-li"><FormattedMessage id="Deliveryin5to7workingdays" defaultMessage="Delivery in 5 to 7 working days."/></li>
												<li className="shipping-tab-li"><FormattedMessage id="ServiceavailableinJeddah" defaultMessage="Service available in Jeddah ."/></li>

											</ul></div>

										</div></div>
									: <div></div>
								}
							</div>


							{/* <div style={{ marginBottom: '5rem', textAlign: 'left' }}>
								<p className="detail-info">Delivery Options</p>
								<p className="detail-info">Product code: 148138 </p>

								<p className="detail-info">At a Glance </p>

								<p className="detail-info">All aboard the elc bus for colour-matching, problem-solving fun! </p>

								<p className="detail-info">Features and benefits for elc wooden shopping trolley </p>
							</div> */}
						</Collapsible>
						{/*<Collapsible trigger={<FormattedMessage id="Product.Details.Question" defaultMessage="Question" />}>
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


const mapStateToProps = state => {
	return {

		globals: state.global,

	}
}



export default connect(mapStateToProps)(ProductInformation);

