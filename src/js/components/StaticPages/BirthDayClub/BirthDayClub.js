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
let editingRow = 0
class BirthDayClub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortByText: "",
      startDate: new Date(),
      ChildrenCountNumber: 1,
      update: true,
      error: false,
      childName: '',
      fieldsCustomer:
      {
        parentFirstName: '',
        parentLastName: '',
        carriercode: '',
        phoneNumber: '',
        email: '',
        lang: ''

      },
      fieldsChildren:
      {
        name: '',
        gender: '',
        dob: ''
      }
    }
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
  }

  showGenderOption = (index) => {
    if (sortByShowOption[index]) {
      sortByShowOption[index] = false
    } else {
      sortByShowOption[index] = true
    }
    this.setState({ update: true })
  }

  handleChange = (index, date) => {
    ChildrenDate[index] = date
    this.setState({ update: true })
  };

  ragester() {
    console.log(ChildrenName)
    console.log(ChildrenGender)
    console.log(ChildrenDate)
  }

  addChild() {
    if (ChildrenDate[ChildrenDate.length - 1] == '' || ChildrenName[ChildrenName.length - 1] == '' || ChildrenGender[ChildrenGender.length - 1] == '') {
      //"input-field error" : "input-field"
      this.setState({error: true})
    } else {
      ChildrenDate.push("")
      ChildrenName.push("")
      ChildrenGender.push("")
      sortByShowOption[sortByShowOption.length] = false
      ChildrenCount.push(String(this.state.ChildrenCountNumber + 1))
      this.setState({ ChildrenCountNumber: this.state.ChildrenCountNumber + 1 });
      this.setState({error: false})
    }
  }

  autoSearchText = (e, index) => {
    console.log(e.target.value)
    console.log(index)
    this.state.childName = e.target.value
  }

  removeChild = (index) => {
    if(index != 0){
      ChildrenDate.splice(index, 1);
      ChildrenName.splice(index, 1);
      ChildrenGender.splice(index, 1);
      ChildrenCount.splice(index, 1);
      this.setState({ ChildrenCountNumber: this.state.ChildrenCountNumber - 1 });
      this.setState({error: false})
    }
  }

  render() {
    let store_locale = this.props.globals.store_locale
    let phoneNumberClassName = null;
    phoneNumberClassName = "t-Form-inputContainer";
    let firstnameinputField = <div>
      <div>
        <FormattedMessage id="addnewchild.firstname" defaultMessage="First Name">
          {(message) =>
            <input name="first_name" className="input-box" placeholder={message} value={this.state.fieldsCustomer['parentFirstName']}></input>}
        </FormattedMessage>
      </div>
      <span id="P1000_USERNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span>
    </div>;


    let emailInputField = <div><div>
      <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
        {(message) =>
          <input type="email" className="input-box" style={{ borderRadius: 0 }} id="P1001_EMAIL" name="P1001_EMAIL" value={this.state.fieldsCustomer["email"]} size={30} />}
      </FormattedMessage>
    </div></div>



    let arLangRadioField = <div><div>
      <FormattedMessage id="ContactUs.Email" defaultMessage="Email">
        {(message) =>
          <input type="radio" id="P1001_EMAIL" name="P1001_EMAIL" value={this.state.fieldsCustomer["email"]} size={30} />}
      </FormattedMessage>
    </div></div>

    let contactNumberInputField = null

    return (
      <div>
        <div>
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
            <Row>
              <Col xs={12} lg={6} md={6} className="alignStart">
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1">Parent First Name</span>
                </div>
                <div>
                  <input className={"input-field"}></input>
                </div>
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1">Email Address</span>
                </div>
                <div>
                  <input className={"input-field"}></input>
                </div>
              </Col>
              <Col xs={12} lg={6} md={6} className="alignStart">
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1">Parent Last Name</span>
                </div>
                <div>
                  <input className="input-field"></input>
                </div>
                <div style={{ marginTop: 15 }}>
                  <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1">Contact Numbe</span>
                </div>
                <div className="paddingLeft" style={{ marginTop: 5 }}>
                  <div style={{ textAlign: "start" }} >
                    <div className="padding row">
                      <div className=" col-12 apex-col-auto" style={{ padding: 0 }}>
                        {/* <div className="row block" id="P1001_LNAME_CONTAINER" style={{ paddingLeft: 12 }}><div className="rmPadding rmTopPadding t-Form-labelContainer">
                          <label htmlFor="P1001_LNAME" id="P1001_LNAME_LABEL" className="t-Form-label bolt"><FormattedMessage id="Form.PhoneNumber" defaultMessage="Contact Number *" /></label></div>
                        </div> */}
                        <div style={{ padding: 0 }} className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label" id="P1001_PHONE_CONTAINER">

                          <div style={{ width: '100%' }} id="PhoneNumber" className={phoneNumberClassName} >
                            <PhoneNumber changed={this.contactNumber} />
                            {contactNumberInputField}
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
                  <span className="blackTitle1">Prefered Language</span>
                </div>
                <div>
                  <input className="RadioButton" type="radio" name="gender" value="male" /> <span className="radioButtonText">Arabic</span>
                  <input className="radioButton RadioButton" type="radio" name="gender" value="female" /> <span className="radioButtonText">English</span>
                </div>
              </Col>
            </Row>
            <div className="errorMessageDiv" style={this.state.error ? {display: 'block'}: {display: 'none'}}>
              <div className="errorMessage">
                  Please select data
                  <i className="close fa fa-times close-icon-sort" aria-hidden="true" onClick={() => this.setState({error: false})}/>
              </div>
            </div>
            {ChildrenCount.map((keyName, index) =>
              <Row style={{position: 'relative'}} className="alignStart">
                <Col xs={12} lg={4} md={4} >
                  <div style={{ marginTop: 15 }}>
                    <span className="blackTitle1 alignStart">Name</span>
                  </div>
                  <div>
                    <input className={"input-field"} placeholder="Name" onChange={this.getName.bind(this, index)}></input>
                  </div>
                </Col>
                <Col xs={12} lg={4} md={4} >
                  <div style={{ marginTop: 15 }}>
                    <span className="blackTitle1 alignStart">Gender</span>
                  </div>
                  <div style={{ position: 'relative' }}>
                    <div className={sortByShowOption[index] ? "sortBySelectedText open genderPadding" : "sortBySelectedText genderPadding"} onClick={() => this.showGenderOption(index)} style={{border: 'solid 1px #b1b1b1'}}>
                      <span>{ChildrenGender[index] != "" ? ChildrenGender[index] : "Select Gender"}</span>
                      <i className="icon-down sortBySelectedTextIcon" ></i>
                    </div>
                    <div>
                      <div className="sortByOption" style={sortByShowOption[index] ? { display: 'block' } : { display: 'none' }}>
                        <div className="sortByOptionText" onClick={() => this.onClickGender("Male", index)}>
                          <span>Male</span>
                        </div>
                        <div className="sortByOptionText" onClick={() => this.onClickGender("Female", index)}>
                          <span>Female</span>
                        </div>
                        <div className="sortByOptionText" onClick={() => this.onClickGender("Other", index)}>
                          <span>Other</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={12} lg={4} md={4} >
                  <div style={{ marginTop: 15 }}>
                    <span className="blackTitle1 alignStart">DOB</span>
                  </div>
                  <div style={{width: "100%"}}>
                    <DatePicker
                      selected={ChildrenDate[index] != "" ? ChildrenDate[index] : new Date()}
                      onChange={this.handleChange.bind(this, index)}
                      style={{width: "100%"}}
                    />
                  </div>
                </Col>
                <i style={{position: 'absolute'}} className="close fa fa-times crossIcon" aria-hidden="true" onClick={() => this.removeChild(index)}/>
              </Row>
            )}
            <Row style={{ textAlign: 'center', paddingTop: 20 }}>
              <Col xs={12} lg={12} md={12}>
                <button class="addChildrenButton" onClick={() => this.addChild()}>Add Children</button>
              </Col>
            </Row>
            <Row style={{ textAlign: 'center', paddingTop: 10 }}>
              <Col>
                <button class="addChildrenRegisterButton" onClick={() => this.ragester()}>Register</button>
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
    aboutUs: state.static.aboutUs,
    spinnerProduct: state.spinner.loadingProduct,
    globals: state.global
  }
}


export default connect(mapStateToProps)(BirthDayClub);