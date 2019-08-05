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

import ScrollToTop from 'react-scroll-up';
const style = {
    visibility: 'visible',
    opacity: 0.5,

}
let store_locale="";
let count = 0;
let loader = true;
class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            readMore: 'none',
            readMoreMobile: 'none',
            readMoreButtonText: 'Read More',
            readLessButtonText: 'Read less',
            customerService: '8001244443',
            categoryFooter: false
        }
        count = 0;
        loader = true;
    }

    handleClick = (e) => {
        let orignalclassNameMainComponent = 'b-accordion_wrapper navigation_wrapper_1 js-accordion_wrapper';
        let expandedclassNameMainComponent = 'b-accordion_wrapper navigation_wrapper_1 js-accordion_wrapper m-active';

        let orignalclassNameChildComponent = 'b-accordion_container js-accordion_container';
        let expandedclassNameChildComponent = 'b-accordion_container js-accordion_container collapse-a';

        if (!(e.currentTarget.tagName == 'SPAN' || e.currentTarget.tagName == 'LI' || e.currentTarget.tagName == 'A')) {

            if (e.currentTarget.className == orignalclassNameMainComponent) {
                e.currentTarget.className = expandedclassNameMainComponent;
            } else {
                e.currentTarget.className = orignalclassNameMainComponent;
            }

            let a = e.currentTarget.children;
            if (a[1].className == orignalclassNameChildComponent) {
                a[1].className = expandedclassNameChildComponent;
            } else {
                a[1].className = orignalclassNameChildComponent;
            }
        }
    }
    render() {
        return (
            <>
            <footer className="footer-css">
                <div className="row footer-line">
                    <div className="col-md-3">
                        <div className="footer-title">
                            <span>site information</span>
                        </div>
                        <ul>
                            <li>
                                <span>sitemap</span>
                            </li>
                            <li>
                                <span>help & faqs</span>
                            </li>
                            <li>
                                <span>big birthday club</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-2" style={{padding: 0}}>
                        <div className="footer-title">
                            <span>customer service</span>
                        </div>
                        <ul>
                            <li>
                                <span>store finder</span>
                            </li>
                            <li>
                                <span>contact us</span>
                            </li>
                            <li>
                                <span>delivery information</span>
                            </li>
                            <li>
                                <span>returns and exchanges</span>
                            </li>
                            <li>
                                <span>eu online dispute resolution platfrom</span>
                            </li>
                            <li>
                                <span>terms & conditions</span>
                            </li>
                            <li>
                                <span>promotion terms & conditions</span>
                            </li>
                        </ul>
                    </div>

                    <div className="col-md-2">
                        <div className="footer-title">
                            <span>about eic</span>
                        </div>
                        <ul>
                            <li>
                                <span>about us</span>
                            </li>
                            <li>
                                <span>careers</span>
                            </li>
                            <li>
                                <span>affiliates</span>
                            </li>
                            <li>
                                <span>elc franchising</span>
                            </li>
                            <li>
                                <span>elc for business</span>
                            </li>
                            <li>
                                <span>corporate responsibility</span>
                            </li>
                            <li>
                                <span>terms of use</span>
                            </li>
                            <li>
                                <span>privacy policy</span>
                            </li>
                            <li>
                                <span>cookie policy</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-4">
                        <div className="footer-title" style={{marginBottom:5}}>
                            <span>follow us on</span>
                        </div>
                        <div>
                        <i className="fab fa-facebook-f icon"></i>
                        <i className="fab fa-twitter icon" style={{padding: 10}}></i>
                        <i className="fab fa-instagram icon1 icon"></i>
                        <i className="fa fa-youtube icon" style={{padding: 10}}></i>
                        </div>
                        <div className="footer-title" style={{marginTop:70,marginBottom:5}}>
                            <span>sign up for our latest news and offers</span>
                        </div>
                        <div>
                            <input type="text" placeholder="enter your e-mail address" className="email-field"></input>
                            <input type="submit" value="submit" className="submit-button"></input>
                        </div>
                    </div>

                </div>
                <div className="row footer-bottom">
                    <div className="col-md-7">
                        <div>
                            @ copyright ELC UK Limited 2018 ELC UK Limited (a private limited company). Registered in England no. 2057757. VAT Reg no. GB 285 2009 09.
                        </div>
                        <div style={{marginTop:5}}>
                            Registered Office: Boughton Bussiness Park Bell Lane, Little Chalfont, Bucks, HP6 6GL
                        </div>
                    </div>
                    <div className="col-md-5" style={{textAlign: "end"}}>
                    <img className="bottom-imagePaypal" src={payPalImg}/>
                    <img className="bottom-imageSecure" src={verisignSecureImg}/>
                    <img className="bottom-imageMasterCard" src={masterCardImg}/>
                    <img className="bottom-imageVisa" src={VISAImg}/>
                    </div>
                </div>
            </footer>
                {/* <footer className="t-Footer">
                    <div className="t-Footer-body">
                        <div className="t-Footer-content">
                            <div className="container">
                                <div className="row">
                                    <div className="col col-12 apex-col-auto">
                                    <div>
                                        <title>site information</title>
                                        </div>
                                        <ul>
                                            <li>
                                                <title>site information</title>
                                            </li>
                                            <li>
                                                <title>sitemap</title>
                                            </li>
                                            <li>
                                                <title>help & faqs</title>
                                            </li>
                                            <li>
                                                <title>big birthday club</title>
                                            </li>
                                        </ul>
                                            <footer className="footer">
                                                
                                            </footer>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-12 apex-col-auto">
                                        <div id="R16194527186257339" style={{ background: '#fde9ed' }}>
                                            <div className="b-footer_middle">
                                                <div className="g-wrapper-main_content">
                                                    <div className="b-footer_navigation">
                                                        <div className="content-asset">
                                                            <div className="b-accordion_wrapper navigation_wrapper_1 js-accordion_wrapper" id="abt" onClick={((e) => this.handleClick(e))}>
                                                                <ul className="b-accordion_container js-accordion_container">
                                                                    <li>
                                                                        <Link to={`/${store_locale}/help`} style={{ textDecoration: 'none' }}>
                                                                            <FormattedMessage id="footer.customerCare" defaultMessage="CUSTOMER CARE" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/${store_locale}/contact-us`} style={{ textDecoration: 'none' }}>
                                                                            <FormattedMessage id="footer.contactUs" defaultMessage="CONTACT US" />
                                                                        </Link> 
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/${store_locale}/delivery`} style={{ textDecoration: 'none' }}>
                                                                            <FormattedMessage id="footer.termsandCondition" defaultMessage="TERMS AND CONDITIONS" />
                                                                        </Link>
                                                                    </li>
                                                                    <li><Link to={`/${store_locale}/returns-and-exchanges`} style={{ textDecoration: 'none' }}>
                                                                        <FormattedMessage id="footer.affilates" defaultMessage="AFFILATES" />
                                                                    </Link></li>
                                                                    <li><Link to={`/${store_locale}/privacy-policy`} style={{ textDecoration: 'none' }}>
                                                                        <FormattedMessage id="footer.sitemap" defaultMessage="SITE MAP" /></Link></li>
                                                                    <li>
                                                                        <Link to={`/${store_locale}/terms-and-conditions`} style={{ textDecoration: 'none' }}>
                                                                            <FormattedMessage id="footer.cookies" defaultMessage="COOKIES" /></Link></li>
                                                                    
                                                                    <li>
                                                                        <Link to={`/${store_locale}/terms-and-conditions`} style={{ textDecoration: 'none' }}>
                                                                            <FormattedMessage id="footer.mediaRoom" defaultMessage="MEDIA ROOM" /></Link></li>
                                                                    
                                                                    <li>
                                                                        <Link to ={`/${store_locale}/terms-and-conditions`} style={{textDecoration: 'none' }}>
                                                                            <FormattedMessage id="footer.franchise" defaultMessage="FRANCHISE"></FormattedMessage></Link>
                                                                    </li>
                                                                    <p className="cp">
                                                                                <FormattedMessage id="Footer.Content5" defaultMessage="Footer content" />
                                                                    </p> 
                                                                </ul>
                                                            </div>

                                                            <div className="b-accordion_wrapper navigation_wrapper_1 js-accordion_wrapper"  id="abt" onClick={((e) => this.handleClick(e))}>
                                                                <h6 className="b-accordion_title js-accordion_title icon-down-footer"><FormattedMessage id="Footer.NeedToTalkUS" defaultMessage="NEED TO TALK US?" /></h6>
                                                                <ul className="b-accordion_container js-accordion_container">
                                                                    <li>
                                                                        <span className="" > <FormattedMessage id="footer.timing8To8Pm" defaultMessage="8 AM To 8 PM"></FormattedMessage></span>
                                                                    </li>
                                                                    <li>
                                                                        <span className=""><FormattedMessage id="footer.mondaytosaturday" defaultMessage="MONDAY TO SATURDAY"></FormattedMessage></span>
                                                                    </li>
                                                                    <li>
                                                                        <span className=""><FormattedMessage id="footer.phonenumber" defaultMessage="0800 900 900"></FormattedMessage></span>
                                                                    </li>
                                                                    <li>
                                                                     <i classname="fa fa-comments-o"></i> <p className="groove">Chat With</p>
                                                                    </li>
                                                                </ul>
                                                            </div>

                                                            <div className="b-accordion_wrapper navigation_wrapper_1 js-accordion_wrapper" style={{float:'right'}} id="abt" onClick={((e) => this.handleClick(e))}>
                                                                <p className="groove"><FormattedMessage id="footer.signupforexclusiveoffers" defaultMessage="SIGN UP FOR EXCLUSIVE OFFERS"></FormattedMessage></p>
                                                                <div className="media">
                                                                <a href="http://www.instagram.com/nayomimena"><i className="icon-instagram"></i></a>
                                                                <a href="http://www.instagram.com/nayomimena"><i className="icon-google-plus"></i></a>
                                                                <a href="http://www.facebook.com/NayomiMENA"><i className="icon-facebook"></i></a>
                                                                <a href="http://www.youtube.com/NayomiMENA"><i className="icon-youtube"></i></a>
                                                                <a href="https://api.whatsapp.com/send?phone=971565069237"><i className="icon-whatsapp"></i></a>
                                                            </div>
                                                            </div>

                                                            <div className="b-accordion_wrapper navigation_wrapper_4 js-accordion_wrapper"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col col-12 apex-col-auto">
                                        <div id="R33788277265169819" style={{ background: '#fde9ed' }} className="h-hidden-desktop  t-Form--slimPadding">
                                            <footer className="footer">
                                                <div className="row-1">
                                                    <div className="containers" style={{ marginleft: '20px', marginright: '20px' }}>
                                                        <div className="col-1" style={{ width: 'auto', display: 'none' }}>
                                                            <h4>Customer Service : <a className="js-ga-tracking" data-ga-category="Contact Us" data-ga-action="click" data-ga-label="Telephone" href={`tel:${this.state.customerService}`}><strong>{this.state.customerService}</strong></a></h4>
                                                            <span className="fch"><FormattedMessage id="footer.connectWithUs" defaultMessage="Connect with us" /></span>
                                                            <div className="media">
                                                                <a href="http://www.instagram.com/nayomimena"><i className="icon-instagram"></i></a>
                                                                <a href="http://www.facebook.com/NayomiMENA"><i className="icon-facebook"></i></a>
                                                                <a href="http://www.youtube.com/NayomiMENA"><i className="icon-youtube"></i></a>
                                                                <a href="https://api.whatsapp.com/send?phone=971565069237"><i className="icon-whatsapp"></i></a>
                                                            </div>
                                                        </div>

                                                        {!this.state.categoryFooter && (<div className="col-12" style={{ display: 'table', margin: '3px auto', marginBottom: "20px" }}>
                                                            <div leng="237" id="mfooterContent">
                                                                <h1 className="h1p">
                                                                    <FormattedMessage id="MobileFooter.Content1" defaultMessage="Footer Content" />
                                                                </h1> 
                                                                <p>
                                                                    <FormattedMessage id="MobileFooter.Content2" defaultMessage="Footer content" />
                                                                </p> 
                                                                <p><strong /></p>
                                                            </div>
                                                            <div>
                                                                <span className="m-more-text">
                                                                    <FormattedMessage id="MobileFooter.Content3" defaultMessage="Footer content" />
                                                                    <p /> 
                                                                    <p>
                                                                        <FormattedMessage id="MobileFooter.Content4" defaultMessage="Footer content" />
                                                                    </p>
                                                                    <p>
                                                                        <FormattedMessage id="MobileFooter.Content4" defaultMessage="Footer content" />
                                                                    </p>
                                                                    <p>
                                                                        <FormattedMessage id="MobileFooter.Content5" defaultMessage="Footer content" />
                                                                    </p>
                                                                    <p>&nbsp;</p>
                                                                    <p>
                                                                        <strong><FormattedMessage id="MobileFooter.Content7" defaultMessage="Footer content" /></strong>
                                                                    </p>
                                                                    <p>
                                                                        <FormattedMessage id="MobileFooter.Content8" defaultMessage="Footer content" />
                                                                    </p>
                                                                </span>
                                                            </div>
                                                            <div>  
                                                                <a className="m-moreless-button" onClick={this.onReadMoreMobile}>{this.state.readMoreButtonText}...</a></div>
                                                                <p className="cp"><FormattedMessage id="MobileFooter.Content6" defaultMessage="Footer content" /></p>
                                                            </div>)}

                                                         {this.state.categoryFooter && (
                                                            <div className="col-12" style={{ display: 'table', margin: '3px auto', marginBottom: "20px" }}>
                                                                <div leng="237" id="mfooterContent">
                                                                    {this.props.productDetails.category_description &&(
                                                                        <div>
                                                                            {parse(this.props.productDetails.category_description)}
                                                                            <a className="m-moreless-button" onClick={this.onReadMore}>
                                                                            {this.state.readMoreButtonText}...</a>
                                                                            <p className="cp">
                                                                                <FormattedMessage id="Footer.Content5" defaultMessage="Footer content" />
                                                                            </p>  
                                                                        </div>
                                                                    )}
                                                                </div>    
                                                            </div>
                                                        )}
                                                            <div className="col-3" style={{ width: 'auto', display: 'none' }}>
                                                            <h4><Link to={`/${store_locale}/payment-methods`}><FormattedMessage id="footer.paymentMethods" defaultMessage="Payment Methods" /></Link></h4>
                                                            <figure></figure>
                                                        </div>
                                                    </div>
                                                </div>

                                            </footer>

                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                </footer> */}

                <ScrollToTop showUnder={10} duration={550}>
                    <a className="cd-top js-cd-top cd-top--fade-out cd-top--show" style={style}>Top</a>
                </ScrollToTop>

            </>
        );
    }
}

// export default Footer;

const mapStateToProps = state => {
    return {
        globals: state.global,
        productDetails: state.productDetails,
    }
}

export default withRouter(connect(mapStateToProps)(Footer));