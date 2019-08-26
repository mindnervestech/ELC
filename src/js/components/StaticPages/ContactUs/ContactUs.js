import React, { Component } from "react";
import MapContainer from "./Map";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";
import * as util from "../../utility/utility";
import "./ContactUs.css";
import { Container, Row, Col, Button, Form, FormGroup } from "reactstrap";
//import '../../../../styles/contactus/contactus.css';
import PhoneNumber from "../../Login/IntlTelePhone";

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contact_fields: {
        subject: "",
        question: "",
        title: "",
        fullname: "",
        email: "",
        confirmEmail: "",
        phoneNumber: ""
      },

      errors: {},
      search: this.props.search ? true : false,
      showErrorBox: this.props.search ? true : false
    };
  }

  handleValidation = () => {
    let fields = this.state.contact_fields;
    let errors = {};
    let formIsValid = true;

    if (!fields["subject"]) {
      formIsValid = false;
      errors["subject"] = (
        <FormattedMessage
          id="contactus.validation.subject.empty"
          defaultMessage=" Please Select Subject"
        />
      );
    }

    if (!fields["question"]) {
      formIsValid = false;
      errors["question"] = (
        <FormattedMessage
          id="contactus.validation.question.empty"
          defaultMessage=" Question is required"
        />
      );
    }

    if (!fields["title"]) {
      formIsValid = false;
      errors["title"] = (
        <FormattedMessage
          id="contactus.validation.title.empty"
          defaultMessage=" Please Select Title"
        />
      );
    }

    //Name
    if (!fields["fullname"]) {
      formIsValid = false;
      errors["fullname"] = (
        <FormattedMessage
          id="Signup.validation.fullname.empty"
          defaultMessage=" Name cannot be empty"
        />
      );
    }

    //Email
    if (typeof fields["email"] !== "undefined") {
      if (fields["email"].length === 0) {
        formIsValid = false;
        errors["email"] = (
          <FormattedMessage
            id="Signup.validation.email.empty"
            defaultMessage="First Name cannot be empty"
          />
        );
      }

      if (fields["email"].length > 0) {
        let lastAtPos = fields["email"].lastIndexOf("@");
        let lastDotPos = fields["email"].lastIndexOf(".");
        if (
          !(
            lastAtPos < lastDotPos &&
            lastAtPos > 0 &&
            fields["email"].indexOf("@@") == -1 &&
            lastDotPos > 2 &&
            fields["email"].length - lastDotPos > 2
          )
        ) {
          formIsValid = false;
          errors["email"] = (
            <FormattedMessage
              id="Signup.validation.email.invalid"
              defaultMessage="First Name cannot be empty"
            />
          );
        }
      }
    }

    if (typeof fields["confirmEmail"] !== "undefined") {
      if (fields["confirmEmail"].length === 0) {
        formIsValid = false;
        errors["confirmEmail"] = (
          <FormattedMessage
            id="Signup.validation.confirmEmail.empty"
            defaultMessage="Email done't Match"
          />
        );
      }

      if (fields["confirmEmail"] !== fields["email"]) {
        formIsValid = false;
        errors["confirmEmail"] = (
          <FormattedMessage
            id="Signup.validation.confirmEmail.invalid"
            defaultMessage="Email does't match"
          />
        );
      }
    }

    if (!fields["phoneNumber"]) {
      formIsValid = false;
      errors["phoneNumber"] = (
        <FormattedMessage
          id="Signup.validation.phoneNumber.empty"
          defaultMessage=" PhoneNumber cannot be empty"
        />
      );
    }
    if (typeof fields["phoneNumber"] !== "undefined") {
      if (
        fields["phoneNumber"].match(/^[a-zA-Z]+$/) &&
        fields["phoneNumber"].length > 0
      ) {
        formIsValid = false;
        errors["phoneNumber"] = (
          <FormattedMessage
            id="Signup.validation.lastName.onlydigits"
            defaultMessage="Only Digits Are Alloweded"
          />
        );
      }
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleChange = (field, e) => {
    let fields = this.state.contact_fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  };

  changeCustomerServiceNumber = () => {
    const currentStore = this.props.store_id;
    if (currentStore === 1) {
      this.setState({
        customerService: "8001244443"
      });
    } else if (currentStore === 2) {
      this.setState({
        customerService: "8001244443"
      });
    } else if (currentStore === 3) {
      this.setState({
        customerService: "97143974173"
      });
    } else if (currentStore === 4) {
      this.setState({
        customerService: "97143974173"
      });
    } else if (currentStore === 5) {
      this.setState({
        customerService: "97143974173"
      });
    } else if (currentStore === 6) {
      this.setState({
        customerService: "97143974173"
      });
    }
  };

  closeErrorBox = () => {
    this.setState({
      showErrorBox: false
    });
  };
  clearContactState = () => {
    this.setState(
      {
        ...this.state,
        contact_fields: {
          subject: "",
          question: "",
          title: "",
          fullname: "",
          email: "",
          confirmEmail: "",
          phoneNumber: ""
        }
      },
      () => {
        this.props.onClearContactUsResponse();
      }
    );
  };

  componentDidMount() {
    this.props.onGetContactUsData({ storeId: this.props.store_id });
    this.changeCustomerServiceNumber();
  }

  componentDidUpdate(prevProps) {
    if (this.props.store_id !== prevProps.store_id) {
      this.props.onGetContactUsData({ storeId: this.props.store_id });
      this.changeCustomerServiceNumber();
    }
  }

  handleFormSubmit = e => {
    e.preventDefault();
    if (this.handleValidation()) {
      let data = {
        subject: this.state.contact_fields.subject,
        question: this.state.contact_fields.question,
        title: this.state.contact_fields.title,
        fullname: this.state.contact_fields.fullname,
        email: this.state.contact_fields.email,
        confirmEmail: this.state.contact_fields.confirmEmail,
        phoneNumber: this.state.contact_fields.phoneNumber,
        storeId: 2
      };

      this.props.onSaveContactUsData({ ...data });
    }
  };

  // divOnFocus = e => {
  //   e.currentTarget.className =
  //     "t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active";
  // };

  // divOnBlure = e => {
  //   if (e.target.value == null || e.target.value == "") {
  //     e.currentTarget.className =
  //       "t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field";
  //   } else {
  //     e.currentTarget.className =
  //       "t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active";
  //   }
  // };

  render() {
    const errorsObj = this.state.errors;
    let errorBox = null;

    let errorSubjectField = null;
    let errorQuestionField = null;
    let errorTitleField = null;
    let errorfullnameField = null;
    let erroremailField = null;
    let errorconfirmEmailField = null;
    let errorphoneNumberField = null;
    if ("subject" in errorsObj) {
      errorSubjectField = (
        <div>
          <span>{errorsObj["subject"]}</span>
        </div>
      );
    }
    if ("question" in errorsObj) {
      errorQuestionField = (
        <div>
          <span>{errorsObj["question"]}</span>
        </div>
      );
    }
    if ("title" in errorsObj) {
      errorTitleField = (
        <div>
          <span>{errorsObj["title"]}</span>
        </div>
      );
    }
    if ("fullname" in errorsObj) {
      errorfullnameField = (
        <div>
          <span>{errorsObj["fullname"]}</span>
        </div>
      );
    }
    if ("email" in errorsObj) {
      erroremailField = (
        <div>
          <span>{errorsObj["email"]}</span>
        </div>
      );
    }
    if ("confirmEmail" in errorsObj) {
      errorconfirmEmailField = (
        <div>
          <span>{errorsObj["confirmEmail"]}</span>
        </div>
      );
    }
    if ("phoneNumber" in errorsObj) {
      errorphoneNumberField = (
        <div>
          <span>{errorsObj["phoneNumber"]}</span>
        </div>
      );
    }

    if (this.state.search && this.state.showErrorBox) {
      let searchWord = this.props.searchWord;
      errorBox = (
        <div className="alertify">
          <div className="dialog">
            <div>
              <p className="msg">
                <FormattedMessage
                  id="help.searchtext1"
                  defaultMessage="Sorry couldn't search"
                />
                ; {searchWord} .
                <FormattedMessage
                  id="help.searchtext2"
                  defaultMessage="Submit your search!!"
                />
                .!!
              </p>
              <nav>
                <button
                  className="ok"
                  tabIndex={1}
                  onClick={this.closeErrorBox}
                >
                  <FormattedMessage id="Ok.text" defaultMessage="Ok" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      );
    }

    let contact_number = this.props.contact_data.page_data.contactnumber_ksa;
    if (this.props.country === "KSA") {
      contact_number = this.props.contact_data.page_data.contactnumber_ksa;
    } else if (this.props.country === "UAE") {
      contact_number = this.props.contact_data.page_data.contactnumber_uae;
    } else if (this.props.country === "International") {
      contact_number = this.props.contact_data.page_data.contactnumber_int;
    }
    let respo_message = null;
    let success_check = this.props.contact_data.save_responce;
    if (!util.emptyObj(success_check)) {
      if (this.props.contact_data.save_responce.status) {
        respo_message = (
          <span
            id="APEX_SUCCESS_MESSAGE"
            data-template-id="126769709897686936_S"
            className="apex-page-success u-visible"
          >
            <div className="t-Body-alert">
              <div
                className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG"
                id="t_Alert_Success"
                role="alert"
              >
                <div className="t-Alert-wrap">
                  <div className="t-Alert-icon">
                    <span className="t-Icon" />
                  </div>
                  <div className="t-Alert-content">
                    <div className="t-Alert-header">
                      <h2 className="t-Alert-title">
                        <FormattedMessage
                          id="ContactUs.Content"
                          defaultMessage="Thank you!"
                        />
                      </h2>
                    </div>
                  </div>
                  <div className="t-Alert-buttons">
                    <button
                      className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert"
                      type="button"
                      title="Close Notification"
                      onClick={this.clearContactState}
                    >
                      <span className="t-Icon icon-close" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </span>
        );
      }
    }

    return (
      <>
        {errorBox}
        <div className="t-Body">
          <div className="t-Body-main" style={{ marginTop: "0px !important" }}>
            <div
              className="t-Body-title"
              id="t_Body_title"
              style={{ top: "294px" }}
            />
            <div className="t-Body-content" id="t_Body_content">
              <div id="t_Body_content_offset" style={{ height: "1px" }} />

              <div className="t-Body-contentInner">
              
                  <center>
                  <div id="DIV_1">
                    <h1 id="H1_2">Contact Us</h1>
                    <h2 id="H2_3">Chat to Us</h2>
                    <p id="P_4">
                      Use our Live Chat service to talk to one of our Customer
                      Service Team straight away.
                    </p>
                    <div id="DIV_5">
                      <div id="DIV_6">
                        <div id="DIV_7">
                          <h2 id="H2_8">
                            Click here to chat to our Customer Service Team
                          </h2>
                        </div>
                      </div>
                      <div id="DIV_9">
                        <div id="DIV_10">
                          <h2 id="H2_11">
                            Sorry our team are not available to chat right now.
                          </h2>
                        </div>
                      </div>
                    </div>
                    <h2 id="H2_12">Email Us</h2>
                    <div id="P_13">
                      <span id="SPAN_14">
                        Please complete the form below with your query or
                        feedback and our Customer Service Team will be in touch
                      </span>
                      <span id="SPAN_15">
                        Please fill in our
                        <a
                          href="https://ask.thetoyshop.com/help/iframe/contact"
                          id="A_16"
                        >
                          Contact Us form
                        </a>{" "}
                        with your query or feedback and our Customer Service
                        Team will be in touch.
                      </span>
                      <div className="container">
                        <Form onSubmit={this.handleFormSubmit}>
                          <FormGroup>
                            <div
                              className="form-group"
                              style={{ marginTop: 15 }}
                            >
                              <label htmlFor="exampleInputEmail1">
                                Subject
                              </label>
                              <select
                                className="form-control form-control-lg"
                                value={this.state.contact_fields["subject"]}
                                onChange={this.handleChange.bind(
                                  this,
                                  "subject"
                                )}
                              >
                                <option>Please Select</option>
                                <option>Customer Service</option>
                                <option>Delivery </option>
                                <option>Genderal </option>
                                <option>order</option>
                                <option>Payment</option>
                                <option>Returns</option>
                                <option>Stores</option>
                              </select>
                              <div className="span-error">
                                {errorSubjectField}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="exampleFormControlTextarea1">
                                Question
                              </label>
                              <textarea
                                className="form-control form-control-lg"
                                id="exampleFormControlTextarea1"
                                rows="3"
                                value={this.state.contact_fields["question"]}
                                onChange={this.handleChange.bind(
                                  this,
                                  "question"
                                )}
                              />
                              <div className="span-error">
                                {errorQuestionField}
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleInputEmail1">Title</label>
                              <select
                                className="form-control form-control-lg"
                                value={this.state.contact_fields["title"]}
                                onChange={this.handleChange.bind(this, "title")}
                              >
                                <option>Please Select</option>
                                <option>Mr</option>
                                <option>Miss </option>
                                <option>Dr</option>
                                <option>Ms </option>
                              </select>
                              <div className="span-error">
                                {errorTitleField}
                              </div>
                            </div>
                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">
                                Full Name
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-lg"
                                id="exampleFormControlInput1"
                                value={this.state.contact_fields["fullname"]}
                                onChange={this.handleChange.bind(
                                  this,
                                  "fullname"
                                )}
                              />
                              <div className="span-error">
                                {errorfullnameField}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">
                                Email
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                id="exampleFormControlInput1"
                                value={this.state.contact_fields["email"]}
                                onChange={this.handleChange.bind(this, "email")}
                              />
                              <div className="span-error">
                                {erroremailField}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">
                                Confirm Email
                              </label>
                              <input
                                type="email"
                                className="form-control form-control-lg"
                                id="exampleFormControlInput1"
                                value={
                                  this.state.contact_fields["confirmEmail"]
                                }
                                onChange={this.handleChange.bind(
                                  this,
                                  "confirmEmail"
                                )}
                              />
                              <div className="span-error">
                                {errorconfirmEmailField}
                              </div>
                            </div>

                            <div className="form-group">
                              <label htmlFor="exampleFormControlInput1">
                                Telphone
                              </label>
                              <input
                                type="tel"
                                className="form-control form-control-lg"
                                id="exampleFormControlInput1"
                                value={this.state.contact_fields["phoneNumber"]}
                                onChange={this.handleChange.bind(
                                  this,
                                  "phoneNumber"
                                )}
                              />
                              <div className="span-error">
                                {errorphoneNumberField}
                              </div>
                            </div>
                          </FormGroup>
                          <div>
                            <button
                              className="button-add-to-basket"
                              style={{ textAlign: "center" }}
                            >
                              Submit
                            </button>
                          </div>
                        </Form>
                      </div>
                    </div>
                  </div>
                 
                  

                  
                    <div>
                    <h2 id="H2_20">Facebook Message Us</h2>
                    <p id="P_21">
                      Send us a message on Facebook Messenger. Our response time
                      are between 8am - 7pm Monday - Friday and 8am - 5pm on
                      Saturdays
                    </p>
                    <div id="DIV_22">
                      <div id="DIV_23">
                        <div id="DIV_24">
                          <h2 id="H2_25">
                            <a
                              href="http://m.me/TheEntertainerToyShop"
                              id="A_26"
                            >
                              <span id="SPAN_27">
                                Click here to send us a Facebook Message
                              </span>
                            </a>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <h2 id="H2_28">Call Us</h2>
                    <p id="P_29">
                      Call our team on{" "}
                      <span id="SPAN_30">
                        <a href="tel:0333 320 5100" id="A_31">
                          0333 320 5100
                        </a>
                      </span>
                      <span id="SPAN_32">0333 320 5100</span>. Calls will be
                      charged at the standard rate and the number is included in
                      most mobile deals.
                    </p>
                    <p id="P_33" style={{ marginTop: "15px" }}>
                      Our Customer Service phone lines are open 8am - 7pm Monday
                      - Friday and 8am - 5pm on Saturdays. Our lines are closed
                      on Sunday
                    </p>
                    <h2 id="H2_34">Like or Follow Us</h2>
                    <p id="P_35">
                      Click the social media icons below and you can follow,
                      tweet or pin us.
                    </p>
                    <div id="DIV_36">
                      <div id="DIV_37">
                        <a
                          href="https://www.facebook.com/TheEntertainerToyShop"
                          id="A_38"
                        >
                          <img
                            id="IMG_39"
                            src="https://www.thetoyshop.com/medias/Facebook.png?context=bWFzdGVyfHJvb3R8MTk1MXxpbWFnZS9wbmd8aDk3L2hlNy85MDIxNDEyNDQyMTQyLnBuZ3wyYWNkYzQ3N2YzZGZkNWU1YjZkZDJmOTUxZGIwYWZmY2ZjZTliYTY4MDI5M2Q0OGY1OWM5MWE5ZDBiZWU3ZDdl"
                            alt=""
                          />
                        </a>{" "}
                        <a href="https://twitter.com/ENTertainertoys" id="A_40">
                          <img
                            id="IMG_41"
                            src="https://www.thetoyshop.com/medias/Twitter.png?context=bWFzdGVyfHJvb3R8MjY3NXxpbWFnZS9wbmd8aGRhL2g5Mi85MDIxNDEyOTY2NDMwLnBuZ3w5MzE3MDMyMGViYTMwZjAxOTBjZGI2ZjZiNzU1ODFhYmVmM2YwMjY4Y2I4YmEwNmM5MDYyOTVkNDc2ZjA1NjFj"
                            alt=""
                          />
                        </a>{" "}
                        <a
                          href="https://uk.pinterest.com/EntertainerToys/"
                          id="A_42"
                        >
                          <img
                            id="IMG_43"
                            src="https://www.thetoyshop.com/medias/Pinterest.png?context=bWFzdGVyfHJvb3R8MjkxMHxpbWFnZS9wbmd8aGY0L2hjNS85MDIxNDEzMjYxMzQyLnBuZ3xlNWQyZDVmNzRjMDVkNTBkMjFlNTQ0MTNkZTVhYzRmZTIzODIyZjk4MWNkNGJlNzM2YWYwM2M1ZThmMzMwOWEw"
                            alt=""
                          />
                        </a>{" "}
                        <a
                          href="https://www.instagram.com/entertainer_toys/"
                          id="A_44"
                        >
                          <img
                            id="IMG_45"
                            src="https://www.thetoyshop.com/medias/Instagram.png?context=bWFzdGVyfHJvb3R8MjQ2N3xpbWFnZS9wbmd8aDZmL2g4NS85MDQxNDE0MjU4NzE4LnBuZ3wxMDljMjFiZjY2NWY3ZDQxMzk3NmE3OTMzNzIwYjM4YzZiMGM5MTVhOWM2MDIzMTI4NDExMjQyZjU4MzRmYjcz"
                            alt=""
                          />
                        </a>
                      </div>
                    </div>
                    <h2 id="H2_46">Write to Us</h2>
                    <p id="P_47">To send us a letter, please write to:</p>
                    <p id="P_48">
                      The Entertainer
                      <br id="BR_49" />
                      Customer Services
                      <br id="BR_50" />
                      Boughton Business Park
                      <br id="BR_51" />
                      Bell Lane
                      <br id="BR_52" />
                      Little Chalfont
                      <br id="BR_53" />
                      Amersham
                      <br id="BR_54" />
                      Buckinghamshire
                      <br id="BR_55" />
                      HP6 6GL
                    </p>             
                    </div>
                   
                    
                    </center>
                    </div>
                    </div>
                    </div>
                    </div>
                   
                
       
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    contact_data: state.contact,
    store_id: state.global.currentStore,
    country: state.global.country
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetContactUsData: payload => dispatch(actions.getContactUsData(payload)),
    onSaveContactUsData: payload =>
      dispatch(actions.saveContactUsData(payload)),
    onClearContactUsResponse: () => dispatch(actions.clearContactUsResponse())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactUs);
