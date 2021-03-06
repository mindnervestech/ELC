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
import { Helmet } from 'react-helmet';
import { WEB_URL } from '../../../api/globals';
import { Container, Row, Col, Button } from 'reactstrap';
import axios from 'axios'
import deliveryBy from '../../../../assets/images/header/Truck1.svg';
import freeDelivery from '../../../../assets/images/elc_icon_03.png';
import freeCollect from '../../../../assets/images/elc_icon_05.png';
import logoGroup from '../../../../assets/images/social/Logo Group.svg';
import bagLogo from '../../../../assets/images/header/basket_w.svg';
import location from '../../../../assets/images/header/location.svg';
import help from '../../../../assets/images/header/help.svg';
import profile from '../../../../assets/images/header/profile.png';
import Slider from "react-slick";
import storeFinderMobile from '../../../../assets/images/header/storeFinder.svg';
import UAEImage from '../../../../assets/images/header/ae.svg';
import KSAImage from '../../../../assets/images/header/sa.svg';
import { timeout } from 'q';
let country_name = "";
let country_code = 0;



class MainHeader extends Component {
    constructor(props) {
        super(props);
        let login = false
        if (this.props.user_details.isUserLoggedIn == true) {
            login = true
        } else if (this.props.user_details.isUserLoggedIn == false) {
            login = false
        }
        this.state = {
            goToMyAccount: false,
            showCountries: false,
            isGeoIPCalled: true,
            country_flag: '',
            country_name: 'UAE',
            showCart: false,
            cartItemCount: 3,
            showMenu: false,
            selectedLang: '',
            userLogin: login,
            openAccountModal: false,
            countryCode: '',
            countryName: '',
            countryChangeCalled:false
        }
    }

    showMenu = () => {
        if (this.state.showMenu) {
            this.setState({ showMenu: false });
        } else {
            this.setState({ showMenu: true });
        }
    }

    onAccountMeunClick = (status) => {
        if (status === true) {
            this.setState({ goToMyAccount: false })
        }
    }

    showCart = () => {
        this.setState({
            showCart: !this.state.showCart
        })
    }
    componentWillMount() {

        let string = window.location.href;
        if (string.includes("password-rest")
            && localStorage.getItem("ispasswordreset") === "false") {
            localStorage.setItem("ispasswordreset", true);
            let url = string.split("/")
            let key = url[3].split('-')
            console.log(">>>>>>>>>", key[1])
            if (key[1] === 'en') {
                this.props.handleLanguageSelection(key[1]);
            } else {
                this.props.handleLanguageSelection(key[1]);
            }
            this.setState({ showMenu: false });
        } else {
            localStorage.setItem("ispasswordreset", false);
        }

    }

    componentDidMount() {
        this.props.onGetStoreIds();
        if (!cookie.load('countCallOfIP')) {
            setTimeout(() => {
                this.onChangeCountry('UAE');
            }, 100);
        }
      
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
        // if (this.props.guest_user.temp_quote_id == null) {
        //     this.props.onGetGuestCartId();
        // }
    }

    openAccountSectionModal = () => {
        if (this.state.openAccountModal === true) {
            this.setState({ openAccountModal: false })
        } else {
            this.setState({ openAccountModal: true })
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.user_details.isUserLoggedIn !== this.state.userLogin) {
            if (this.props.user_details.isUserLoggedIn == true) {
                this.setState({ userLogin: true });
            } else if (this.props.user_details.isUserLoggedIn == false) {
                this.setState({ userLogin: false });
            }
        }
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({ showCountries: false })
            if (this.state.showCart) {
                this.setState({
                    showCart: false
                })
            }
        }

        if (prevProps.globals.currentStore !== this.props.globals.currentStore) {
            this.props.onGetMenuNav(this.props.globals);
        }

        if ((this.props.guest_user.temp_quote_id !== prevProps.guest_user.temp_quote_id) || (!(utility.isEquivalent(this.props.user_details.customer_details, prevProps.user_details.customer_details)))) {
            this.getStore();
        }

