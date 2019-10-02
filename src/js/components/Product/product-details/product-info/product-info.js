import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductSize from './product-size';
import ProductBandSize from './product-bandsize';
import { FormattedMessage } from 'react-intl';
import * as utility from '../../../utility/utility';
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
			{/* <ProductCupSize productSize={data} /> */}
			</> : <ProductSize productSize={data} />;
		return (
			<div className="col col-12 apex-col-auto">
				
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

						{data.packaging_height ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="Height" defaultMessage="Height" />:</span>
							<span className="specification-item-value">{data.packaging_height}</span>
						</div> : <div />}
						{data.packaging_width ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="Width" defaultMessage="Width" />:</span>
							<span className="specification-item-value">{data.packaging_width}</span>
						</div> : <div />}
						{data.packaging_length ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="Length" defaultMessage="Length" />:</span>
							<span className="specification-item-value">{data.packaging_length}</span>
						</div> : <div />}
						{data.packaging_weight ? <div className="row specification-item-content">
							<span class="specification-item-key"><FormattedMessage id="Weight" defaultMessage="Weight" />:</span>
							<span className="specification-item-value">{data.packaging_weight}</span>
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

							{data.packaging_height ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="Height" defaultMessage="Height" />:</span>
								<span className="specification-item-value">{data.packaging_height}</span>
							</div> : <div />}
							{data.packaging_width ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="Width" defaultMessage="Width" />:</span>
								<span className="specification-item-value">{data.packaging_width}</span>
							</div> : <div />}
							{data.packaging_length ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="Length" defaultMessage="Length" />:</span>
								<span className="specification-item-value">{data.packaging_length}</span>
							</div> : <div />}
							{data.packaging_weight ? <div className="row specification-item-content">
								<span class="specification-item-key"><FormattedMessage id="Weight" defaultMessage="Weight" />:</span>
								<span className="specification-item-value">{data.packaging_weight}</span>
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

