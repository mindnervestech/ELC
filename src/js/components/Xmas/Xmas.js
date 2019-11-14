import React, { component, Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import './Xmas.css'
import { FormattedMessage } from 'react-intl';
import * as util from '../utility/utility';
import '../../../styles/contactus/contactus.css';
import PhoneNumber from '../Login/IntlTelePhone';
import '../StaticPages/ContactUs/ContactUs.css';
//import facebook from '../../../assets/images/social/facebook.svg';
import facebook from '../../../assets/images/social/Facebook.svg';
import twitter from '../../../assets/images/social/twitter.svg';
import instagram from '../../../assets/images/social/instagram.svg';
import youtube from '../../../assets/images/social/youtube.svg'
import { Helmet } from 'react-helmet';
import XmasImage from '../../../assets/images/Xmas/Xmas.jpg';


const wait = require('../../../assets/images/wait.gif');
class Xmas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            xmas_fields: {
                firstname: '',
                lastname: '',
                transaction_no: '',
                email: '',
                phone: '',
                carrierCode: '',
                showAlert: false

            },
            resFlag: false,
            xmas_message: '',
            isPhoneValid: false,
            invalidPhone: '',
            comment_count: 0,
            errors: {},
            search: this.props.search ? true : false,
            showErrorBox: this.props.search ? true : false,
        }

    }
    handleValidation = () => {
        let fields = this.state.xmas_fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["firstname"]) {
            formIsValid = false;
            errors["firstname"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage="Please enter first name." />;
        }
        if (typeof fields["firstname"] !== "undefined") {
            if (!fields["firstname"].match(/^[a-zA-Z]+$/) && fields["firstname"].length > 0) {
                formIsValid = false;
                errors["firstname"] = <FormattedMessage id="Signup.validation.lastName.onlyletters" defaultMessage="Please enter only letters" />;
            }
        }
        if (typeof fields["lastname"] !== "undefined") {
            if (!fields["lastname"].match(/^[a-zA-Z]+$/) && fields["lastname"].length > 0) {
                formIsValid = false;
                errors["lastname"] = <FormattedMessage id="Signup.validation.lastName.onlyletters" defaultMessage="Please enter only letters" />;
            }
        }
        if (!fields["lastname"]) {
            formIsValid = false;
            errors["lastname"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Please enter last name" />;
        }

        if (!fields["transaction_no"]) {
            formIsValid = false;
            errors["transaction_no"] = <FormattedMessage id="transaction_no.empty" defaultMessage="Please enter transaction number" />;
        }
        //Email
        if (typeof fields["email"] !== "undefined") {

            if (fields["email"].length === 0) {
                formIsValid = false;
                errors["email"] = <FormattedMessage id="Signup.validation.email.empty" defaultMessage="Please enter email" />;
            }

            if (fields["email"].length > 0) {
                let lastAtPos = fields["email"].lastIndexOf('@');
                let lastDotPos = fields["email"].lastIndexOf('.');
                if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2) || (fields["email"].includes(' '))) {
                    formIsValid = false;
                    errors["email"] = <FormattedMessage id="Signup.validation.email.invalid" defaultMessage="Please enter email in valid format" />;
                }
            }
        }
        if (!(this.state.isPhoneValid)) {
            if (fields["phone"].length === 0) {
                formIsValid = false;
                errors["phone"] = <FormattedMessage id="Signup.validation.contactNumber.empty" defaultMessage="Please enter contact number" />;
            }
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleChange = (field, e) => {
        let fields = this.state.xmas_fields;
        fields[field] = e.target.value;
        this.setState({ fields });

    }



    closeErrorBox = () => {
        this.setState({
            showErrorBox: false
        })
    }
    clearXmasDataState = () => {
        this.setState({
            ...this.state,
            xmas_fields: {
                firstname: '',
                lastname: '',
                transaction_no: '',
                email: '',
                phone: '',
                carrierCode: '',

            }
        })

    }
    changeCustomerServiceNumber = () => {
        const currentStore = this.props.store_id;
        const country = this.props.country;
        if (country === 'UAE' || country === 'uae') {
            this.setState({
                customerService: '8005654',
            })
        } else if (country === 'KSA' || country === 'ksa') {
            this.setState({
                customerService: '8001180009',
            })
        }
    }

    componentDidMount() {
        this.props.onGetContactUsData({ storeId: this.props.store_id });
        this.changeCustomerServiceNumber();
    }

    componentDidUpdate(prevProps) {
        if (this.props.store_id !== prevProps.store_id) {
            this.props.onGetContactUsData({ storeId: this.props.store_id });
            this.changeCustomerServiceNumber();
        }
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps.xmasRes.xmas_page_response) {

            this.setState({ showAlert: true })
            setTimeout(() => {
                this.closeAlert()
            }, 2000);
        }


    }
    closeAlert = () => {
        this.setState({ showAlert: false, resFlag: false });
        this.clearXmasDataState();
        this.props.onClearXmasResponse();
    }

    contactNumber = (status, value, countryData, number, id) => {

        if (status) {
            let fields = this.state.xmas_fields;
            fields['phone'] = value;
            fields['carrierCode'] = countryData.dialCode;
            this.setState({ fields, isPhoneValid: true });
        } else {
            this.setState({ isPhoneValid: false })
        }
    }

    handleFormSubmit = () => {

        if (this.handleValidation()) {
            this.setState({ resFlag: true })
            let data = {
                firstName: this.state.xmas_fields['firstname'],
                lastName: this.state.xmas_fields['lastname'],
                email: this.state.xmas_fields['email'],
                carrierCode: this.state.xmas_fields['carrierCode'],
                phoneNumber: parseInt(this.state.xmas_fields['phone']),
                transactionId: this.state.xmas_fields['transaction_no'],
                store_id: this.props.globals.currentStore
            }
            this.props.onSaveXmasPageData({ ...data });
        }
    }

    divOnFocus = (e) => {
        e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
    }

    divOnBlure = (e) => {
        if ((e.target.value == null) || (e.target.value == '')) {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field';
        } else {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
        }
    }



    render() {
        let store_locale = this.props.globals.store_locale
        const errorsObj = this.state.errors;

        // let errorBox = null;
        // if (this.state.search && this.state.showErrorBox) {
        //     let searchWord = this.props.searchWord;
        //     errorBox = <div className="alertify"><div className="dialog"><div>
        //         <p className="msg"><FormattedMessage id="help.searchtext1" defaultMessage="Sorry, We couldn’t find any result Matching with" />;  {searchWord} .
        //     <FormattedMessage id="help.searchtext2" defaultMessage="You can submit your Question and Our Customer Service Team will contact you soon.!!" /></p><nav><button className="ok" tabIndex={1} onClick={this.closeErrorBox}><FormattedMessage id="Ok.text" defaultMessage="Ok" /></button></nav></div></div></div>
        // }
        let contact_number = this.props.contact_data.page_data.contactnumber_ksa;
        if (this.props.country === 'KSA') {
            contact_number = this.props.contact_data.page_data.contactnumber_ksa;
        } else if (this.props.country === 'UAE') {
            contact_number = this.props.contact_data.page_data.contactnumber_uae;
        } else if (this.props.country === 'International') {
            contact_number = this.props.contact_data.page_data.contactnumber_int;
        }

        //     if (this.props.xmasRes.xmas_page_response.message!=undefined && this.props.xmasRes.message=="") {
        //         this.setState({ xmas_message: this.props.xmasRes.message, showAlert: true, })
        //         setTimeout(() => {
        //             this.closeAlert();
        //         }, 5000);
        // }
        let respo_message = null;
        let success_check = this.props.xmasRes.xmas_page_response;

        if (!util.emptyObj(success_check)) {


            if (this.props.xmasRes.xmas_page_response) {
                if (this.state.showAlert) {
                    respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                        <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                            <div className="t-Alert-wrap">
                                <div className="t-Alert-icon">
                                    <span className="t-Icon" />
                                </div>
                                <div className="t-Alert-content">
                                    <div className="t-Alert-header">
                                        <h2 className="t-Alert-title">{this.props.xmasRes.xmas_page_response.message}</h2>
                                    </div>
                                </div>
                                <div className="t-Alert-buttons">
                                    <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={() => this.closeAlert()}><span className="t-Icon icon-close" /></button>
                                </div>
                            </div>
                        </div>
                    </div></span>;
                }
            }
        }

        return (
            <>
                <Row>

                </Row>
                <Row>
                    <Col xs={2} md={3} lg={3}>&nbsp;</Col>
                    <Col xs={12} md={12} lg={12}>
                        <div>

                        </div>
                        <div className="t-Body">

                            <div className="t-Body-main" style={{ marginTop: '0px !important' }}>
                                <div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
                                </div>
                                <div className="t-Body-content" id="t_Body_content">
                                    <div id="t_Body_content_offset" style={{ height: '1px' }} />
                                    {respo_message}
                                    <div className="t-Body-contentInner">
                                        <div className="padding-right-ar padding-breadcrumb" style={{ textAlign: 'start' }}>
                                            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                                <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                                                {this.props.globals.language === 'en' ?
                                                    <span>&nbsp;\&nbsp;&nbsp;</span> :
                                                    <span>&nbsp;/&nbsp;&nbsp;</span>
                                                }
                                            </Link>
                                            <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="XmasSantaSack.Title" defaultMessage="Xmas Santa Sack" /></span>
                                        </div>
                                        <div className="container">
                                            <div className="row">
                                                <div className="col col-12">
                                                    <div>
                                                        <img src={XmasImage} className="xmasImage" />
                                                    </div>

                                                    <div className="col col-12 apex-col-auto">
                                                        <div className="t-Region g-wrapper-main_content  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R715188865100792743">
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h2 className="t-Region-title" id="R715188865100792743_heading"><FormattedMessage id="XmasSantaSack.Title" defaultMessage="Xmas Santa Sack" /></h2>
                                                                </div>
                                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                            </div>
                                                            <div className="t-Region-bodyWrap">
                                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                                <div className="t-Region-body" >
                                                                    <input type="hidden" id="MIS" name="MIS" defaultValue />
                                                                    <center> <br />
                                                                        <h1 className="t-page-titles static-page-style"> <FormattedMessage id="XmasSantaSack.Title" defaultMessage="Xmas Santa Sack" /></h1>
                                                                    </center>
                                                                    <br />
                                                                    <br />
                                                                    <div className="container">
                                                                        <div className="row">
                                                                            <div className="col col-6 apex-col-auto colclass padd-zero-mob">
                                                                                <div className="t-Region t-Region--removeHeader t-Region--accent14 t-Region--noBorder t-Region--scrollBody margin-left-lg margin-right-lg" id="R715189021347792744">
                                                                                    <div className="t-Region-header">
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>

                                                                                        </div>
                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                    </div>
                                                                                    <div className="t-Region-bodyWrap">
                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                        <div className="t-Region-body">
                                                                                            <div className="container padd-zero-mo" style={{ overflow: 'hidden' }}>
                                                                                                {/* <div className="row">
                                                                                <div className="col col-12 apex-col-auto">
                                                                                    <div id="R715189986681792754" >
                                                                                        <div style={{ paddingLeft: 15 }} className="paddingRight-ar"> <br />
                                                                                            <h2 className="t-Region-title"> <FormattedMessage id="Wite.Text" defaultMessage="WRITE TO US" /></h2>
                                                                                        </div>
                                                                                        <br />
                                                                                    </div>
                                                                                </div>
                                                                            </div> */}
                                                                                                <div className="row">
                                                                                                    <div className="col col-12 apex-col-auto">
                                                                                                        <div style={{ border: 'none' }} className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow t-Form--slimPadding t-Form--large t-Form--stretchInputs t-Form--labelsAbove" id="R1009415282768434614">
                                                                                                            <div className="t-Region-header">
                                                                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                                                    <h2 className="t-Region-title" id="R1009415282768434614_heading"><FormattedMessage id="Wite.Text" defaultMessage="WRITE TO US" /></h2>
                                                                                                                </div>
                                                                                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                                            </div>
                                                                                                            <div className="t-Region-bodyWrap">
                                                                                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                                                                                    <div className="t-Region-buttons-left" />
                                                                                                                    <div className="t-Region-buttons-right" />
                                                                                                                </div>
                                                                                                                <div className="t-Region-body" id="with">
                                                                                                                    <div className="container">
                                                                                                                        <div className="row">
                                                                                                                            <div className="col col-12 apex-col-auto ">
                                                                                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field"
                                                                                                                                    id="P14_NAME_CONTAINER" onFocus={(e) => this.divOnFocus(e)} onBlur={(e) => this.divOnBlure(e)}>
                                                                                                                                    <div className="t-Form-labelContainer">
                                                                                                                                        <label htmlFor="P14_NAME" id="P14_NAME_LABEL" className="t-Form-label"><FormattedMessage id="Xmas.FirtsName" defaultMessage="First Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                                    </div>
                                                                                                                                    <div className="t-Form-inputContainer">
                                                                                                                                        <div className="t-Form-itemWrapper">
                                                                                                                                            <input type="text" id="P14_NAME" name="P14_NAME" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "firstname")} value={this.state.xmas_fields["firstname"]} />
                                                                                                                                        </div>
                                                                                                                                        <span id="P14_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                            {errorsObj["firstname"]}
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="row">
                                                                                                                            <div className="col col-12 apex-col-auto ">
                                                                                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field"
                                                                                                                                    id="P14_NAME_CONTAINER" onFocus={(e) => this.divOnFocus(e)} onBlur={(e) => this.divOnBlure(e)}>
                                                                                                                                    <div className="t-Form-labelContainer">
                                                                                                                                        <label htmlFor="P14_NAME" id="P14_NAME_LABEL" className="t-Form-label"><FormattedMessage id="Xmas.LastName" defaultMessage="Last Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                                    </div>
                                                                                                                                    <div className="t-Form-inputContainer">
                                                                                                                                        <div className="t-Form-itemWrapper">
                                                                                                                                            <input type="text" id="P14_NAME" name="P14_NAME" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "lastname")} value={this.state.xmas_fields["lastname"]} />
                                                                                                                                        </div>
                                                                                                                                        <span id="P14_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                            {errorsObj["lastname"]}
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="row">
                                                                                                                            <div className="col col-12 apex-col-auto ">
                                                                                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field"
                                                                                                                                    id="P14_NAME_CONTAINER" onFocus={(e) => this.divOnFocus(e)} onBlur={(e) => this.divOnBlure(e)}>
                                                                                                                                    <div className="t-Form-labelContainer">
                                                                                                                                        <label htmlFor="P14_NAME" id="P14_NAME_LABEL" className="t-Form-label"><FormattedMessage id="Xmas.TransactionNo" defaultMessage="Transaction No" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                                    </div>
                                                                                                                                    <div className="t-Form-inputContainer">
                                                                                                                                        <div className="t-Form-itemWrapper">
                                                                                                                                            <input type="text" id="P14_NAME" name="P14_NAME" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "transaction_no")} value={this.state.xmas_fields["transaction_no"]} />
                                                                                                                                        </div>
                                                                                                                                        <span id="P14_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                            {errorsObj["transaction_no"]}
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="row">
                                                                                                                            <div className="col col-12 apex-col-auto">
                                                                                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field"
                                                                                                                                    id="P14_EMAIL_CONTAINER" onFocus={(e) => this.divOnFocus(e)} onBlur={(e) => this.divOnBlure(e)}>
                                                                                                                                    <div className="t-Form-labelContainer">
                                                                                                                                        <label htmlFor="P14_EMAIL" id="P14_EMAIL_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.Email" defaultMessage="Email Address" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                                    </div>
                                                                                                                                    <div className="t-Form-inputContainer">
                                                                                                                                        <div className="t-Form-itemWrapper">
                                                                                                                                            <input type="email" id="P14_EMAIL" name="P14_EMAIL" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "email")} value={this.state.xmas_fields["email"]} />
                                                                                                                                        </div>
                                                                                                                                        <span id="P14_EMAIL_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                            {errorsObj["email"]}
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div><input type="hidden" id="P14_RESPONSE" name="P14_RESPONSE" defaultValue />
                                                                                                                            </div>
                                                                                                                        </div>
                                                                                                                        <div className="row">
                                                                                                                            <div className="col col-12 apex-col-auto">
                                                                                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper js-show-label marginForContactDroupDown" id="PHONE_CONTAINER">
                                                                                                                                    <div className="t-Form-labelContainer">

                                                                                                                                        <label htmlFor="PHONE" id="PHONE_LABEL" className="t-Form-label">
                                                                                                                                            <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                                    </div>
                                                                                                                                    <div id="xmas-ph" className="t-Form-inputContainer phoneNumber-type" style={{ overflow: 'visible' }}>
                                                                                                                                        <PhoneNumber changed={this.contactNumber} />
                                                                                                                                        <span id="PHONE_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                            {errorsObj["phone"]}
                                                                                                                                        </span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div>

                                                                                                                        </div>

                                                                                                                        <div className="row">
                                                                                                                            <div className="col col-12 apex-col-auto">
                                                                                                                                {this.state.resFlag ?
                                                                                                                                    <button className="t-Button t-Button--hot t-Button--stretch"  type="button" disabled={true}>
                                                                                                                                        <img src={wait} style={{ width: 25, height: 20, marginTop: -4 }} alt="" />
                                                                                                                                        <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                                                                                                                    </button> :

                                                                                                                                    <button onClick={this.handleFormSubmit} className="t-Button t-Button--hot t-Button--stretch" type="button" id="B28610916249643373">
                                                                                                                                        <span className="t-Button-label"><FormattedMessage id="Submit.Text" defaultMessage="Submit" /></span>
                                                                                                                                    </button>}
                                                                                                                            </div>
                                                                                                                        </div>
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
                                                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                                            <div className="t-Region-buttons-left" />
                                                                                            <div className="t-Region-buttons-right" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col col-6 apex-col-auto colclass padd-zero-mob">
                                                                                <div id="R715189055843792745" className="margin-left-lg">
                                                                                    <div className="container">
                                                                                        <div className="row">
                                                                                            <div className="col col-12 apex-col-auto" style={{ marginTop: 15 }}>
                                                                                                <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="R715189275227792747">
                                                                                                    <div className="t-Region-header">
                                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                                            <h2 className="t-Region-title" id="R715189275227792747_heading"><FormattedMessage id="ContactUs.DirectText" defaultMessage="DIRECT CONTACT" />
                                                                                                            </h2>
                                                                                                        </div>
                                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                                    </div>
                                                                                                    <div className="t-Region-bodyWrap">
                                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                                            <div className="t-Region-buttons-left" />
                                                                                                            <div className="t-Region-buttons-right" />
                                                                                                        </div>
                                                                                                        <div className="t-Region-body">
                                                                                                            <div className="chat" styles={{ color: "green!important" }}>
                                                                                                                <i className="fa fa-phone" /><a className="js-ga-tracking" data-ga-category="Contact Us" data-ga-action="click" data-ga-label="Telephone" href={`tel:${this.state.customerService}`}>{this.state.customerService}</a>
                                                                                                                <br />
                                                                                                                <br />
                                                                                                                <i className="far fa-envelope" /> <a className="js-ga-tracking" data-ga-category="Contact Us" data-ga-action="click" data-ga-label="Email" href="mailto:help@elctoys.com">help@elctoys.com</a>
                                                                                                                <br />
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
                                                                                        <div className="row">
                                                                                            <div className="col col-12 apex-col-auto">
                                                                                                <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="R715189380040792748">
                                                                                                    <div className="t-Region-header">
                                                                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                                                            <h2 className="t-Region-title" id="R715189380040792748_heading"><FormattedMessage id="ContactUs.SocialMedia" defaultMessage="SOCIAL MEDIA" />
                                                                                                            </h2>
                                                                                                        </div>
                                                                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                                                                    </div>
                                                                                                    <div className="t-Region-bodyWrap">
                                                                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                                                                            <div className="t-Region-buttons-left" />
                                                                                                            <div className="t-Region-buttons-right" />
                                                                                                        </div>
                                                                                                        <div className="t-Region-body">
                                                                                                            <div id="remove-line">
                                                                                                                <a href="https://www.facebook.com/elctoys" target="_blank"><img src={facebook} className="icon ft-icon"></img></a>
                                                                                                                <a href="https://www.twitter.com/elctoysme" target="_blank"><img src={twitter} className="icon ft-icon"></img></a>
                                                                                                                <a href="https://www.instagram.com/elctoys" target="_blank"> <img src={instagram} className="icon ft-icon"></img></a>
                                                                                                                <a href="https://www.youtube.com/elctoysme" target="_blank"><img src={youtube} className="icon ft-icon"></img></a>
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
                                                                            </div>
                                                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={2} md={3} lg={3}>&nbsp;</Col>
                </Row>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        contact_data: state.contact,
        store_id: state.global.currentStore,
        country: state.global.country,
        globals: state.global,
        xmasRes: state.xmas,

    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetContactUsData: (payload) => dispatch(actions.getContactUsData(payload)),
        onSaveXmasPageData: (payload) => dispatch(actions.setXmasPageData(payload)),
        onClearXmasResponse: () => dispatch(actions.clearXmasResponse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Xmas);
