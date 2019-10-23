import React, { Component } from 'react';
import './Login.css';

import Modal from 'react-responsive-modal';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Spinner from '../Spinner/Spinner';
import { EmailValidator } from '../../api/Validators';
import GuestCheckout from '../CheckOut/Login/GuestCheckout';
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import * as actions from '.././../redux/actions/index';
import queryString from 'query-string';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import { Helmet } from 'react-helmet';
class Login extends Component {

  constructor(props) {
    super(props);
    let isGuest = this.props.isGuest ? true : false;
    let startGuestCheckout = this.props.startGuestCheckout ? true : true;

    //console.log(this.props)

    this.state = {
      email: '',
      password: '',
      errorMessage: {},
      openFirstModal: false,
      openSecondModal: false,
      isGuest: isGuest,
      counter: 0,
      login_error: this.props.login_error,
      startGuestCheckout: startGuestCheckout
    }


  }
  invalidLogin = () => {
    let login_error = this.props.login_error;
    if (!((Object.entries(login_error).length === 0) && (login_error.constructor === Object))) {
      if (this.state.counter == 0) {
        //alert(login_error.errorMessage)
        this.setState({
          errorMessage: {
            password: <FormattedMessage id="InvalidLoginOrPassoword" defaultMessage="Invalid login or password"/>,
            email: <FormattedMessage id="InvalidLoginOrPassoword" defaultMessage="Invalid login or password"/>,
          },
          counter: this.state.counter + 1
        })
      }
      if (!(this.state.isGuest)) {
        //console.log('guest :', this.state.isGuest);
        this.props.onLogoutUser()
      }

    }
  }

  componentDidMount() {
    this.props.onGetMenuNav(this.props.globals);
  }

  onOpenFirstModal = () => {
    this.setState({ openFirstModal: true });
  };

  onCloseFirstModal = () => {
    this.setState({ openFirstModal: false });
  };

  onOpenSecondModal = () => {
    this.setState({ openSecondModal: true });
  };

  onCloseSecondModal = () => {
    this.setState({ openSecondModal: false });
  }

  login = () => {
    if (this.validateForm()) {
      let guest_quote = "";
      if (this.props.guestUser.new_quote_id !== null) {
        guest_quote = this.props.guestUser.new_quote_id;
      }
      const data = {
        email: this.state.email,
        password: this.state.password,
        guestquote: guest_quote,
      }

      this.props.onLoginUser(data);
    }

  }

  onAddToWishList = () => {
    if (this.props.location.search != undefined && this.props.location.search != '') {
      const values = queryString.parse(this.props.location.search);
      const itemId = values.item;
      if (itemId) {
        const data = {
          customer_id: this.props.login_details.customer_details.customer_id,
          product_id: itemId,
        }
        this.props.onAddToWishList(data);
      }
    }else{
      var itemId = localStorage.getItem('productId-towishlist');
      if(itemId){
        const data = {
          customer_id: this.props.login_details.customer_details.customer_id,
          product_id: itemId,
        }
        this.props.onAddToWishList(data);
        localStorage.setItem('productId-towishlist', '');
      }
      
    }

  }


  validateForm = () => {
    //console.log(this.state);
    const emailIsValid = EmailValidator(this.state.email);
    let formIsValid = true;
    ////console.log('emailIsValid', emailIsValid)
    if (!(emailIsValid)) {

      this.setState((prevState) => ({
        errorMessage: {
          ...prevState.errorMessage,
          email: <FormattedMessage id="Login.username" defaultMessage="Please Enter Valid Email Address" />
        }
      }))
      formIsValid = false;
    }

    if ((this.state.password == '') || (this.state.password.length < 1)) {
      this.setState((prevState) => ({
        errorMessage: {
          ...prevState.errorMessage,
          password: <FormattedMessage id="Login.password" defaultMessage="Please Enter Valid password" />
        }

      }))

      formIsValid = false;
    }
    return formIsValid;

  }

  onChangeCredintials = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
  closeModal = () => {

    this.props.onClearForgotPass();
    this.onCloseSecondModal();
  }

