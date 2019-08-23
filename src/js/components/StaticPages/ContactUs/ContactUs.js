import React, { Component } from 'react';
import MapContainer from './Map';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import * as util from '../../utility/utility';

import '../../../../styles/contactus/contactus.css';
import PhoneNumber from '../../Login/IntlTelePhone';



class ContactUs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contact_fields: {
        name: '',
        email: '',
        phone: '',
        purpose: '',
        carrierCode: '',
        comment: '',
      },
      customerService: '8001244443',
      isPhoneValid: false,
      invalidPhone: '',
      comment_count: 0,
      errors: {},
      search: this.props.search ? true : false,
      showErrorBox: this.props.search ? true : false,
    }

  }

  handleValidation = () => {
    let fields = this.state.contact_fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if (!fields["name"]) {
      formIsValid = false;
      errors["name"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage=" Name cannot be empty" />;
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
      if (fields["phone"].length === 0) {
        formIsValid = false;
        errors["phone"] = <FormattedMessage id="Signup.validation.contactNumber.empty" defaultMessage="Enter Valid phone number" />;
      }
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (field, e) => {
    let fields = this.state.contact_fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  changeCustomerServiceNumber = () => {
    const currentStore = this.props.store_id;
    if (currentStore === 1) {
      this.setState({
        customerService: '8001244443',
      })
    } else if (currentStore === 2) {
      this.setState({
        customerService: '8001244443',
      })
    } else if (currentStore === 3) {
      this.setState({
        customerService: '97143974173',
      })
    } else if (currentStore === 4) {
      this.setState({
        customerService: '97143974173',
      })
    } else if (currentStore === 5) {
      this.setState({
        customerService: '97143974173',
      })
    } else if (currentStore === 6) {
      this.setState({
        customerService: '97143974173',
      })
    }
  }

  closeErrorBox = () => {
    this.setState({
      showErrorBox: false
    })
  }
  clearContactState = () => {
    this.setState({
      ...this.state,
      contact_fields: {
        name: '',
        email: '',
        phone: '',
        purpose: '',
        carrierCode: '',
        comment: '',
      },
    }, () => {
      this.props.onClearContactUsResponse();
    })
  }

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

  contactNumber = (status, value, countryData, number, id) => {

    if (status) {
      let fields = this.state.contact_fields;
      fields['phone'] = value;
      fields['carrierCode'] = countryData.dialCode;
      this.setState({ fields, isPhoneValid: true });
    } else {
      this.setState({ isPhoneValid: false })
    }
  }

  handleFormSubmit = () => {

    if (this.handleValidation()) {
      let data = {
        name: this.state.contact_fields['name'],
        email: this.state.contact_fields['email'],
        phoneNumber: this.state.contact_fields['phone'],
        carrier_code: this.state.contact_fields['carrierCode'],
        purpose: this.state.contact_fields['purpose'],
        comment: this.state.contact_fields['comment'],
        storeId: this.props.store_id,
      }

      this.props.onSaveContactUsData({ ...data });
    }
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

  render() {
    const errorsObj = this.state.errors;
    let errorBox = null;
    if (this.state.search && this.state.showErrorBox) {
      let searchWord = this.props.searchWord;
      errorBox = <div className="alertify"><div className="dialog"><div>
        <p className="msg"><FormattedMessage id="help.searchtext1" defaultMessage="Sorry couldn't search" />;  {searchWord} .
      <FormattedMessage id="help.searchtext2" defaultMessage="Submit your search!!" />.!!</p><nav><button className="ok" tabIndex={1} onClick={this.closeErrorBox}><FormattedMessage id="Ok.text" defaultMessage="Ok" /></button></nav></div></div></div>

    }

    let contact_number = this.props.contact_data.page_data.contactnumber_ksa;
    if (this.props.country === 'KSA') {
      contact_number = this.props.contact_data.page_data.contactnumber_ksa;
    } else if (this.props.country === 'UAE') {
      contact_number = this.props.contact_data.page_data.contactnumber_uae;
    } else if (this.props.country === 'International') {
      contact_number = this.props.contact_data.page_data.contactnumber_int;
    }
    let respo_message = null;
    let success_check = this.props.contact_data.save_responce;
    if (!util.emptyObj(success_check)) {
      if (this.props.contact_data.save_responce.status) {
        respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
          <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
            <div className="t-Alert-wrap">
              <div className="t-Alert-icon">
                <span className="t-Icon" />
              </div>
              <div className="t-Alert-content">
                <div className="t-Alert-header">
                  <h2 className="t-Alert-title"><FormattedMessage id="ContactUs.Content" defaultMessage="Thank you!" /></h2>
                </div>
              </div>
              <div className="t-Alert-buttons">
                <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.clearContactState}><span className="t-Icon icon-close" /></button>
              </div>
            </div>
          </div>
        </div></span>;
      }
    }




    return (

      <>
        {errorBox}
        <div className="t-Body">
          <div className="t-Body-main" style={{ marginTop: '0px !important' }}>
            <div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
            </div>
            <div className="t-Body-content" id="t_Body_content">
              <div id="t_Body_content_offset" style={{ height: '1px' }} />

              {respo_message}


              <div className="t-Body-contentInner">
                <div className="container">
                  <div className="row">

                    <div className="col col-12 apex-col-auto">
                      <div className="t-Region g-wrapper-main_content  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R715188865100792743">
                        <div className="t-Region-header">
                          <div className="t-Region-headerItems t-Region-headerItems--title">
                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                            <h2 className="t-Region-title" id="R715188865100792743_heading"><FormattedMessage id="ContactUs.Title" defaultMessage="Contact Us" /></h2>
                          </div>
                          <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                        </div>
                        <div className="t-Region-bodyWrap">
                          <div className="t-Region-buttons t-Region-buttons--top">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                          </div>
                          <div className="t-Region-body">
                            <input type="hidden" id="MIS" name="MIS" defaultValue />
                            <center> <br />
                              <h1 className="t-page-titles"> <FormattedMessage id="ContactUs.Title" defaultMessage="ContactUs" /></h1>
                            </center>
                            <br />
                            <br />
                            <div className="container">
                              <div className="row">
                                <div className="col col-6 apex-col-auto">
                                  <div className="t-Region t-Region--removeHeader t-Region--accent14 t-Region--noBorder t-Region--scrollBody margin-left-lg margin-right-lg" id="R715189021347792744" style={{ backgroundColor: 'WhiteSmoke' }}>
                                    <div className="t-Region-header">
                                      <div className="t-Region-headerItems t-Region-headerItems--title">
                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                        <h2 className="t-Region-title" id="R715189021347792744_heading"><FormattedMessage id="Wite.Text" defaultMessage="Wite to us" /></h2>
                                      </div>
                                      <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                    </div>
                                    <div className="t-Region-bodyWrap">
                                      <div className="t-Region-buttons t-Region-buttons--top">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                      </div>
                                      <div className="t-Region-body">
                                        <div className="container">
                                          <div className="row">
                                            <div className="col col-12 apex-col-auto">
                                              <div id="R715189986681792754" >
                                                <div style={{ backgroundColor: 'WhiteSmoke' }}> <br />
                                                  <h2 className="t-Region-title"> <FormattedMessage id="Wite.Text" defaultMessage="Wite to us" /></h2>
                                                </div>
                                                <br />
                                              </div>
                                            </div>
                                          </div>
                                          <div className="row">
                                            <div className="col col-12 apex-col-auto">
                                              <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow t-Form--slimPadding t-Form--large t-Form--stretchInputs t-Form--labelsAbove" id="R1009415282768434614" style={{ backgroundColor: 'WhiteSmoke' }}>
                                                <div className="t-Region-header">
                                                  <div className="t-Region-headerItems t-Region-headerItems--title">
                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                    <h2 className="t-Region-title" id="R1009415282768434614_heading"><FormattedMessage id="Wite.Text" defaultMessage="Wite to us" /></h2>
                                                  </div>
                                                  <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                </div>
                                                <div className="t-Region-bodyWrap">
                                                  <div className="t-Region-buttons t-Region-buttons--top">
                                                    <div className="t-Region-buttons-left" />
                                                    <div className="t-Region-buttons-right" />
                                                  </div>
                                                  <div className="t-Region-body">
                                                    <div className="container">
                                                      <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                          <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field"
                                                            id="P14_NAME_CONTAINER" onFocus={(e) => this.divOnFocus(e)} onBlur={(e) => this.divOnBlure(e)}>
                                                            <div className="t-Form-labelContainer">
                                                              <label htmlFor="P14_NAME" id="P14_NAME_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.Name" defaultMessage="Name" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                                            </div>
                                                            <div className="t-Form-inputContainer">
                                                              <div className="t-Form-itemWrapper">
                                                                <input type="text" id="P14_NAME" name="P14_NAME" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "name")} value={this.state.contact_fields["name"]} />
                                                              </div>
                                                              <span id="P14_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                {errorsObj["name"]}
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                          <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field"
                                                            id="P14_EMAIL_CONTAINER" onFocus={(e) => this.divOnFocus(e)} onBlur={(e) => this.divOnBlure(e)}>
                                                            <div className="t-Form-labelContainer">
                                                              <label htmlFor="P14_EMAIL" id="P14_EMAIL_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.Email" defaultMessage="ContactUs.Email" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                            </div>
                                                            <div className="t-Form-inputContainer">
                                                              <div className="t-Form-itemWrapper">
                                                                <input type="email" id="P14_EMAIL" name="P14_EMAIL" className="text_field apex-item-text" size={30} onChange={this.handleChange.bind(this, "email")} value={this.state.contact_fields["email"]} />
                                                              </div>
                                                              <span id="P14_EMAIL_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                {errorsObj["email"]}
                                                              </span>
                                                            </div>
                                                          </div><input type="hidden" id="P14_RESPONSE" name="P14_RESPONSE" defaultValue />
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col col-6 apex-col-auto">
                                                          <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper js-show-label" id="PHONE_CONTAINER">
                                                            <div className="t-Form-labelContainer">

                                                              <label htmlFor="PHONE" id="PHONE_LABEL" className="t-Form-label">
                                                                <span className="u-VisuallyHidden">(Value
                                                          Required)</span></label>
                                                            </div>
                                                            <div className="t-Form-inputContainer">
                                                              <PhoneNumber changed={this.contactNumber} />
                                                              <span id="PHONE_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                                                                {errorsObj["phone"]}
                                                              </span>
                                                            </div>
                                                          </div>
                                                        </div>
                                                        <div className="col col-6 apex-col-auto">
                                                          <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P14_PURPOSE_CONTAINER">
                                                            <div className="t-Form-labelContainer">
                                                              <label htmlFor="P14_PURPOSE" id="P14_PURPOSE_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.Purpose" defaultMessage="Purpose" /></label>
                                                            </div>
                                                            <div className="t-Form-inputContainer">
                                                              <div className="t-Form-itemWrapper">
                                                                <select
                                                                  id="P14_PURPOSE"
                                                                  name="P14_PURPOSE"
                                                                  className="selectlist apex-item-select"
                                                                  size={1}
                                                                  onChange={this.handleChange.bind(this, "purpose")}
                                                                  value={this.state.contact_fields["purpose"]}>
                                                                  <FormattedMessage id="ContactUs.BulkOrder">{(translatedText) => <option value="bulk_order">{translatedText}</option>}</FormattedMessage>
                                                                  <FormattedMessage id="ContactUs.Complaint">{(translatedText) => <option value="complaint">{translatedText}</option>}</FormattedMessage>
                                                                  <FormattedMessage id="ContactUs.GeneralInquiry">{(translatedText) => <option value="genral_enq">{translatedText}</option>}</FormattedMessage>
                                                                  <FormattedMessage id="ContactUs.IssueText">{(translatedText) => <option value="issue_on_website">{translatedText}</option>}</FormattedMessage>
                                                                  <FormattedMessage id="ContactUs.Suggestion">{(translatedText) => <option value="suggestion">{translatedText}</option>}</FormattedMessage>
                                                                </select></div><span id="P14_PURPOSE_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                          <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--textarea js-show-label" id="P14_COMMENT_CONTAINER">
                                                            <div className="t-Form-labelContainer">
                                                              <label htmlFor="P14_COMMENT" id="P14_COMMENT_LABEL" className="t-Form-label"><FormattedMessage id="ContactUs.comment" defaultMessage="Comment" /></label>
                                                            </div>
                                                            <div className="t-Form-inputContainer">
                                                              <div className="t-Form-itemWrapper">
                                                                <div className="apex-item-group apex-item-group--textarea" role="group" aria-labelledby="P14_COMMENT_LABEL" tabIndex={-1}>
                                                                  <FormattedMessage id="ContactUs.comment">{(message) => <textarea name="P14_COMMENT" rows={5} cols={2000} maxLength={2000} wrap="virtual" id="P14_COMMENT" placeholder={message} className="textarea apex-item-textarea" style={{ resize: 'both', color: 'rgb(0, 0, 0)' }} onChange={this.handleChange.bind(this, "comment")} value={this.state.contact_fields["comment"]} />}</FormattedMessage>

                                                                  <div id="P14_COMMENT_CHAR_COUNT" style={{ color: 'rgb(0, 0, 0)', display: 'none' }} className="apex-item-textarea-counter"><span id="P14_COMMENT_CHAR_COUNTER" className="apex-item-textarea-counter--length">{this.state.comment_count}</span> of
                                                            <span className="apex-item-textarea-counter--size">2000</span>
                                                                  </div>

                                                                </div>
                                                              </div><span id="P14_COMMENT_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                      <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                          <button onClick={this.handleFormSubmit} className="t-Button t-Button--hot t-Button--stretch" type="button" id="B28610916249643373">
                                                            <span className="t-Button-label"><FormattedMessage id="Submit.Text" defaultMessage="Submit" /></span>
                                                          </button>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                  <div className="t-Region-buttons t-Region-buttons--bottom">
                                                    <div className="t-Region-buttons-left" />
                                                    <div className="t-Region-buttons-right" />
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="t-Region-buttons t-Region-buttons--bottom">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="col col-6 apex-col-auto">
                                  <div id="R715189055843792745" className="margin-left-lg">
                                    <div className="container">
                                      <div className="row">
                                        <div className="col col-12 apex-col-auto">
                                          <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="R715189275227792747">
                                            <div className="t-Region-header">
                                              <div className="t-Region-headerItems t-Region-headerItems--title">
                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                <h2 className="t-Region-title" id="R715189275227792747_heading"><FormattedMessage id="ContactUs.DirectText" defaultMessage="Direct Contact" />
                                                </h2>
                                              </div>
                                              <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                            </div>
                                            <div className="t-Region-bodyWrap">
                                              <div className="t-Region-buttons t-Region-buttons--top">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                              </div>
                                              <div className="t-Region-body">
                                                <div className="chat">
                                                  <i className="fa fa-phone" /><a className="js-ga-tracking" data-ga-category="Contact Us" data-ga-action="click" data-ga-label="Telephone" href={`tel:${this.state.customerService}`}>{this.state.customerService}</a>
                                                  <br />
                                                  <br />
                                                  <i className="far fa-envelope" /> <a className="js-ga-tracking" data-ga-category="Contact Us" data-ga-action="click" data-ga-label="Email" href="mailto:help@nayomi.com">help@nayomi.com</a>
                                                  <br />
                                                  <br />
                                                  <i className="fab fa-whatsapp" /> <a className="js-ga-tracking" data-ga-category="WhatsApp" data-ga-action="click" data-ga-label="WhatsApp Chat" href={`${this.props.contact_data.page_data.whatsapp}&text=I%20Initiate%20This%20Chat%20From%20Nayomi%20Website`} target="_blank"><FormattedMessage id="ContactUs.WhatsApp" defaultMessage="WhatsApp" /></a>
                                                </div>
                                              </div>
                                              <div className="t-Region-buttons t-Region-buttons--bottom">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="row">
                                        <div className="col col-12 apex-col-auto">
                                          <div className="t-Region t-Region--noBorder t-Region--scrollBody" id="R715189380040792748">
                                            <div className="t-Region-header">
                                              <div className="t-Region-headerItems t-Region-headerItems--title">
                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                <h2 className="t-Region-title" id="R715189380040792748_heading"><FormattedMessage id="ContactUs.SocialMedia" defaultMessage="SocialMedia" />
                                                </h2>
                                              </div>
                                              <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                            </div>
                                            <div className="t-Region-bodyWrap">
                                              <div className="t-Region-buttons t-Region-buttons--top">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                              </div>
                                              <div className="t-Region-body">
                                                <div className="media">
                                                  <a href={this.props.contact_data.page_data.instagram}><i className="icon-instagram" /></a>
                                                  <a href={this.props.contact_data.page_data.facebook}><i className="icon-facebook" /></a>
                                                  <a href={this.props.contact_data.page_data.youtube}><i className="icon-youtube" /></a>
                                                  <a href="https://api.whatsapp.com/send?phone=971565069237"><i className="icon-whatsapp" /></a>
                                                </div>
                                              </div>
                                              <div className="t-Region-buttons t-Region-buttons--bottom">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="t-Region-buttons t-Region-buttons--bottom">
                            <div className="t-Region-buttons-left" />
                            <div className="t-Region-buttons-right" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col col-12 apex-col-auto">
                      <div id="R715189881759792753" className="margin-bottom-none">
                        <div id="map" style={{ position: 'relative', overflow: 'hidden' }}>
                          <MapContainer />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    contact_data: state.contact,
    store_id: state.global.currentStore,
    country: state.global.country
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetContactUsData: (payload) => dispatch(actions.getContactUsData(payload)),
    onSaveContactUsData: (payload) => dispatch(actions.saveContactUsData(payload)),
    onClearContactUsResponse: () => dispatch(actions.clearContactUsResponse()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactUs);