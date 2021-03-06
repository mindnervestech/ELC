import React, { Component } from 'react';
import MapContainer from './Map';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import * as util from '../../utility/utility';
import { Link, Redirect } from 'react-router-dom';
import '../../../../styles/contactus/contactus.css';
import PhoneNumber from '../../Login/IntlTelePhone';
import './ContactUs.css';

import facebook from '../../../../assets/images/social/Facebook.svg';
import instagram from '../../../../assets/images/social/instagram.svg';
import youtube from '../../../../assets/images/social/youtube.svg';
import twitter from '../../../../assets/images/social/twitter.svg';
import { Helmet } from 'react-helmet';

class ContactUs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contact_fields: {
                name: '',
                email: '',
                phone: '',
                purpose: '',
                carrierCode: '',
                comment: '',
            },
            customerService: '',
            isPhoneValid: false,
            invalidPhone: '',
            comment_count: 0,
            errors: {},
            search: this.props.search ? true : false,
            showErrorBox: this.props.search ? true : false,
        }
    }

    handleValidation = () => {
        let fields = this.state.contact_fields;
        let errors = {};
        let formIsValid = true;
        if (!fields["name"]) {
            formIsValid = false;
            errors["name"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage="Please enter first name." />;
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
        let fields = this.state.contact_fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }

    changeCustomerServiceNumber = () => {
        const currentStore = this.props.store_id;
        const country = this.props.country;
        // if(country === 'UAE' || country === 'uae'){
        //     this.setState({
        //         customerService: '8005654',
        //     })
        // } else if(country === 'KSA' || country === 'ksa'){
        //     this.setState({
        //         customerService: '8001180009',
        //     })
        // }
    }

    closeErrorBox = () => {
        this.setState({
            showErrorBox: false
        })
    }
    clearContactState = () => {
        this.setState({
            ...this.state,
            contact_fields: {
                name: '',
                email: '',
                phone: '',
                purpose: '',
                carrierCode: '',
                comment: '',
            },
        }, () => {
            this.props.onClearContactUsResponse();
        })
    }

    componentWillMount() {
        this.props.onGetContactUsData({ storeId: this.props.store_id });
       
    }

    componentDidUpdate(prevProps) {
        if (this.props.store_id !== prevProps.store_id) {
            this.props.onGetContactUsData({ storeId: this.props.store_id });
           
        }
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.country === 'UAE' || nextProps.country === 'uae' && nextProps.contact_data.page_data.contactnumber_uae !== undefined) {


            this.setState({
                customerService: nextProps.contact_data.page_data.contactnumber_uae,
            })
        } else if (nextProps.country === 'KSA' || nextProps.country === 'ksa' && nextProps.contact_data.page_data.contactnumber_ksa !== undefined) {

            this.setState({
                customerService: nextProps.contact_data.page_data.contactnumber_ksa,
            })
        }
        else {
            this.setState({
                customerService: nextProps.contact_data.page_data.contactnumber_int,
            })
        }
    }
    contactNumber = (status, value, countryData, number, id) => {

        if (status) {
            let fields = this.state.contact_fields;
            fields['phone'] = value;
            fields['carrierCode'] = countryData.dialCode;
            this.setState({ fields, isPhoneValid: true });
        } else {
            this.setState({ isPhoneValid: false })
        }
    }

    handleFormSubmit = () => {
        if (this.handleValidation()) {
            let data = {
                name: this.state.contact_fields['name'],
                email: this.state.contact_fields['email'],
                phoneNumber: parseInt(this.state.contact_fields['phone']),
                carrier_code: this.state.contact_fields['carrierCode'],
                purpose: this.state.contact_fields['purpose'],
                comment: this.state.contact_fields['comment'],
                storeId: this.props.store_id,
            }
            this.props.onSaveContactUsData({ ...data });
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
        const language = localStorage.getItem('templang');
        let store_locale = this.props.globals.store_locale

        let title = "Contact us | ELC UAE Online store";
        let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
        let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
        if (language == 'ar') {
            title = "إتصل بنا  |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
            description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
            keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية"; 
        }
    
        let meta_tag  = <><Helmet>
            <meta name="tital" content={title} />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
        </Helmet></>;
    
        const errorsObj = this.state.errors;
        let errorBox = null;
        if (this.state.search && this.state.showErrorBox) {
            let searchWord = this.props.searchWord;
            errorBox = <div className="alertify"><div className="dialog"><div>
                <p className="msg"><FormattedMessage id="help.searchtext1" defaultMessage="Sorry, We couldn’t find any result Matching with" />;  {searchWord} .
            <FormattedMessage id="help.searchtext2" defaultMessage="You can submit your Question and Our Customer Service Team will contact you soon.!!" /></p><nav><button className="ok" tabIndex={1} onClick={this.closeErrorBox}><FormattedMessage id="Ok.text" defaultMessage="Ok" /></button></nav></div></div></div>
        }
        let contact_number = this.props.contact_data.page_data.contactnumber_ksa;
        if (this.props.country === 'KSA') {
            contact_number = this.props.contact_data.page_data.contactnumber_ksa;
        } else if (this.props.country === 'UAE') {
            contact_number = this.props.contact_data.page_data.contactnumber_uae;
        } else if (this.props.country === 'International') {
            contact_number = this.props.contact_data.page_data.contactnumber_int;
        }
        let respo_message = null;
        let success_check = this.props.contact_data.save_responce;
        if (!util.emptyObj(success_check)) {
            if (this.props.contact_data.save_responce.status) {
                respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                    <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                        <div className="t-Alert-wrap">
                            <div className="t-Alert-icon">
                                <span className="t-Icon" />
                            </div>
                            <div className="t-Alert-content">
                                <div className="t-Alert-header">
                                    <h2 className="t-Alert-title"><FormattedMessage id="ContactUs.Content" defaultMessage="Thank you for contacting us. appropriate action will be taken by our customer care representative." /></h2>
                                </div>
                            </div>
                            <div className="t-Alert-buttons">
                                <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.clearContactState}><span className="t-Icon icon-close" /></button>
                            </div>
                        </div>
                    </div>
                </div></span>;
            }
        }

        return (
            <>
                {errorBox}
                <div className="t-Body">
                    {meta_tag}
                    <div className="t-Body-main" style={{ marginTop: '0px !important' }}>
                        <div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
                        </div>
                        <div className="t-Body-content" id="t_Body_content">
                            <div id="t_Body_content_offset" style={{ height: '1px' }} />
                            {respo_message}
                            <div className="t-Body-contentInner">
                                <div className="padding-right-ar padding-breadcrumb" style={{textAlign:'start'}}>
                                    <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                        <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                                        {this.props.globals.language === 'en' ?
                                        <span>&nbsp;\&nbsp;&nbsp;</span>: 
                                        <span>&nbsp;/&nbsp;&nbsp;</span>
                                        }
                                    </Link>
                                    <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="ContactUs.Title" defaultMessage="Contact Us" /></span>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col col-12 apex-col-auto">
                                            <div className="t-Region g-wrapper-main_content  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R715188865100792743">
                                                <div className="t-Region-header">
                                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                        <h2 className="t-Region-title" id="R715188865100792743_heading"><FormattedMessage id="ContactUs.Title" defaultMessage="Contact Us" /></h2>
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
                                                            <h1 className="t-page-titles static-page-style"> <FormattedMessage id="ContactUs.Title" defaultMessage="Contact Us" /></h1>
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
                                                                                <h2 className="t-Region-title" id="R715189021347792744_heading"><span className="paddingStyle"><FormattedMessage id="Wite.Text" defaultMessage="WRITE TO US" /></span></h2>
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
                                                                                    <div className="row">
                                                                                        <div className="col col-12 apex-col-auto">
                                                                                            <div id="R715189986681792754" >
                                                                                                <div style={{ paddingLeft: 15 }} className="paddingRight-ar"> <br />
                                                                                                    <h2 className="t-Region-title"> <FormattedMessage id="Wite.Text" defaultMessage="WRITE TO US" /></h2>
                                                                                                </div>
                                                                                                <br />
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <div className="row">
                                                                                        <div className="col col-12 apex-col-auto">
                                                                                            <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow t-Form--slimPadding t-Form--large t-Form--stretchInputs t-Form--labelsAbove" id="R1009415282768434614">
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
                                                                                                                            <label htmlFor="P14_NAME" id="P14_NAME_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.Name" defaultMessage="Your Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                        </div>
                                                                                                                        <div className="t-Form-inputContainer">
                                                                                                                            <div className="t-Form-itemWrapper">
                                                                                                                                <input type="text" id="P14_NAME" name="P14_NAME" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "name")} value={this.state.contact_fields["name"]} />
                                                                                                                            </div>
                                                                                                                            <span id="P14_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                {errorsObj["name"]}
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
                                                                                                                                <input type="email" id="P14_EMAIL" name="P14_EMAIL" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "email")} value={this.state.contact_fields["email"]} />
                                                                                                                            </div>
                                                                                                                            <span id="P14_EMAIL_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                {errorsObj["email"]}
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div><input type="hidden" id="P14_RESPONSE" name="P14_RESPONSE" defaultValue />
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row">
                                                                                                                <div className="mob-width col col-6 apex-col-auto width-full padd-right-div width-full-desk">
                                                                                                                    <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper js-show-label marginForContactDroupDown" id="PHONE_CONTAINER">
                                                                                                                        <div className="t-Form-labelContainer">

                                                                                                                            <label htmlFor="PHONE" id="PHONE_LABEL" className="t-Form-label">
                                                                                                                                <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                                                                        </div>
                                                                                                                        <div id="ph" className="t-Form-inputContainer phoneNumber-type">
                                                                                                                            <PhoneNumber changed={this.contactNumber} />
                                                                                                                            <span id="PHONE_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                                                                                {errorsObj["phone"]}
                                                                                                                            </span>
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                                <div className="col col-6 apex-col-auto order-bg mob-width width-full-desk">
                                                                                                                    <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P14_PURPOSE_CONTAINER">
                                                                                                                        <div className="t-Form-labelContainer">
                                                                                                                            <label htmlFor="P14_PURPOSE" id="P14_PURPOSE_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.Purpose" defaultMessage="Purpose" /></label>
                                                                                                                        </div>
                                                                                                                        <div className="t-Form-inputContainer">
                                                                                                                            <div className="t-Form-itemWrapper">
                                                                                                                                <select
                                                                                                                                    id="P14_PURPOSE"
                                                                                                                                    name="P14_PURPOSE"
                                                                                                                                    className="selectlist apex-item-select"
                                                                                                                                    size={1}
                                                                                                                                    onChange={this.handleChange.bind(this, "purpose")}
                                                                                                                                    value={this.state.contact_fields["purpose"]}>
                                                                                                                                    <FormattedMessage id="ContactUs.customerSerivces" defaultMessage="Customer Service">{(translatedText) => <option value="customer_services">{translatedText}</option>}</FormattedMessage>
                                                                                                                                    <FormattedMessage id="ContactUs.Deliveries" defaultMessage="Deliveries">{(translatedText) => <option value="deliveries">{translatedText}</option>}</FormattedMessage>
                                                                                                                                    <FormattedMessage id="ContactUs.General" defaultMessage="General">{(translatedText) => <option value="genral_enq">{translatedText}</option>}</FormattedMessage>
                                                                                                                                    <FormattedMessage id="ContactUs.order" defaultMessage="Orders">{(translatedText) => <option value="order">{translatedText}</option>}</FormattedMessage>
                                                                                                                                    <FormattedMessage id="ContactUs.payment" defaultMessage="Payment">{(translatedText) => <option value="payment">{translatedText}</option>}</FormattedMessage>
                                                                                                                                    <FormattedMessage id="ContactUs.returns" defaultMessage="Returns">{(translatedText) => <option value="returns">{translatedText}</option>}</FormattedMessage>
                                                                                                                                    <FormattedMessage id="ContactUs.stores" defaultMessage="Stores">{(translatedText) => <option value="stores">{translatedText}</option>}</FormattedMessage>
                                                                                                                                </select></div><span id="P14_PURPOSE_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row">
                                                                                                                <div className="col col-12 apex-col-auto">
                                                                                                                    <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--textarea js-show-label" id="P14_COMMENT_CONTAINER">
                                                                                                                        <div className="t-Form-labelContainer">
                                                                                                                            <label htmlFor="P14_COMMENT" id="P14_COMMENT_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.comment" defaultMessage="Your comment" /></label>
                                                                                                                        </div>
                                                                                                                        <div className="t-Form-inputContainer">
                                                                                                                            <div className="t-Form-itemWrapper">
                                                                                                                                <div className="apex-item-group apex-item-group--textarea" role="group" aria-labelledby="P14_COMMENT_LABEL" tabIndex={-1}>
                                                                                                                                    <FormattedMessage id="ContactUs.comment" defaultMessage="Your comment">{(message) => <textarea name="P14_COMMENT" rows={5} cols={2000} maxLength={2000} wrap="virtual" id="P14_COMMENT" placeholder={message} className="textarea apex-item-textarea" style={{ resize: 'both', color: 'rgb(0, 0, 0)', backgroundColor: '#fff', border: "solid 1px #b1b1b1" }} onChange={this.handleChange.bind(this, "comment")} value={this.state.contact_fields["comment"]} />}</FormattedMessage>
                                                                                                                                    <div id="P14_COMMENT_CHAR_COUNT" style={{ color: 'rgb(0, 0, 0)', display: 'none' }} className="apex-item-textarea-counter"><span id="P14_COMMENT_CHAR_COUNTER" className="apex-item-textarea-counter--length">{this.state.comment_count}</span> of
                                                                                                                                        <span className="apex-item-textarea-counter--size">2000</span>
                                                                                                                                    </div>
                                                                                                                                </div>
                                                                                                                            </div><span id="P14_COMMENT_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                                                                        </div>
                                                                                                                    </div>
                                                                                                                </div>
                                                                                                            </div>
                                                                                                            <div className="row">
                                                                                                                <div className="col col-12 apex-col-auto">
                                                                                                                    <button onClick={this.handleFormSubmit} className="t-Button t-Button--hot t-Button--stretch" type="button" id="B28610916249643373">
                                                                                                                        <span className="t-Button-label"><FormattedMessage id="Submit.Text" defaultMessage="Submit" /></span>
                                                                                                                    </button>
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
                                                                                <div className="col col-12 apex-col-auto">
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
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        contact_data: state.contact,
        store_id: state.global.currentStore,
        country: state.global.country,
        globals: state.global
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetContactUsData: (payload) => dispatch(actions.getContactUsData(payload)),
        onSaveContactUsData: (payload) => dispatch(actions.saveContactUsData(payload)),
        onClearContactUsResponse: () => dispatch(actions.clearContactUsResponse()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);
