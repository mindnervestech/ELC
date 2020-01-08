import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';
import $ from 'jquery'
import { connect } from 'react-redux';
import Axios from 'axios';
import facebook from '../../../../assets/images/social/Facebook.svg';
import instagram from '../../../../assets/images/social/instagram.svg';
import youtube from '../../../../assets/images/social/youtube.svg';
import twitter from '../../../../assets/images/social/twitter.svg';
import whatsapp from '../../../../assets/images/social/whatsapp.png';
import Collapsible from 'react-collapsible';
import { BASE_URL, API_TOKEN } from '../../../api/globals';
import { isMobile } from 'react-device-detect';
const wait = require('../../../../assets/images/wait.gif');

let insiderCount = 0;
let count = 0;
const style = {
    visibility: 'visible',
    opacity: 0.5,
}
class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            showWhatsappOnWeb: true,
            showWhatsappOnMobile: false,
            success: '',
            showAlert: false,
            errorMessage: {},
            loaderState: false
        };

    }
    insiderObject = () => {
        const currentStore = this.props.globals.currentStore;
        let language = 'en';
        if (currentStore == 1 || currentStore == 3) {
            language = 'ar';
        }

        if (this.props.user_details.customer_details.customer_id) {
            window.insider_object = {
                user: {
                    user: this.props.user_details.customer_details.customer_id,

                    name: this.props.user_details.customer_details.firstname,
                    surname: this.props.user_details.customer_details.lastname,
                    email: this.props.user_details.customer_details.email,
                    email_optin: this.props.user_details.customer_details.email ? true : false,
                    phone_number: this.props.user_details.customer_details.phone_number,
                    sms_optin: this.props.user_details.customer_details.phone_number ? true : false,
                    gdpr_optin: true,
                    language: language
                }

            }

        } else {
            window.insider_object = {
                user: {
                    gdpr_optin: false,
                    language: language,
                }
            }
        }
    }


    componentDidUpdate(prevProps) {

        if (this.props.location.pathname != prevProps.location.pathname) {

            this.insiderObject();
            insiderCount = 1;

        }

        if (prevProps.location.pathname == prevProps.location.pathname && count == 0) {

            if (insiderCount === 0) {
                this.insiderObject();
                insiderCount = 1;

            }

        }
    }

    componentDidMount() {
        // const webWhatsapp = document.createElement('script');
        // webWhatsapp.type = 'text/javascript';

        // webWhatsapp.src = "https://cdn.smooch.io/whatsapp/message-us-btn.min.js"
        // const mobileWhatsapp = document.createElement('script');
        // mobileWhatsapp.type = 'text/javascript';

        // mobileWhatsapp.src = "https://cdn.smooch.io/whatsapp/message-us-btn.min.js"
        // document.getElementById("webWhatsapp").appendChild(webWhatsapp);
       

        // if (document.getElementById('webWhatsapp').className === "wa-message-us") {

        // }
        const webWhatsapp = document.createElement('script');
        // webWhatsapp.type = 'text/javascript';

        // webWhatsapp.src = "https://cdn.smooch.io/whatsapp/message-us-btn.min.js"
        // const mobileWhatsapp = document.createElement('script');
        // mobileWhatsapp.type = 'text/javascript';

        // mobileWhatsapp.src = "https://cdn.smooch.io/whatsapp/message-us-btn.min.js"
        // document.getElementById("webWhatsapp").appendChild(webWhatsapp);
       

        // if (document.getElementById('webWhatsapp').className === "wa-message-us") {

        // }

        // if (isMobile) {
        //     document.getElementById("mobileWhatsapp").appendChild(mobileWhatsapp);
        //     if (document.getElementById('mobileWhatsapp').className === "wa-message-us") {

        //     }

        // }

    }
    handleValidation = () => {
        let email = this.state.email;

        let errors = {};
        let formIsValid = true;
        //Email
        if (typeof email !== "undefined") {
            if (email.length === 0) {
                formIsValid = false;
                errors["email"] = (
                    <FormattedMessage
                        id="Signup.validation.email.empty"
                        defaultMessage="Please enter email"
                    />
                );
            }

            if (email.length > 0) {
                let lastAtPos = email.lastIndexOf("@");
                let lastDotPos = email.lastIndexOf(".");
                if (
                    !(
                        lastAtPos < lastDotPos &&
                        lastAtPos > 0 &&
                        email.indexOf("@@") == -1 &&
                        lastDotPos > 2 &&
                        email.length - lastDotPos > 2 &&
                        !email.includes(" ")
                    )
                ) {
                    formIsValid = false;
                    errors['email'] = (
                        <FormattedMessage
                            id="Signup.validation.email.invalid"
                            defaultMessage="Please enter email in valid format"
                        />
                    );
                }
            }
        }

        this.setState({ errors: errors });
        return formIsValid;
    };
    closeAlert = () => {
        this.setState({ showAlert: false, loaderState: false });
    }

    handleChange = (event) => {
        this.setState({ email: event.target.value });
    }

    submitNewsLetter = (event) => {


        if (this.handleValidation()) {
            this.setState({ loaderState: true })

            const data = {
                email: this.state.email,
                store_id: this.props.globals.currentStore
            }
            if (this.state.email) {


                const API = Axios.create({
                    baseURL: BASE_URL,
                    headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
                });

                API.post(`subscribetonewsletter`, { 'email': data.email, 'store_id': data.store_id }).then(res => {

                    this.setState({ email: '', success: res.data.message, showAlert: true, loaderState: false });
                    setTimeout(() => {
                        this.closeAlert()
                    }, 5000);

                });
            }
        }


    };


    render() {


        let errorObj = this.state.errors;
        let store_locale = this.props.globals.store_locale;

        let emailInputField =
            <FormattedMessage id="enteryouremailaddress" defaultMessage="enter your email address">
                {(message) =>
                    <input
                        type="text"
                        placeholder={message}
                        className="email-field"
                        value={this.state.email}
                        onChange={this.handleChange}
                    ></input>}
            </FormattedMessage>

        let emailInputErrorField = null;
        if (errorObj) {
            emailInputErrorField =

                <div><span style={{ color: 'red' }}>{errorObj['email']}</span></div>
        }


        let respo_message = null;

        if (this.state.success && this.state.showAlert) {
            respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                    <div className="t-Alert-wrap">
                        <div className="t-Alert-icon">
                            <span className="t-Icon" />
                        </div>
                        <div className="t-Alert-content">
                            <div className="t-Alert-header">
                                <h2 className="t-Alert-title">{this.state.success}</h2>
                            </div>
                        </div>
                        <div className="t-Alert-buttons">
                            <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.closeAlert} ><span className="t-Icon icon-close" /></button>
                        </div>
                    </div>
                </div>
            </div></span>;

        }



        return (
            <>
                {respo_message}
                <footer className="footer-css">
                    <div className="row footer-line footer-show-web">
                        <div
                            className="col col-4"
                            style={{ textAlign: "start", paddingLeft: "15%" }}
                        >
                            <div className="footer-title">
                                <span>
                                    <FormattedMessage
                                        id="footer.AboutELC"
                                        defaultMessage="About ELC"
                                    />
                                </span>
                            </div>
                            <ul className="text-color">
                                <li>
                                    <Link
                                        to={`/${store_locale}/about-us`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FormattedMessage
                                            id="footer.aboutElc"
                                            defaultMessage="About ELC Toys"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${store_locale}/help-and-faq`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FormattedMessage
                                            id="footer.helpFaqs"
                                            defaultMessage="FAQ"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${store_locale}/contact-us`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FormattedMessage
                                            id="footer.contactUs"
                                            defaultMessage="Contact Us"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to={`/${store_locale}/birth-day-club`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FormattedMessage
                                            id="footer.BirthdayClub"
                                            defaultMessage="Birthday Club"
                                        />
                                    </Link>
                                </li>
                                <li>
                                    <a>
                                        <FormattedMessage
                                            id="footer.Newsletter"
                                            defaultMessage="Newsletter"
                                        />
                                    </a>
                                </li>
                                <li>
                                    <Link
                                        to={`/${store_locale}/charity`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <FormattedMessage
                                            id="footer.Charity"
                                            defaultMessage="Charity"
                                        />
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div className="col col-3" style={{ textAlign: 'start', padding: 0 }}>
                            <div className="footer-title">
                                <span><FormattedMessage id="footer.Legal" defaultMessage="Legal" /></span>
                            </div>
                            <ul className="text-color">
                                <li>
                                    <Link to={`/${store_locale}/terms-and-conditions`} style={{ textDecoration: 'none' }}>
                                        <FormattedMessage id="footer.termsAndConditions" defaultMessage="Terms & Conditions" />
                                    </Link>
                                </li>
                                <li>
                                    <Link to={`/${store_locale}/privacy-policy`} style={{ textDecoration: 'none' }}>
                                        <FormattedMessage id="footer.PrivacyPolicy" defaultMessage="Privacy Policy" />
                                    </Link>
                                </li>
                                <li>
                                    {this.props.globals.store_locale === 'uae-en' || this.props.globals.store_locale === 'en' || this.props.globals.store_locale === 'ar' || this.props.globals.store_locale === 'uae-ar' ?

                                        <a className="hoverclass">
                                            <FormattedMessage
                                                id="footer.ConsumerRights"
                                                defaultMessage="Consumer Rights"
                                            />
                                        </a>

                                        :
                                        <div></div>}

                                </li>
                            </ul>
                        </div>
                        <div className="col col-4" style={{ textAlign: 'start' }}>
                            <div className="footer-title" style={{ marginBottom: 7 }}>
                                <FormattedMessage id="footer.followUsOn" defaultMessage="follow us on" />
                            </div>
                            <div>
                                <a href="https://www.facebook.com/elctoys" target="_blank"><img src={facebook} className="icon" alt=""></img></a>
                                <a href="https://www.twitter.com/elctoysme" target="_blank"><img src={twitter} className="icon" alt=""></img></a>
                                <a href="https://www.instagram.com/elctoys" target="_blank"> <img src={instagram} className="icon" alt=""></img></a>
                                <a href="https://www.youtube.com/elctoysme" target="_blank"><img src={youtube} className="icon" alt=""></img></a>
                            </div>
                            {/* <div id="webWhatsapp" className="wa-message-us whatsapp"
                                number="971543055373"
                                label="Message us on WhatsApp"
                                color="green"
                                size="compact"
                                border_radius="15px">

                            </div> */}
                            <div className="footer-title" style={{ marginTop: 60, marginBottom: 7 }}>

                                <FormattedMessage id="footer.signUpAd" defaultMessage="sign up for our latest news and offers" />

                            </div>
                            <div style={{ display: 'flex' }}>
                                {emailInputField}
                                {/* <input
                  type="text"
                  placeholder="enter your e-mail address"
                  className="email-field"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input> */}
                                {this.state.loaderState ? <button className="submit-button" disabled={true}>
                                    <img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} alt="" />
                                    <span className="t-Button-label"></span>
                                </button> :
                                    <button className="submit-button" onClick={() => this.submitNewsLetter()}>
                                        <FormattedMessage id="Submit.Text" defaultMessage="Submit" />
                                    </button>}

                            </div>
                            <span>{emailInputErrorField}</span>
                        </div>

                    </div>
                    <div className="row footer-bottom footer-show-web">
                        <div className="col col-8" style={{ textAlign: 'start' }}>
                            <div>
                                <FormattedMessage id="footer.text" defaultMessage="� Website is operated by Kamal Osman Jamjoom LLC, trading as Early Learning Centre" />
                            </div>
                        </div>
                        <div className="col col-4" style={{ textAlign: "end" }}>
                            <div className="row">
                                <div className="col col-1">
                                    {/* <img className="bottom-imagePaypal" src={payPalImg}/> */}
                                </div>
                                <div className="col col-1">
                                    {/* <img className="bottom-imagePaypal" src={verisignSecureImg}/> */}
                                </div>
                                {this.props.globals.language == 'en' ?
                                    <div className="col col-6">
                                        <img className="bottom-imagePaypal" src={'/images/logoEn.png'} alt="" />
                                    </div>
                                    : <div className="col col-6">
                                        <img className="bottom-imagePaypal" src={'/images/logoAr.png'} alt="" />
                                    </div>}
                                {/* <div className="col col-3">
                                <img className="bottom-imagePaypal" src={VISAImg}/>
                            </div> */}
                            </div>
                        </div>
                    </div>

                    <div className="footer-line footer-show-mobile">
                        <div className="footer-title" style={{ textAlign: 'center', marginBottom: 7 }}>
                            <FormattedMessage id="footer.signUpAd" defaultMessage="sign up for our latest news and offers" />
                        </div>
                        <div style={{ display: 'flex' }}>
                            {emailInputField}
                            {/* <input
                  type="text"
                  placeholder="enter your e-mail address"
                  className="email-field"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input> */}
                            {this.state.loaderState ? <button className="submit-button" disabled={true}>
                                <img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} alt="" />
                                <span className="t-Button-label"></span>
                            </button> :
                                <button className="submit-button" onClick={() => this.submitNewsLetter()}>
                                    <FormattedMessage id="Submit.Text" defaultMessage="Submit" />
                                </button>}

                        </div>
                        <span>{emailInputErrorField}</span>
                        <div className="mobile-manu">
                            <Collapsible trigger={<FormattedMessage id="footer.AboutELC" defaultMessage="About ELC" />}>
                                <div>
                                    <ul className="text-color">
                                        <li>
                                            <Link to={`/${store_locale}/about-us`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.aboutElc" defaultMessage="About ELC Toys" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${store_locale}/help-and-faq`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.helpFaqs" defaultMessage="FAQ" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${store_locale}/contact-us`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.contactUs" defaultMessage="Contact Us" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${store_locale}/birth-day-club`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.BirthdayClub" defaultMessage="Birthday Club" />
                                            </Link>
                                        </li>
                                        <li>
                                            <a><FormattedMessage id="footer.Newsletter" defaultMessage="Newsletter" /></a>
                                        </li>
                                        <li>
                                            <Link to={`/${store_locale}/charity`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.Charity" defaultMessage="Charity" /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </Collapsible>
                            <Collapsible trigger={<FormattedMessage id="footer.Legal" defaultMessage="Legal" />}>
                                <div>
                                    <ul className="text-color">
                                        <li>
                                            <Link to={`/${store_locale}/terms-and-conditions`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.termsAndConditions" defaultMessage="Terms & Conditions" />
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/${store_locale}/privacy-policy`} style={{ textDecoration: 'none' }}>
                                                <FormattedMessage id="footer.PrivacyPolicy" defaultMessage="Privacy Policy" />
                                            </Link>
                                        </li>
                                        <li>
                                            {this.props.globals.store_locale === 'uae-en' ?
                                                <Link to={`/${store_locale}/consumer-rights`} style={{ textDecoration: 'none' }}>
                                                    <a><FormattedMessage id="footer.ConsumerRights" defaultMessage="Consumer Rights" /></a>
                                                </Link> : <div></div>}
                                        </li>
                                    </ul>
                                </div>
                            </Collapsible>
                        </div>
                        <div style={{ paddingTop: 30, textAlign: 'center' }}>
                            <div className="footer-title" style={{ marginBottom: 7 }}>
                                <FormattedMessage id="footer.followUsOn" defaultMessage="follow us on" />
                            </div>
                            <div id="remove-line">
                                <a href="https://www.facebook.com/elctoys" target="_blank"><img src={facebook} className="icon" alt=""></img></a>
                                <a href="https://www.twitter.com/elctoysme" target="_blank"><img src={twitter} className="icon" alt=""></img></a>
                                <a href="https://www.instagram.com/elctoys" target="_blank"> <img src={instagram} className="icon" alt=""></img></a>
                                <a href="https://www.youtube.com/elctoysme" target="_blank"><img src={youtube} className="icon" alt=""></img></a>
                               {/* <a  href="https://wa.me/971543055373" target="_blank">
                                <img src={whatsapp} style={{width:40,height:40}} className="icon" alt=""/> 
                                </a> */}

                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom footer-show-mobile" style={{ textAlign: 'center' }}>
                        <div>
                            <FormattedMessage id="footer.text" defaultMessage="© Website is operated by Kamal Osman Jamjoom LLC, trading as Early Learning Centre" />
                        </div>
                        <div style={{ paddingTop: 20, paddingBottom: 30 }}>

                            {this.props.globals.language == 'en' ?
                                <img className="bottom-imagePaypal-mobile" src={'/images/logoEn.png'} alt="" />
                                :
                                <img className="bottom-imagePaypal-mobile" src={'/images/logoAr.png'} alt="" />
                            }
                        </div>
                    </div>
                </footer>
                {/* <ScrollToTop showUnder={10} duration={550}>
                    <a className="cd-top js-cd-top cd-top--fade-out cd-top--show" style={style}>Top</a>
                </ScrollToTop> */}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_details: state.login,
        globals: state.global,
        productDetails: state.productDetails,
    }
}

export default withRouter(connect(mapStateToProps)(Footer));