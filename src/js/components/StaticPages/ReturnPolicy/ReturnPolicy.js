import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import Axios from 'axios';
import cookie from 'react-cookies';
import { STATIC_PAGES_URL, API_TOKEN } from '../../../api/globals';
class ReturnPolicy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
			data: [],
		};
	}

	getStoreInfo = () => {
		console.log('store_id in function', this.state.storeId);
		if (this.state.storeId) {
			const API = Axios.create({
				baseURL: STATIC_PAGES_URL,
				headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
			});

			API.get('returns-and-exchanges/storeId/' + this.state.storeId).then(res => {
				this.setState({ data: res.data });
			});
		}
	}

	componentDidMount(prevProps, prevState) {
		let changedLang = localStorage.getItem('tempstoreid');
		if (changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.getStoreInfo();
			});
		} else {
			this.setState({ storeId: cookie.load('storeid'), data: [] }, () => {
				this.getStoreInfo();
			});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('componentDidUpdateCalled!!');
		let changedLang = localStorage.getItem('tempstoreid');
		if (this.state.storeId !== changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.getStoreInfo();
			});
		}
	}

	render() {
		return (
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
										<input type="hidden" id="P15_SEARCHSTRING" name="P15_SEARCHSTRING" value="" />
										<input
											type="hidden"
											data-for="P15_SEARCHSTRING"
											value="EknzTriNxM3mKsb1wMI4WxWaqpw5HgiKi6lZ7-3a3WXLwdJrNnxWH_O6jVSD1o1YbZxD6kSqzivLCq63BRz3hA"
										/>
										<input type="hidden" id="MISC" name="MISC" value="997" />
										<input type="hidden" id="P15_TITLE" name="P15_TITLE" value="" />
										<input
											type="hidden"
											id="P15_PAGE_TITLE"
											name="P15_PAGE_TITLE"
											value="Return Policy - Nayomi Saudi"
										/>
										<input
											type="hidden"
											id="P15_PAGE_DESC"
											name="P15_PAGE_DESC"
											value="At Nayomi, we are proud to offer a convenient return and exchange policy to our customers in Saudi. We will accept the exchange or return of a product provided it meets quality guidlines."
										/>

										<div id="MiscContent">
											<p style={{ textAlign: 'center' }}>
												<strong>
													<span style={{ fontSize: 28 }}>{this.state.data.title}</span>
												</strong>
											</p>

											<p style={{ textAlign: 'center' }}>&nbsp;</p>
											<div
												style={{ fontSize: '14px' }}
												dangerouslySetInnerHTML={{ __html: this.state.data.content }}
											/>

											<p>&nbsp;</p>
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

export default ReturnPolicy;
