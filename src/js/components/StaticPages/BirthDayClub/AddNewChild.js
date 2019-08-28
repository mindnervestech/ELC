import React, { Component } from "react";
import { Row, Col, Image, Form, FormGroup } from "react-bootstrap";
import "./AddNewChild.css";
//import BirthDayClubImage from '../../../../assets/images/BirthDayClub/birthday-club.png'
//import BirthDayClubImage from '../../../assets/images/BirthDayClub/birthday-club.png'
import { FormattedMessage } from 'react-intl';
import AlertBox from '../../Common/AlertBox/AlertBox';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';

let BirthDayClubImage="/../../assets/images/BirthDayClub/birthday-club.png"

export default class AddNewChild extends Component {
  constructor(props) {
    super(props);
    this.state={
      fields:{

      }, 

      errors: {}
    }
    
   
  }

  handleValidation = (e) => {
    e.preventDefault();
  }
  render() {

    let firstNameInputField = <div ><div >
      {/* <div>  <FormattedMessage id="Form.FirstName" defaultMessage="First Name" /></div> */}
      <FormattedMessage id="Form.FirstName" defaultMessage="First Name">
        {(message) =>
          <input type="text" required={true} placeholder={message} id="P1001_FNAME" name="P1001_FNAME" onChange={this.handleChange.bind(this, "firstName")} value={this.state.fields["firstName"]} size={30} />}
      </FormattedMessage>
    </div><span id="P1001_FNAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET"></span></div>;
    return (
      <div>
        <Row style={{ marginTop: "40px" }}>
          <Col xs={1} lg={1} md={1} sm={1}></Col>
          <Col style={{ marginBottom: "40px" }}>
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
        </Row>

        <Row>
          
          <Col className="width"  style={{marginBottom:30}}>
            <div className="border-block" >
              <div>
                <Form>
                  <FormGroup className="m-40">
                  <div style={{ marginTop: 15 }}>
                            <span className="blackTitle1"> <FormattedMessage id="addnewchild.firstname" defaultMessage="" /></span>
                  </div>
                  <div>
                    <input name="first_name" className="input-box"></input>
                  </div>
                  <div style={{ marginTop: 40 }}>
                            <span className="blackTitle1"><FormattedMessage id="addnewchild.dateofbirth" defaultMessage="" /></span>
                        </div>
                        <div>
                          <div style={{ paddingRight: 10 ,display:"inline"}}>
                            <select name="title"  style={{ width: "30%", marginRight: 0, padding:10 }}>
                                <option selected disabled><FormattedMessage id="select.dd" defaultMessage="" /></option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                            </div>
                          <div style={{ paddingRight: 10 ,display:"inline"}}><select name="title"  style={{ width: "30%", marginRight: 0,padding:10 }}>
                                <option selected disabled><FormattedMessage id="select.mm" defaultMessage="" /></option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select></div>
                          <div style={{ paddingRight: 10 ,display:"inline"}}>
                            <select name="title" style={{ width: "30%", marginRight: 0,padding:10 }}>
                                <option selected disabled><FormattedMessage id="select.yyyy" defaultMessage="" /></option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select></div>
                            
                            
                        </div>
                  <div style={{ marginTop: 40 }}>
                            <span className="blackTitle1"><FormattedMessage id="addnewchild.boyorgirl" defaultMessage="" /></span>
                        </div>
                        <div>please.select
                            <select name="title" className="select-field-box" style={{ width: "50%", marginRight: 0 }}>
                                <option selected disabled><FormattedMessage id="please.select" defaultMessage="" /></option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                  </div>
                  <div style={{ marginTop: 40 }}>
                            <span className="blackTitle1"><FormattedMessage id="addnewchild.realationship" defaultMessage="" /></span>
                        </div>
                        <div>
                            <select name="title" className="select-field-box" style={{ width: "50%", marginRight: 0 }}>
                                <option selected disabled><FormattedMessage id="please.select" defaultMessage="" /></option>
                                <option value="2011">value1</option>
                                <option value="2012">value2</option>
                                <option value="2013">value3</option>
                            </select>
                        </div>

                <div className="button-div">
                  <button
                    className="button-add-to-basket bclub-button"
                    style={{ textAlign: "center" }}
                  >
                    <FormattedMessage id="birthdayclub.addnewchildbutton" defaultMessage="" />
                  
                  </button>&nbsp;&nbsp;&nbsp;&nbsp;
                  <button
                    className="button-cancel bclub-button"
                    style={{ textAlign: "center" }}
                  >
                   <FormattedMessage id="cancelButton" defaultMessage="" />
                  
                  </button>
                </div>
                  </FormGroup>
                </Form>
              </div>
            </div>
          </Col>
         
        </Row>
      </div>
    );
  }
}
