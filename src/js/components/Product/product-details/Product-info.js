import React, { Component } from 'react';
import glam from '../../../../assets/images/product-details/nay-sp19-glam-table-bra.jpg';

import dblpushup from '../../../../assets/images/product-details/double-pushup-bra.jpg';
import ReactImageMagnify from 'react-image-magnify';
import ProductZoom from './product-zoom/Product-zoom';
import ProductInformation from './product-info/product-info';
import ProductSocial from './product-social/product-social';

class ProductInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		const { data } = this.props;

		return (
			<div className="row">
				<div className="col col-12 apex-col-auto">
					<div
						className="t-Region containers  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-md"
						id="R33789882492169835"
					>
						<div className="t-Region-header">
							<div className="t-Region-headerItems t-Region-headerItems--title">
								<span className="t-Region-headerIcon">
									<span className="t-Icon " aria-hidden="true" />
								</span>
								<h5 className="t-Region-title" id="R33789882492169835_heading">
									Main Section
								</h5>
							</div>
							<div className="t-Region-headerItems t-Region-headerItems--buttons">
								<span className="js-maximizeButtonContainer" />
							</div>
						</div>
						<div className="t-Region-bodyWrap">
							<div className="t-Region-body">
								<div className="container">
									<div className="row">
										<div className="col col-6 apex-col-auto">
											<div
												className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody"
												id="R28333438492179550"
											>
												<div className="t-Region-header">
													<div className="t-Region-headerItems t-Region-headerItems--title">
														<span className="t-Region-headerIcon">
															<span className="t-Icon " aria-hidden="true" />
														</span>
														<h5 className="t-Region-title" id="R28333438492179550_heading">
															Product Zoom
														</h5>
													</div>
													<div className="t-Region-headerItems t-Region-headerItems--buttons">
														<span className="js-maximizeButtonContainer" />
													</div>
												</div>
												<div className="t-Region-bodyWrap">
													<div className="t-Region-body">
														<ProductZoom />
														<div className="container">
															<div className="row">
																<div className="col col-12 apex-col-auto">
																	<div
																		className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-top-none margin-bottom-none margin-left-none margin-right-none"
																		id="R28333491897179551"
																	>
																		<div className="t-Region-bodyWrap">
																			<div className="t-Region-body">
																				<ProductSocial data={data} currentStore={this.props.currentStore} />
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
										<ProductInformation data={data}  currentStore={this.props.currentStore}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ProductInfo;