  render() {

    //console.log('this.state.isGuest', this.props.login_details.isLoginSuccess && this.state.isGuest)
    const language = localStorage.getItem('templang');
    const { openFirstModal, openSecondModal } = this.state;
    const forgetPassword = <ForgotPassword closeModal={this.closeModal} />;
    const errorMessage = this.state.errorMessage;
    let guest = null;
    let newStyle = null;
    const login_details = this.props.login_details;
    const login_error = this.props.login_error;
    const invalidLogin = this.invalidLogin(login_error);
    const store_locale = this.props.globals.store_locale;
    const signUp = <SignUp store_locale={store_locale} />;

    let title = "Your account | ELC UAE Online store";
    let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
    let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
    if (language == 'ar') {
      title = "حسابك |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
      description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
      keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية";
    }

    let meta_tag = <><Helmet>
      <meta name="tital" content={title} />
      <meta name="keywords" content={keywords} />
      <meta name="description" content={description} />
    </Helmet></>;
    if (this.state.isGuest) {
      guest = <GuestCheckout />;
      newStyle = { marginBottom: 90 }
    }
    if (login_details.isUserLoggedIn && this.state.isGuest && this.state.startGuestCheckout) {
      //console.log('Hello : this is called');
      return <Redirect to={{
        pathname: `/${store_locale}/delivery-details`,
        state: { ...login_details.customer_details }
      }} />;
    }

    let breadCrumb = <Breadcrumb name={`Sign in`} translate={true} translationDataId="Header.SignInOrRegister2" defaultMessage="Sign in \ Register" />;
    if (this.state.isGuest && this.state.startGuestCheckout) {
      breadCrumb = null;
    }

    if (login_details.isUserLoggedIn) {
      this.onAddToWishList();
      return <Redirect to={{
        pathname: `/${store_locale}/profile`,
        // pathname: '/profile',
        state: { ...login_details.customer_details }
      }} />;
    }

    if (login_details.isUserLoggedIn && login_details.status) {

      return <Redirect to={{
        pathname: `/${store_locale}/profile`,
        state: { ...login_details.customer_details }
      }} />;
    }

    let emailField = <div>
      <div>
        <input type="email" id="P1000_USERNAME" name="email" value={this.state.email} size="40" maxLength="100" onChange={this.onChangeCredintials} />
      </div>
      <span id="P1000_USERNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span>
    </div>;

    let passwordField = <div>
      <div>
        <input type="password" name="password" size="40" maxLength="100" value={this.state.password} id="P1000_PASSWORD" onChange={this.onChangeCredintials} /></div>
      <span id="P1000_PASSWORD_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span></div>;

    if ('email' in errorMessage) {
      emailField = <div><div>
        <input type="email" id="P1000_USERNAME" name="email" value={this.state.email} size="40" maxLength="100" onChange={this.onChangeCredintials} aria-describedby="P1000_USERNAME_error" aria-invalid="true" /></div>
        <span id="P1000_USERNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1000_USERNAME_error">{errorMessage.email}</div></span></span></div>
    }

    if ('password' in errorMessage) {
      passwordField = <div>
        <div >
          <input type="password" name="password" size="40" maxLength="100" value={this.state.password} id="P1000_PASSWORD" onChange={this.onChangeCredintials} aria-describedby="P1000_PASSWORD_error" aria-invalid="true" /></div>
        <span id="P1000_PASSWORD_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET">
          <span className="t-Form-error"><div id="P1000_PASSWORD_error">{errorMessage.password}</div></span>
        </span></div>;
    }



    return (
      // <Spinner>
        <div>
          {meta_tag}
          <div style={{ width: '525.9584px' }}>
            <Modal modalId="CreateAccount" open={openFirstModal} onClose={this.onCloseFirstModal} center style={{ width: '425.9584px' }}>

              <h3><FormattedMessage id="account.Creation" defaultMessage="Create an Account" /></h3>
              <div>{signUp}</div>

            </Modal>

            <Modal modalId="forgotpassword" className="modalStyleClass" open={openSecondModal} onClose={this.onCloseSecondModal} center>
              <h3><FormattedMessage id="PassReset.Text" defaultMessage="Password reset" /></h3>
              {forgetPassword}
            </Modal>
          </div>

          <div className="t-Body-contentInner">

            <div className="container">
              <div className="row">
                <div className="t-Body-title" id="t_Body_title" style={{ top: '0px', zIndex: "1", borderBottom: "0px" }}>


                  {breadCrumb}

                </div>
                <div className="col col-12 apex-col-auto backWhite">
                  <div className="t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle secondHeaderTitle"><FormattedMessage id="newToElc.newToElc" defaultMessage="New to ELC" /></div>
                  <div className="row t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle">
                    <div className="col col-12 apex-col-auto paddingBottom ">
                      <div className="col col-6 colUp">
                        <ul className="nay">
                          <li><FormattedMessage id="newToElc.remember" defaultMessage="Wi'll remember your details for next time" /></li>
                          <li><FormattedMessage id="newToElc.join" defaultMessage="You can join jack's Birthday Club to receive Special birthday offers" /></li>
                        </ul>
                      </div>
                      <div className="col col-6 colUp">
                        <ul className="nay">
                          <li><FormattedMessage id="newToElc.checkout" defaultMessage="Save details for your favourite store" /></li>
                          <li><FormattedMessage id="newToElc.store" defaultMessage="You can get throw the checkout faster" /></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col col-12 apex-col-auto backWhite">
                  <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-top-lg margin-bottom-lg" id="R37390987984147738">
                    <div className="t-Region-header">
                      <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                        <h2 className="t-Region-title" id="R37390987984147738_heading">New</h2>
                      </div>
                      <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                    </div>
                    <div className="t-Region-bodyWrap">
                      <div className="t-Region-buttons t-Region-buttons--top">
                        <div className="t-Region-buttons-left"></div>
                        <div className="t-Region-buttons-right"></div>
                      </div>
                      <div className="t-Region-body">
                        <input type="hidden" id="P1000_PAGE_TITLE" name="P1000_PAGE_TITLE" value="Sign in - Sign in to Your Nayomi Account" />
                        <input type="hidden" id="P1000_PAGE_DESC" name="P1000_PAGE_DESC" value="Sign in - Sign in to your account to shop with exciting offers" />
                        <div className="container backWhite" style={{ height: 'auto', overflow: 'hidden' }}>
                          <div className="row alignCenter" style={{ paddingTop: "6px" }}><FormattedMessage id="Register.SignInText" defaultMessage="Sign in or Register" /></div>
                          <div className="row">
                            <div className="col col-1  paddingNull" style={{ flex: "0 0 7.333333%", maxWidth: "7.333333%" }}>
                              <span className="apex-grid-nbsp">&nbsp;</span>
                            </div>


                            <div className="col col-5 borderBlock rightSpace leftSpace topSpace">
                              {guest}
                              <div className="t-Region t-Region--textContent t-Region--scrollBody" id="R38202006049236304">
                                <div className="t-Region-header">
                                  <div className="t-Region-headerItems t-Region-headerItems--title headerBottom" style={{ textAlign: 'center' }}>
                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                                    <h2 className="block-title" style={{ width: '100%', fontSize: 16 }} id="R38202006049236304_heading"><FormattedMessage id="account.Creation" defaultMessage="Account Creation" /></h2>
                                  </div>

                                  <div className="t-Region-headerItems t-Region-headerItems--buttons">

                                    <span className="js-maximizeButtonContainer"></span></div>
                                </div>
                                <div className="t-Region-bodyWrap">
                                  <div style={{ fontSize: 11 }}><FormattedMessage id="register.header.text" defaultMessage="Fields marked * are required" /></div>
                                  <div>
                                    <p className="" style={{
                                      fontSize: 11,
                                      lineHeight: '17px',
                                      letterSpacing: .04,
                                      textTransform: 'inherit',
                                      fontWeight: 'normal',
                                      marginBottom: 10
                                    }}><FormattedMessage id="account.Creation.text" defaultMessage="Please complete the form to create an account:" /></p>
                                  </div>
                                  {/* <div className="t-Region-buttons t-Region-buttons--top">
                                    <div className="t-Region-buttons-left"></div>
                                    <div className="t-Region-buttons-right"></div>
                                  </div> */}
                                  <div className="headerText">
                                    <div>
                                      <SignUp />
                                    </div>
                                  </div>
                                  <div className="t-Region-buttons t-Region-buttons--bottom">
                                    <div className="t-Region-buttons-left"></div>
                                    <div className="t-Region-buttons-right"></div>
                                  </div>
                                </div>
                              </div>

                            </div>

                            <div className="col col-5  borderBlock leftSpace rightSpace topSpace">
                              <div className=" t-Region t-Region--textContent t-Region--scrollBody" id="R37391169766147740"
                              >
                                <div className="t-Region-header">
                                  <div className="t-Region-headerItems bottomPadding t-Region-headerItems--title" style={{ textAlign: 'center' }}>
                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                                    <h2 className="block-title" style={{ width: '100%', fontSize: 16 }} id="R37391169766147740_heading"><FormattedMessage id="registered.user.title" defaultMessage="Existing Customers" /></h2>
                                  </div>
                                  <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                                </div>
                                <div className="t-Region-bodyWrap">
                                  <div className="headerText"><FormattedMessage id="newToElc.header.login.text" defaultMessage="Already have an account? Sign in to retreive your account settings." /></div>
                                  <div className="t-Region-buttons  t-Region-buttons--top">
                                    <div className="t-Region-buttons-left"></div>
                                    <div className="t-Region-buttons-right"></div>
                                  </div>
                                  <div className="t-Region-body">
                                    {/* borderBottom */}
                                    <div className="container">
                                      <div className="padding row">
                                        <div className="rmPadding col col-12 apex-col-auto">
                                          {/* on blur eon focus */}
                                          <div className="row collapse-a" id="P1000_USERNAME_CONTAINER" >
                                          <div className="col-12 rmPadding rmTopPadding t-Form-labelContainer">
                                            <label htmlFor="P1000_USERNAME" id="P1000_USERNAME_LABEL" className="t-Form-label bolt">
                                              <FormattedMessage id="ContactUs.Email" defaultMessage="Email Address" /> *
                                            </label>
                                          </div>
                                            <div className="col-12" style={{padding: 0}}>
                                              {emailField}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="padding row">
                                        <div className=" rmPadding col col-12 apex-col-auto">
                                          {/* onFocus={(e) => this.divOnFocus(e)}
                                            onBlur={(e) => this.divOnBlure(e)} */}
                                          <div className="row collapse-a " id="P1000_PASSWORD_CONTAINER">
                                          <div className="col-12 rmTopPadding rmPadding t-Form-labelContainer">
                                            <label htmlFor="P1000_PASSWORD" id="P1000_PASSWORD_LABEL" className="t-Form-label bolt">
                                              <FormattedMessage id="password" defaultMessage="Password *" /></label>
                                          </div>
                                            <div className="col-12" style={{padding: 0}}>
                                              {passwordField}
                                            </div>
                                          </div>

                                          <input type="hidden" id="P1000_FPLABEL" name="P1000_FPLABEL" value="Forgot Password?" />
                                          <input type="hidden" data-for="P1000_FPLABEL" value="Hj77CC9jF38Atd39O1yFQWE1oJnNs97V3Xg_bixOY6VseEb4SV9-u6lDIfCSou2eEYgLVpnbjOR7lh6K1IPQlg" />
                                        </div>

                                      </div>
                                      <div className="row">
                                        <div className="forgotPass">
                                          <a className="forget-password-link link" style={{ width: "100%", fontWeight: '800 !important' }} onClick={this.onOpenSecondModal}><FormattedMessage id="forget.password" defaultMessage="Forget Password" /></a>
                                          <span id="P1000_FP_error_placeholder" className="a-Form-error" data-template-id="33609641515469732_ET"></span>
                                        </div>
                                      </div>
                                      {/* <div >
                                          <div className="t-Form-fieldContainer rel-col  apex-item-wrapper apex-item-wrapper--checkbox " id="P1000_REMEMBER_CONTAINER">
                                            <div className="t-Form-labelContainer col col-1" style={newStyle}>
                                              <label htmlFor="P1000_REMEMBER" id="P1000_REMEMBER_LABEL" className="t-Form-label"></label>
                                            </div>
                                          </div>
                                        </div> */}
                                    <div className="row" style={{ marginTop: 10 }}>
                                      <div className="col col-12 apex-col-auto loginButtonOnLoginPage">
                                        <button onClick={this.login} className="button-add-to-basket right " style={{ fontWeight: 'bold' }}><FormattedMessage id="secure.signintext" defaultMessage="Sign In" /></button>
                                        {/* <div onClick={this.login} className="button-add-to-basket right " type="button" id="B28810467415678867"><span className="t-Button-label"><FormattedMessage id="secure.signin" defaultMessage="Secure Sign In" /></span></div><input type="hidden" id="COND" name="COND" value="" /><input type="hidden" id="ITEM" name="ITEM" value="" /> */}
                                      </div>
                                    </div>
                                    <div style={{ justifyContent: 'center', width: '100%' }}>
                                    <div  className="row bestsellers or-border"><h2></h2><label><span style={{fontSize:16}}>Or</span></label><h2></h2></div>
                                      {/* <div><span class="login-divider">Or</span></div> */}
                                      <div style={{marginTop:'5%'}} className="item_paypal">
                                        <div className="item_content">
                                          <span id="cwppButton">
                                            <a id="LIwPPundefined" className="LIwPP_V2 PPBlue_V2 CWPP_pill CWPP_large" text="Connect with PayPal">
                                              <svg id="CWPP_SVG_PPTM" style={{ backgroundColor: '#fff' }} className="PPTM" xmlns="http://www.w3.org/2000/svg" version="1.1" style={{ height: 18, width: 18 }} viewBox="0 0 18 18" focusable="false">
                                                <path id="Fill-8" class="PPTM-btm" fill="#00FFFFFF" d="M13.6023044,4.67342223 C13.8196336,3.28812419 13.6008532,2.34542498 12.8514484,1.49160831 C12.0263956,0.551629995 10.5359309,0.148937623 8.62894883,0.148937623 L3.09322219,0.148937623 C2.70355347,0.148937623 2.37175455,0.43245482 2.3109822,0.817370681 L0.00598653054,15.4327457 C-0.0395473836,15.7211605 0.183405526,15.9818221 0.475294243,15.9818221 L3.89269613,15.9818221 L3.65686311,17.4774071 C3.61713431,17.7297247 3.81196867,17.957917 4.06739398,17.957917 L6.94782221,17.957917 C7.28887304,17.957917 7.57912907,17.7097715 7.63228221,17.3731061 L7.66058217,17.226722 L8.20317953,13.7860604 L8.23819166,13.5959605 C8.29134479,13.2591138 8.58160082,13.0111496 8.92247024,13.0111496 L9.35331903,13.0111496 C12.1439493,13.0111496 14.329033,11.8774436 14.9674148,8.59894727 C15.2342689,7.22906764 15.0963973,6.08556642 14.3908938,5.28163282 C14.1773742,5.03856625 13.9119713,4.83740146 13.6023044,4.67342223"></path>
                                                <path id="Fill-9" class="PPTM-top" fill="#003087" d="M13.6023044,4.67384766 C13.8196336,3.28841937 13.6008532,2.34563151 12.8514484,1.49173456 C12.0263956,0.55166786 10.5359309,0.148937623 8.62894883,0.148937623 L3.09322219,0.148937623 C2.70355347,0.148937623 2.37175455,0.432481479 2.3109822,0.817433533 L0.00598653054,15.4341828 C-0.0395473836,15.7226247 0.183405526,15.9833109 0.475294243,15.9833109 L3.89269613,15.9833109 L4.75112833,10.5399219 L4.72446105,10.7106288 C4.78523341,10.3256767 5.11431118,10.0419515 5.50397989,10.0419515 L7.12832518,10.0419515 C10.3182389,10.0419515 12.815892,8.7459583 13.5457045,4.99802736 C13.5672923,4.88718584 13.5857961,4.7796097 13.6023044,4.67384766" fill-opacity="0.699999988079071"></path>
                                                <path id="Fill-10" class="PPTM-top" fill="#003087" d="M5.67323544,4.69235148 C5.70988026,4.46069089 5.85845507,4.27111742 6.05855031,4.17515152 C6.14961814,4.13161312 6.25120775,4.10730418 6.35769543,4.10730418 L10.6968416,4.10730418 C11.2109576,4.10730418 11.6902429,4.14104644 12.128348,4.21161494 C12.2537024,4.23175145 12.3754285,4.25497193 12.4938892,4.28127638 C12.6121686,4.30739943 12.7271825,4.33678785 12.8383869,4.36944165 C12.8940797,4.38558714 12.9486841,4.40263969 13.0025629,4.42059928 C13.2177152,4.49189341 13.4179919,4.57624907 13.6023044,4.67384766 C13.8196336,3.28841937 13.6008532,2.34563151 12.8514484,1.49173456 C12.0263956,0.55166786 10.5359309,0.148937623 8.62894883,0.148937623 L3.09322219,0.148937623 C2.70355347,0.148937623 2.37175455,0.432481479 2.3109822,0.817433533 L0.00598653054,15.4341828 C-0.0395473836,15.7226247 0.183405526,15.9833109 0.475294243,15.9833109 L3.89269613,15.9833109 L5.67323544,4.69235148"></path></svg>
                                              <b class="connect-with-paypal-text" style={{ fontWeight: 'bold', paddingLeft: 10 }} aria-label="Connect with PayPal">Connect with PayPal</b></a>
                                          </span>
                                          <div id="paypal-connect" className="hidden" data-paypal-app-client-id="AQ9nLbJzmV-uOaeI1cePtRUrIJN6d3ZQCVUwu0-mNrMS6voCeghoFiAjS7hEHO8h6v2hbmrZyfeSkdh1" data-paypal-login-return-url="https://www.elc.co.uk/paypal-identity-service?provider=paypal&amp;state=login" data-paypal-login-authend="production">
                                          </div>
                                        </div>
                                      </div>

                                      <div className="item amazon">
                                        <div className="item_content">

                                          <div id="AmazonPayButton" data-return-url="/amazon-identity-service?provider=amazon&amp;state=login" data-dont-logout="" data-button-type="LwA" data-button-size="large" data-button-color="Gold" data-seller-id="ASNOF4RZ96XU">

                                            <img className=" amazonpay-button-inner-image" style={{ cursor: 'pointer', maxHeight: 64 }} alt="AmazonPay" id="OffAmazonPaymentsWidgets0" src="https://d23yuld0pofhhw.cloudfront.net/default/uk/live/lwa/gold/large/LwA.png" tabindex="0" /></div>

                                        </div>
                                      </div>
                                    </div>

                                  </div>

                                  </div>
                                  {/* <div className="t-Region-body">
                                    <div className="row orBottom">
                                      <p>Or</p>
                                    </div>
                                    <div className="row padBot">
                                      <div className="faceBookButton"><FormattedMessage id="Form.Facebook" defaultMessage=" Login with Facebook"></FormattedMessage></div>
                                    </div>
                                    <div className="row">
                                      <div className="googleButton"><FormattedMessage id="Form.google" defaultMessage="Login with Google"></FormattedMessage></div>
                                    </div>
                                  </div> */}
                                  <div className="t-Region-buttons t-Region-buttons--bottom">
                                    <div className="t-Region-buttons-left"></div>
                                    <div className="t-Region-buttons-right"></div>
                                  </div>
                                </div>
                              </div>

                            </div>

                          </div>
                          <div className="col col-1  ">
                            <span className="apex-grid-nbsp">&nbsp;</span>
                          </div>
                        </div>
                      </div>
                      <div className="t-Region-buttons t-Region-buttons--bottom">
                        <div className="t-Region-buttons-left"></div>
                        <div className="t-Region-buttons-right"></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

        </div>
      // {/* </Spinner > */}
    );
  }
}


const mapStateToProps = state => {
  return {
    guestUser: state.guest_user,
    login_details: state.login,
    login_error: state.invalidLogin,
    globals: state.global,
    menu: state.menu.menuNavData
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: (payload) => dispatch(actions.loginUser(payload)),
    onLogoutUser: () => dispatch(actions.logoutUser()),
    onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
    onAddToWishList: payload => dispatch(actions.addToWishlist(payload)),
    onClearForgotPass: () => dispatch(actions.clearForgotPass()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));