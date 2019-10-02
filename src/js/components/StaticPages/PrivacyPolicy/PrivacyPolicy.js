import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Axios from 'axios';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { STATIC_PAGES_URL, API_TOKEN } from '../../../api/globals';
import Spinner from '../../Spinner/Spinner.js'
import { Helmet } from 'react-helmet';
class PrivacyPolicy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			storeId: '',
			data: [],
			spinner:true
		};
	}
	static getDerivedStateFromProps = (props, state) => { };
	getStoreInfo = () => {
		
		if (this.state.storeId) {
			const API = Axios.create({
				baseURL: STATIC_PAGES_URL,
				headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
			});

			API.get('privacy-policy/storeId/' + this.state.storeId).then(res => {
				this.setState({ data: res.data ,spinner:!this.state.spinner});
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
		
		let changedLang = localStorage.getItem('tempstoreid');
		if (this.state.storeId !== changedLang) {
			this.setState({ storeId: changedLang, data: [] }, () => {
				this.getStoreInfo();
			});
		}
	}

	render() {
        const language = localStorage.getItem('templang');
		let store_locale=this.props.globals.store_locale
		let title = "Our Privacy Policy | ELC UAE Online store";
		let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
		let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
		if (language == 'ar') {
			title = "الشروط والأحكام  |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
			description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
			keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية"; 
		}
	
		let meta_tag  = <><Helmet>
			<meta name="tital" content={title} />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
		</Helmet></>;
	
		return (
			<>
				{this.state.spinner ? <Spinner loding={this.state.spinner}/> :
				<div className="t-Body-contentInner">
				<div  className="padding-right-ar padding-breadcrumb">
				<Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
				  <span className="titleHover" style={{fontSize:15}}><FormattedMessage id="Checkout.Home" defaultMessage/></span>
				  { this.props.globals.language=='en'?
                     <> <span>&nbsp;\&nbsp;&nbsp;</span> </>:
                     <> <span>&nbsp;/&nbsp;&nbsp;</span></>
                    }
				</Link>
				<span  style={{fontSize:15, fontWeight: 'bold'}}>{this.state.data.title}</span>
			  </div>
				<div className="container">
					{meta_tag}
					<div className="row">
						<div className="col col-12 apex-col-auto">
							<div
								className="t-Region g-wrapper-main_content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody "
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
											value="RFrtayOUOOMvo_yXNRmZGZa3_-Gv1INCgT1uN9pYVxYVf3YyUHvlJVB68WgljZ48HuRVgjNThIPh6qYHH0bO3A"
										/>
										<input type="hidden" id="MISC" name="MISC" value="992" />
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
											<p style={{ textAlign: 'center' }}>
											<h1 className="t-page-titles static-page-style">{this.state.data.title}</h1>
											</p>
											<div
												className="staticPagesText"
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
				}
		</>
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

export default connect(mapStateToProps)(PrivacyPolicy);


