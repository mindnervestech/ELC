import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import Axios from 'axios';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { STATIC_PAGES_URL, API_URL, API_TOKEN } from '../../../api/globals';
import * as utility from '../../utility/utility';
import Breadcrumb from '../../Breadcrumb/Breadcrumb';

class FAQ extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
			data: this.props.static_pages.faq,
			search: this.props.search ? true : false,
		};

	}



	searchSpan = (input, word) => {
		function replacer(word) {
			return '<span style="background:#faced7">' + word + '</span>';
		}
		return input.replace(new RegExp('(' + word + ')', "gi"), replacer);
	}

	componentDidMount(prevProps, prevState) {
		this.props.getFaqPageData();
	}

	componentDidUpdate(prevProps, prevState) {

		let changedLang = localStorage.getItem('tempstoreid');
		if (this.state.storeId !== changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.props.getFaqPageData();
			});
		}
	}

	render() {
		//console.log(this.state);
		let title = this.props.static_pages.faq.title;
		let content = this.props.static_pages.faq.content;
		if (this.state.search) {
			let input = this.props.static_pages.faq.content;
			let word = this.props.searchWord;
			content = this.searchSpan(input, word);
			//console.log(content);
		}

		return (

			<div className="t-Body-contentInner">
				<div className="container">
					<div className="row">
						<div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
							<Breadcrumb name={`FAQ`} />
						</div>
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
										<input type="hidden" id="P15_SEARCHSTRING" name="P15_SEARCHSTRING" value="" />
										<input
											type="hidden"
											data-for="P15_SEARCHSTRING"
											value="aMU8eM0haNcSt17CefS8rVgs0QQvHgsGbZv_2mGPUjOOxS2yLGdloA2O0k7AZTMseQ1U45M0Z17vjDxWTewxvA"
										/>
										<input type="hidden" id="MISC" name="MISC" value="995" />
										<input type="hidden" id="P15_TITLE" name="P15_TITLE" value="" />
										<input
											type="hidden"
											id="P15_PAGE_TITLE"
											name="P15_PAGE_TITLE"
											value="Frequently Asked Questions (FAQ) - Nayomi Saudi"
										/>
										<input
											type="hidden"
											id="P15_PAGE_DESC"
											name="P15_PAGE_DESC"
											value="Browse through these frequesntly asked questions to find answers to commonly raised questions at Nayomi Saudi."
										/>
										<div id="MiscContent">

											<div dangerouslySetInnerHTML={{ __html: content }} />
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
		static_pages: state.static,

	}
}

const mapDispatchToProps = dispatch => {
	return {

		getHelpPageData: () => dispatch(actions.getHelpPageData()),
		getFaqPageData: () => dispatch(actions.getFaqPageData()),
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(FAQ);

