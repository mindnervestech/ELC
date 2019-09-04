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

import payPalImg from '../../../../assets/images/social/paypal.svg';
import masterCardImg from '../../../../assets/images/social/masterCard.svg';
import VISAImg from '../../../../assets/images/social/visa.svg';
import verisignSecureImg from '../../../../assets/images/social/verisign-secure.svg';

import facebook from '../../../../assets/images/social/Facebook.svg';
import instagram from '../../../../assets/images/social/instagram.svg';
import youtube from '../../../../assets/images/social/youtube.svg';
import twitter from '../../../../assets/images/social/twitter.svg';
import Collapsible from 'react-collapsible';

import ScrollToTop from 'react-scroll-up';
const style = {
    visibility: 'visible',
    opacity: 0.5,
}
class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        
let store_locale=this.props.globals.store_locale
        return (
            <>
            <footer className="footer-css">
                <div className="row footer-line footer-show-web">
                    <div className="col col-4" style={{textAlign: 'start', paddingLeft: '15%'}}>
                        <div className="footer-title">
                            <span><FormattedMessage id="footer.AboutELC" defaultMessage="About ELC" /></span>
                        </div>
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
                            <input type="text" placeholder="enter your e-mail address" className="email-field"></input>
                            <button className="submit-button"><FormattedMessage id="Submit.Text" defaultMessage="Submit" /></button>
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
                        <input type="text" placeholder="enter your e-mail address" className="email-field" style={{borderRadius: 0}}></input>
                        <button className="submit-button"><FormattedMessage id="Submit.Text" defaultMessage="Submit"/></button>
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