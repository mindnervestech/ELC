import React, { Component } from "react";
import "./BirthDayClub.css";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Image, Form, FormGroup } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import BirthDayClubImage from '../../../../assets/images/BirthDayClub/birthday-club.png';
import AddNewChild from './AddNewChild';
import PhoneNumber from '../../Login/IntlTelePhone'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

let ChildrenCount = ['1']
let ChildrenDate = ['']
let ChildrenName = ['']
let ChildrenGender = ['']
let sortByShowOption = [false]
let moreinfoData = ''
let langerror = false
let editingRow = 0
class BirthDayClub extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      sortByText: "",
      startDate: new Date(),
      ChildrenCountNumber: 1,
      update: true,
      error: false,
      childName: '',
      showAlert: false,
      ischeckremove: true,
      lang: 'en',
      fields:
      {
        parentFirstName: '',
        parentLastName: '',
        carriercode: '',
        contactNumber: '',
        email: '',
        name: '',
        gender: '',
        dob: ''
      },
      sucesss_message: '',
      errors: {},
      isPhoneValid: false,

    }
  }

  closeAlert = () => {
    this.setState({ showAlert: false });
  }

  // componentDidUpdate() {

  //   if (this.props.bclubDetails !== undefined) {
  //     let message = this.props.bclubDetails.message
  //     console.log("message outside  ischeckremove",message)
  //     if (this.state.ischeckremove) {
  //      console.log("message ischeckremove",message)
  //       this.setState({ sucesss_message: message,  ischeckremove: false });

  //       this.setState({showAlert:true})
  //      console.log("smessgae",this.state.sucesss_message)
  //      console.log(this.state.showAlert)
  //       // setTimeout(() => {
  //       //   this.closeAlert();
  //       // }, 5000);
  //     }

  //   }
  // }


  componentWillReceiveProps(nextprops) {

    if (nextprops.bclubDetails && !nextprops.bclubDetails.status) {
      let message = nextprops.bclubDetails.message

      setTimeout(() => {
        this.setState({ sucesss_message: message, ischeckremove: false, showAlert: true });
        
      }, 100);

      setTimeout(() => {
        this.closeAlert();
      }, 3000);

    }
  }






  // componentWillUnmount() {
  //   this.props.onClearRegistrationError();
  // }


  handleValidation = () => {
    let fields = this.state.fields;

    let errors = {};
    let formIsValid = true;

    if (this.state.lang == ' ') {
      langerror = true


    }
    if (!fields["parentFirstName"]) {
      formIsValid = false;
      errors["parentFirstName"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage="First name cannot be empty" />;
    }

    if (!fields["parentLastName"]) {
      formIsValid = false;
      errors["parentLastName"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Last name cannot be empty" />;
    }

    if (typeof fields["parentFirstName"] !== "undefined") {
      if (!fields["parentFirstName"].match(/^[a-zA-Z]+$/) && fields["parentFirstName"].length > 0) {
        formIsValid = false;
        errors["parentFirstName"] = <FormattedMessage id="Signup.validation.firstName.onlyletters" defaultMessage="Please enter only letters" />;
      }
    }

    if (typeof fields["parentLastName"] !== "undefined") {
      if (!fields["parentLastName"].match(/^[a-zA-Z]+$/) && fields["parentLastName"].length > 0) {
        formIsValid = false;
        errors["parentLastName"] = <FormattedMessage id="Signup.validation.lastName.onlyletters" defaultMessage="Please enter only letters" />;
      }
    }

    //Email
    if (typeof fields["email"] !== "undefined") {

      if (fields["email"].length === 0) {
        formIsValid = false;
        errors["email"] = <FormattedMessage id="Signup.validation.email.empty" defaultMessage="Please enter email" />;
      }

      if (fields["email"].length > 0) {
        let lastAtPos = fields["email"].lastIndexOf('@');
        let lastDotPos = fields["email"].lastIndexOf('.');
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2 && !fields["email"].includes(' '))) {
          formIsValid = false;
          errors["email"] = <FormattedMessage id="Signup.validation.email.invalid" defaultMessage="Please enter email in valid format" />;
        }
      }
    }
    if (!(this.state.isPhoneValid)) {

      formIsValid = false;
      errors["contactNumber"] = <FormattedMessage id="Signup.validation.contactNumber.empty" defaultMessage="Eneter Valid Contact Number" />;

    }

   

    this.setState({ errors: errors });
    return formIsValid;
  }

  signUpSubmit = (e) => {

    e.preventDefault();
    if (this.props.isUserLoggedIn) {
      if (this.handleValidation()) {
        this.register();
      }
    }

    else {
      this.props.history.push(`/${this.props.globals.store_locale}/Login`);
    }

  }
  handleChange
    = (field, e) => {
      let fields = this.state.fields;
      fields[field] = e.target.value;
      this.setState({ fields });

    }

  contactNumber = (status, value, countryData, number, id) => {
    if (status) {
      let fields = this.state.fields;
      fields['contactNumber'] = value;
      fields['carrierCode'] = countryData.dialCode;
      this.setState({ fields, isPhoneValid: true });
    } else {
      this.setState({ isPhoneValid: false })
    }
  }

  onClickGender = (gender, index) => {
    ChildrenGender[index] = gender
    sortByShowOption[index] = false
    this.setState({ update: true })
  }

  getName = (index, name) => {
    ChildrenName[index] = name.target.value
    this.setState({ update: true })
  }

  showGenderOption = (index) => {
    if (sortByShowOption[index]) {
      sortByShowOption[index] = false
    } else {
      sortByShowOption[index] = true
    }
    this.setState({ update: true })
  }

  handleChangeDOB = (index, date) => {
    ChildrenDate[index] = date
    this.setState({ update: true })
  };

  ragester() {

  }

  addChild() {
    if (ChildrenDate[ChildrenDate.length - 1] == '' || ChildrenName[ChildrenName.length - 1] == '' || ChildrenGender[ChildrenGender.length - 1] == '') {
      //"input-field error" : "input-field"
      this.setState({ error: true })
    } else {
      ChildrenDate.push("")
      ChildrenName.push("")
      ChildrenGender.push("")
      sortByShowOption[sortByShowOption.length] = false
      ChildrenCount.push(String(this.state.ChildrenCountNumber + 1))
      this.setState({ ChildrenCountNumber: this.state.ChildrenCountNumber + 1 });
      this.setState({ error: false })
    }
  }

  autoSearchText = (e, index) => {

    this.state.childName = e.target.value
  }

  removeChild = (index) => {
    if (index != 0) {
      ChildrenDate.splice(index, 1);
      ChildrenName.splice(index, 1);
      ChildrenGender.splice(index, 1);
      ChildrenCount.splice(index, 1);
      this.setState({ ChildrenCountNumber: this.state.ChildrenCountNumber - 1 });
      this.setState({ error: false })
    }
  }


  clearContactState = () => {
    ChildrenDate = ['']
    ChildrenName = ['']
    ChildrenGender = ['']
    ChildrenCount = ['1']

    this.setState({
      ...this.state,
      fields:
      {
        parentFirstName: '',
        parentLastName: '',
        carriercode: '',
        contactNumber: '',
        email: '',
        name: '',
        gender: '',
        dob: ''
      }
    })
  }

  register = () => {
    if (ChildrenDate[ChildrenDate.length - 1] == '' || ChildrenName[ChildrenName.length - 1] == '' || ChildrenGender[ChildrenGender.length - 1] == '') {
      this.setState({ error: true })
    } else {
      moreinfoData = ''
      for (let i = 0; i < ChildrenName.length; i++) {
        moreinfoData = moreinfoData + ChildrenName[i] + ':' + ChildrenGender[i] + ':' + ChildrenDate[i].getDate() + '' + (ChildrenDate[i].getMonth() + 1) + '' + ChildrenDate[i].getFullYear() + ';'
      }
      const data = {
        firstname: this.state.fields.parentFirstName,
        lastname: this.state.fields.parentLastName,
        phoneNumber: parseInt((this.state.fields.contactNumber).trim()),
        email: this.state.fields.email,
        countryCode: this.state.fields.carrierCode,
        storeid: this.props.globals.currentStore,
        language: this.state.lang,
        moreinfo: moreinfoData
      }
     
      this.clearContactState();
      this.setState({ error: false })
      this.props.onRegisterBirthdayClubUser(data);


    }
  }

  render() {
    let respo_message = null;
   
    if (this.state.showAlert) {
      
      respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
        <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
          <div className="t-Alert-wrap">
            <div className="t-Alert-icon">
              <span className="t-Icon" />
            </div>
            <div className="t-Alert-content">
              <div className="t-Alert-header">
                <h2 className="t-Alert-title">{this.state.sucesss_message}</h2>
              </div>
            </div>
            <div className="t-Alert-buttons">
              <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.closeAlert} ><span className="t-Icon icon-close" /></button>
            </div>
          </div>
        </div>
      </div></span>;
    }

    let store_locale = this.props.globals.store_locale;
    const errorsObj = this.state.errors;
    let phoneNumberClassName = null;
    phoneNumberClassName = "t-Form-inputContainer PhoneNumberBClub";
    let parentFirstNameField = <div>
      <div>
        <FormattedMessage id="addnewchild.parentfirstname" defaultMessage="Parent First Name">
          {(message) =>
            <input name="first_name" className="input-field" placeholder={message} onChange={this.handleChange.bind(this, "parentFirstName")} value={this.state.fields['parentFirstName']}></input>}
        </FormattedMessage>
      </div>
      <span id="P1000_USERNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span>
    </div>;
    let parentLastNameField = <div>
      <div>
        <FormattedMessage id="addnewchild.parentlastname" defaultMessage="Parent Last Name">
          {(message) =>
            <input name="first_name" className="input-field" placeholder={message} onChange={this.handleChange.bind(this, "parentLastName")} value={this.state.fields['parentLastName']}></input>}
        </FormattedMessage>
      </div>
      <span id="P1000_USERNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span>
    </div>;


    let emailInputField = <div><div>
      <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
        {(message) =>
          <input type="email" placeholder={message} className="input-field" style={{ borderRadius: 0 }} id="P1001_EMAIL" value={this.state.fields['email']} name="P1001_EMAIL" onChange={this.handleChange.bind(this, "email")} size={30} />}
      </FormattedMessage>
    </div></div>

    if ('contactNumber' in errorsObj) {
      phoneNumberClassName = "t-Form-inputContainer PhoneNumberBClub";
      contactNumberInputField = <span id="P1001_PHONE_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error">
        <div id="P1001_PHONE_error">{errorsObj["contactNumber"]}</div></span></span>

    }

    let spanerrorlangmessage = null
    if (langerror) {
      spanerrorlangmessage = <span style={{ color: 'red' }}>Select Language</span>
    }

    let arLangRadioField = <div><div>
      <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
        {(message) =>
          <input type="radio" id="P1001_EMAIL" name="P1001_EMAIL" value={this.state.fieldsCustomer["email"]} size={30} />}
      </FormattedMessage>
    </div></div>

    let contactNumberInputField = null






    if ('parentFirstName' in errorsObj) {
      parentFirstNameField = <div>
        <div>
          <FormattedMessage id="addnewchild.parentfirstname" defaultMessage="Parent First Name">
            {(message) =>
              <input name="first_name" className="input-field" placeholder={message} onChange={this.handleChange.bind(this, "parentFirstName")} value={this.state.fields['parentFirstName']}></input>}
          </FormattedMessage>
        </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">{errorsObj["parentFirstName"]}</div></span></span></div>
    }



    if ('parentLastName' in errorsObj) {
      parentLastNameField = <div>
        <div>
          <FormattedMessage id="addnewchild.parentlastname" defaultMessage="Parent Last Name">
            {(message) =>
              <input name="first_name" className="input-field" placeholder={message} onChange={this.handleChange.bind(this, "parentLastName")} value={this.state.fields['parentLastName']}></input>}
          </FormattedMessage>
        </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">{errorsObj["parentLastName"]}</div></span></span></div>
    }


    if ('email' in errorsObj) {
      emailInputField = <div>
        <div>
          <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
            {(message) =>
              <input type="email" placeholder={message} className="input-field" style={{ borderRadius: 0 }} id="P1001_EMAIL" value={this.state.fields['email']} name="P1001_EMAIL" onChange={this.handleChange.bind(this, "email")} size={30} />}
          </FormattedMessage>
        </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span className="t-Form-error"><div id="P1001_FNAME_error">{errorsObj["email"]}</div></span></span></div>
    }

    return (


      <div>
        {respo_message}
        <div className="padding-breadcrumb" style={{ textAlign: 'start' }}>
          <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
            <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span><span>&nbsp;\&nbsp;&nbsp;</span>
          </Link>
          <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="birthdayclub.header" defaultMessage="Birthday Club" /></span>
        </div>
        <Row style={{ marginBottom: "40px", marginTop: "100px" }} className="check-out removeRow">
          <Col xs={12} lg={5} md={5} >
            <img className="badyCloubImage" src={BirthDayClubImage}></img>
          </Col>
          <Col xs={1} lg={1} md={1} className="divShowOnMobile"></Col>
          <Col xs={10} lg={6} md={6} className="paddingRemove">
            <Row className="divShowOnWeb">
              <Col xs={12} lg={6} md={12} className="alignStart">
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="addnewchild.parentfirstname" defaultMessage="Parent First Name " /></span>
                </div>
                <div>
                  {parentFirstNameField}
                  {/* <input className={"input-field"} value={this.state.fields['parentFirstName']} onChange={this.handleChange.bind(this, "parentFirstName")}></input> */}
                </div>
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="ContactUs.Email" defaultMessage="Email Address " /></span>
                </div>
                <div>
                  {emailInputField}
                  {/* <input className={"input-field"} value={this.state.fields['email']} onChange={this.handleChange.bind(this, "email")}></input> */}
                </div>
              </Col>
              <Col xs={12} lg={6} md={12} className="alignStart">
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="addnewchild.parentlastname" defaultMessage="Parent Last Name " /></span>
                </div>
                <div>
                  {parentLastNameField}
                </div>
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="Form.PhoneNumber" defaultMessage="Contact Number" /></span>
                </div>
                <div className="paddingLeft" style={{ marginTop: 5 }}>
                  <div style={{ textAlign: "start" }} >
                    <div className="padding row">
                      <div className=" col-12 apex-col-auto" style={{ padding: 0 }}>

                        <div style={{ padding: 0 }} className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label" id="P1001_PHONE_CONTAINER">

                          <div style={{ width: '100%' }} id="PhoneNumber" className={phoneNumberClassName} >
                            <PhoneNumber changed={this.contactNumber} />
                            <span id="PHONE_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                              {errorsObj["contactNumber"]}
                            </span>
                            {/* {contactNumberInputField} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Col>
            </Row>

            <Row className="divShowOnMobile">
              <Col xs={12} lg={6} md={12} className="alignStart divShowOnMobile">
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="addnewchild.parentfirstname" defaultMessage="Parent First Name " /></span>
                </div>
                <div>
                  {parentFirstNameField}
                  {/* <input className={"input-field"} value={this.state.fields['parentFirstName']} onChange={this.handleChange.bind(this, "parentFirstName")}></input> */}
                </div>
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="addnewchild.parentlastname" defaultMessage="Parent Last Name " /></span>
                </div>
                <div>
                  {parentLastNameField}
                </div>
              </Col>
              <Col xs={12} lg={6} md={12} className="alignStart divShowOnMobile">

                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="ContactUs.Email" defaultMessage="Email Address " /></span>
                </div>
                <div>
                  {emailInputField}
                  {/* <input className={"input-field"} value={this.state.fields['email']} onChange={this.handleChange.bind(this, "email")}></input> */}
                </div>

                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1"><FormattedMessage id="parentFirstName" defaultMessage="Contact Number" /></span>
                </div>
                <div className="paddingLeft" style={{ marginTop: 5 }}>
                  <div style={{ textAlign: "start" }} >
                    <div className="padding row">
                      <div className=" col-12 apex-col-auto" style={{ padding: 0 }}>

                        <div style={{ padding: 0 }} className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label" id="P1001_PHONE_CONTAINER">

                          <div style={{ width: '100%' }} id="PhoneNumber" className={phoneNumberClassName} >
                            <PhoneNumber changed={this.contactNumber} />
                            <span id="PHONE_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                              {errorsObj["contactNumber"]}
                            </span>
                            {/* {contactNumberInputField} */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Col>
            </Row>

            <Row>
              <Col xs={12} lg={12} md={12} className="alignStart">
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span>  <span className="blackTitle1"><FormattedMessage id="PreferedLanguage" defaultMessage="Prefered Language" /></span>
                </div>
                <div style={{ display: 'inline-flex' }}>
                  <input className="RadioButton" type="radio" name="gender" value="arabic" name="P1001_EMAIL" onChange={() => this.state.lang = 'ar'} /> <span className="radioButtonText"><FormattedMessage id="header.Arabic" defaultMessage="Arabic" /></span>
                  <input className="radioButton RadioButton" type="radio" name="gender" value="english" name="P1001_EMAIL" onChange={() => this.state.lang = 'en'} /> <span className="radioButtonText"><FormattedMessage id="header.English" defaultMessage="English" /></span>

                </div>
                {spanerrorlangmessage}
              </Col>
            </Row>
            <div className="errorMessageDiv" style={this.state.error ? { display: 'block' } : { display: 'none' }}>
              <div className="errorMessage">
                Please fill all * fields compulsory
                  <i className="close fa fa-times close-icon-sort" aria-hidden="true" onClick={() => this.setState({ error: false })} />
              </div>
            </div>
            {ChildrenCount.map((keyName, index) =>
              <Row style={{ position: 'relative' }} className="alignStart">
                <Col xs={12} lg={4} md={12} >
                  <div style={{ marginTop: 15 }}>
                    <span style={{ color: 'red' }}>*&nbsp;</span> <span className="blackTitle1 alignStart"  ><FormattedMessage id="addchild.ChildName" defaultMessage="Child Name" /></span>
                  </div>
                  <div>
                    <input value={ChildrenName[index] !== "" ? ChildrenName[index] : ""} className={"input-field"} placeholder="Name" onChange={this.getName.bind(this, index)}></input>
                  </div>
                  {/* {childNameDiv} */}
                </Col>
                <Col xs={12} lg={4} md={12} >
                  <div style={{ marginTop: 15 }}>
                    <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1 alignStart"><FormattedMessage id="addnewchild.Gender" defaultMessage="Gender" /></span>
                  </div>
                  <div style={{ position: 'relative', marginTop: 5 }}>
                    <div className={sortByShowOption[index] ? "sortBySelectedText2 open genderPadding" : "sortBySelectedText2 genderPadding"} onClick={() => this.showGenderOption(index)} style={{ border: 'solid 1px #b1b1b1' }}>
                      <span>{ChildrenGender[index] != "" ? ChildrenGender[index] : "Select Gender"}</span>
                      <i className="icon-down sortBySelectedTextIcon2" ></i>
                    </div>
                    <div>
                      <div className="sortByOption select-div width-select-div" style={sortByShowOption[index] ? { display: 'block' } : { display: 'none' }}>
                        <div className="sortByOptionText" onClick={() => this.onClickGender("Male", index)}>
                          <span><FormattedMessage id="addChildren.male" defaultMessage="Male" /></span>
                        </div>
                        <div className="sortByOptionText" onClick={() => this.onClickGender("Female", index)}>
                          <span><FormattedMessage id="addChildren.female" defaultMessage="Female" /></span>
                        </div>
                        <div className="sortByOptionText" onClick={() => this.onClickGender("Other", index)}>
                          <span><FormattedMessage id="addChildren.Other" defaultMessage="Other" /></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} lg={4} md={12} >
                  <div style={{ marginTop: 15 }}>
                    <span style={{ color: 'red' }}>*&nbsp;</span> <span className="blackTitle1 alignStart"><FormattedMessage id="addnewchild.dob" defaultMessage="DOB" /></span>
                  </div>
                  <div style={{ width: "100%", marginTop: 5, borderRadius: 0 }} id="badyClubDate">
                    <DatePicker
                      selected={ChildrenDate[index] != "" ? ChildrenDate[index] : new Date()}
                      onChange={this.handleChangeDOB.bind(this, index)}
                      style={{ width: "100%" }}
                    />
                  </div>
                </Col>
                {index != 0 ?
                  <i style={{ position: 'absolute' }} className="close fa fa-times crossIcon" aria-hidden="true" onClick={() => this.removeChild(index)} /> : <div />}
              </Row>
            )}
            <Row style={{ textAlign: 'center', paddingTop: 20 }}>
              <Col xs={12} lg={12} md={12}>
                <button className="addChildrenButton" onClick={() => this.addChild()}><FormattedMessage id="header.addChildern" defaultMessage="Add Children" /></button>

              </Col>
            </Row>
            <Row style={{ textAlign: 'center', paddingTop: 10 }}>
              <Col>
                <button class="addChildrenRegisterButton" onClick={this.signUpSubmit}><FormattedMessage id="Form.Register" defaultMessage="Register" /></button>


              </Col>
            </Row>
          </Col>
          <Col xs={1} lg={1} md={1} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return {
    isUserLoggedIn: state.login.isUserLoggedIn,
    spinnerProduct: state.spinner.loadingProduct,
    globals: state.global,
    bclubDetails: state.birthdayclubData.registerBClubUserDetails,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegisterBirthdayClubUser: (payload) => dispatch(actions.setBirthDayClubData(payload)),
    onClearRegistrationError: () => dispatch(actions.clearBirthdayClubRegisterError()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BirthDayClub);