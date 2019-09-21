import React, { Component } from "react";
import "./BirthDayClub.css";
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Image } from "react-bootstrap";
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../../redux/actions/index';
import BirthDayClubImage from '../../../../assets/images/BirthDayClub/birthday-club.png';
import AddNewChild from './AddNewChild';
import PhoneNumber from '../../Login/IntlTelePhone'
class BirthDayClub extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
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
          <input type="email" className="input-box" style={{borderRadius:0}} id="P1001_EMAIL" name="P1001_EMAIL" value={this.state.fieldsCustomer["email"]} size={30} />}
      </FormattedMessage>
    </div></div>



let arLangRadioField = <div><div>
<FormattedMessage id="ContactUs.Email" defaultMessage="Email">
  {(message) =>
    <input type="radio"  id="P1001_EMAIL" name="P1001_EMAIL" value={this.state.fieldsCustomer["email"]} size={30} />}
</FormattedMessage>
</div></div>

    let contactNumberInputField = null



    return (
      <div>
        <Row style={{ marginTop: "40px" }}>


          <Col xs={2} lg={4} md={4} > <div>
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span><span>&nbsp;\&nbsp;&nbsp;</span>
            </Link>
            <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="birthdayclub.header" defaultMessage="Birthday Club" /></span>
          </div></Col>
          <Col xs={6} lg={6} md={6} style={{ marginBottom: "40px" ,marginTop: "100px" }}>
            <Row>
              <Col xs={6} lg={6} md={6} >

                <div className="paddingLeft" style={{ paddingRight: 30 }}>
                  <div style={{ textAlign: "start" }} >
                    <div className=" padding row">
                      <div className="rmPadding col col-12 apex-col-auto">
                        <div className="row block" id="P1001_FNAME_CONTAINER"><div className="rmPadding t-Form-labelContainer">
                          <label htmlFor="P1001_FNAME" id="P1001_FNAME_LABEL" className="t-Form-label bolt"><FormattedMessage id="Form.FirstName" defaultMessage="First Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                        </div>
                          <div className="contents row">
                            {firstnameinputField}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="paddingLeft" style={{ paddingRight: 30 }}>
                  <div style={{ textAlign: "start" }} ></div>
                  <div className="padding row">
                    <div className="rmPadding col col-12 apex-col-auto">
                      <div className="block row" id="P1001_EMAIL_CONTAINER"><div className="rmPadding rmPadding t-Form-labelContainer">
                        <label htmlFor="P1001_EMAIL" id="P1001_EMAIL_LABEL" className="bolt t-Form-label">
                          <FormattedMessage id="ContactUs.Email" defaultMessage="Email" /> *
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                      </div>
                        <div className="contents row">
                          {emailInputField}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="paddingLeft" style={{ paddingRight: 30 }}>
                  <div style={{ textAlign: "start" }} ></div>
                  <div className="padding row">
                    <div className="rmPadding col col-12 apex-col-auto">
                      <div className="block row" id="P1001_EMAIL_CONTAINER"><div className="rmPadding rmPadding t-Form-labelContainer">
                        <label htmlFor="P1001_EMAIL" id="P1001_EMAIL_LABEL" className="bolt t-Form-label">
                          <FormattedMessage id="ContactUs.Email" defaultMessage="Email" /> *
                                      <span className="u-VisuallyHidden">(Value Required)</span></label>
                      </div>
                        <div className="contents row">
                        {arLangRadioField}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={6} lg={6} md={6} >
                <div className="paddingLeft" style={{ paddingRight: 30 }}>

                  <div style={{ textAlign: "start" }} >
                    <div className=" padding row">
                      <div className="rmPadding col col-12 apex-col-auto">
                        <div className="row block" id="P1001_FNAME_CONTAINER"><div className="rmPadding t-Form-labelContainer">
                          <label htmlFor="P1001_FNAME" id="P1001_FNAME_LABEL" className="t-Form-label bolt"><FormattedMessage id="Form.FirstName" defaultMessage="First Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                        </div>
                          <div className="contents row">
                            {firstnameinputField}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="paddingLeft" style={{ paddingRight: 30 }}>

                  <div style={{ textAlign: "start" }} >
                    <div className="padding row">
                      <div className=" col-12 apex-col-auto" style={{ padding: 0 }}>
                        <div className="row block" id="P1001_LNAME_CONTAINER" style={{ paddingLeft: 12 }}><div className="rmPadding rmTopPadding t-Form-labelContainer">
                          <label htmlFor="P1001_LNAME" id="P1001_LNAME_LABEL" className="t-Form-label bolt"><FormattedMessage id="Form.PhoneNumber" defaultMessage="Contact Number *" /></label></div>
                        </div>
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
          </Col>
          <Col xs={2} lg={2} md={2} />
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