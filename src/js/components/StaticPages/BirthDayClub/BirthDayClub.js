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
import { Helmet } from 'react-helmet';

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
      lang: '',
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

  componentWillReceiveProps(nextprops) {

    if (nextprops.bclubDetails && !nextprops.bclubDetails.status) {
      let message = nextprops.bclubDetails.message

      setTimeout(() => {
        this.setState({ sucesss_message: message, ischeckremove: false, showAlert: true });
        
      }, 100);

      setTimeout(() => {
        this.closeAlert();
      }, 6000);

    }
    else if(nextprops.bclubDetails && nextprops.bclubDetails.status)
    {
       
      let message = nextprops.bclubDetails.message

      setTimeout(() => {
        this.setState({ sucesss_message: message, ischeckremove: false, showAlert: true });
        
      }, 100);

      setTimeout(() => {
        this.closeAlert();
      }, 3000);

    }
    else
    { 
      
    }

  }

  signUpSubmit = (e) => {
    e.preventDefault();
        this.register(); 
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
      
        name: '',
        gender: '',
        dob: ''
      }
    })
    //this.setState({fields{}  :''})
   
 
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
        firstname: this.props.customer_details.customer_details.firstname,
        lastname: this.props.customer_details.customer_details.lastname,
        phoneNumber: this.props.customer_details.phone_number,
        email:this.props.customer_details.customer_details.email,
        countryCode: this.props.customer_details.carrier_code,
        storeid: this.props.globals.currentStore,
        language: '',
        moreinfo: moreinfoData
      }
     
      this.clearContactState();
      this.setState({ error: false })
      this.props.onRegisterBirthdayClubUser(data);


    }
  }

  render() {
    const language = localStorage.getItem('templang');
    let store_locale=this.props.globals.store_locale
    let respo_message = null;


    let title = "Birthday Club | ELC UAE Online store";
    let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
    let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
    if (language == 'ar') {
        title = "نادي عيد الميلاد |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
        description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
        keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية"; 
    }

    let meta_tag  = <><Helmet>
        <meta name="tital" content={title} />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
    </Helmet></>;

    if(!this.props.isUserLoggedIn)
    {
      this.props.history.push(`/${this.props.globals.store_locale}/sign-in-register`); 
    }
   
    if (this.state.showAlert) {
      
      respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" style={{top:'50 %'}} className="apex-page-success u-visible"><div className="t-Body-alert">
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


    return (


      <div>
        {respo_message}
        {meta_tag}
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
           

            <Row>
            </Row>
            <div className="errorMessageDiv" style={this.state.error ? { display: 'block' } : { display: 'none' }}>
              <div className="errorMessage">
                <FormattedMessage id="Pleasefillallfieldscompulsory" defaultMessage="Please fill all * fields compulsory"/>
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
                    {/* <input value={ChildrenName[index] !== "" ? ChildrenName[index] : ""} className={"input-field"}  onChange={this.getName.bind(this, index)}></input> */}
                    <FormattedMessage id="addchild.ChildName" defaultMessage="Name">
                  {(message) =>
                  <input value={ChildrenName[index] !== "" ? ChildrenName[index] : ""} className={"input-field"}  placeholder={message} onChange={this.getName.bind(this, index)}></input>
                  }
                  </FormattedMessage>
                  </div>
                  
                </Col>
                <Col xs={12} lg={4} md={12} >
                  <div style={{ marginTop: 15 }}>
                    <span style={{ color: 'red' }}>*&nbsp;</span><span className="blackTitle1 alignStart"><FormattedMessage id="addnewchild.Gender" defaultMessage="Gender" /></span>
                  </div>
                  <div style={{ position: 'relative', marginTop: 5 }}>
                    <div className={sortByShowOption[index] ? "sortBySelectedText2 open genderPadding" : "sortBySelectedText2 genderPadding"} onClick={() => this.showGenderOption(index)} style={{ border: 'solid 1px #b1b1b1' }}>
                      <span>{ChildrenGender[index] != "" ? ChildrenGender[index] : <FormattedMessage id="select.gender" defaultMessage="Select Gender"/>}</span>
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
                    {/* <DatePicker
                      selected={ChildrenDate[index] != "" ? ChildrenDate[index] : new Date()}
                      onChange={this.handleChangeDOB.bind(this, index)}
                    
                    /> */}

<FormattedMessage id="addchild.Clicktoaselectdate" defaultMessage="Click to a select date">
{(message) =>
<DatePicker
       selected={ChildrenDate[index] != "" ? ChildrenDate[index] : ""}
       onChange={this.handleChangeDOB.bind(this, index)}
       style={{ width: "100%" }}
     placeholderText={message}
      maxDate={new Date()}
      showDisabledMonthNavigation
    />}</FormattedMessage>
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
    customer_details:state.login
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRegisterBirthdayClubUser: (payload) => dispatch(actions.setBirthDayClubData(payload)),
    onClearRegistrationError: () => dispatch(actions.clearBirthdayClubRegisterError()),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(BirthDayClub);