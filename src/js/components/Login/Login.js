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

class Login extends Component {

  constructor(props) {
    super(props);
    let isGuest = this.props.isGuest ? true : false;
    let startGuestCheckout = this.props.startGuestCheckout ? true : false;

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
            password: login_error.errorMessage,
            email: login_error.errorMessage,
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


  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   this.invalidLogin();
  // }


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
  };


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

    if (this.props.location.search != undefined) {
      const values = queryString.parse(this.props.location.search);
      const itemId = values.item;
      if (itemId) {
        const data = {
          customer_id: this.props.login_details.customer_details.customer_id,
          product_id: itemId,
        }
        this.props.onAddToWishList(data);
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
          email: <FormattedMessage id="Login.username" defaultMessage="" />
        }
      }))
      formIsValid = false;
    }

    if ((this.state.password == '') || (this.state.password.length < 1)) {
      this.setState((prevState) => ({
        errorMessage: {
          ...prevState.errorMessage,
          password: <FormattedMessage id="Login.password" defaultMessage="" />
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
    this.onCloseSecondModal();
    this.props.onClearForgotPass();
  }

  render() {

    //console.log('this.state.isGuest', this.props.login_details.isLoginSuccess && this.state.isGuest)

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

    let breadCrumb = <Breadcrumb name={`Sign in`} translate={true} translationDataId="signin.title" defaultMessage="Sign in" />;
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

    // if (login_details.forgotPasswordDetails.status &&
    //   login_details.forgotPasswordDetails.message) {
    //   if (this.state.openSecondModal) {
    //     this.onCloseSecondModal();
    //   }

    // } else if (!(login_details.forgotPasswordDetails.status) &&
    //   login_details.forgotPasswordDetails.message) {
    //   if (this.state.openSecondModal) {
    //     this.onCloseSecondModal();
    //   }
    // }


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
      <Spinner>
        <div>
          <div style={{ width: '525.9584px' }}>
            <Modal modalId="CreateAccount" open={openFirstModal} onClose={this.onCloseFirstModal} center style={{ width: '425.9584px' }}>

              <h3><FormattedMessage id="account.Creation" defaultMessage="Account Creation" /></h3>
              <div>{signUp}</div>

            </Modal>

            <Modal modalId="ForgetPassword" open={openSecondModal} onClose={this.onCloseSecondModal} center>
              <h3><FormattedMessage id="PassReset.Text" defaultMessage="Password reset" /></h3>
              {forgetPassword}
            </Modal>
          </div>

          <div className="t-Body-contentInner">

            <div className="container">
              <div className="row">
                <div className="t-Body-title" id="t_Body_title" style={{ top: '294px',zIndex:"0", borderBottom: "0px" }}>


                  {breadCrumb}

                </div>
                <div className="col col-12 apex-col-auto backWhite">
                  <div className="t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle secondHeaderTitle"><FormattedMessage id="newToElc.newToElc" defaultMessage="New to ELC" /></div>
                  <div className="row t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle">
                    <div className="col col-12 apex-col-auto paddingBottom ">
                      <div className="col col-6 colUp">
                        <ul className="nay">
                          <li><FormattedMessage id="newToElc.remember" defaultMessage="Wi'll remember your details for next time" /></li>
                          <li><FormattedMessage id="newToElc.join" defaultMessage="You can join jack's Birthday Club to receive spacial birthday offers" /></li>
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
                        <div className="container backWhite">
                          <div className="row alignCenter" style={{paddingTop:"6px"}}><FormattedMessage id="Register.SignInText" defaultMessage="sign in or register" /></div>
                          <div className="row">
                            <div className="col col-1  paddingNull" style={{ flex: "0 0 7.333333%", maxWidth: "7.333333%" }}>
                              <span className="apex-grid-nbsp">&nbsp;</span>
                            </div>


                            <div className="col col-5 borderBlock rightSpace leftSpace topSpace">
                              {guest}
                              <div className="t-Region t-Region--textContent t-Region--scrollBody" id="R38202006049236304">
                                <div className="t-Region-header">
                                  <div className="t-Region-headerItems t-Region-headerItems--title headerBottom" style={{textAlign: 'center'}}>
                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                                    <h2 className="block-title" style={{width: '100%'}} id="R38202006049236304_heading"><FormattedMessage id="account.Creation" defaultMessage="Account Creation" /></h2>
                                  </div>

                                  <div className="t-Region-headerItems t-Region-headerItems--buttons">

                                    <span className="js-maximizeButtonContainer"></span></div>
                                </div>
                                <div className="t-Region-bodyWrap">
                                  <div className="headerText"><FormattedMessage id="register.header.text" defaultMessage="Order Tracking" /></div>

                                  <div className="t-Region-buttons t-Region-buttons--top">
                                    <div className="t-Region-buttons-left"></div>
                                    <div className="t-Region-buttons-right"></div>
                                  </div>
                                  <div className="t-Region-body">

                                    <p style={{
                                      fontSize: 11,
                                      lineHeight: '17px',
                                      letterSpacing: .04,
                                      textTransform: 'inherit',
                                      fontWeight: 'normal',
                                      marginBottom: 10
                                    }}><FormattedMessage id="account.Creation.text" defaultMessage="Account Creation text" /></p>

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
                                  <div className="t-Region-headerItems bottomPadding t-Region-headerItems--title" style={{textAlign: 'center'}}>
                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                                    <h2 className="block-title" style={{width: '100%'}} id="R37391169766147740_heading"><FormattedMessage id="registered.user.title" defaultMessage="SignIn" /></h2>
                                  </div>
                                  <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                                </div>
                                <div className="t-Region-bodyWrap">
                                  <div className="headerText"><FormattedMessage id="newToElc.header.login.text" defaultMessage="Already have an account?Sign in to retreive your account settings." /></div>
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
                                          <div className="row collapse-a" id="P1000_USERNAME_CONTAINER" ><div className="rmPadding rmTopPadding t-Form-labelContainer">
                                            <label htmlFor="P1000_USERNAME" id="P1000_USERNAME_LABEL" className="t-Form-label bolt">
                                              <FormattedMessage id="ContactUs.Email" defaultMessage="Email Address" /> *
                                            </label>
                                          </div>
                                            <div className="row contents">
                                              {emailField}
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      <div className="padding row">
                                        <div className=" rmPadding col col-12 apex-col-auto">
                                          {/* onFocus={(e) => this.divOnFocus(e)}
                                            onBlur={(e) => this.divOnBlure(e)} */}
                                          <div className="row collapse-a " id="P1000_PASSWORD_CONTAINER"><div className="rmTopPadding rmPadding t-Form-labelContainer">
                                            <label htmlFor="P1000_PASSWORD" id="P1000_PASSWORD_LABEL" className="t-Form-label bolt">
                                              <FormattedMessage id="password" defaultMessage="password" /></label>
                                          </div>
                                            <div className="row contents ">
                                              {passwordField}
                                            </div>
                                          </div>

                                          <input type="hidden" id="P1000_FPLABEL" name="P1000_FPLABEL" value="Forgot Password?" />
                                          <input type="hidden" data-for="P1000_FPLABEL" value="Hj77CC9jF38Atd39O1yFQWE1oJnNs97V3Xg_bixOY6VseEb4SV9-u6lDIfCSou2eEYgLVpnbjOR7lh6K1IPQlg" />
                                        </div>

                                      </div>
                                      <div className="row forgetPassword">
                                        <div className="col col-8">
                                          <div className="" id="P1000_FP_CONTAINER"><div className="t-Form-labelContainer t-Form-labelContainer--hiddenLabel col col-0">
                                            <label htmlFor="P1000_FP" id="P1000_FP_LABEL" className="t-Form-label u-VisuallyHidden">Fp</label>
                                          </div>
                                          </div>
                                          <div className=" row"><div>

                                          </div>
                                          </div>
                                        </div>
                                        <div className="forgotPass" style={{width: "99%", textAlign: 'right'}} >
                                          <a className="forget-password-link link" style={{width: "100%"}} onClick={this.onOpenSecondModal}><FormattedMessage id="forget.password" defaultMessage="Forget Password" /></a>

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
                                      <div className="row" style={{marginTop: 10}}>
                                        <div className="col col-12 apex-col-auto loginButtonOnLoginPage">
                                          <button onClick={this.login} className="button-add-to-basket right " style={{fontWeight: 'bold'}}><FormattedMessage id="secure.signintext" defaultMessage="Sign In" /></button>
                                          {/* <div onClick={this.login} className="button-add-to-basket right " type="button" id="B28810467415678867"><span className="t-Button-label"><FormattedMessage id="secure.signin" defaultMessage="Secure Sign In" /></span></div><input type="hidden" id="COND" name="COND" value="" /><input type="hidden" id="ITEM" name="ITEM" value="" /> */}
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
      </Spinner >
    );
  }
}


const mapStateToProps = state => {
  return {
    guestUser: state.guest_user,
    login_details: state.login,
    login_error: state.invalidLogin,
    globals: state.global,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onLoginUser: (payload) => dispatch(actions.loginUser(payload)),
    onLogoutUser: () => dispatch(actions.logoutUser()),
    onAddToWishList: payload => dispatch(actions.addToWishlist(payload)),
    onClearForgotPass: () => dispatch(actions.clearForgotPass()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));