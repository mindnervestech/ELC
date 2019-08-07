import React, { Component } from 'react';
import Axios from 'axios';
import cookie from 'react-cookies';
import '../../../../styles/StaticPages.css';
import { STATIC_PAGES_URL, API_TOKEN } from '../../../api/globals';

class Franchising extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
			data: [],
		};
	}

	static getDerivedStateFromProps = (props, state) => { };

	getFranchising = () => {
		if (this.state.storeId) {
			const API = Axios.create({
				baseURL: STATIC_PAGES_URL,
				headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
			});

			API.get('careers/storeId/' + this.state.storeId).then(res => {
				this.setState({ data: res.data });
			});
		}
	}

	componentDidMount(prevProps, prevState) {
		let changedLang = localStorage.getItem('tempstoreid');
		if (changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.getFranchising();
			});
		} else {
			this.setState({ storeId: cookie.load('storeid'), data: [] }, () => {
				this.getFranchising();
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		let changedLang = localStorage.getItem('tempstoreid');
		if (this.state.storeId !== changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.getFranchising();
			});
		}
	}

	render() {
		return (
			<div className="t-Body-contentInner">
				<div className="container">
					<div className="row">
						<div className="col col-12 apex-col-auto">
						<h1>Franchising</h1>
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
												dangerouslySetInnerHTML={{ __html: this.state.data.content }}
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
export default Franchising;
