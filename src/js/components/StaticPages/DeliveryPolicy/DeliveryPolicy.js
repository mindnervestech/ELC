import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import Axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import cookie from 'react-cookies';
import { connect } from 'react-redux';
import { STATIC_PAGES_URL, API_TOKEN } from '../../../api/globals';
import Spinner from '../../Spinner/Spinner.js';
import * as actions from '../../../redux/actions/index';
class DeliveryPolicy extends Component {
    constructor(props) {
      
        super(props);
        this.state = {
            storeId: '',
            data: [],
            spinner: true
        };
    }


	componentDidMount() {
		this.props.onGetDeliveryPolicyData({ storeId: this.props.globals.currentStore});
}

    // static getDerivedStateFromProps = (props, state) => { };
    // getDeliveyPolicyData = () => {
    //     if (this.props.globals) {
    //         const API = Axios.create({
    //             baseURL: STATIC_PAGES_URL,
    //             headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
    //         });
    //         API.get('delivery-policy/storeId/' + this.props.globals.currentStore).then(res => {
    //             this.setState({ data: res.data, spinner: false });
    //         });
    //     }
    // }

    // componentDidMount(prevProps, prevState) {
    //     let changedLang = localStorage.getItem('tempstoreid');
    //     if (changedLang) {
    //         this.setState({ storeId: changedLang, data: [] }, () => {
    //             this.getDeliveyPolicyData();
    //         });
    //     } else {
    //         this.setState({ storeId: cookie.load('storeid'), data: [] }, () => {
    //             this.getDeliveyPolicyData();
    //         });
    //     }
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     let changedLang = localStorage.getItem('tempstoreid');
    //     if (this.state.storeId !== changedLang) {
    //         this.setState({ storeId: changedLang, data: [] }, () => {
    //             this.getDeliveyPolicyData();
    //         });
    //     }
    // }

    render() {
        let store_locale = this.props.globals.store_locale
        return (
            <>
                {this.props.spinnerProduct ? <Spinner /> :
                    <div className="t-Body-contentInner">
                        <div className="padding-right-ar padding-breadcrumb" style={{textAlign:'start'}}>
                            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home"/></span>
                                {this.props.globals.language === 'en' ?
                                <span>&nbsp;\&nbsp;&nbsp;</span>: 
                                <span>&nbsp;/&nbsp;&nbsp;</span>
                                }
                            </Link>
                            <span style={{ fontSize: 15, fontWeight: 'bold' }}>{this.props.deliveryPolicy.title}</span>
                        </div>
                        <div className="container">
                            <div className="row">
                                <div className="col col-12 apex-col-auto">
                                    <div
                                        className="t-Region g-wrapper-main_content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody"
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
                                                        <h1 className="t-page-titles static-page-style">{this.props.deliveryPolicy.title}</h1>
                                                    </p>
                                                    <div
                                                        className="staticPagesText"
                                                        dangerouslySetInnerHTML={{ __html: this.props.deliveryPolicy.content }}
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
                    </div>}
                
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        deliveryPolicy : state.static.deliverypolicydata,
		spinnerProduct: state.spinner.loading,
		globals:state.global
    };
}
const mapDispatchToProps = dispatch => {
	return {
		onGetDeliveryPolicyData: (payload) => dispatch(actions.getDeliveyPolicyAPIData(payload)),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(DeliveryPolicy);

