import React, { Component } from 'react';
import PhoneNumber from '../../Login/IntlTelePhone';

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ContactFields: {
                firstName: '',
                lastName: '',
                email: '',
                carrierCode: '',
                contactNumber: '',

            },

            errors: {},
            isPhoneValid: false,
            data: {},

        }
    }
    componentDidMount() {
        let obj = this.props.user_details;
        if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
            this.setState({
                ContactFields: {
                    firstName: obj.firstname,
                    lastName: obj.lastname,
                    email: obj.email,
                    carrierCode: '',
                    contactNumber: '',
                }
            })
        }
    }

    handleValidation = () => {
        let fields = this.state.ContactFields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = <FormattedMessage id="Signup.validation.firstName.empty" defaultMessage="First Name cannot be empty" />;
        }

        if (!fields["lastName"]) {
            formIsValid = false;
            errors["lastName"] = <FormattedMessage id="Signup.validation.lastName.empty" defaultMessage="Last Name cannot be empty" />;
        }

        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^([a-zA-Z ]){2,30}$/)) {
                formIsValid = false;
                errors["firstName"] = <FormattedMessage id="CheckoutForm.FirstName.Lengthtwo.Text" defaultMessage="Minimum length 2" />;
            }
        }

        if (typeof fields["lastName"] !== "undefined") {
            if (!fields["lastName"].match(/^([a-zA-Z ]){2,30}$/)) {
                formIsValid = false;
                errors["lastName"] = <FormattedMessage id="CheckoutForm.LastName.Lengthtwo.Text" defaultMessage="Minimum length 2" />;
            }
        }

        //Email
        if (!fields["email"]) {
            formIsValid = false;
            errors["email"] = <FormattedMessage id="Signup.validation.email.empty" defaultMessage="Email cannot be empty" />;
        }

        if (typeof fields["email"] !== "undefined") {
            let lastAtPos = fields["email"].lastIndexOf('@');
            let lastDotPos = fields["email"].lastIndexOf('.');

            if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
                formIsValid = false;
                errors["email"] = <FormattedMessage id="Signup.validation.email.invalid" defaultMessage="Inavlid Email" />;
            }
        }

        if (!(this.state.isPhoneValid)) {
            formIsValid = false;
            errors["contactNumber"] = <FormattedMessage id="Signup.validation.contactNumber.invalid" defaultMessage="Invalid Phone Number" />;
        }

        this.setState({ errors: errors });
        return formIsValid;
    }

    signUpSubmitContact = () => {
        if (this.handleValidation()) {
            this.addInfo();
        }

    }

    handleChange = (field, e) => {
        //console.log(field, e.target.value);

        let fields = this.state.ContactFields;
        fields[field] = e.target.value;
        this.setState({ fields });
        //console.log(this.state);
    }

    addInfo = () => {
        this.props.changed(this.state.ContactFields);
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



    contactNumber = (status, value, countryData, number, id) => {
        //console.log('from parent',status, value, countryData, number, id)
        //console.log('from parent',status, value, countryData, number, id)
        if (status) {
            let fields = this.state.ContactFields;
            fields['contactNumber'] = value;
            fields['carrierCode'] = countryData.dialCode;
            this.setState({ fields, isPhoneValid: true });
            //console.log(this.state);
        } else {
            this.setState({ isPhoneValid: false })
        }
    }


    render() {

        const errorsObj = this.state.errors;
        //console.log(errorsObj);
        let firstNameInputField = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper"><input type="text" id="P7_FNAME" name="P7_FNAME" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "firstName")} value={this.state.ContactFields["firstName"]} /></div>
            <span id="P7_FNAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" />
        </div>;

        let LastNameInputField = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper"><input type="text" id="P7_LNAME" name="P7_LNAME" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "lastName")} value={this.state.ContactFields["lastName"]} /></div>
            <span id="P7_LNAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
        </div>;

        let emailInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="email" id="P7_EMAIL" name="P7_EMAIL" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "email")} value={this.state.ContactFields["email"]} /></div><span id="P7_EMAIL_error_placeholder" className="a-Form-error u-hidden" data-template-id="33610259035469734_ET" /></div>

        let contactNumberInputField = null;


        if ('firstName' in errorsObj) {
            firstNameInputField = <div class="t-Form-inputContainer">
                <div class="t-Form-itemWrapper">
                    <input type="text" id="P7_FNAME" name="P7_FNAME" class="text_field apex-item-text apex-page-item-error" size={30} maxLength={100} onChange={this.handleChange.bind(this, "firstName")} value={this.state.ContactFields["firstName"]} aria-describedby="P7_FNAME_error" aria-invalid="true" />
                </div>
                <span id="P7_FNAME_error_placeholder" class="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span class="t-Form-error"><div id="P7_FNAME_error">{errorsObj['firstName']}</div></span></span></div>
        }

        if ('lastName' in errorsObj) {
            LastNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
                <input type="text" id="P7_LNAME" name="P7_LNAME" className="text_field apex-item-text apex-page-item-error" size={30} maxLength={100} onChange={this.handleChange.bind(this, "lastName")} value={this.state.ContactFields["lastName"]} aria-describedby="P1001_LNAME_error" aria-invalid="true" /></div>
                <span id="P7_LNAME_error_placeholder" class="a-Form-error u-visible" data-template-id="33609965712469734_ET"><span class="t-Form-error"><div id="P1001_FNAME_error">{errorsObj['lastName']}</div></span></span></div>

        }

        if ('contactNumber' in errorsObj) {
            contactNumberInputField = <span id="P7_PHONE_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P7_PHONE_error">{errorsObj['contactNumber']}</div></span></span>
        }

        if ('email' in errorsObj) {

            emailInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">
                <input type="email" id="P7_EMAIL" name="P7_EMAIL" className="text_field apex-item-text  apex-page-item-error" size={30} maxLength={100} onChange={this.handleChange.bind(this, "email")} value={this.state.ContactFields["email"]} aria-describedby="P7_EMAIL_error" aria-invalid="true" /></div><span id="P7_EMAIL_error_placeholder" className="a-Form-error  u-visible" data-template-id="33610259035469734_ET"><span class="t-Form-error"><div id="P7_EMAIL_error">{errorsObj['email']}</div></span></span></div>;


        }


        return (<> <div className="t-Region t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow" id="R34927372384907731">
            <div className="t-Region-header">
                <div className="t-Region-headerItems t-Region-headerItems--title">
                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                    <h2 className="t-Region-title" id="R34927372384907731_heading"><FormattedMessage id="delivery-details.ContactInformation.Title" defaultMessage="Contact Information" /></h2>
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
                            <div className="col col-4 ">
                                <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R34927466655907732">
                                    <div className="t-Region-header">
                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                            <h2 className="t-Region-title" id="R34927466655907732_heading">Contact Information Heading</h2>
                                        </div>
                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                    </div>
                                    <div className="t-Region-bodyWrap">
                                        <div className="t-Region-buttons t-Region-buttons--top">
                                            <div className="t-Region-buttons-left" />
                                            <div className="t-Region-buttons-right" />
                                        </div>
                                        <div className="t-Region-body">
                                            <h3 className="title-block" style={{ fontSize: '12px', lineHeight: '16px', textTransform: 'uppercase', fontWeight: 'normal' }}>
                                                <span><FormattedMessage id="delivery-details.ContactInformation.Title" defaultMessage="Contact Information" /></span>
                                            </h3>
                                            <span className="hide-screen-sm" style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal' }}>
                                                <FormattedMessage id="delivery-details.ContactInformation.Message1" defaultMessage="Fields marked with" />
                                                <span className="t-Form-fieldContainer--floatingLabel is-required"> </span>
                                                <FormattedMessage id="delivery-details.ContactInformation.Message2" defaultMessage="are required" />
                                            </span>
                                        </div>
                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                            <div className="t-Region-buttons-left" />
                                            <div className="t-Region-buttons-right" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col col-8 apex-col-auto">
                                <div className="Delivery-Details-Form t-Region t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow t-Form--slimPadding t-Form--stretchInputs t-Form--labelsAbove"
                                    id="R606364606897292622">
                                    <div className="t-Region-header">
                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                            <h2 className="t-Region-title" id="R606364606897292622_heading">

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
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col col-6 apex-col-auto DeliveryDetailsPhonenumber">
                                                        <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                            onBlur={(e) => this.divOnBlure(e)} id="P7_FNAME_CONTAINER">
                                                            <div className="t-Form-labelContainer">
                                                                <label htmlFor="P7_FNAME" id="P7_FNAME_LABEL" className="t-Form-label"><FormattedMessage id="Form.FirstName" defaultMessage="First Name" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                            </div>

                                                            {firstNameInputField}


                                                        </div>
                                                    </div>
                                                    <div className="col col-6 apex-col-auto">
                                                        <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                            onBlur={(e) => this.divOnBlure(e)} id="P7_LNAME_CONTAINER">
                                                            <div className="t-Form-labelContainer">
                                                                <label htmlFor="P7_LNAME" id="P7_LNAME_LABEL" className="t-Form-label"><FormattedMessage id="Form.LastName" defaultMessage="Last Name" /></label>
                                                            </div>

                                                            {LastNameInputField}


                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col col-6 apex-col-auto">
                                                        <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label" id="P7_PHONE_CONTAINER">
                                                            <div className="t-Form-labelContainer">
                                                                <label htmlFor="P7_PHONE" id="P7_PHONE_LABEL" className="t-Form-label"> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                            </div>
                                                            <div id="PhoneNumber" className='t-Form-inputContainer'>
                                                                <PhoneNumber changed={this.contactNumber} />
                                                                {contactNumberInputField}
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div className="col col-6 apex-col-auto">
                                                        <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                            onBlur={(e) => this.divOnBlure(e)} id="P7_EMAIL_CONTAINER">
                                                            <div className="t-Form-labelContainer">
                                                                <label htmlFor="P7_EMAIL" id="P7_EMAIL_LABEL" className="t-Form-label"><FormattedMessage id="Form.Email" defaultMessage="Email" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                            </div>

                                                            {emailInputField}


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
                    </div>
                </div>
                <div className="t-Region-buttons t-Region-buttons--bottom">
                    <div className="t-Region-buttons-left" />
                    <div className="t-Region-buttons-right" />
                </div>
            </div>
        </div></>);
    }
}

const mapStateToProps = state => {
    return {
        user_details: state.login.customer_details,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnproceedToCheckout: (quoteId) => dispatch(actions.getAddressFromShippingDetails(quoteId)),
        OnaddNewAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddNewAddressAndRedirectToCheckout(quoteId)),
        OnaddOldAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddOldAddressAndRedirectToCheckout(quoteId)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Contact);