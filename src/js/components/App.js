import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import Header from '../components/Common/Header/Header';
import OfferStripe from '../components/Common/OfferStripe/OfferStripe';
import Footer from '../components/Common/Footer/Footer';
import { BASE_URL, CLONE_BASE_URL, API_TOKEN } from '../api/globals';
import { connect } from 'react-redux';
import * as actions from '../redux/actions/index'
import { store } from '../redux/store/store'
import '../../styles/App.css';


// GTM
import { initialize } from './utility/googleAnalytis';
import { initializeGTM } from './utility/googleTagManager';
import AboutUs from './StaticPages/AboutUs/AboutUs';
import NewsLetter from './StaticPages/Newsletter/Newsletter'
import Charity from './StaticPages/Charity/Charity'
import ContactUs from './StaticPages/ContactUs/ContactUs';
import DeliveryPolicy from "./StaticPages/DeliveryPolicy/DeliveryPolicy";
import ConsumerRights from './StaticPages/ConsumerRights/ConsumerRights'
import HelpFAQ from './StaticPages/HelpFAQ/HelpFAQ';
import PrivacyPolicy from './StaticPages/PrivacyPolicy/PrivacyPolicy';
import ReturnPolicy from './StaticPages/ReturnPolicy/ReturnPolicy'
import TermConditions from './StaticPages/TermsConditions/TermsConditions';
import ProfileAddress from './CustomerAddress/ProfileAddress';
import BirthDayClub from './StaticPages/BirthDayClub/BirthDayClub'
import AddNewBirthDayClubChild from './StaticPages/BirthDayClub/AddNewChild';
import Login from './Login/Login';
import MyProfile from './MyProfile/MyProfile';
import ShoppingBag from './ShoppingBag/ShoppingBag';
import CheckOutLoginWelcome from './CheckOut/Login/CheckOutLoginWelcome';
import CheckoutPayment from './CheckOut/Payment/Payment';
import Confirmation from './CheckOut/Confirmation/Confirmation';
import DeliveryDetails from './CheckOut/DeliveryDetails/DeliveryDetails'
import OrderSummary from './CheckOut/OrderSummary/OrderSummary';
import { Route, Link, Switch } from 'react-router-dom'
import Home from './Home/Home';
import Spinner2 from '../components/Spinner/Spinner2';
import Product from './Product/Product-Listing';
import ProductDetails from './Product/product-details/Product-details';
import WishList from './WishList/WishList';
import Order from './OrderHistory/OrderHistory';
import OredrDetails from './OrderHistory/viewVoucher';
import ResetPassword from './resetPassword';
import StoreLocator from './StoreLocator/store-locator';
import { BrowserRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import { CookiesProvider } from 'react-cookie';
import en from "react-intl/locale-data/en";
import ar from "react-intl/locale-data/ar"
import LangPopup from '../components/HOC/LangPopup';
import cookie from 'react-cookies';
import Axios from 'axios';
import ScrollToTop from '../components/HOC/ScrollToTop';
//import Discover from '../components/Discover';
import StoreChangeLoader from '../components/Spinner/StoreChangeLoader'
import Offers from '../components/Offers';
import VipRegPopup from './Home/VipRegPopup';
import { setChangeStore, getIpInfo,getCountOfGeoIp ,saveStoreInfo} from '../redux/actions/globals';
import localeData from '../../config/libs/i18n/data.json'
import ProductList from '../components/PoductList/ProductListing'
import NewCheckOut from '../components/NewCheckOut/CheckOut'
import PresentFinder from '../components/PresentFinder/PresentFinder';
import Xmas from '../../js/components/Xmas/Xmas';
import { live } from '../api/globals';
addLocaleData([...en, ...ar]);

//const language = 'en';
let oldStoreID;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            language: 'en',
            dir: 'ltr',
            changeData: false,
            store_id: '',
            toHome: false,
            selectedStore: '',
            showStoreChangeLoader:false,
            isStoreChangeAPICalled:false

        }
      let active_server = 'dev';
        if (window.location.href.includes('elcjsuat')) {
            active_server = 'uat';
        } else if (window.location.href.includes('elctoys.com')) {
            active_server = 'live';
        }
       // this.getGeoInfo();

        // if (active_server==='live') {
            initialize();
            initializeGTM();
       // }
        console.log("active_server value",active_server)
        //this.checkLanguage();
    }


    static getDerivedStateFromProps = (props, state) => {
        if (props.changeData) {
            let lang;

            if (state.changeData) {
                lang = state.language;
            }
            else {
                lang = props.selectedLang;
            }


            let toHome = props.toHome;

            let dir = lang === 'en' ? 'ltr' : 'rtl';
            return { language: lang, dir: dir, toHome: toHome }
        }
        return null;
    }

    _changeStoreId = (store_id, quote_id, store_locale) => {
        const API = Axios.create({
            baseURL: CLONE_BASE_URL,
            headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" }
        });

        const reqdata = {
            store_id: store_id,
            quote_id: quote_id
        };
        //this._redirectWithLocale(store_locale);  
        API.post('/Storechange', reqdata).then(res => {

            this._redirectWithLocale(store_locale);   //Change URL Location based on new Locale
        })


    }

    getStoreId = (country, lang) => {
        //const { store } = this.props;
        //let store_data = country + "_" + lang;

        if (country == undefined) {
            country = cookie.load("countryThroughIPFromIndexjs")
        }
        if (lang == undefined) {
            lang = 'en';
        }
        let store_data = country + "_" + lang;
        // let store_data = cookie.load('country') + "_" + lang;

        const API = Axios.create({
            baseURL: CLONE_BASE_URL,
            headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" }
        });

        const reqdata = {
            store_data: store_data
        };

        API.get('/storeinfo?store_data=' + reqdata.store_data, reqdata).then(res => {
            let storeId = res.data.store_id;
            if (!storeId) {
                if (lang === 'en') {
                    storeId = 4;
                } else if (lang === 'ar') {
                    storeId = 3;
                }
            }
            localStorage.setItem('tempstoreid', storeId);
            localStorage.setItem('oldStoreID',storeId)
            localStorage.setItem('templang', lang);


            const country_name = this.getCountryName(country);
            const store_locale = ((country_name === '') || (country_name === null) || (country_name === undefined)) ? lang : country_name + "-" + lang;

            cookie.save('storeid', storeId, { path: '/' });
            cookie.save('language', lang, { path: '/' });
            cookie.save('country', country, { path: '/' });
            cookie.save('country_name', country_name, { path: '/' });
            cookie.save('store_locale', store_locale, { path: '/' });

            localStorage.setItem('storeid', storeId);
            localStorage.setItem('store_locale', store_locale);

            this.setState({ selectedStore: store_data, store_id: storeId, language: lang, changeData: true });
            store.dispatch(setChangeStore({ store_id: storeId, language: lang }));

            let { guest_user, login } = store.getState();
            let quote_id;

            if (login.customer_details.quote_id) {
                quote_id = login.customer_details.quote_id;
            } else {
                quote_id = guest_user.new_quote_id ? guest_user.new_quote_id : guest_user.temp_quote_id;
            }

            // quote_id = (guest_user.new_quote_id) ? guest_user.new_quote_id : guest_user.temp_quote_id;

            this._changeStoreId(storeId, quote_id, store_locale);

        })
    }

    _redirectWithLocale = (newLocale) => {
        this.setState({isStoreChangeAPICalled:true})
        const curr_pathname = window.location.pathname;
        let new_path = curr_pathname.split('/');
        let new_pathname;
        if (new_path.length > 0) {
            new_path[1] = newLocale;
            new_pathname = new_path.join('/');
            window.location.pathname = new_pathname;
        }
    }

    handleLanguageSelection = (language) => {
        let country;
        //country = (cookie.load('country') === null) ? 'KSA' : cookie.load('country');

        if (cookie.load('country') ===undefined) {
            country = cookie.load("countryThroughIPFromIndexjs")
        } else {
            country = cookie.load('country');
        }
        this.setState({
            showStoreChangeLoader: true
          });
        this.getStoreId(country, language);
        this.handleDir(language);
    }

    handleCountrySelection = (country) => {
        let language;
       // language = (cookie.load('language') === null) ? 'ar' : cookie.load('language');
        if (cookie.load('language') ===undefined) {
            language = 'en';
        } else {
            language = cookie.load('language');
        }
        this.setState({
            showStoreChangeLoader: true
          });

        this.getStoreId(country, language);
        this.handleDir(language);
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

    getStoreLocale(storeid) {
        var str_lc;

        if (storeid === '1') {
            str_lc = 'saudi-ar';
        } else if (storeid === '2') {
            str_lc = 'saudi-en';
        } else if (storeid === '3') {
            str_lc = 'uae-ar';
        } else if (storeid === '4') {
            str_lc = 'uae-en';
        } else if (storeid === '5') {
            str_lc = 'ar';
        } else if (storeid === '6') {
            str_lc = 'en';
        }
        return str_lc;
    }

    getCountryName(country) {
        var country_name;

        switch (country) {
            case 'KSA':
                country_name = 'saudi';
                break;
            case 'UAE':
                country_name = 'uae';
                break;
            case 'International':
                country_name = '';
                break;
            default:
                country_name = '';
        }
        return country_name;
    }
    checkLanguage() {
        const curr_pathname = window.location.pathname;
        let new_path = curr_pathname.split('/');
        let { guest_user, login,global } = store.getState();
        let storeID;
        if(new_path[1]==='uae-en'){
          storeID=4
        }else if(new_path[1]==='uae-ar'){
            storeID=3
        }else if(new_path[1]==='saudi-en'){
            storeID=2
        }else if(new_path[1]==='saudi-ar'){
            storeID=1
        }

        if (new_path.length > 0) {
        let changedLang=localStorage.getItem('tempstoreid')
        let changedLangInt=parseInt(changedLang)
          if(changedLangInt!==this.props.globals.currentStore){
            this.getURLCountryCode(new_path[1]);
          }
        }
      }
    //   componentDidUpdate(props,prevProps){
    //      console.log("prevprops",prevProps)
    //      if(this.props.globals!==prevProps.store_id){
    //       this.checkLanguage();
    //      }
    //   }
     
     
    componentDidMount() {
    //localStorage.removeItem("oldStoreID")
     let   changedLang = localStorage.getItem('tempstoreid');
    // const curr_pathname = window.location.pathname;
    // if( changedLang==3 && curr_pathname.includes('ar')){
    //   this.handleLanguageSelection('ar');
    // }
    // else if(changedLang==4 && curr_pathname.includes('en')){
    //   this.handleLanguageSelection('en');
    // }

     
        let _storeId = localStorage.getItem('tempstoreid');
        if (_storeId) {
            let templang = localStorage.getItem('templang');
            this.setState({ store_id: _storeId, language: templang, changeData: true });
        } else {
            let _storeId = localStorage.setItem('tempstoreid', 4);
            let templang = localStorage.setItem('templang', 'en');
            this.setState({ store_id: _storeId, language: templang, changeData: true });
        }
        // const API = Axios.create({
        //     baseURL: CLONE_BASE_URL,
        //     headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" }
        //   });
      
        //   const reqdata = {
        //     store_data: '',
        //     other_param: '',
        //   };
      
        //   API.get('/storeinfo', {
        //     params: {
        //       ...reqdata
        //     }
        //   }).then(res => {
        //     if (res.data.status) {
        //       store.dispatch(saveStoreInfo({ storeInfo: res.data.data }));
        //     }
        //   });
      
        }
      
        handleLangCountrySelection1 = (country, lang) => {;
          this.setState({
            showStoreChangeLoader: true
          });
      
          this.getStoreId(country, lang);
          this.handleDir(lang);
        }
        handleLangCountrySelection = (country = 'UAE', language = 'en') => {
            this.setState({
              showStoreChangeLoader: true
            });
        
            this.getStoreId(country, language);
            this.handleDir(language);
          }
      
      
        getURLCountryCode = (url_value) => {
          switch(url_value) {
           
            case 'uae-en':
              this.handleLangCountrySelection1('UAE', 'en');
              break;
            case 'uae-ar':
              this.handleLangCountrySelection1('UAE', 'ar');
              break;
            case 'saudi-en':
              this.handleLangCountrySelection1('KSA', 'en');
              break;
            case 'saudi-ar':
              this.handleLangCountrySelection1('KSA', 'ar');
              break;
          }
    }

    _renderVipReg() {

        const store_locale = localStorage.getItem('store_locale');
        const displayVipReg = localStorage.getItem('displayVipReg');
        let vipRegPopup;

        if ((store_locale !== null) && (displayVipReg === "true")) {

            return (
                <VipRegPopup store_locale={store_locale} />
            );
        }

    }

    render() {
      
        // document.getElementById("dir").dir = this.state.dir;
        let { language } = this.state;
        //const messages = localeData[language] || localeData.en;
        const messages = localeData[language] || localeData.en;
        //let dir = this.props.selectedLang === 'ar' ? 'rtl' : 'ltr';
        this.handleDir(language);
        let store_locale=store.getState();
         let isUpdateThroughIP=store.getState()
         let abc=isUpdateThroughIP.global.isUpdateThroughIP;

        return (
            <>
            {!abc ? <Spinner2 style={{top:'50%'}} /> :
                  <CookiesProvider>
                <IntlProvider locale={language} messages={messages}>
                        <BrowserRouter>
                            <ScrollToTop>
                                <>
                                    {/* <Header /> */}
                                    {this._renderVipReg()}
                                    <Header handleLanguageSelection={this.handleLanguageSelection} handleCountrySelection={this.handleCountrySelection} />
                                    <Switch>
                                        <Route path="/home" component={Home} />
                                        <Route exact path="/" component={Home} />
                                        <Route exact path="/:locale" component={Home} />
                                        <Route exact path="/:locale/home" component={Home} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/xmas" component={Xmas}/>
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/sign-in-register" component={Login} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/profile" component={MyProfile} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/order-history" component={Order} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/view-voucher" component={OredrDetails} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/wish-list" component={WishList} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/birth-day-club" component={BirthDayClub} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/add-new-birth-day-club-child" component={AddNewBirthDayClubChild} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/about-us" component={AboutUs} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/contact-us" component={ContactUs} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/newsletter" component={NewsLetter} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/presentfinder" component={PresentFinder} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/charity" component={Charity} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/delivery-policy" component={DeliveryPolicy} />

                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/help-and-faq" component={HelpFAQ} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/consumer-rights" component={ConsumerRights} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/privacy-policy" component={PrivacyPolicy} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/return-policy" component={ReturnPolicy} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/terms-and-conditions" component={TermConditions} />

                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/products/:category_path" component={Product} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/products-details/:category" component={ProductDetails} />

                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/(store-locator-uae|store-locator-saudi|store-locator-kuwait|store-locator-bahrain|store-locator-qatar|store-locator-oman|store-locator-morocco|store-locator)/" component={StoreLocator} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/cart" component={ShoppingBag} />

                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/checkout-login" component={CheckOutLoginWelcome} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/checkout-payment" component={CheckoutPayment} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/order-confirm" component={Confirmation} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/delivery-details" component={DeliveryDetails} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/order-summary" component={OrderSummary} />

                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/profile-address" component={ProfileAddress} />
                                        {/* <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/add-wishlist" component={Login} /> */}

                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/password-rest" component={ResetPassword} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/product-list" component={ProductList} />
                                        <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/new-check-out" component={NewCheckOut} />
                                    </Switch>
                                    <Footer />

                                </>
                            </ScrollToTop>
                        </BrowserRouter>
                    </IntlProvider>
                </CookiesProvider>}
            </>
        );
    }
}

export default LangPopup({})(App);
