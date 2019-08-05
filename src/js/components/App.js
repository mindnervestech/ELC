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
import TermConditions from './StaticPages/TermsConditions/TermsConditions';
import HelpCenter from './StaticPages/HelpCenter/HelpCenter';
import PaymentMethods from './StaticPages/PaymentMethods/PaymentMethods';
import PrivacyPolicy from './StaticPages/PrivacyPolicy/PrivacyPolicy';
import ReturnPolicy from './StaticPages/ReturnPolicy/ReturnPolicy';
import AboutUs from './StaticPages/AboutUs/AboutUs';
import DeliveryPolicy from './StaticPages/DeliveryPolicy/DeliveryPolicy';
import FAQ from './StaticPages/Faq/Faq';
import ContactUs from './StaticPages/ContactUs/ContactUs';
import ProfileAddress from './CustomerAddress/ProfileAddress';

import SearchQuery from './StaticPages/HelpCenter/SearchQuery';
import HelpContact from './StaticPages/HelpCenter/HelpContact';

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
import Offers from '../components/Offers';
import VipRegPopup from './Home/VipRegPopup';
import { setChangeStore } from '../redux/actions/globals';
import localeData from '../../config/libs/i18n/data.json'
addLocaleData([...en, ...ar]);



//const language = 'en';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'ar',
      dir: 'rtl',
      changeData: false,
      store_id: '',
      toHome: false,
      selectedStore: ''
    }
  }


  static getDerivedStateFromProps = (props, state) => {
    if (props.changeData) {
      // console.log("props", props);
      //console.log("state", state);
      let lang;
      //console.log('statechangeData', state.changeData);

      if (state.changeData) {
        lang = state.language;
        //console.log("true");
      }
      else {
        lang = props.selectedLang;
        //console.log("false");
      }

      //console.log("Lang", lang);

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

    API.post('/Storechange', reqdata).then(res => {
      // console.log('Storechange API called', res);
     
      this._redirectWithLocale(store_locale);   //Change URL Location based on new Locale
    })

  }

  getStoreId = (country, lang) => {
    //const { store } = this.props;
    //console.log('STORE' ,store);
    //console.log('STORE state' ,store.getState());
    //let store_data = country + "_" + lang;

    let store_data = country + "_" + lang;
    // let store_data = cookie.load('country') + "_" + lang;

    const API = Axios.create({
      baseURL: CLONE_BASE_URL,
      headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" }
    });

    const reqdata = {
      store_data: store_data
    };

    API.post('/storeinfo', reqdata).then(res => {
      console.log('STOREINFO res', res);
      localStorage.setItem('tempstoreid', res.data.store_id);
      localStorage.setItem('templang', lang);

      const country_name = this.getCountryName(country);
      const store_locale = ((country_name === '') || (country_name === null) || (country_name === undefined)) ? lang : country_name + "-" + lang;

      cookie.save('storeid', res.data.store_id, { path: '/' });
      cookie.save('language', lang, { path: '/' });
      cookie.save('country', country, { path: '/' });
      cookie.save('country_name', country_name, { path: '/' });
      cookie.save('store_locale', store_locale, { path: '/' });

      localStorage.setItem('storeid', res.data.store_id);
      localStorage.setItem('store_locale', store_locale);

      this.setState({ selectedStore: store_data, store_id: res.data.store_id, language: lang, changeData: true });
      store.dispatch(setChangeStore({ store_id: res.data.store_id, language: lang }));

      let { guest_user, login } = store.getState();
      let quote_id;

      if (login.customer_details.quote_id) {
        quote_id = login.customer_details.quote_id;
      } else {
        quote_id = (guest_user.new_quote_id) ? guest_user.new_quote_id : guest_user.temp_quote_id;
      }

      // quote_id = (guest_user.new_quote_id) ? guest_user.new_quote_id : guest_user.temp_quote_id;

      this._changeStoreId(res.data.store_id, quote_id, store_locale);

    })
  }

  _redirectWithLocale = (newLocale) => {
    // console.log('window.location.pathname', window.location.pathname);
    const curr_pathname = window.location.pathname;
    let new_path = curr_pathname.split('/');
    let new_pathname;
    if (new_path.length > 0) {
      new_path[1] = newLocale;
      new_pathname = new_path.join('/');
      console.log('window.location.pathname', new_pathname);
      window.location.pathname = new_pathname;
    }
  }

  handleLanguageSelection = (language) => {
    //console.log('In App Lang sel');

    let country;
    //country = (cookie.load('country') === null) ? 'KSA' : cookie.load('country');

    if ((cookie.load('country') === null) || (cookie.load('country') === "undefined")) {
      country = 'KSA';
    } else {
      country = cookie.load('country');
    }
    this.getStoreId(country, language);
    this.handleDir(language);
  }

  handleCountrySelection = (country) => {
    //console.log('In App country sel',country);

    let language;
    // language = (cookie.load('language') === null) ? 'ar' : cookie.load('language');
    if ((cookie.load('language') === null) || (cookie.load('language') === "undefined")) {
      language = 'ar';
    } else {
      language = cookie.load('language');
    }

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

  componentDidMount() {
    //console.log('LOCAL APP mounted');

    let changedLang = localStorage.getItem('tempstoreid');
    if (changedLang) {
      let templang = localStorage.getItem('templang');

      this.setState({ store_id: changedLang, language: templang, changeData: true });
    }
    else {

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
    //console.log('In App Render', this.state);
    //const messages = localeData[language] || localeData.en;
    const messages = localeData[language] || localeData.en;

    //console.log('Inside Render', this.props);
    //let dir = this.props.selectedLang === 'ar' ? 'rtl' : 'ltr';
    this.handleDir(language);


    return (
      <>
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
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/Login" component={Login} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/profile" component={MyProfile} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/order-history" component={Order} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/view-voucher" component={OredrDetails} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/wish-list" component={WishList} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/brand-overview" component={AboutUs} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/contact-us" component={ContactUs} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/products/:category_path" component={Product} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/products-details/:category" component={ProductDetails} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/help" component={HelpCenter} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/delivery" component={DeliveryPolicy} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/faq" component={FAQ} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/returns-and-exchanges" component={ReturnPolicy} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/privacy-policy" component={PrivacyPolicy} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/terms-and-conditions" component={TermConditions} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/payment-methods" component={PaymentMethods} />

                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/(store-locator-uae|store-locator-saudi|store-locator-kuwait|store-locator-bahrain|store-locator-qatar|store-locator-oman|store-locator-morocco|store-locator)/" component={StoreLocator} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/cart" component={ShoppingBag} />

                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/checkout-login" component={CheckOutLoginWelcome} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/checkout-payment" component={CheckoutPayment} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/order-confirm" component={Confirmation} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/delivery-details" component={DeliveryDetails} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/order-summary" component={OrderSummary} />

                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/profile-address" component={ProfileAddress} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/search-help" component={SearchQuery} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/help-contact" component={HelpContact} />
                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/add-wishlist" component={Login} />

                    <Route path="/:locale(en|ar|uae-en|uae-ar|saudi-en|saudi-ar)/password-rest" component={ResetPassword} />
                  </Switch>
                  <Footer />

                </>
              </ScrollToTop>
            </BrowserRouter>
          </IntlProvider>
        </CookiesProvider>
      </>
    );
  }
}

export default LangPopup({})(App);