import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { FormattedMessage } from 'react-intl';
import PhoneNumber from './IntlTelePhone';

import AlertBox from '../Common/AlertBox/AlertBox';

import { connect } from 'react-redux';
import * as actions from '.././../redux/actions/index';

class SignUp extends Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        carrierCode: '',
        password: '',
        confirmPassword: ''
      },
      errors: {},
      isPhoneValid: false,
      data: {},
      alertBoxDetails: {
        status: false,
        message: '',
      }

    }
    //console.log('signup Mounted',this.state.token, props);
  }



  componentDidUpdate(prevProps, prevState, snapshot) {
    let obj = this.props.registartion_details;
    if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
      //console.log('Cleare Registration Error');
      let reg_status = obj.status;
      if (!reg_status) {
        let errors = {};
        //alert(obj.message);
        if (obj.message === 'The mobile number you entered already exists with another account.') {
          errors["contactNumber"] = <FormattedMessage id="Signup.validation.contactNumber.exists" defaultMessage="First Name cannot be empty" />;
        } else if (obj.message === 'Email Id already exist.') {
          errors["email"] = <FormattedMessage id="Signup.validation.email.exists" defaultMessage="First Name cannot be empty" />;
        } else {
          // alert(obj.message);

          this.setState({
            ...this.state,
            alertBoxDetails: {
              status: true,
              message: obj.message,
            }
          })
        }
        this.setState({ errors: errors });
      }
      this.props.onClearRegistrationError();
    }
  }

  componentWillUnmount() {
    this.props.onClearRegistrationError();
  }

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["firstName"]) {
      formIsValid = false;
      errors["firstName"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage="First Name cannot be empty" />;
    }

    if (!fields["lastName"]) {
      formIsValid = false;
      errors["lastName"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="First Name cannot be empty" />;
    }

    if (typeof fields["firstName"] !== "undefined") {
      if (!fields["firstName"].match(/^[a-zA-Z]+$/) && fields["firstName"].length > 0) {
        formIsValid = false;
        errors["firstName"] = <FormattedMessage id="Signup.validation.firstName.onlyletters" defaultMessage="First Name cannot be empty" />;
      }
    }

    if (typeof fields["lastName"] !== "undefined") {
      if (!fields["lastName"].match(/^[a-zA-Z]+$/) && fields["lastName"].length > 0) {
        formIsValid = false;
        errors["lastName"] = <FormattedMessage id="Signup.validation.lastName.onlyletters" defaultMessage="First Name cannot be empty" />;
      }
    }

    //Email
    if (typeof fields["email"] !== "undefined") {

      if (fields["email"].length === 0) {
        formIsValid = false;
        errors["email"] = <FormattedMessage id="Signup.validation.email.empty" defaultMessage="First Name cannot be empty" />;
      }

      if (fields["email"].length > 0) {
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
          formIsValid = false;
          errors["email"] = <FormattedMessage id="Signup.validation.email.invalid" defaultMessage="First Name cannot be empty" />;
        }
      }
    }

    if (!(this.state.isPhoneValid)) {

      formIsValid = false;
      errors["contactNumber"] = <FormattedMessage id="Signup.validation.contactNumber.empty" defaultMessage="Eneter Valid Contact Number" />;

    }

    //Password
    if (typeof fields["password"] !== "undefined") {
      // if (fields["password"].length === 0) {
      //   formIsValid = false;
      //   errors["password"] = <FormattedMessage id="Signup.validation.empty.password" defaultMessage="First Name cannot be empty" />;
      // }

      if (fields["password"].length < 1) {
        formIsValid = false;
        errors["password"] = <FormattedMessage id="Signup.validation.password.length" defaultMessage="First Name cannot be empty" />;
      }
    }

    if (!fields["confirmPassword"]) {
      formIsValid = false;
      errors["confirmPassword"] = <FormattedMessage id="Signup.validation.confirmPassword.empty" defaultMessage="First Name cannot be empty" />;
    }

    if (!(fields["confirmPassword"] === fields["password"])) {
      formIsValid = false;
      errors["confirmPassword"] = <FormattedMessage id="Signup.validation.password.same" defaultMessage="First Name cannot be empty" />;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  signUpSubmit = (e) => {
    //console.log('::', this.state)
    e.preventDefault();
    if (this.handleValidation()) {
      //console.log('::', this.state)
      this.registerUser();
    }
  }

  handleChange = (field, e) => {
    //console.log(field, e.target.value);
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
    //console.log(this.state);
  }

  registerUser = () => {
    const data = {
      firstname: this.state.fields.firstName,
      lastname: this.state.fields.lastName,
      contact_number: this.state.fields.contactNumber,
      email: this.state.fields.email,
      carrier_code: this.state.fields.carrierCode,
      password: this.state.fields.password,
      confirmpassword: this.state.fields.confirmPassword,
      store_id: this.props.globals.currentStore
    }
    this.props.onRegisterUserUser(data);
  }



  contactNumber = (status, value, countryData, number, id) => {
    // console.log('from parent', status, value, countryData, number, id)
    if (status) {
      let fields = this.state.fields;
      fields['contactNumber'] = value;
      fields['carrierCode'] = countryData.dialCode;
      this.setState({ fields, isPhoneValid: true });
      //console.log(this.state);
    } else {
      this.setState({ isPhoneValid: false })
    }
  }

  closeErrorBox = () => {
    this.setState({
      ...this.state,
      alertBoxDetails: {
        status: false,
        message: ''
      }
    })
    console.log('Close alert Box Parent');
  }

  render() {
    let alertBox = null;

    if (this.state.alertBoxDetails.status) {
      alertBox = <AlertBox
        message={this.state.alertBoxDetails.message}
        alertBoxStatus={this.state.alertBoxDetails.status}
        closeBox={this.closeErrorBox} />
    }

    const errorsObj = this.state.errors;
    const store_locale = this.props.store_locale;
    let phoneNumberClassName = null;

    let firstNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
      <FormattedMessage id="Form.FirstName" defaultMessage="First Name">
        {(message) =>
          <input type="text" placeholder={message} id="P1001_FNAME" name="P1001_FNAME" className="text_field apex-item-text apex-item-has-icon" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]} size={30} />}
      </FormattedMessage>
      <span className="apex-item-icon fa fa-user" aria-hidden="true">
      </span>
    </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;

    let LastNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
      <FormattedMessage id="Form.LastName" defaultMessage="Last Name">
        {(message) =>
          <input type="text" id="P1001_LNAME" name="P1001_LNAME" placeholder={message} className="text_field apex-item-text apex-item-has-icon" onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]} size={30} />}
      </FormattedMessage>
      <span className="apex-item-icon fa fa-user" aria-hidden="true"></span></div><span id="P1001_LNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span></div>;

    let emailInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
      <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
        {(message) =>
          <input type="email" id="P1001_EMAIL" name="P1001_EMAIL" placeholder={message} className="text_field apex-item-text apex-item-has-icon" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} size={30} />}
      </FormattedMessage>
      <span className="apex-item-icon fa fa-envelope" aria-hidden="true"></span></div><span id="P1001_EMAIL_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;

    let contactNumberInputField = null;

    let passwordInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
      <FormattedMessage id="password" defaultMessage="Password">
        {(message) =>
          <input type="password" name="P1001_PWD" size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} id="P1001_PWD" placeholder={message} className="password apex-item-text apex-item-has-icon" aria-autocomplete="list" />}
      </FormattedMessage>
      <span className="apex-item-icon fa fa-key" aria-hidden="true"></span></div><span id="P1001_PWD_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;

    let confirmPasswordInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
      <FormattedMessage id="profile.Confirm.Password" defaultMessage="Confirm Password">
        {(message) =>
          <input type="password" name="P1001_RPWD" size="30" onChange={this.handleChange.bind(this, "confirmPassword")} value={this.state.fields["confirmPassword"]} id="P1001_RPWD" placeholder={message} className="password apex-item-text apex-item-has-icon" />}
      </FormattedMessage>
      <span className="apex-item-icon fa fa-lock-password" aria-hidden="true"></span></div><span id="P1001_RPWD_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;

    if ('firstName' in errorsObj) {
      firstNameInputField = <div className="t-Form-inputContainer">
        <div className="t-Form-itemWrapper"><input type="text" id="P1001_FNAME" name="P1001_FNAME" placeholder="First Name" className="text_field apex-item-text apex-item-has-icon apex-page-item-error" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]} size="30" maxLength="100" aria-describedby="P1001_FNAME_error" aria-invalid="true" />
          <span className="apex-item-icon fa fa-user" aria-hidden="true"></span></div><span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">{errorsObj["firstName"]}</div></span></span></div>
    }

    if ('lastName' in errorsObj) {
      LastNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
        <input type="text" id="P1001_LNAME" name="P1001_LNAME" placeholder="Last Name" className="text_field apex-item-text apex-item-has-icon apex-page-item-error" onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]} size="30" maxLength="100" aria-describedby="P1001_LNAME_error" aria-invalid="true" /><span className="apex-item-icon fa fa-user" aria-hidden="true"></span></div>
        <span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">
          {errorsObj["lastName"]}</div></span></span></div>
    }

    if ('contactNumber' in errorsObj) {
      phoneNumberClassName = "t-Form-inputContainer";
      contactNumberInputField = <span id="P1001_PHONE_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error">
        <div id="P1001_PHONE_error">{errorsObj["contactNumber"]}</div></span></span>

    }
    if ('email' in errorsObj) {

      emailInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
        <input type="email" id="P1001_EMAIL" name="P1001_EMAIL" placeholder="Email Address" className="text_field apex-item-text apex-item-has-icon apex-page-item-error" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} size="30" maxLength="100" aria-describedby="P1001_EMAIL_error" aria-invalid="true" />
        <span className="apex-item-icon fa fa-envelope" aria-hidden="true"></span></div><span id="P1001_EMAIL_error_placeholder" className="a-Form-error  u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error">
          <div id="P1001_EMAIL_error">{errorsObj["email"]}</div></span></span></div>;
    }

    if ('password' in errorsObj) {
      passwordInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
        <input type="password" name="P1001_PWD" size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} id="P1001_PWD" placeholder="Password" className="password apex-item-text apex-item-has-icon apex-page-item-error" aria-autocomplete="list" aria-describedby="P1001_PWD_error" aria-invalid="true" />
        <span className="apex-item-icon fa fa-key" aria-hidden="true"></span></div>
        <span id="P1001_PWD_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P1001_PWD_error">{errorsObj["password"]}</div></span></span></div>;
    }

    if ('confirmPassword' in errorsObj) {
      confirmPasswordInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
        <input type="password" name="P1001_RPWD" size="30" onChange={this.handleChange.bind(this, "confirmPassword")} value={this.state.fields["confirmPassword"]} id="P1001_RPWD" placeholder="Repeat Password" className="password apex-item-text apex-item-has-icon apex-page-item-error" aria-describedby="P1001_RPWD_error" aria-invalid="true" />
        <span className="apex-item-icon fa fa-lock-password" aria-hidden="true"></span></div>
        <span id="P1001_RPWD_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET">
          <span className="t-Form-error"><div id="P1001_RPWD_error">{errorsObj["confirmPassword"]}</div></span></span></div>;
    }

    return (
      <>
        {alertBox}
        <form autoComplete="off">
          <input type="hidden" name="p_flow_id" value="2019" id="pFlowId" />
          <input type="hidden" name="p_flow_step_id" value="1001" id="pFlowStepId" />
          <input type="hidden" name="p_instance" value="11533276980189" id="pInstance" />
          <input type="hidden" name="p_page_submission_id" value="137581352146482158347459965137747212594" id="pPageSubmissionId" />
          <input type="hidden" name="p_request" id="pRequest" />
          <input type="hidden" name="p_reload_on_submit" value="S" id="pReloadOnSubmit" />
          <input type="hidden" value="137581352146482158347459965137747212594" id="pSalt" />


          <div className="t-Dialog" role="dialog" aria-label="Create an Account">
            <div className="t-Dialog-header"></div>
            <div className="t-Dialog-bodyWrapperOut">
              <div className="t-Dialog-bodyWrapperIn"><div className="t-Dialog-body">
                <span id="APEX_SUCCESS_MESSAGE" data-template-id="33515671899469661_S" className="apex-page-success u-hidden"></span><span id="APEX_ERROR_MESSAGE" data-template-id="33515671899469661_E" className="apex-page-error u-hidden"></span>
                <div className="container">
                  <div className="row">
                    <div className="col col-12 apex-col-auto">
                      <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R228260076945887528">
                        <div className="t-Region-header">
                          <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true"></span></span>
                            <h2 className="t-Region-title" id="R228260076945887528_heading">SIGN UP</h2>
                          </div>
                          <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer"></span></div>
                        </div>
                        <div className="t-Region-bodyWrap">
                          <div className="t-Region-buttons t-Region-buttons--top">
                            <div className="t-Region-buttons-left"></div>
                            <div className="t-Region-buttons-right"></div>
                          </div>
                          <div className="t-Region-body">
                            <div className="container">
                              <div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field apex-item-wrapper--has-icon js-show-label" id="P1001_FNAME_CONTAINER"><div className="t-Form-labelContainer">
                                    <label htmlFor="P1001_FNAME" id="P1001_FNAME_LABEL" className="t-Form-label"><FormattedMessage id="Form.FirstName" defaultMessage="First Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>
                                    {firstNameInputField}

                                  </div>
                                </div>
                              </div><div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field apex-item-wrapper--has-icon js-show-label" id="P1001_LNAME_CONTAINER"><div className="t-Form-labelContainer">
                                    <label htmlFor="P1001_LNAME" id="P1001_LNAME_LABEL" className="t-Form-label"><FormattedMessage id="Form.LastName" defaultMessage="Last Name" /></label>
                                  </div>

                                    {LastNameInputField}

                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label" id="P1001_PHONE_CONTAINER">
                                    <div className="t-Form-labelContainer">
                                    </div>
                                    <div id="PhoneNumber" className={phoneNumberClassName} >
                                      <PhoneNumber changed={this.contactNumber} />
                                      {contactNumberInputField}
                                    </div>

                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field apex-item-wrapper--has-icon js-show-label" id="P1001_EMAIL_CONTAINER"><div className="t-Form-labelContainer">
                                    <label htmlFor="P1001_EMAIL" id="P1001_EMAIL_LABEL" className="t-Form-label">
                                      <FormattedMessage id="Form.Email" defaultMessage="Email" />
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>

                                    {emailInputField}

                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--password apex-item-wrapper--has-icon js-show-label" id="P1001_PWD_CONTAINER"><div className="t-Form-labelContainer">
                                    <label htmlFor="P1001_PWD" id="P1001_PWD_LABEL" className="t-Form-label">
                                      <FormattedMessage id="password" defaultMessage="password" />
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>

                                    {passwordInputField}

                                  </div>
                                </div>
                              </div>

                              <div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--password apex-item-wrapper--has-icon js-show-label" id="P1001_RPWD_CONTAINER"><div className="t-Form-labelContainer">
                                    <label htmlFor="P1001_RPWD" id="P1001_RPWD_LABEL" className="t-Form-label">
                                      <FormattedMessage id="profile.Confirm.Password" defaultMessage="Confirm Password" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>

                                    {confirmPasswordInputField}

                                  </div>
                                </div>
                              </div><div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <button className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" id="B35835076185290944" onClick={this.signUpSubmit}><span className="t-Button-label"><FormattedMessage id="login.SignUp.Title" defaultMessage="SignUp" /></span></button>
                                </div>
                              </div>
                              <p style={{
                                fontSize: 11,
                                lineHeight: '17px',
                                letterSpacing: .04,
                                textTransform: 'inherit',
                                fontWeight: 'normal'
                              }}>By clicking the 'Sign Up' button, you confirm that you accept our <Link id="loginslctntofuse" to={`/${store_locale}/terms-and-conditions`} style={{ textDecoration: 'underline' }}>Terms of use</Link> and <Link id="loginslctnprivacypol" to={`/${store_locale}/privacy-policy`} style={{ textDecoration: 'underline' }}>Privacy Policy</Link>.</p>
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
              </div></div>
            </div>
            <div className="t-Dialog-footer"></div>
          </div><input type="hidden" id="pPageItemsRowVersion" /><input type="hidden" id="pPageItemsProtected" value="COF-JZSTeQPJZGogQwtaDA" /></form>  </>);
  }
}

const mapStateToProps = state => {
  return {
    registartion_details: state.login.registerUserDetails,
    globals: state.global
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onRegisterUserUser: (payload) => dispatch(actions.registerUser(payload)),
    onClearRegistrationError: () => dispatch(actions.clearRegisterError()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);