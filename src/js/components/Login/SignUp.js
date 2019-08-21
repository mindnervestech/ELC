import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';
import { FormattedMessage } from 'react-intl';
import PhoneNumber from './IntlTelePhone';

import AlertBox from '../Common/AlertBox/AlertBox';
import { connect } from 'react-redux';
import * as actions from '.././../redux/actions/index';
//import { Dropdown } from "react-bootstrap";
//import { DropdownButton } from 'react-bootstrap';



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
        confirmEmail:'',
        password: '',
        confirmPassword: '',
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
    console.log("comehere");
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
    if (typeof fields["confirmEmail"] !== "undefined") {

      if (fields["confirmEmail"].length === 0) {
        formIsValid = false;
        errors["confirmEmail"] = <FormattedMessage id="Signup.validation.confirmEmail.empty" defaultMessage="Email done't Match" />;
      }
      console.log("form is valid 56", formIsValid);
      if (fields["confirmEmail"] != fields["email"]) {
        console.log("confirm email" , fields["confirmEmail"]);
          formIsValid = false;
          errors["confirmEmail"] = <FormattedMessage id="Signup.validation.confirmEmail.invalid" defaultMessage="Email does't match" />;
      
        console.log("form is valid 66", formIsValid);
      }
    }

    // if (!(this.state.isPhoneValid)) {

    //   formIsValid = false;
    //   errors["contactNumber"] = <FormattedMessage id="Signup.validation.contactNumber.empty" defaultMessage="Eneter Valid Contact Number" />;

    // }

    //Password
    if (typeof fields["password"] !== "undefined") {
      if (fields["password"].length === 0) {
        formIsValid = false;
        errors["password"] = <FormattedMessage id="Signup.validation.empty.password" defaultMessage="First Name cannot be empty" />;
      }
      console.log("form is valid 7", formIsValid);
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
    console.log('::', this.state);
    console.log('::', e);
    e.preventDefault();

    if (this.handleValidation()) {
      this.registerUser();
      //console.log('::', this.state)

    }
  }

  handleChange = (field, e) => {
    console.log(field, e.target.value);
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });

    console.log(this.state.fields);
  }

  registerUser = () => {
    const data = {
      firstname: this.state.fields.firstName,
      lastname: this.state.fields.lastName,
      contact_number: "1234567891",
      email: this.state.fields.email,
      // carrier_code: "non",
      password: this.state.fields.password,
      confirmpassword: this.state.fields.confirmPassword,
      store_id: 1,//this.props.globals.currentStore,
      // title: this.state.fields.title,
      quest_quote: "non",
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

    let titleSelect = <div ><div className="custom-select">
      {/* <div>  <FormattedMessage id="Form.FirstName" defaultMessage="First Name" /></div> */}
      <FormattedMessage id="Form.FirstName" defaultMessage="First Name">
        <select>
          <option value="0">SelectBox</option>
        </select>

      </FormattedMessage>
    </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;
    let titleDropdown = <select value={this.state.value} onChange={this.handleChange.bind(this, "title")} className="dropdownBox form-control">
      <option value="select">Please Select</option>
      <option value="First">First</option>
      <option value="Second">Second</option>
      <option value="Third">Third</option>
    </select>
    let firstNameInputField = <div ><div >
      {/* <div>  <FormattedMessage id="Form.FirstName" defaultMessage="First Name" /></div> */}
      <FormattedMessage id="Form.FirstName" defaultMessage="First Name">
        {(message) =>
          <input type="text" required={true} placeholder={message} id="P1001_FNAME" name="P1001_FNAME" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]} size={30} />}
      </FormattedMessage>
    </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;

    let LastNameInputField = <div ><div >
      <FormattedMessage id="Form.LastName" defaultMessage="Last Name">
        {(message) =>
          <input type="text" id="P1001_LNAME" name="P1001_LNAME" placeholder={message} onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]} size={30} />}
      </FormattedMessage>
    </div></div>

    let emailInputField = <div><div>
      <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
        {(message) =>
          <input type="email" id="P1001_EMAIL" name="P1001_EMAIL" placeholder={message} onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} size={30} />}
      </FormattedMessage>
    </div></div>


    let confirmEmailInputField = <div><div>
      <FormattedMessage id="ContactUs.ConfirmEmail" defaultMessage="Confirm Email">
        {(message) =>
          <input type="email" id="P1001_Confirm_EMAIL" name="P1001_Confirm_EMAIL" placeholder={message} onChange={this.handleChange.bind(this, "confirmEmail")} value={this.state.fields["confirmEmail"]} size={30} />}
      </FormattedMessage>
    </div></div>


    let contactNumberInputField = null;

    let passwordInputField = <div><div>
      <FormattedMessage id="password" defaultMessage="Password">
        {(message) =>
          <input type="password" name="P1001_PWD" size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} id="P1001_PWD" placeholder={message} aria-autocomplete="list" />}
      </FormattedMessage>
    </div></div>
    let confirmPasswordInputField = <div ><div >
      <FormattedMessage id="profile.Confirm.Password" defaultMessage="Confirm Password">
        {(message) =>
          <input type="password" name="P1001_RPWD" size="30" onChange={this.handleChange.bind(this, "confirmPassword")} value={this.state.fields["confirmPassword"]} id="P1001_RPWD" placeholder={message} />}
      </FormattedMessage>
    </div><span id="P1001_RPWD_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;


    if ('firstName' in errorsObj) {
      firstNameInputField = <div>
        <div ><input type="text" id="P1001_FNAME" name="P1001_FNAME" placeholder="First Name" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]} size="30" maxLength="100" aria-describedby="P1001_FNAME_error" aria-invalid="true" />
        </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">{errorsObj["firstName"]}</div></span></span></div>
    }

    if ('lastName' in errorsObj) {
      LastNameInputField = <div ><div>
        <input type="text" id="P1001_LNAME" name="P1001_LNAME" placeholder="Last Name" onChange={this.handleChange.bind(this, "lastName")} value={this.state.fields["lastName"]} size="30" maxLength="100" aria-describedby="P1001_LNAME_error" aria-invalid="true" /></div>
        <span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">
          {errorsObj["lastName"]}</div></span></span></div>
    }
    if ('email' in errorsObj) {
      emailInputField = <div><div>
        <input type="text" id="P1001_EMAIL" name="P1001_EMAIL" placeholder="Email Address" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} size="30" maxLength="100" aria-describedby="P1001_EMAIL_error" aria-invalid="true" /></div>
        <span id="P1001_EMAIL_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_EMAIL_error">
          {errorsObj["email"]}</div></span></span></div>
    }
    if ('ConfirmEmail' in errorsObj) {
      confirmEmailInputField = <div><div>
        <input type="text" id="P1001_ConfirmEMAIL" name="P1001_ConfirmEMAIL" placeholder="Confirm Email Address" onChange={this.handleChange.bind(this, "confirmEmail")} value={this.state.fields["confirmEmail"]} size="30" maxLength="100" aria-describedby="P1001_ConfirmEMAIL_error" aria-invalid="true" /></div>
        <span id="P1001_ConfirmEMAIL_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_ConfirmEMAIL_error">
          {errorsObj["confirmEmail"]}</div></span></span></div>
    }

    // if ('contactNumber' in errorsObj) {
    //   phoneNumberClassName = "t-Form-inputContainer";
    //   contactNumberInputField = <span id="P1001_PHONE_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error">
    //     <div id="P1001_PHONE_error">{errorsObj["contactNumber"]}</div></span></span>

    // }
    // if ('email' in errorsObj) {

    //   emailInputField = <div className="t-Form-inputContainer"><div >
    //     <input type="email" id="P1001_EMAIL" name="P1001_EMAIL" placeholder="Email Address"  onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} size="30" maxLength="100" aria-describedby="P1001_EMAIL_error" aria-invalid="true" />
    //     </div><span id="P1001_EMAIL_error_placeholder" className="a-Form-error  u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error">
    //       <div id="P1001_EMAIL_error">{errorsObj["email"]}</div></span></span></div>;
    // }

    if ('password' in errorsObj) {
      passwordInputField = <div><div >
        <input type="password" name="P1001_PWD" size="30" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]} id="P1001_PWD" placeholder="Password" aria-autocomplete="list" aria-describedby="P1001_PWD_error" aria-invalid="true" />
      </div>
        <span id="P1001_PWD_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P1001_PWD_error">{errorsObj["password"]}</div></span></span></div>;
    }

    if ('confirmPassword' in errorsObj) {
      confirmPasswordInputField = <div><div>
        <input type="password" name="P1001_RPWD" size="30" onChange={this.handleChange.bind(this, "confirmPassword")} value={this.state.fields["confirmPassword"]} id="P1001_RPWD" placeholder="Repeat Password" aria-describedby="P1001_RPWD_error" aria-invalid="true" />
      </div>
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


          <div className="t-Dialog " role="dialog" aria-label="Create an Account">
            <div className="t-Dialog-header"></div>
            <div className="t-Dialog-bodyWrapperOut">
              <div className="t-Dialog-bodyWrapperIn overFlowVisible  backWhite"><div className="">
                <span id="APEX_SUCCESS_MESSAGE" data-template-id="33515671899469661_S" className="apex-page-success u-hidden"></span><span id="APEX_ERROR_MESSAGE" data-template-id="33515671899469661_E" className="apex-page-error u-hidden"></span>
                <div className="container">
                  <div className="row">
                    <div className="rmPadding col col-12 apex-col-auto">
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
                          <div className="">
                            <div className="">
                              {/* <div className=" padding row">
                                <div className="col col-6 rmLeftPad">
                                  <div className="rmPadding col col-12 apex-col-auto">
                                    <div className="row block" id="P1001_FNAME_CONTAINER">
                                      <div className="rmPadding t-Form-labelContainer">
                                        <label htmlFor="P1001_FNAME" id="P1001_FNAME_LABEL" className="t-Form-label bolt">
                                          <FormattedMessage id="Form.Title" defaultMessage="Title" />
                                          <span className="u-VisuallyHidden">(Value Required)</span>
                                        </label>
                                      </div>
                                      <div className="contents row">
                                        {titleDropdown}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div> */}
                              <div className=" padding row">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="row block" id="P1001_FNAME_CONTAINER"><div className="rmPadding t-Form-labelContainer">
                                    <label htmlFor="P1001_FNAME" id="P1001_FNAME_LABEL" className="t-Form-label bolt"><FormattedMessage id="Form.FirstName" defaultMessage="First Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>
                                    <div className="contents row">
                                      {firstNameInputField}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="padding row">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="row block" id="P1001_LNAME_CONTAINER"><div className="rmPadding rmTopPadding t-Form-labelContainer">
                                    <label htmlFor="P1001_LNAME" id="P1001_LNAME_LABEL" className="t-Form-label bolt"><FormattedMessage id="Form.LastName" defaultMessage="Last Name" /></label>
                                  </div>
                                    <div className="contents row">
                                      {LastNameInputField}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* <div className="row">
                                <div className="col col-12 apex-col-auto">
                                  <div className="padding t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label" id="P1001_PHONE_CONTAINER">
                                    <div className="t-Form-labelContainer">
                                    </div>
                                    <div id="PhoneNumber" className={phoneNumberClassName} >
                                      <PhoneNumber changed={this.contactNumber} />
                                      {contactNumberInputField}
                                    </div>

                                  </div>
                                </div>
                              </div> */}

                              <div className="padding row">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="rmPadding block row" id="P1001_EMAIL_CONTAINER"><div className="rmTopPadding rmPadding t-Form-labelContainer">
                                    <label htmlFor="P1001_EMAIL" id="P1001_EMAIL_LABEL" className="bolt t-Form-label">
                                      <FormattedMessage id="Form.Email" defaultMessage="Email" />
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>
                                    <div className="contents row">
                                      {emailInputField}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="padding row">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="rmPadding block row" id="P1001_EMAIL_CONTAINER"><div className="rmTopPadding rmPadding t-Form-labelContainer">
                                    <label htmlFor="P1001_EMAIL" id="P1001_EMAIL_LABEL" className="bolt t-Form-label">
                                      <FormattedMessage id="Form.ConfirmEmail" defaultMessage="Confirm Email" />
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>
                                    <div className="contents row">
                                      {confirmEmailInputField}
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="row instructionCss pad">
                                <span><FormattedMessage id="Form.PasswordConventions" defaultMessage="Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter and a number."></FormattedMessage></span>
                              </div>

                              <div className="padding row">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="row block" id="P1001_PWD_CONTAINER"><div className="rmTopPadding rmPadding t-Form-labelContainer">
                                    <label htmlFor="P1001_PWD" id="P1001_PWD_LABEL" className="bolt t-Form-label">
                                      <FormattedMessage id="Form.Password" defaultMessage="password" />
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>
                                    <div className="contents row">
                                      {passwordInputField}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row instructionCss">
                                <span><FormattedMessage id="Form.PasswordLength" defaultMessage="Minimum length is 6"></FormattedMessage></span>
                              </div>

                              <div className="padding row bot-bottom">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="row block" id="P1001_RPWD_CONTAINER"><div className="rmTopPadding rmPadding t-Form-labelContainer">
                                    <label htmlFor="P1001_RPWD" id="P1001_RPWD_LABEL" className="bolt t-Form-label">
                                      <FormattedMessage id="Form.ConfirmPassword" defaultMessage="Confirm Password" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                  </div>
                                    <div className="contents row ">
                                      {confirmPasswordInputField}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row padTop20 backWhite">
                                <label class="checkBox"><FormattedMessage id="Form.RecieveEmail" defaultMessage="I'd like to receive emails from ELC about Spacial Offers, new toys and voucher codes."></FormattedMessage>
                                  <input type="checkbox"  ></input>
                                  <span class="checkmark"></span>
                                </label>
                              </div>
                              <div className="row backWhite ">
                                <ul className="nay liFont">
                                  <li ><FormattedMessage id="Form.EmailPolicy" defaultMessage="You can ask us to stop any time and will never sell your data to other companies for marketing purpose." /></li>
                                  <li><FormattedMessage id="Form.EmailPolicys" defaultMessage="We always try to send emails that are relevant to you bassed on products you have shown an interest in." /></li>
                                </ul>
                              </div>

                              <div className="row backWhite">
                                <div className="rmPadding col col-12 apex-col-auto">
                                  <div className="button-add-to-basket right" type="button" id="B35835076185290944" onClick={this.signUpSubmit}><span className="t-Button-label bolt"><FormattedMessage id="login.SignUp.Title" defaultMessage="Register" /></span></div>
                                </div>
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