import React, { Component } from 'react';
import '../../../../styles/StaticPages.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import * as actions from '../../../redux/actions/index';
import Spinner from '../../Spinner/Spinner.js'
import { Helmet } from 'react-helmet';

class TermConditions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeId: '',
        };
    }
    static getDerivedStateFromProps = (props, state) => { };

    componentDidMount() {
        this.props.onGetTermConditionsData({ storeId: this.props.globals.currentStore });
    }

    render() {
        const language = localStorage.getItem('templang');
        let store_locale = this.props.globals.store_locale
        let title = "Our TCs | ELC UAE Online store";
        let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
        let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
        if (language == 'ar') {
            title = "الشروط والأحكام |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
            description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
            keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية";
        }

        let meta_tag = <><Helmet>
            <meta name="tital" content={title} />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
        </Helmet></>;

        return (
            <>
                {this.props.spinnerProduct ?
                    <Spinner /> :
                    <div className="t-Body-contentInner">
                        <div className="padding-right-ar padding-breadcrumb">
                            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                                {this.props.globals.language == 'en' ?
                                    <> <span>&nbsp;\&nbsp;&nbsp;</span> </> :
                                    <> <span>&nbsp;/&nbsp;&nbsp;</span></>
                                }
                            </Link>
                            <span style={{ fontSize: 15, fontWeight: 'bold' }}>{this.props.termConditions.title}</span>
                        </div>
                        <div className="container">
                            {meta_tag}
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
                                                <center> <br />
                                                    <h1 className="t-page-titles static-page-style">{this.props.termConditions.title}</h1>
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
                                                    <div
                                                        className="staticPagesText"
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
                }
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        termConditions: state.static.termConditions,
        spinnerProduct: state.spinner.loading,
        globals: state.global
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetTermConditionsData: (payload) => dispatch(actions.getTermConditionsPageData(payload)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TermConditions);
