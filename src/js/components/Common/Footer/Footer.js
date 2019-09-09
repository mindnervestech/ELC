import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { initialize, pageview } from '../../utility/googleAnalytis';
import { initializeF, pageViewF } from '../../utility/facebookPixel';
import { initializeGTM, dataLayerGTM } from '../../utility/googleTagManager';
import { live } from '../../../api/globals';
import parse from 'html-react-parser';
import ShowMore from 'react-show-more';
import $ from 'jquery';
 import { Container, Row, Col, Button } from 'reactstrap';
import * as util from '../../utility/utility';
import payPalImg from '../../../../assets/images/social/paypal.svg';
import masterCardImg from '../../../../assets/images/social/masterCard.svg';
import VISAImg from '../../../../assets/images/social/visa.svg';
import verisignSecureImg from '../../../../assets/images/social/verisign-secure.svg';
import Axios from 'axios';
import facebook from '../../../../assets/images/social/Facebook.svg';
import instagram from '../../../../assets/images/social/instagram.svg';
import youtube from '../../../../assets/images/social/youtube.svg';
import twitter from '../../../../assets/images/social/twitter.svg';
import Collapsible from 'react-collapsible';
import { BASE_URL, API_TOKEN } from '../../../api/globals';

import ScrollToTop from 'react-scroll-up';
const style = {
    visibility: 'visible',
    opacity: 0.5,
}
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      success:'',
      showAlert:false,
      errorMessage: {}
    };
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
    this.setState({ showAlert: false });
  }

  handleChange = (event) => {
    this.setState({ email: event.target.value });
  }

  submitNewsLetter = (event) => {


    if (this.handleValidation()) {
      const data = this.state.email;
      if (this.state.email) {

        const API = Axios.create({
          baseURL: BASE_URL,
          headers: { Authorization: `Bearer ${API_TOKEN}`, 'Content-Type': 'application/json' },
        });

        API.post(`subscribetonewsletter`, { 'email': data }).then(res => {

          this.setState({ email: '', success: res.data.message, showAlert: true });
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
    let emailInputField = <input
      type="text"
      placeholder="enter your e-mail address"
      className="email-field"
      value={this.state.email}
      onChange={this.handleChange}
    ></input>

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

                    <div className="col col-3" style={{textAlign: 'start', padding: 0}}>
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
                                <Link to={`/${store_locale}/consumer-rights`} style={{ textDecoration: 'none' }}>
                                <FormattedMessage id="footer.ConsumerRights" defaultMessage="Consumer Rights" />
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col col-4" style={{textAlign: 'start'}}>
                        <div className="footer-title" style={{marginBottom:7}}>
                        <FormattedMessage id="footer.followUsOn" defaultMessage="follow us on" />
                        </div>
                        <div>
                        <a href="https://www.facebook.com/elctoys" target="_blank"><img src={facebook} className="icon"></img></a>
                        <a href="https://www.twitter.com/elctoysme" target="_blank"><img src={twitter} className="icon"></img></a> 
                        <a href="https://www.instagram.com/elctoys" target="_blank"> <img src={instagram} className="icon"></img></a>
                        <a href="https://www.youtube.com/elctoysme" target="_blank"><img src={youtube} className="icon"></img></a>
                        </div>
                        <div className="footer-title" style={{marginTop:60,marginBottom:7}}>

                            <FormattedMessage id="footer.signUpAd" defaultMessage="sign up for our latest news and offers" />
                            
                        </div>
                        <div>
              {emailInputField}
                {/* <input
                  type="text"
                  placeholder="enter your e-mail address"
                  className="email-field"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></input> */}
                <button className="submit-button" onClick={ () => this.submitNewsLetter()}>
                  <FormattedMessage id="Submit.Text" defaultMessage="Submit" />
                </button>
                {emailInputErrorField}
                        </div>
                    </div>

                </div>
                <div className="row footer-bottom footer-show-web">
                    <div className="col col-8" style={{textAlign: 'start'}}>
                        <div>
                            <FormattedMessage id="footer.text" defaultMessage="� Website is operated by Kamal Osman Jamjoom LLC, trading as Early Learning Centre" />
                        </div>
                    </div>
                    <div className="col col-4" style={{textAlign: "end"}}>
                        <div className="row">
                            <div className="col col-3">
                                 {/* <img className="bottom-imagePaypal" src={payPalImg}/> */}
                            </div>
                            <div className="col col-3">
                                {/* <img className="bottom-imagePaypal" src={verisignSecureImg}/> */}
                            </div>
                            <div className="col col-3">
                                <img className="bottom-imagePaypal" src={masterCardImg}/>
                            </div>
                            <div className="col col-3">
                                <img className="bottom-imagePaypal" src={VISAImg}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-line footer-show-mobile">
                    <div className="footer-title" style={{textAlign: 'center',marginBottom:7}}>
                    <FormattedMessage id="footer.signUpAd" defaultMessage="sign up for our latest news and offers" />
                    </div>
                    <div>
              {/* <input
                type="text"
                placeholder="enter your e-mail address"
                value={this.state.email}
                onChange={this.handleChange}
                className="email-field"
                style={{ borderRadius: 0 }}
              ></input> */}
              {emailInputField}
              <button className="submit-button" onClick={ () => this.submitNewsLetter()}>
                <FormattedMessage id="Submit.Text" defaultMessage="Submit" />
              </button>

              {emailInputErrorField}
                    </div>
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
                            <Link to={`/${store_locale}/consumer-rights`} style={{ textDecoration: 'none' }}>
                                <a><FormattedMessage id="footer.ConsumerRights" defaultMessage="Consumer Rights" /></a>
                                </Link>
                            </li>
                        </ul>
                            </div>
                        </Collapsible>
                    </div>
                    <div style={{paddingTop:30, textAlign: 'center'}}>
                        <div className="footer-title" style={{marginBottom:7}}>
                        <FormattedMessage id="footer.followUsOn" defaultMessage="follow us on" />
                        </div>
                        <div id="remove-line">
                            <a href="https://www.facebook.com/elctoys" target="_blank"><img src={facebook} className="icon"></img></a>
                            <a href="https://www.twitter.com/elctoysme" target="_blank"><img src={twitter} className="icon"></img></a> 
                            <a href="https://www.instagram.com/elctoys" target="_blank"> <img src={instagram} className="icon"></img></a>
                            <a href="https://www.youtube.com/elctoysme" target="_blank"><img src={youtube} className="icon"></img></a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom footer-show-mobile" style={{textAlign: 'center'}}>
                    <div>
                        <FormattedMessage id="footer.text" defaultMessage="© Website is operated by Kamal Osman Jamjoom LLC, trading as Early Learning Centre" />
                    </div>
                    <div style={{paddingTop: 20, paddingBottom: 30}}>
                    {/* <img className="bottom-imagePaypal-mobile" src={payPalImg}/>
                    <img className="bottom-imagePaypal-mobile" src={verisignSecureImg}/> */}
                    <img className="bottom-imagePaypal-mobile" src={masterCardImg}/>
                    <img className="bottom-imagePaypal-mobile" src={VISAImg}/>
                    </div>
                </div>
            </footer>
                <ScrollToTop showUnder={10} duration={550}>
                    <a className="cd-top js-cd-top cd-top--fade-out cd-top--show" style={style}>Top</a>
                </ScrollToTop>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        globals: state.global,
        productDetails: state.productDetails,
    }
}

export default withRouter(connect(mapStateToProps)(Footer));