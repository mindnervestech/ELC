import React, { Component } from 'react';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import Cart from './Cart';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import OfferStripe from '../OfferStripe/OfferStripe';
import MenuNav from '../../Menu/menuNav';
import Search from '../Search/Search';
import * as utility from '../../utility/utility';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import cookie from 'react-cookies';
import amirahclub from '../../../../assets/images/amirahclub_mobile.png';
import { Helmet } from 'react-helmet';
import { WEB_URL } from '../../../api/globals';
import { Container, Row, Col, Button } from 'reactstrap';

import deliveryBy from '../../../../assets/images/header/Truck1.svg';
import freeDelivery from '../../../../assets/images/elc_icon_03.png';
import freeCollect from '../../../../assets/images/elc_icon_05.png';
import logoGroup from '../../../../assets/images/social/Logo Group.svg';
import bagLogo from '../../../../assets/images/header/Store Locator 3 Copy 2.svg';

import location from '../../../../assets/images/header/location.svg';
import help from '../../../../assets/images/header/help.svg';
import profile from '../../../../assets/images/header/profile.png';
import Slider from "react-slick";

import UAEImage from '../../../../assets/images/header/ae.svg';
import KSAImage from '../../../../assets/images/header/sa.svg';

class MainHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showCountries: false,
            country_flag: '',
            country_name: '',
            showCart: false,
            cartItemCount: 3,
            showMenu: false,
        }
    }

    showMenu= () => {
        if(this.state.showMenu){
            this.setState({showMenu: false});
        }else{
            this.setState({showMenu: true});
        }
    }

    showCart = () => {
        this.setState({
            showCart: !this.state.showCart
        })
    }

    componentDidMount() {
        this.props.onGetStoreIds();
        //console.log('In componentDidMount before onGetMenuNav', this.props.global);
        //this.props.onGetMenuNav(this.props.globals);

        // if (this.props.globals.currentStore) {
        //     this.props.onGetMenuNav(this.props.globals);
        // }

        if (this.props.countryList.length === 0) {
            this.props.onGetCountryList();
        }


        let country = (cookie.load('country') === null) ? 'KSA' : cookie.load('country');
        this.setState({ country_flag: this.props.globals.country, country_name: this.props.globals.country });
        this.getStore();
        this.props.onGetStoreList({
            country_id: '',
            city: ''
        });
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.location.pathname !== prevProps.location.pathname) {
            // console.log('Route change!');
            this.setState({ showCountries: false })
            if (this.state.showCart) {
                console.log(this.state.showCart)
                this.setState({
                    showCart: false
                })
            }
        }

        if (prevProps.globals.currentStore !== this.props.globals.currentStore) {
            console.log('Calling from  update :: ', prevProps.globals.currentStore, this.props.globals.currentStore)
            this.props.onGetMenuNav(this.props.globals);
        }

        if ((this.props.guest_user.temp_quote_id !== prevProps.guest_user.temp_quote_id) || (!(utility.isEquivalent(this.props.user_details.customer_details, prevProps.user_details.customer_details)))) {
            this.getStore();
        }

        if (prevProps.globals.country !== this.props.globals.country) {
            this.setState({ country_flag: this.getFlagName(this.props.globals.country), country_name: this.props.globals.country });
        }
    }

    getStore = () => {
        let obj = this.props.user_details.customer_details;

        if (!(utility.emptyObj(obj))) {
            if (!(this.props.cart_details.is_cart_details_rec)) {
                this.props.onGetMyCart({ quote_id: this.props.user_details.customer_details.quote_id, store_id: this.props.globals.currentStore })
            }
        } else if (utility.emptyObj(obj)) {
            if (this.props.guest_user.temp_quote_id == null) {
                this.props.onGetGuestCartId();
            }

            if (this.props.guest_user.new_quote_id !== null) {
                if (!(this.props.cart_details.is_cart_details_rec)) {
                    this.props.onGetMyCart({ quote_id: this.props.guest_user.new_quote_id, store_id: this.props.globals.currentStore })
                }
            }
        }

    }

    showCountries = () => {
        this.setState({ showCountries: !this.state.showCountries })
    }

    translate = (lang, dir) => {
        this.props.handleLanguageSelection(lang, dir);
    }

    onChangeCountry = (country) => {
        this.props.handleCountrySelection(country);
        this.setState({ country_flag: this.getFlagName(country), country_name: country });
        // console.log('onChangeCountry', this.state.country_flag);
        this.showCountries();
        this.closeHBMenu();
    }

    getFlagName(country) {
        var flag_name;

        switch (country) {
            case 'KSA':
                flag_name = 'ksa';
                break;
            case 'UAE':
                flag_name = 'uae';
                break;
            case 'International':
                flag_name = 'usa';
                break;
            default:
                flag_name = 'ksa';
        }
        return flag_name;
    }

    handleDir = (language) => {
        if (language === 'ar') {
            document.getElementById("dir").classList.add("u-RTL");
            document.getElementById("dir").lang = 'ar';
            document.getElementById("dir").dir = 'rtl';
        } else {
            document.getElementById("dir").lang = 'en';
            document.getElementById("dir").classList.remove("u-RTL");
            document.getElementById("dir").removeAttribute('dir');
        }
    }

    closeHBMenu = () => {
        document.querySelector("html").classList.remove("menuOpen");
    }

    render() {

        const settings = {
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                }
            ]
        }

        const store_locale = this.props.globals.store_locale;

        const cartDetails = <Cart showCart={this.state.showCart}
            cartDetails={this.props.cart_details}
            toggleCart={this.showCart}
            store_locale={this.props.globals.store_locale}
        />;

        let profileIcon = null
        if (!(this.props.user_details.isUserLoggedIn)) {
            profileIcon = <li><Link to={`/${store_locale}/login`} className="whatsapp">
                <i className="icon-user"></i>
                <strong id="LGUSRUQ"> </strong>
                <span style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="header.Profile" defaultMessage="Profile" /></span>
            </Link>
            </li>

        } else {

            profileIcon = <li><Link to={`/${store_locale}/profile`} className="whatsapp">
                <i className="icon-user"></i>
                <strong id="LGUSRUQ">{this.props.user_details.customer_details.firstname}</strong>
                <span style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="header.Profile" defaultMessage="Profile" /></span>
            </Link>
            </li>

        }

        return (
            <>
                <Helmet>
                    <link rel="alternate" hreflang="x-default" href={`${WEB_URL}en/`} />
                    <link rel="alternate" hreflang="ar-AE" href={`${WEB_URL}uae-ar/`} />
                    <link rel="alternate" hreflang="en-AE" href={`${WEB_URL}uae-en/`} />
                    <link rel="alternate" hreflang="ar-SA" href={`${WEB_URL}saudi-ar/`} />
                    <link rel="alternate" hreflang="en-SA" href={`${WEB_URL}saudi-en/`} />
                    <link rel="canonical" href={`${WEB_URL}saudi-en/`} />
                </Helmet>

                <header className="header" id="t_Header">
                    <div className="t-Header-branding">
                        <div className="row-1">
                            <div className="containers-main">
                                <ul className="leftLink">
                                    {/* <li className="ll" style={{ padding: 0 }}>
                                        <div className="lang">
                                            <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >en</a></div>
                                    </li>

                                    <li className="ll" style={{ padding: 0 }}>
                                        <div className="lang" style={{ paddingLeft: 15 }}>
                                            <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a></div>
                                    </li> */}
                                    <li>
                                    <div className="language">
                                    <button className={this.state.showMenu ? 'Button is-open' : 'Button'} onClick={this.showMenu}>EN</button>
                                    {
                                        this.state.showMenu
                                            ? (
                                                <div className="menu">
                                                <div>
                                                    <div className="currency__item">
                                                        <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" > EN | English</a>
                                                    </div>
                                                    <div className="currency__item">
                                                        <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')}> AR | Arabic</a>
                                                    </div>
                                                </div>
                                                </div>
                                            )
                                            : (
                                                null
                                            )
                                    }
                                </div>
                                    </li>

                                    {/* <li style={{height:40}}>
                                        <Button className="firstButton text-color">The Entertainer</Button>
                                    </li> */}
                                    <li style={{ height: 40, marginLeft: 20}}>
                                        <Button className="secondButton text-color">The Birthday Club</Button>
                                    </li>
                                    {<li>
                                        <div className="changecountry">
                                            <div className="country">
                                                <div onClick={this.showCountries} className={this.state.showCountries ? "activeCountry open" : "activeCountry"}>
                                                    {/* <i className={`flag ${this.state.country_flag}`} onClick={this.showCountries}>  </i> */}
                                                    {this.state.country_name == 'UAE' ?
                                                        <img style={{height: '20px',width: '30px'}} src={UAEImage}></img>
                                                        : <img style={{height: '20px',width: '30px'}} src={KSAImage}></img>
                                                    }
                                                    <label className="text-color">&nbsp;{this.state.country_name} </label>
                                                    <span className="selected">
                                                        <FormattedMessage id="header.defaultCountry" defaultMessage="Select Your Country" />

                                                    </span>
                                                    <i className="icon-down" ></i>
                                                </div>
                                                <div className="list">
                                                    <div style={{paddingLeft:10, paddingBottom: 7}}> 
                                                        <img style={{height: '20px',width: '30px'}} src={UAEImage}></img>
                                                        <a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uaes" defaultMessage="UAE" /></a>
                                                    </div>
                                                    <div style={{paddingLeft:10}}>
                                                        <img style={{height: '20px',width: '30px'}} src={KSAImage}></img>
                                                        <a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a>
                                                    </div>
                                                    {/* <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('UAE', 'NETHERLANDS')}><FormattedMessage id="header.netherlands" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('UAE', 'SLOVENIA')}><FormattedMessage id="header.slovenia" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="usd" id="cart" onClick={() => this.onChangeCountry('International', 'UNITED KINGDOM')}><FormattedMessage id="header.uk" defaultMessage="International" /></a></li> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                        // <li className="ll" style={{padding:0}}>
                                        //     <div className="lang">
                                        //         <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >en</a> | <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a></div>
                                        // </li> }
                                    }
                                    {/* <li><Link to={`/${store_locale}/amirah-club`}>
                                        <FormattedMessage id="header.clubName" defaultMessage="THE BODY SHOP" />
                                    </Link></li> */}

                                    {/* <li><Link to={`/${store_locale}/store-locator`} className="whatsapp"><i className="icon-marker"></i><span style={{ whiteSpace: 'nowrap' }}>
                                        <FormattedMessage id="header.storeLocator" defaultMessage="Store Locator" />
                                    </span></Link></li>
                                    <li><a href="https://api.whatsapp.com/send?phone=971565069237" target="_blank" className="whatsapp"><i className="icon-whatsapp" /><span style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="header.ContactUs" defaultMessage="Contact Us" /></span></a></li> */}
                                </ul >
                                <ul className="rightLink">
                                    {/* <li className="titleHover">
                                     
                                        <img src={location} className="image-ion"></img>
                                        <label className="iconLeble text-color changeLinkText">store finder</label>
                                    </li> */}
                                    <li className="titleHover">
                                        {/* <i className="icon-heart"></i> */}
                                        <img src={help} className="image-ion"></img>
                                        <label className="iconLeble text-color changeLinkText"><FormattedMessage id="Header.Help" defaultMessage="help" /></label>
                                    </li>
                                    <li className="titleHover" style={{marginBottom: 5}}>
                                        <Link to={`/${store_locale}/Login`} style={{ textDecoration: 'none' }}>
                                            <img src={profile} className="image-ion" style={{marginTop: 9}}></img>
                                                <label className="iconLeble text-color changeLinkText"><FormattedMessage id="Header.SignInOrRegister" defaultMessage="sign in / register"/></label>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <Link to={`/${store_locale}/wish-list`} style={{ textDecoration: 'none' }}>
                                            wishlist
                                        </Link>
                                    </li> */}
                                    {/* {profileIcon}

                                    <li><Link to={`/${store_locale}/Login`} className="whatsapp">
                                        <i className="icon-heart"></i>
                                        <span style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="header.Wishlist" defaultMessage="Wishlist" /></span>
                                    </Link></li>

                                    <li className="cart" ><a href="javascript:void(0);" id="cart" onClick={() => { this.showCart() }}>
                                        <i className="icon-cart"></i><span>{this.props.cart_details.cart_count}</span></a>
                                    </li> */}

                                </ul>

                            </div >
                        </div >
                        <div className="t-Header-navBar"></div>
                    </div >

                    {cartDetails}

                    < div id="R33786692346169804" className="row-2" >
                        {/* <input type="hidden" id="P0_HSEARCH" name="P0_HSEARCH" value="" /> */}
                        <div className="containers-main">
                            {/* <Container style={{width: "100%"}}> */}
                            <Row style={{ paddingRight: 30, paddingLeft: 30 }} className="divShowOnWeb">
                                <Col xs="4" style={{ paddingLeft: 0, paddingRight: 0 }}>
                                    <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                        <img style={{ height: 64, width: "75%", paddingLeft: 5 }} src={logoGroup} />
                                    </Link>
                                </Col>
                                <Col xs="4" style={{ padding: 6 }}><Search store_locale={store_locale} /></Col>
                                <Col xs="2"></Col>
                                <Col xs="2" style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5 }}>
                                    <Link to={`/${store_locale}/cart`} style={{ textDecoration: 'none' }}>
                                        <ul className="cta">
                                            {/* <li>
                                        <div className="changecountry">
                                            <div className="country">
                                                <div className={this.state.showCountries ? "activeCountry open" : "activeCountry"}>
                                                    <i className={`flag ${this.state.country_flag}`} onClick={this.showCountries}></i>
                                                    <span className="selected">
                                                        <FormattedMessage id="header.defaultCountry" defaultMessage="Select Your Country" />

                                                    </span>
                                                    <i className="icon-down" onClick={this.showCountries}></i>
                                                </div>
                                                <ul className="list">
                                                    <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uae" defaultMessage="UAE" /></a></li>
                                                    <li><a href="javascript:void(0);" className="usd" id="cart" onClick={() => this.onChangeCountry('International')}><FormattedMessage id="header.usd" defaultMessage="International" /></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="ll" style={{padding:0}}>
                                        <div className="lang">
                                            <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >en</a> | <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a></div>
                                    </li> */}
                                      <li style={{ paddingLeft: 10 }}>
                                                <img src={bagLogo} />
                                            </li>
                                             <li style={{paddingTop: 8}}>
                                                <label className="headerLable2">my basket
                                                {/* <span style={{ fontFamily: "VAG Rounded ELC Bold", marginLeft: 10 }}>£30.00</span> */}
                                                </label>
                                            </li>
                                          
                                            <li style={{paddingTop: 8}}>
                                                <label className="lable-count">0</label>
                                            </li>
                                        </ul>
                                    </Link>
                                </Col>
                            </Row>
                            <div className="divShowOnMobile" style={{ backgroundColor: "#fff", height: '4.2rem', paddingTop: 10 }}>
                                <div className="language">
                                    <button className={this.state.showMenu ? 'Button is-open' : 'Button'} onClick={this.showMenu}>EN</button>
                                    {
                                        this.state.showMenu
                                            ? (
                                                <div className="menu">
                                                <ul>
                                                    <li className="currency__item">
                                                        <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" > EN | English</a>
                                                    </li>
                                                    <li className="currency__item">
                                                        <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')}> SU | Saudi</a>
                                                    </li>
                                                </ul>
                                                </div>
                                            )
                                            : (
                                                null
                                            )
                                    }
                                </div>
                                <div style={{ width: '45%', display: 'inline-block' }}>
                                    <span style={{ height: 40 }}>
                                        <button className="mobileHomePageButtonSecond text-color">Early Learning Center</button>
                                    </span>
                                </div>

                                {/* <span className="ll" style={{padding:0}}>
                                            <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >en</a>
                                    </span>

                                    <span className="ll" style={{padding:0}}>
                                           <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a>
                                    </span> */}
                            </div>
                            <div className="divShowOnMobile" style={{paddingTop: 10}}>
                                <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                    <img className="mobileHomeLogo" src={logoGroup} />
                                </Link>
                                <img src={location} className="mobileHomePageIcon"></img>
                                <Link to={`/${store_locale}/cart`} style={{ textDecoration: 'none' }}>
                                <img src={bagLogo} className="mobileHomePageIcon" />
                                </Link>
                            </div>
                            <div className="divShowOnMobile" style={{ padding: "0px 10px", marginTop: 10 }}>
                                <Search store_locale={store_locale} />
                            </div>
                            {/* </Container> */}
                            <div id="navTrigger" className="navTrigger"><i></i><i></i><i></i></div>
                            {/* <ul className="cta">
                                <li className="ll">
                                    <div className="lang">
                                        <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >en</a> | <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a></div>
                                </li>

                                <li className="cart">
                                    <Link to={`/${store_locale}/cart`} >
                                        <i className="icon-cart"></i><span>{this.props.cart_details.cart_count}</span></Link>
                                </li>
                            </ul> */}
                            {/* <figure className="logo"><Link to={`/${store_locale}/`}></Link></figure> */}
                        </div>
                    </div >

                    <div id="R33786937309169806" className="menuOverlay"> </div>
                    <div id="R33786847982169805" className="row-3">
                        {/* <Row>
                            <Col xs="2"></Col>
                            <Col xs="8" style={{padding:0}}>
                                <label className="manuTitle">body toys (0-12 months)</label>
                                <label className="manuTitle">elc toys</label>
                                <label className="manuTitle">outdoor toys</label>
                                <label className="manuTitle">shop by age</label>
                                <label className="manuTitle">shop by brand</label>
                                <label className="manuTitle">shop by learning skill</label>
                            </Col>
                            <Col xs="2" style={{padding: 0}}>
                                <Button className="buton">present finder</Button>
                            </Col>
                        </Row> */}
                        <a to="JavaScript:;" id="closeNav" className="closeNav">X</a>
                        <div className="containers-main">
                            <div style={{padding: "0px 10px"}}>
                                {/* <Col xs="12">
                                    <MenuNav />
                                </Col> */}
                                {/* <Col xs="1" style={{ padding: 0 }}>
                                    <button className="present-finder-buton">Present Finder</button>
                                </Col> */}
                                <MenuNav />
                            </div>
                            {/* <div className="changecountry">
                                <div className="country">
                                    <div className={this.state.showCountries ? "activeCountry open" : "activeCountry"}>
                                        <i className={`flag ${this.state.country_flag}`} onClick={this.showCountries}></i>
                                        <span className="selected">
                                            <FormattedMessage id="header.defaultCountry" defaultMessage="Select Your Country" />

                                        </span>
                                        <i className="icon-down" onClick={this.showCountries}></i>
                                    </div>
                                    <ul className="list">
                                        <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a></li>
                                        <li><a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uae" defaultMessage="UAE" /></a></li>
                                        <li><a href="javascript:void(0);" className="usd" id="cart" onClick={() => this.onChangeCountry('International')}><FormattedMessage id="header.usd" defaultMessage="International" /></a></li>
                                    </ul>
                                </div>
                            </div> */}
                            {/* <div className="mobileCTA">
                                <Link to={`/${store_locale}/store-locator`} ><i className="icon-marker" onClick={this.closeHBMenu}></i></Link>
                                <Link to={`/${store_locale}/amirah-club`} className="amirah-club" onClick={this.closeHBMenu}><img src={amirahclub} /></Link>
                                <Link to={`/${store_locale}/add-wishlist`} onClick={this.closeHBMenu}><i className="icon-heart"></i></Link>
                                <a className="js-ga-tracking" data-ga-category="Contact Us" data-ga-action="click" data-ga-label="Telephone" href="tel:+971565069237"><i className="icon-whatsapp"></i></a>
                            </div> */}
                        </div>
                    </div>
                    <div className="header-slider">
                                <Slider {...settings}>
                                    <div>
                                        <Row>
                                            <Col xs="3"></Col>
                                            <Col xs="2" style={{paddingLeft: 0}}>
                                                <img src={deliveryBy} className="imageHight40" />
                                            </Col>
                                            <Col xs="7">
                                                <ul style={{ textAlign: 'start', paddingTop: 10 }}>
                                                    <li style={{ fontSize: 13, color: "#0D943F" }}>
                                                        Free Std Delivery
                                                    </li>
                                                    {/* <li style={{ fontSize: 11 }} className="text-color">
                                                        when you spend £10
                                                    </li> */}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col xs="3"></Col>
                                            <Col xs="2">
                                                <img src={freeDelivery} className="imageHight40" />
                                            </Col>
                                            <Col xs="7">
                                                <ul style={{ textAlign: 'start', paddingTop: 10 }}>
                                                    <li style={{ fontSize: 13, color: "#0D943F" }}>
                                                        Free Gift wrapping
                                                    </li>
                                                    {/* <li style={{ fontSize: 11 }} className="text-color">
                                                        for next working day delivery
                                                    </li> */}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div>
                                        <Row>
                                            <Col xs="3"></Col>
                                            <Col xs="2">
                                                <img src={freeCollect} className="imageHight40" />
                                            </Col>
                                            <Col xs="7">
                                                <ul style={{ textAlign: 'start', paddingTop: 10 }}>
                                                    <li style={{ fontSize: 13, color: "#0D943F" }}>
                                                        Free Returns
                                                    </li>
                                                    {/* <li style={{ fontSize: 11 }} className="text-color">
                                                        in as little as 30 minutes
                                                    </li> */}
                                                </ul>
                                            </Col>
                                        </Row>
                                    </div>
                                </Slider>

                        {/* <Row className="row-4">
                            <Col xs="1"></Col>
                            <Col xs="10">
                            <Row>
                            <Col xs="1"></Col>
                            <Col xs="3">
                                <Row>
                                    <Col xs="4">
                                        <img style={{width:"100%",marginRight:10,marginLeft:10}} src={deliveryBy}/>
                                    </Col>
                                    <Col xs="8" style={{textAlign: 'start'}}>
                                        <ul>
                                            <li style={{fontSize: 13, color: "#0D943F"}}>
                                                free UK delivery
                                            </li>
                                            <li style={{fontSize: 11}} className="text-color">
                                                when you spend £10
                                            </li>
                                        </ul>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col xs="1"></Col>
                                <Col xs="3">
                                <Row>
                                    <Col xs="4">
                                        <img style={{width:"100%",marginRight:10,marginLeft:10}} src={freeDelivery}/>
                                    </Col>
                                    <Col xs="8" style={{textAlign: 'start'}}>
                                        <ul>
                                            <li style={{fontSize: 13, color: "#0D943F"}}>
                                                order by 7pm
                                            </li>
                                            <li style={{fontSize: 11}} className="text-color">
                                                for next working day delivery
                                            </li>
                                        </ul>
                                    </Col>
                                    </Row>
                                </Col>
                                <Col xs="1"></Col>
                                <Col xs="3">
                                <Row>
                                    <Col xs="4">
                                        <img style={{height:40, width:"100%",marginRight:10,marginLeft:10}} src={freeCollect}/>
                                    </Col>
                                    <Col xs="8" style={{textAlign: 'start'}}>
                                        <ul>
                                            <li style={{fontSize: 13, color: "#0D943F"}}>
                                                free click & collect
                                            </li>
                                            <li style={{fontSize: 11}} className="text-color">
                                                in as little as 30 minutes
                                            </li>
                                        </ul>
                                    </Col>
                                    </Row>
                                </Col>
                            </Row>
                            </Col>
                            <Col xs="1"></Col>
                        </Row> */}
                    </div>
                    <div id="R39731766560788077" className="offerStripe">
                        <OfferStripe OfferMessage={this.props.OfferMessage} />
                    </div>
                </header >


            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart_details: state.myCart,
        user_details: state.login,
        change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        guest_user: state.guest_user,
        menu: state.menu.menuNavData,
        OfferMessage: state.menu.OfferMessage,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetStoreIds: () => dispatch(actions.getStoreIds()),
        onGetMyCart: (quoteId) => dispatch(actions.getMyCart(quoteId)),
        onGetCountryList: () => dispatch(actions.getCountryList()),
        onGetGuestCartId: () => dispatch(actions.getGuestCartId()),
        onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
        onGetStoreList: (payload) => dispatch(actions.getStoreList(payload)),

    }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainHeader));
// export default connect(mapStateToProps, mapDispatchToProps)(MainHeader);