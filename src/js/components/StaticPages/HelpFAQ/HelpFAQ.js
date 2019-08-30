import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Spinner from '../../Spinner/Spinner.js'

class HelpFAQ extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
			data: [],
			
		};
	}

	static getDerivedStateFromProps = (props, state) => { };

	componentDidMount() {
		if(this.props.globals.currentStore===undefined || this.props.globals.currentStore==='false')
		{
			this.props.onGetHelpFAQData({ storeId: 1 });
		}
		else
		{
			this.props.onGetHelpFAQData({ storeId: this.props.globals.currentStore});
		}
		
	}

	render() {
		return (
			<Spinner  loading={this.props.spinnerProduct}>
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
											<h1 className="t-page-titles">{this.props.help.title}</h1>
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
												dangerouslySetInnerHTML={{ __html: this.props.help.content }}
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
			</Spinner>
		);
	}
}
const mapStateToProps = state => {
	return {
		help : state.static.help,
		spinnerProduct: state.spinner.loadingProduct,
		globals:state.global
 	}
}

const mapDispatchToProps = dispatch => {
	return {
		onGetHelpFAQData: (payload) => dispatch(actions.getHelpFAQPageData(payload)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(HelpFAQ);
