import React, { Component } from "react";
import { Row, Col, Image, Form, FormGroup } from "react-bootstrap";
import "./AddNewChild.css";
//import BirthDayClubImage from '../../../../assets/images/BirthDayClub/birthday-club.png'
//import BirthDayClubImage from '../../../assets/images/BirthDayClub/birthday-club.png'
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import AlertBox from '../../Common/AlertBox/AlertBox';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import BirthDayClub from './BirthDayClub';
import BirthDayClubImage from '../../../../assets/images/BirthDayClub/birthday-club.png';


class AddNewChild extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        name: '',
        dd: '',
        mm: '',
        yyyy: '',
        gender: '',
        realationship: ''
      },

      errors: {},
      redirectToAddNewChild: true
    }

    this.child = React.createRef();
  }


  onCancleClick = () => {
    this.child.current.cancleForm();
  }

  onChangeField = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleValidation = (e) => {
    e.preventDefault();

    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = <FormattedMessage id="Signup.validation.name.empty" defaultMessage="First name cannot be empty" />;
    }

    if (typeof fields["name"] !== "undefined") {
      if (!fields["name"].match(/^[a-zA-Z]+$/) && fields["name"].length > 0) {
        formIsValid = false;
        errors["name"] = <FormattedMessage id="Signup.validation.name.onlyletters" defaultMessage="Please enter only letters" />;
      }
    }


    if (!fields["dd"]) {
      formIsValid = false;
      errors["dd"] = <FormattedMessage id="Signup.validation.name.empty" defaultMessage="Date field cannot be empty" />;
    }

    if (!fields["mm"]) {
      formIsValid = false;
      errors["mm"] = <FormattedMessage id="Signup.validation.name.empty" defaultMessage="Month field cannot be empty" />;
    }


    if (!fields["yyyy"]) {
      formIsValid = false;
      errors["yyyy"] = <FormattedMessage id="Signup.validation.name.empty" defaultMessage="Year field cannot be empty" />;
    }


    if (!fields["gender"]) {
      formIsValid = false;
      errors["gender"] = <FormattedMessage id="Signup.validation.name.empty" defaultMessage="Gender field cannot be empty" />;
    }


    if (!fields["realationship"]) {
      formIsValid = false;
      errors["realationship"] = <FormattedMessage id="Signup.validation.name.empty" defaultMessage=" Realationship field cannot be empty" />;
    }

    this.setState({ errors: errors });
    return formIsValid;
  }


  render() {
    let store_locale = this.props.globals.store_locale
    const errorsObj = this.state.errors;
    let ddArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];

    let mmArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    console.log("Date Array",ddArray)

    let renderddArray = ddArray.map = (data, index) =>
      (
        <option key={index} value={data}>{data}</option>
      )


    let rendermmArray = mmArray.map = (data, index) =>
      (
        <option key={data} value={data}>{data}</option>
      )


    let yyArray = []
    let d = new Date();
    let currentYear = d.getFullYear();
    let previousyear = currentYear - 25


    for (let currentyy = currentYear; currentyy >= previousyear; currentyy--) {
      yyArray.push(currentyy);

      // yyArray.push(currentYear)
      // currentYear=null;
    }

    console.log("Array of Year", yyArray)
    let emailInputField =
      <FormattedMessage id="enteryouremailaddress" defaultMessage="enter your email address">
        {(message) =>
          <input
            type="text"
            placeholder={message}
            className="email-field"
            value={this.state.email}
            onChange={this.handleChange}
          ></input>}
      </FormattedMessage>


    let firstnameinputField = <div>
      <div>
        <FormattedMessage id="addnewchild.firstname" defaultMessage="First Name">
          {(message) =>
            <input name="first_name" className="input-box" placeholder={message} value={this.state.fields['name']}></input>}
        </FormattedMessage>
      </div>
      <span id="P1000_USERNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET"></span>
    </div>;


    let dinputField=<div style={{ paddingRight: '1.5%', display: "inline" }}>
      { ddArray.map((data,index)=>{
        return (
          <option key={index} value={data}>{data}</option>
        )
      }
      )

      }
    </div>
    let ddinputField =
      <div style={{ paddingRight: '1.5%', display: "inline" }}>
            <select name="title" className="select-field-box2" style={{ marginRight: 0, padding: 10 }}>
             {dinputField}           
              </select>
      </div>

    let mminputField = <div style={{ paddingRight: '1.5%', display: "inline" }}>
      <select name="title" className="select-field-box2" style={{ marginRight: 0, padding: 10 }}>
        <option selected disabled>MM</option>
        <option value="2011">value1</option>
        <option value="2012">value2</option>
        <option value="2013">value3</option>
      </select>
    </div>
    let yyyyinputField = <div style={{ display: "inline" }}>
      <select name="title" className="select-field-box2" style={{ marginRight: 0, padding: 10 }}>
        <option selected disabled>YYYY</option>
        <option value="2011">value1</option>
        <option value="2012">value2</option>
        <option value="2013">value3</option>
      </select>
    </div>


    let genderInputField = <div>
      <select name="title" className="select-field-box" style={{ width: "50%", marginRight: 0 }}>
        <option selected disabled>Please Select</option>
        <option value="2011">value1</option>
        <option value="2012">value2</option>
        <option value="2013">value3</option>
      </select>
    </div>;

    let relationshipInputField = <div>
      <select name="title" className="select-field-box" style={{ width: "50%", marginRight: 0 }}>
        <option selected disabled>Please Select</option>
        <option value="2011">value1</option>
        <option value="2012">value2</option>
        <option value="2013">value3</option>
      </select>
    </div>

    if ('name' in errorsObj) {
      let firstnameinputField = <div>
        <div>
          <FormattedMessage id="first.name" defaultMessage="First Name">
            {(message) =>
              <input name="first_name" className="input-box" placeholder={message} value={this.state.fields['name']}></input>}
          </FormattedMessage>
        </div>
        <span id="P1000_USERNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET">{errorsObj["name"]}</span>
      </div>;
    }


    return (
      <div>
        {/* <Row style={{ marginTop: "40px" }}>
          <Col xs={1} lg={1} md={1} sm={1}></Col>
          <Col style={{ marginBottom: "40px" }}>
          <div style={{textAlign:'start'}}>
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover" style={{fontSize:12}}><FormattedMessage id="Checkout.Home" defaultMessage/></span><span>&nbsp;\&nbsp;&nbsp;</span>
            </Link>
            <span  style={{fontSize:12}}><FormattedMessage id="birthdayclub.header" defaultMessage="Contact Us"/></span>
          </div>
            <div className="paddingLeft">
              <h3 className="header-birth-club"><FormattedMessage id="birthdayclub.header" defaultMessage="" /></h3>
              <div className="img-src-width">
                <Image src={BirthDayClubImage} alt="BirthDayClub" />
              </div>
              <div style={{ textAlign: "center" }}>
                <p>
                <FormattedMessage id="birthdayclub.text1" defaultMessage="" />

                </p>
                <p style={{ textAlign: "center" }}>
                <FormattedMessage id="birthdayclub.text2" defaultMessage="" />

                </p>
              </div>
            </div>
          </Col>
          <Col xs={1} lg={1} md={1} sm={1}></Col>
        </Row> */}

        <Row>
          <Col xs="0" lg="3"></Col>
          <Col xs="12" lg="6" style={{ marginBottom: 30 }}>
            <div><h2 style={{ textAlign: 'start', paddingRight: 5 }}>Add New Child</h2></div>
            <div className="border-block" style={{ textAlign: 'start' }}>
              <div>
                <Form>
                  <FormGroup className="m-40">
                    <div style={{ marginTop: 15 }}>
                      <span className="blackTitle1"> <FormattedMessage id="addnewchild.firstname" defaultMessage="" /></span>
                    </div>
                    <div>
                      {firstnameinputField}
                    </div>
                    <div style={{ marginTop: 40 }}>
                      <span className="blackTitle1"><FormattedMessage id="addnewchild.dateofbirth" defaultMessage="" /></span>
                    </div>
                    <div>
                      {ddinputField}

                      {mminputField}

                      {yyyyinputField}

                      {/* <div style={{ paddingRight:'1.5%',display:"inline"}}>
                          <select name="title"  className="select-field-box2" style={{marginRight: 0,padding:10 }}>
                                <option selected disabled>MM</option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                            </div> */}
                      {/* <div style={{ display:"inline"}}>
                            <select name="title"  className="select-field-box2" style={{marginRight: 0,padding:10 }}>
                                <option selected disabled>YYYY</option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                            </div>
                             */}

                    </div>
                    <div style={{ marginTop: 40 }}>
                      <span className="blackTitle1"><FormattedMessage id="addnewchild.boyorgirl" defaultMessage="" /></span>
                    </div>
                    {genderInputField}

                    <div style={{ marginTop: 40 }}>
                      <span className="blackTitle1"><FormattedMessage id="addnewchild.realationship" defaultMessage="" /></span>
                    </div>
                    {relationshipInputField}
                    <div className="button-div">
                      <button
                        className="add-child-buttton bclub-button"
                        style={{ textAlign: "center" }}
                      >
                        <FormattedMessage id="birthdayclub.addnewchildbutton" defaultMessage="Add New Child" />
                      </button>&nbsp;&nbsp;&nbsp;&nbsp;
                  {/* <BirthDayClub ref={this.child} /> */}
                      <button
                        className="button-cancel bclub-button"
                        style={{ textAlign: "center" }}
                        onClick={this.onCancleClick}
                      >
                        <FormattedMessage id="cancelButton" defaultMessage="Cancel" />

                      </button>
                    </div>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
          <Col xs="0" lg="3"></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

    spinnerProduct: state.spinner.loadingProduct,
    globals: state.global
  }
}


export default connect(mapStateToProps)(AddNewChild);