        if (prevProps.globals.country !== this.props.globals.country) {
            this.setState({ country_flag: this.getFlagName(this.props.globals.country), country_name: this.props.globals.country });
        }
    }

    componentWillReceiveProps(nextProps) {

        // console.log("Country name", country_name)
        // if (country_name === 'India') {
        //     console.log("Inside check")
        //     setTimeout(() => {
        //         this.onChangeCountry('KSA');
        //     }, 100);
        // }
    }
    goToMyAccount = () => {
        if (this.state.goToMyAccount === true) {
            this.setState({ goToMyAccount: false })
        } else {
            this.setState({ goToMyAccount: true })
        }
    }


    logOut = () => {
        this.props.onLogoutUser();
        this.props.onGetMenuNav(this.props.globals);
        this.props.history.push(`/${this.props.globals.store_locale}/sign-in-register`);
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
        this.setState({ showMenu: false });
    }

    onChangeCountry = (country) => {
    
        this.props.handleCountrySelection(country);
        this.setState({ country_flag: this.getFlagName(country), country_name: country,countryChangeCalled:true });
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

    gotoCheckOutPage = () =>{
		if (this.props.isUserLoggedIn) {
			this.props.onGetMyCart({
				quote_id: this.props.user_details.customer_details.quote_id,
				store_id: this.props.globals.currentStore
			})
		} else {
			this.props.onGetMyCart({
				quote_id: this.props.guest_user.new_quote_id,
				store_id: this.props.globals.currentStore
			})
		}
	}

    render() {

        const settings = {
            autoplay: true,
            autoplaySpeed: 3000,
            dots: false,
            infinite: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            speed: 500,
            vertical: false,
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
        const { globals } = this.props;
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
        let product = [];
        let myCartItem = {};
        if(localStorage.getItem('myCartItem') !== ''){
            myCartItem = JSON.parse(localStorage.getItem('myCartItem'));
            if(myCartItem){
                product = myCartItem.products;
            }
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
                    <div className="t-Header-branding divShowOnWeb">
                        <div className="row-1">
                            <div className="containers-main">
                                <ul className="leftLink" style={{ paddingTop: 7 }}>
                                    <li style={{ paddingTop: 2 }}>
                                        <div className="changecountry">
                                            <div className="country">
                                                <div onClick={this.showCountries} className={this.state.showCountries ? "activeCountry open divShowOnWeb" : "activeCountry divShowOnWeb"}>
                                                    {/* <i className={`flag ${this.state.country_flag}`} onClick={this.showCountries}>  </i> */}
                                                    {this.state.country_name === 'UAE' || this.state.country_name === 'uae' ?
                                                        <img style={{ height: '20px', width: '30px' }} src={UAEImage}></img>
                                                        : <img style={{ height: '20px', width: '30px' }} src={KSAImage}></img>
                                                    }
                                                    <label className="text-color" style={{ fontSize: '1.3rem' }}>
                                                        &nbsp;{this.state.country_name.toUpperCase() == 'UAE' ?
                                                        <FormattedMessage id="header.uae" defaultMessage="UAE" />
                                                        : <FormattedMessage id="header.ksa" defaultMessage="KSA" />
                                                        } 
                                                    </label>
                                                    <span className="selected">
                                                        <FormattedMessage id="header.defaultCountry" defaultMessage="Select Your Country" />

                                                    </span>
                                                    <i className="icon-down" ></i>
                                                </div>
                                                <div className="list" style={{ textAlign: 'start' }}>
                                                    {this.state.country_name.toUpperCase() == 'UAE' ?
                                                        <div>
                                                            <div style={{ paddingLeft: 10, paddingBottom: 7, fontSize: '1.3rem' }}>
                                                                <img style={{ height: '20px', width: '30px' }} src={UAEImage}></img>
                                                                <a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uae" defaultMessage="UAE" /></a>
                                                            </div>
                                                            <div style={{ paddingLeft: 10, fontSize: '1.3rem' }}>
                                                                <img style={{ height: '20px', width: '30px' }} src={KSAImage}></img>
                                                                <a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a>
                                                            </div>
                                                        </div>
                                                        : <div>
                                                            <div style={{ paddingLeft: 10, fontSize: '1.3rem' }}>
                                                                <img style={{ height: '20px', width: '30px' }} src={KSAImage}></img>
                                                                <a style={{ verticalAlign: 'middle' }} href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a>
                                                            </div>
                                                            <div style={{ paddingLeft: 10, paddingTop: 7, fontSize: '1.3rem' }}>
                                                                <img style={{ height: '20px', width: '30px' }} src={UAEImage}></img>
                                                                <a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uae" defaultMessage="UAE" /></a>
                                                            </div>
                                                        </div>}
                                                    {/* <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('UAE', 'NETHERLANDS')}><FormattedMessage id="header.netherlands" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('UAE', 'SLOVENIA')}><FormattedMessage id="header.slovenia" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="usd" id="cart" onClick={() => this.onChangeCountry('International', 'UNITED KINGDOM')}><FormattedMessage id="header.uk" defaultMessage="International" /></a></li> */}
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="ll" className="paddingForEnglish">
                                        <div className="lang" style={{ fontSize: '1.3rem' }}>
                                            <a href="javascript:void(0);" style={this.props.globals.language=='en' ?{fontFamily:'VAG Rounded ELC Bold'} : {}} onClick={(e) => this.translate('en', 'ltr')} className="active" >English</a></div>
                                    </li>
                                    <li className="paddingForDash"> - </li>
                                    <li className="ll" style={{ padding: 0, marginTop: -3 }}>
                                        <div className="lang" style={{ paddingLeft: 8, fontSize: '1.3rem' }}>
                                            <a  style={this.props.globals.language=='ar' ? {fontFamily:'VAG Rounded ELC Bold'} : {}}  href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a></div>
                                    </li>
                                    {/* <li>
                                        <div className="language">
                                            <button className={this.state.showMenu ? 'Button is-open' : 'Button'} onClick={this.showMenu}>{globals.language.toUpperCase()}</button>
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
                                    </li> */}

                                    {/* <li style={{height:40}}>
                                        <Button className="firstButton text-color">The Entertainer</Button>
                                    </li> */}
                                    <li className="badyCloubLink">
                                        <Link to={`/${store_locale}/birth-day-club`} style={{ textDecoration: 'none' }}>
                                            <button style={{paddingTop: 5}} className="secondButton text-color"><FormattedMessage id="header.TheBirthdayclub" defaultMessage="Birthday Club" /></button>
                                        </Link>
                                    </li>

                                    {/* <li className="ll" style={{padding:0}}>
                                           <div className="lang">
                                                 <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >en</a> | <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a></div>
                                         </li> */}

                                    {/* <li><Link to={`/${store_locale}/amirah-club`}>
                                        <FormattedMessage id="header.clubName" defaultMessage="THE BODY SHOP" />
                                    </Link></li> */}

                                    {/* <li><Link to={`/${store_locale}/store-locator`} className="whatsapp"><i className="icon-marker"></i><span style={{ whiteSpace: 'nowrap' }}>
                                        <FormattedMessage id="header.storeLocator" defaultMessage="Store Locator" />
                                    </span></Link></li>
                                    <li><a href="https://api.whatsapp.com/send?phone=971565069237" target="_blank" className="whatsapp"><i className="icon-whatsapp" /><span style={{ whiteSpace: 'nowrap' }}><FormattedMessage id="header.ContactUs" defaultMessage="Contact Us" /></span></a></li> */}
                                </ul >
                                <ul className="rightLink">
                                    <li className="titleHover">
                                        <Link to={`/${store_locale}/store-locator`} style={{ textDecoration: 'none' }}>
                                            <img src={location} className="image-ion" style={{ marginTop: 5 }}></img>
                                            <label className="iconLeble text-color changeLinkText"><FormattedMessage id="Header.StoreFinder" defaultMessage="Store Finder" /></label>
                                        </Link>
                                    </li>
                                    <li className="titleHover">
                                        {/* <img src={help} className="image-ion"></img>
                                        <label style={{ lineHeight: '0.5rem' }} className="iconLeble text-color changeLinkText"></label> */}
                                        <Link to={`/${store_locale}/help-and-faq`} style={{ textDecoration: 'none' }}>
                                            <img src={help} className="image-ion" style={{ marginTop: 6 }}></img>
                                            <label className="iconLeble text-color changeLinkText"><FormattedMessage id="Header.Help" defaultMessage="Help" /></label>
                                        </Link>
                                    </li>
                                    <li className="titleHover" style={this.state.userLogin ? { display: 'none' } : { display: 'inline-block'}}>
                                        <Link to={`/${store_locale}/sign-in-register`} style={{ textDecoration: 'none' }}>
                                            <img src={profile} className="image-ion" style={{ marginTop: 6 }}></img>
                                            <label className="iconLeble text-color changeLinkText"><FormattedMessage id="Header.SignInOrRegister" defaultMessage="Sign in / Register" /></label>
                                        </Link>
                                    </li>
                                    <li style={this.state.userLogin ? { display: 'inline-block', paddingTop: 1 } : { display: 'none' }}>
                                        <img src={profile} className="image-ion" style={{ marginTop: 2, height: 16, width: 16 }}></img>
                                        <label className="iconLeble text-color"><span><FormattedMessage id="header.Hello" defaultMessage="Hello" />,&nbsp; {this.props.user_details.customer_details.firstname} </span></label>
                                    </li>
                                    <li onClick={() => this.goToMyAccount()} style={this.state.userLogin ? { display: 'inline-block' } : { display: 'none' }}>
                                       
                                            <label className="iconLeble text-color changeLinkText"><FormattedMessage id="header.MyAccount" defaultMessage="My Account" /></label>
                                       
                                    </li>

                                    <li style={this.state.userLogin ? { display: 'inline-block' } : { display: 'none' }}>
                                        <label className="iconLeble text-color changeLinkText" onClick={this.logOut}><FormattedMessage id="header.SignOut" defaultMessage="Sign Out" /></label>
                                    </li>
                                    {/* <li style={this.state.userLogin ? {display: 'inline-block'} : {display: 'none'}}>
                                        <label className="iconLeble text-color changeLinkText"><FormattedMessage id="header.SignOut" defaultMessage="Sign Out" /></label>
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
                                <Col xs="4" className="logo-ipad" style={{ paddingLeft: 0, paddingRight: 0, textAlign: 'start' }}>
                                    <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                        <img style={{ height: 64, width: "75%", paddingLeft: 5 }} src={logoGroup} />
                                    </Link>
                                </Col>
                                <Col xs="5" style={{ padding: 6 }}><Search store_locale={store_locale} /></Col>
                                <Col xs="1" className="col-remove"></Col>
                                <Col xs="2" className="width-custom" style={{ paddingTop: 15, paddingLeft: 5, paddingRight: 5 }}>
                                    <Link to={`/${store_locale}/cart`} onClick={() => this.gotoCheckOutPage()} style={{ textDecoration: 'none' }}>
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
                                                <img src={bagLogo} style={{ height: 25, width: 25 }} />
                                            </li>
                                            <li style={{ paddingTop: 8 }}>
                                                <label className="headerLable2"><FormattedMessage id="header.mybasket" defaultMessage="My Basket" />
                                                    {/* <span style={{ fontFamily: "VAG Rounded ELC Bold", marginLeft: 10 }}>£30.00</span> */}
                                                </label>
                                            </li>

                                            <li style={{ paddingTop: 8 }}>
                                                <label className="lable-count">{product ? product.length : 0}</label>
                                            </li>
                                        </ul>
                                    </Link>
                                </Col>
                            </Row>
                            <div className="divShowOnMobile" style={{ backgroundColor: "#fff", height: '4.2rem', paddingTop: 10 }}>
                                {/* <div className="language">
                                    <button className={this.state.showMenu ? 'Button is-open' : 'Button'} onClick={this.showMenu}>{globals.language.toUpperCase()}</button>
                                    {
                                        this.state.showMenu
                                            ? (
                                                <div className="menu">
                                                    <ul>
                                                        <li className="currency__item">
                                                            <a href="javascript:void(0);" onClick={(e) => this.translate('en', 'ltr')} className="active" >EN | English</a>
                                                        </li>
                                                        <li className="currency__item">
                                                            <a href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')}> AR | Arabic</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            )
                                            : (
                                                null
                                            )
                                    }
                                </div> */}

                                <div className="changecountry">
                                    <div className="country">
                                        <div onClick={this.showCountries} className={this.state.showCountries ? "activeCountry open divShowOnMobile" : "activeCountry divShowOnMobile"}>
                                            {this.state.country_name.toUpperCase() == 'UAE' ?
                                                <img style={{ height: '20px', width: '30px' }} src={UAEImage}></img>
                                                : <img style={{ height: '20px', width: '30px' }} src={KSAImage}></img>
                                            }
                                            <label className="text-color">
                                            &nbsp;{this.state.country_name.toUpperCase() == 'UAE' ?
                                                <FormattedMessage id="header.uae" defaultMessage="UAE" />
                                                : <FormattedMessage id="header.ksa" defaultMessage="KSA" />
                                                } 
                                             </label>
                                            <span className="selected">
                                                <FormattedMessage id="header.defaultCountry" defaultMessage="Select Your Country" />
                                            </span>
                                            <i className="icon-down" ></i>
                                        </div>
                                        <div className="list" style={{ textAlign: 'start' }}>
                                            {this.state.country_name.toUpperCase() == 'UAE' ?
                                                <div>
                                                    <div style={{ paddingLeft: 10, paddingBottom: 7 }}>
                                                        <img style={{ height: '20px', width: '30px' }} src={UAEImage}></img>
                                                        <a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uae" defaultMessage="UAE" /></a>
                                                    </div>
                                                    <div style={{ paddingLeft: 10 }}>
                                                        <img style={{ height: '20px', width: '30px' }} src={KSAImage}></img>
                                                        <a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a>
                                                    </div>
                                                </div>
                                                : <div>
                                                    <div style={{ paddingLeft: 10 }}>
                                                        <img style={{ height: '20px', width: '30px' }} src={KSAImage}></img>
                                                        <a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('KSA')}><FormattedMessage id="header.ksa" defaultMessage="KSA" /></a>
                                                    </div>
                                                    <div style={{ paddingLeft: 10, paddingTop: 7 }}>
                                                        <img style={{ height: '20px', width: '30px' }} src={UAEImage}></img>
                                                        <a href="javascript:void(0);" className="uae" id="cart" onClick={() => this.onChangeCountry('UAE')}><FormattedMessage id="header.uae" defaultMessage="UAE" /></a>
                                                    </div>
                                                </div>}
                                            {/* <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('UAE', 'NETHERLANDS')}><FormattedMessage id="header.netherlands" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="ksa" id="cart" onClick={() => this.onChangeCountry('UAE', 'SLOVENIA')}><FormattedMessage id="header.slovenia" defaultMessage="KSA" /></a></li>
                                                    <li><a href="javascript:void(0);" className="usd" id="cart" onClick={() => this.onChangeCountry('International', 'UNITED KINGDOM')}><FormattedMessage id="header.uk" defaultMessage="International" /></a></li> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="ll enghishTextPadding" style={{ display: 'inline-block' }}>
                                    <div className="lang" style={{ fontSize: '1.2rem' }}>
                                        <a href="javascript:void(0);" style={this.props.globals.language=='en' ?{fontFamily:'VAG Rounded ELC Bold'} : {}} onClick={(e) => this.translate('en', 'ltr')} className="active" >English</a>
                                    </div>
                                </div>
                                <div style={{ paddingLeft: 8, display: 'inline-block' }}> - </div>
                                <div className="ll" style={{ padding: 0, display: 'inline-block' }}>
                                    <div className="lang" style={{ paddingLeft: 8, fontSize: '1.2rem' }}>
                                        <a style={this.props.globals.language=='ar' ?{fontFamily:'VAG Rounded ELC Bold'} : {}} href="javascript:void(0);" onClick={(e) => this.translate('ar', 'rtl')} >العربية</a>
                                    </div>
                                </div>
                                <div className="floatRight" style={{ display: 'inline-block' }}>
                                    <span style={{ height: 40 }}>
                                        <Link to={`/${store_locale}/birth-day-club`} style={{ textDecoration: 'none' }}>
                                            <button className="mobileHomePageButtonSecond text-color"><FormattedMessage id="header.TheBirthdayclub" defaultMessage="Birthday Club" /></button>
                                        </Link>
                                    </span>
                                </div>
                                {/* <div className="help-icon">
                                    <Link to={`/${store_locale}/help-and-faq`} style={{ textDecoration: 'none' }}>
                                        <li className="titleHover">
                                            <img src={help} className="image-ion" style={{ height: 30, width: 30 }}></img>
                                        </li>
                                    </Link>
                                </div> */}
                            </div>
                            <div className="divShowOnMobile" style={{ paddingTop: 10 }}>
                                <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                                    <img className="mobileHomeLogo" src={logoGroup} />
                                </Link>
                                <Link to={`/${store_locale}/store-locator`} style={{ textDecoration: 'none' }}>
                                    <img src={storeFinderMobile} className="mobileHomePageIcon hide-mob"></img></Link>
                                <Link className="basket-icon" to={`/${store_locale}/cart`} onClick={() => this.gotoCheckOutPage()} style={{ textDecoration: 'none' }}>
                                    <img src={bagLogo} className="mobileHomePageIcon" style={{ height: 25, width: 25 }} />
                                    <label className="lable-count">{product ? product.length : 0}</label>
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
                    </div>
                    {this.state.goToMyAccount ? <div className="modal-my-account showOnWeb">
                        <ul className="row ul-myaccount">
                            <li onClick={() => this.onAccountMeunClick(true)} className="li-my-account-tab col-md-4"><Link className="li-my-account-tab" to={`/${store_locale}/address-book`}><FormattedMessage id="addressBook" defaultMessage="Address Book" /></Link></li>
                            <li onClick={() => this.onAccountMeunClick(true)} className="li-my-account-tab col-md-4"><Link className="li-my-account-tab" to={`/${store_locale}/order-history`}><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></Link></li>
                            <li onClick={() => this.onAccountMeunClick(true)} className="li-my-account-tab col-md-4"><Link className="li-my-account-tab" to={`/${store_locale}/update-password`}><FormattedMessage id="change.password" defaultMessage="Change Password" /></Link></li>
                            <li onClick={() => this.onAccountMeunClick(true)} className="li-my-account-tab col-md-4"><Link className="li-my-account-tab" to={`/${store_locale}/birthday-club-account`}><FormattedMessage id="birthdayclub.header" defaultMessage="Birthday Club" /></Link></li>
                            <li onClick={() => this.onAccountMeunClick(true)} className="li-my-account-tab col-md-4"><Link className="li-my-account-tab" to={`/${store_locale}/address-book`}><FormattedMessage id="addressBook" defaultMessage="Personal Details" /></Link></li>
                            <li onClick={() => this.onAccountMeunClick(true)} className="li-my-account-tab col-md-4"><Link className="li-my-account-tab" to={`/${store_locale}/wish-list`}><FormattedMessage id="header.Wishlist" defaultMessage="Wishlist" /></Link></li>
                        </ul>

                    </div> : <div />}

                    <div id="R33786937309169806" className="menuOverlay"> </div>
                    <div id="R33786847982169805" className="row-3 hideBackPageScroll">
                        <a to="JavaScript:;" id="closeNav" className="closeNav"><i className="close fa fa-times" aria-hidden="true" /></a>
                        <div className="containers-main">
                            <div style={{ padding: "0px 10px" }}>
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
                    <div className="header-slider headerSlider2">
                        <Link to={`/${store_locale}/delivery-policy`} style={{ textDecoration: 'none' }}>
                            <Slider {...settings}>
                                <div>
                                    <Row className="direction-r">
                                        <Col xs="0" lg="3" md="3" className="col-width"></Col>
                                        <Col xs="0" lg="2" md="2" style={{ paddingLeft: 0 }} className="padd-icon-zero first-imag">
                                            <img src={deliveryBy} className="imageHight40 divShowOnWeb " />
                                        </Col>
                                        <Col xs="12" lg="7" md="7" style={{ padding: 0}}>
                                            <ul className="headerSlideTextAlign">
                                                <li style={{ fontSize: 15, color: "#0D943F", lineHeight: '0.5', fontWeight: 'bold' }}>
                                                    <FormattedMessage id="header.FreeStdDelivery" defaultMessage="Free Standard Delivery" />
                                                </li>
                                                {this.props.globals.country == 'UAE' ?
                                                    <li style={{ fontSize: 12, lineHeight: '2.5', fontWeight: 'bold' }} className="text-color">
                                                        <FormattedMessage id="WhenyouspendAED250UAE" defaultMessage="When you spend AED 250" />
                                                    </li> :
                                                     <li style={{ fontSize: 12, lineHeight: '2.5', fontWeight: 'bold' }} className="text-color">
                                                        <FormattedMessage id="WhenyouspendSAR250KSA" defaultMessage="When you spend SAR 250" />
                                                    </li>
                                                }
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Row className="direction-r">
                                        <Col xs="0" lg="3" md="3"></Col>
                                        <Col xs="0" lg="2" md="2" className="padd-icon-zero">
                                            <img src={freeDelivery} className="imageHight40 divShowOnWeb" />
                                        </Col>
                                        <Col xs="12" lg="7" md="7" className="padd-zer" style={{ padding: 0 }}>
                                            <ul className="headerSlideTextAlign">
                                                <li style={{ fontSize: 15, color: "#0D943F", lineHeight: '0.5', fontWeight: 'bold' }}>
                                                    <FormattedMessage id="header.FreeGiftwrapping" defaultMessage="Free Gift wrapping" />
                                                </li>
                                                <li style={{ fontSize: 12, lineHeight: '2.5', fontWeight: 'bold' }} className="text-color">
                                                    <FormattedMessage id="Onanyorder" defaultMessage="On any order" />
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                                <div>
                                    <Row className="direction-r">
                                        <Col xs="0" lg="3" md="3"></Col>
                                        <Col xs="0" lg="2" md="2" className="padd-icon-zero">
                                            <img src={freeCollect} className="imageHight40 divShowOnWeb" />
                                        </Col>
                                        <Col xs="12" lg="7" md="7" style={{ padding: 0 }}>
                                            <ul className="headerSlideTextAlign">
                                                <li style={{ fontSize: 15, color: "#0D943F", lineHeight: '0.5', fontWeight: 'bold' }}>
                                                    <FormattedMessage id="header.FreeReturns" defaultMessage="Free Returns" />
                                                </li>
                                                <li style={{ fontSize: 12, lineHeight: '2.5', fontWeight: 'bold' }} className="text-color">
                                                    <FormattedMessage id="Instoresoronline" defaultMessage="In stores or Online" />
                                                </li>
                                            </ul>
                                        </Col>
                                    </Row>
                                </div>
                            </Slider>
                        </Link>

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
        isUserLoggedIn: state.login.isUserLoggedIn,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser()),
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