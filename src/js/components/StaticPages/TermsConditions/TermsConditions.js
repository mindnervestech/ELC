import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Spinner from '../../Spinner/Spinner.js'

class TermConditions extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
		};
	}
	static getDerivedStateFromProps = (props, state) => { };

	componentDidMount() {
		
		
			this.props.onGetTermConditionsData({ storeId: this.props.globals.currentStore});
		
		//this.props.onGetTermConditionsData({ storeId: 1 });
	}

	render() {
		return (
			<Spinner  loading={this.props.spinnerProduct}>
			<div className="t-Body-contentInner">
				<div className="container">
					<div className="row">
						<div className="col col-12 apex-col-auto">
							<div
								className="t-Region g-wrapper-main_content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-lg"
								id="R231982418266982051"
							>
								<div className="t-Region-header">
									<div className="t-Region-headerItems t-Region-headerItems--title">
										<span className="t-Region-headerIcon">
											<span className="t-Icon " aria-hidden="true" />
										</span>
										<h2 className="t-Region-title" id="R231982418266982051_heading">
											Content
										</h2>
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
										<center> <br />
											<h1 className="t-page-titles static-page-style">{this.props.termConditions.title}</h1>
											{/* <h1 className="t-page-titles"> <FormattedMessage id="ContactUs.Title" defaultMessage="ContactUs" /></h1> */}
										</center>
										<input type="hidden" id="P15_SEARCHSTRING" name="P15_SEARCHSTRING" value="" />
										<input
											type="hidden"
											data-for="P15_SEARCHSTRING"
											value="g-RLI0s745eGO1eIcAY5NdUULe2YDcVBnKNaPH7aEc8YFYxTjv5P-2Ug1O7BVMifSwLaXH03V6tV3ajkqM-3pQ"
										/>
										<input type="hidden" id="MISC" name="MISC" value="1055" />
										<input type="hidden" id="P15_TITLE" name="P15_TITLE" value="" />
										<input
											type="hidden"
											id="P15_PAGE_TITLE"
											name="P15_PAGE_TITLE"
											value="Legal - Privacy and Policy Nayomi Saudi"
										/>
										<input
											type="hidden"
											id="P15_PAGE_DESC"
											name="P15_PAGE_DESC"
											value="Checkout the privacy policy of Nayomi Saudi website. The Website Policies and Terms &amp; Conditions may be changed or updated occasionally to meet the requirements and standards."
										/>

										<div id="MiscContent">
											{/* <p style={{ textAlign: 'center' }}>
												<strong>
													<span style={{ fontSize: 28 }}>{this.state.data.title}</span>
												</strong>
											</p> */}
											<div
												style={{ fontSize: '14px' }}
												dangerouslySetInnerHTML={{ __html: this.props.termConditions.content }}
											/>
										</div>
									</div>
									<div className="t-Region-buttons t-Region-buttons--bottom">
										<div className="t-Region-buttons-left" />
										<div className="t-Region-buttons-right" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			</Spinner>
			

		);
	}
}

const mapStateToProps = state => {
	return {
		termConditions : state.static.termConditions,
		spinnerProduct: state.spinner.loadingProduct,
		globals:state.global
 	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGetTermConditionsData: (payload) => dispatch(actions.getTermConditionsPageData(payload)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(TermConditions);
