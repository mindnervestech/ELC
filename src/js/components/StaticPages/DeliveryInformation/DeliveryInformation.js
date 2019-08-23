import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';

class CorporateInformation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
			data: [],
		};
	}

	static getDerivedStateFromProps = (props, state) => { };

	componentDidMount() {
		this.props.onGetCorporateInformationData({ storeId: 1 });
	}

	render() {
		return (
			<div className="t-Body-contentInner">
				<div className="container">
					<div className="row">
						<div className="col col-12 apex-col-auto">
							<div className="t-Region g-wrapper-main_content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-lg"
								id="R231982418266982051">
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
											<h1 className="t-page-titles">{this.props.corporateInformation.title}</h1>
											{/* <h1 className="t-page-titles"> <FormattedMessage id="ContactUs.Title" defaultMessage="ContactUs" /></h1> */}
										</center>
										<input type="hidden" id="P15_SEARCHSTRING" name="P15_SEARCHSTRING" value="" />
										<input
											type="hidden"
											data-for="P15_SEARCHSTRING"
											value="VIA0SBbLg3hjDxvM9S32BDUEmlDjGTBPt0oqr6Ri3dKGJ9gZE2K3eeQoCwqkQozmqlfLiht0ZGQ-LE3ojQ2Mtg"
										/>
										<input type="hidden" id="MISC" name="MISC" value="989" />
										<input type="hidden" id="P15_TITLE" name="P15_TITLE" value="" />
										<input
											type="hidden"
											id="P15_PAGE_TITLE"
											name="P15_PAGE_TITLE"
											value="Brand Overview - Saudis Online Lingerie Destination"
										/>
										<input
											type="hidden"
											id="P15_PAGE_DESC"
											name="P15_PAGE_DESC"
											value="Nayomi was founded in the Kingdom of Saudi Arabia in 1992 as a single lingerie store, and 24 years later has evolved into a distinctive, leading online lingerie brand in Saudi &amp; other regions."
										/>

										<div id="MiscContent">

											<div
												style={{ fontSize: '14px' }}
												dangerouslySetInnerHTML={{ __html: this.props.corporateInformation.content }}
											/>
											<div>&nbsp;</div>
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
		);
	}
}
const mapStateToProps = state => {
	return {
		corporateInformation : state.static.corporateInformation,
 	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGetCorporateInformationData: (payload) => dispatch(actions.getCorporateInformationPageData(payload)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(CorporateInformation);
