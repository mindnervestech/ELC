import React, { Component } from 'react';
import './ForgotPassword.css';
import axios from 'axios';
import PhoneNumber from './IntlTelePhone';
import * as utility from '../utility/utility';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import AlertBox from '../Common/AlertBox/AlertBox';

const wait = require('../../../assets/images/wait.gif');

let spinnerFlag = false;
class ForGotPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                email: '',
                contactNumber: '',
                carrierCode: ''
            },
            sucess_message: '',
            showAlert: false,
            checkCondition: true,
            errors: {},
            data: {},
            isPhoneValid: false,
            alertBoxDetails: {
                status: false,
                message: '',
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps)
        if (nextProps.forgotPassword.status && nextProps.forgotPassword.code == 200) {

            this.setState({ sucess_message: nextProps.forgotPassword.message, showAlert: true, checkCondition: false })

        }
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        let obj = this.props.forgotPassword;
        let email = this.state.fields.email;
        if (!(utility.emptyObj(obj))) {
            if ((obj.message !== prevProps.forgotPassword.message) && (email === prevState.fields.email)) {
                let reg_status = obj.status;
                spinnerFlag = false
                if (!reg_status) {
                    //alert(obj.message);
                    //this.props.onClearForgotPass();
                    this.setState({
                        ...this.state,
                        alertBoxDetails: {
                            status: true,
                            message: obj.message,
                        },
                        spinnerFlag: false
                    })
                } else if (reg_status) {
                    // alert(obj.message);
                    // this.props.onClearForgotPass();
                    this.setState({
                        ...this.state,
                        alertBoxDetails: {
                            status: true,
                            message: obj.message,
                        },
                        spinnerFlag: false
                    })
                }
            }
        }
    }

    handleValidation = () => {
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        //console.log('handle validation');


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

        if (!fields["contactNumber"]) {
            console.log("Come here")
            formIsValid = false;
            errors["contactNumber"] = <FormattedMessage id="Signup.validation.contactNumber.empty" defaultMessage="Please enter contact number" />;
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
        if (this.handleValidation()) {
            this.setState({spinnerFlag: true});
            spinnerFlag=  true;
            this.resetPassword();
        }
    }

    handleChange = (field, e) => {

        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });

    }



    resetPassword = () => {

        const data = {
            store_id: this.props.globals.currentStore,
            carrier_code: this.state.fields.carrierCode,
            contact_number: parseInt(this.state.fields.contactNumber),
            email: this.state.fields.email,

        }

        this.props.onForgotPassword(data);
    }

    contactNumber = (status, value, countryData, number, id) => {
        //console.log('from parent',status, value, countryData, number, id)
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
        }, () => {
            this.props.onClearForgotPass();
            this.props.closeModal();
        })

    }
    render() {
        let alertBox = null;

        if (this.state.alertBoxDetails.status) {
            alertBox = <AlertBox
                message={this.state.alertBoxDetails.message}
                alertBoxStatus={this.state.alertBoxDetails.status}
                closeBox={this.closeErrorBox} />
        }
        // let divsucess_message=null;
        // if(this.state.showAlert){
        //   divsucess_message=<div>
        //     <center><h1 style={{color:'green'}}>{this.state.sucess_message}</h1></center>
        //   </div>
        // }
        const errorMessage = this.state.errors;
        let emailInputField = <div><div>
            <FormattedMessage id="ContactUs.Email" defaultMessage="Email Address">
                {(message) =>
                    <input type="email" id="P1003_EMAIL_ADDRESS" name="P1003_EMAIL_ADDRESS" placeholder={message} size={30} onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                }
            </FormattedMessage>
        </div>
            <span id="P1003_EMAIL_ADDRESS_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div>;

        let contactNumberInputField = null;



        if ('email' in errorMessage) {

            emailInputField = <div ><div>
                <FormattedMessage id="ContactUs.Email" defaultMessage="Email Address">
                    {(message) =>
                        <input type="email" id="P1001_EMAIL" name="P1001_EMAIL" placeholder={message} onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} size="30" maxLength="100" aria-describedby="P1001_EMAIL_error" aria-invalid="true" />

                    }
                </FormattedMessage>
            </div><span id="P1003_EMAIL_ADDRESS_error_placeholder" className="a-Form-error  u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P1003_EMAIL_ADDRESS_error"><FormattedMessage id="Signup.validation.email.invalid" defaultMessage="First Name cannot be empty" /></div></span></span></div>;

        }

        if ('contactNumber' in errorMessage) {

            contactNumberInputField = <div className="t-Form-error" id="P1001_PHONE_error">{errorMessage["contactNumber"]}</div>
        }

        return (<div>
            {alertBox}
            <form autoComplete="off">
                <input type="hidden" name="p_flow_id" defaultValue={2019} id="pFlowId" /><input type="hidden" name="p_flow_step_id" defaultValue={1003} id="pFlowStepId" /><input type="hidden" name="p_instance" defaultValue={3946100354967} id="pInstance" /><input type="hidden" name="p_page_submission_id" defaultValue={239666045373963093780204993976312533120} id="pPageSubmissionId" /><input type="hidden" name="p_request" id="pRequest" /><input type="hidden" name="p_reload_on_submit" defaultValue="S" id="pReloadOnSubmit" /><input type="hidden" defaultValue={239666045373963093780204993976312533120} id="pSalt" /><div className="t-Dialog" role="dialog" aria-label="Password Reset">
                    <div className="t-Dialog-header" />
                    <div className="t-Dialog-bodyWrapperOut">
                        <div className="t-Dialog-bodyWrapperIn"><div className="t-Dialog-body backWhite">
                            <span id="APEX_SUCCESS_MESSAGE" data-template-id="33515671899469661_S" className="apex-page-success u-hidden" /><span id="APEX_ERROR_MESSAGE" data-template-id="33515671899469661_E" className="apex-page-error u-hidden" />
                            <div className="container" >

                                <div className="row">
                                    <div className="col col-12 apex-col-auto">
                                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R696020847459602050">
                                            <div className="t-Region-header">
                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                    <h2 className="t-Region-title" id="R696020847459602050_heading">Mihyar Club Member</h2>
                                                </div>
                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                            </div>
                                            <div className="t-Region-bodyWrap backWhite">
                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                    <div className="t-Region-buttons-left" />
                                                    <div className="t-Region-buttons-right" />
                                                </div>
                                                <div className="t-Region-body">
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="row block" id="P1003_EMAIL_ADDRESS_CONTAINER">
                                                                    <div className="col-12 t-Form-labelContainer">
                                                                        <label htmlFor="P1003_EMAIL_ADDRESS" id="P1003_EMAIL_ADDRESS_LABEL" className="t-Form-label">
                                                                            <FormattedMessage id="Form.Email" defaultMessage="Email" />
                                                                            <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                    </div>
                                                                    <div className="col-12" style={{padding: 0}}>
                                                                        {emailInputField}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="row block" id="P1003_PHONE_CONTAINER">
                                                                    <div style={{ paddingTop: 10 }} className="col-12 t-Form-labelContainer">
                                                                        <label htmlFor="P1003_PHONE" id="P1003_PHONE_LABEL" className="t-Form-label">
                                                                            <FormattedMessage id="Form.PhoneNumber" defaultMessage="Contact Number *" />
                                                                            <span className="u-VisuallyHidden">(Value Required)</span></label>




                                                                        <div className="col-12" style={{padding: 0}}>
                                                                            <PhoneNumber changed={this.contactNumber} />
                                                                            {contactNumberInputField}
                                                                        </div>
                                                                    </div>

                                                                </div>

                                                            </div>

                                                        </div>

                                                        <div className="row padTop20">
                                                            <div className="col col-12 paddingRemoveLetfAndRight " style={{ marginBottom: 20 }}>
                                                                {spinnerFlag ?
                                                                <button className="button3" style={{ width: "100%", height: 72 }} type="button" disabled={true}>
                                                                    <img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} alt=""/>
                                                                    <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                                                </button>:
                                                                <button onClick={this.signUpSubmit} className="button3" style={{ width: "100%", height: 72 }} type="button" id="B29665481101883473">
                                                                    <span className="t-Button-label">
                                                                        <FormattedMessage id="Form.Send" defaultMessage="Send" />
                                                                    </span>
                                                                </button>}

                                                                <input type="hidden" id="P1003_TIME_CHECK" name="P1003_TIME_CHECK" /><input type="hidden" data-for="P1003_TIME_CHECK" defaultValue="VV6vUFJ6aze616Fc52zoGghCgvqIcdqu8W4pO4K7v-IzcYs8bdYxniLX61inY2s3Uuj3p0GeS0Z9wGHKrMQodg" /><input type="hidden" id="P1003_TIME" name="P1003_TIME" />
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
                        </div></div>
                    </div>
                    <div className="t-Dialog-footer" />
                </div><input type="hidden" id="pPageItemsRowVersion" /><input type="hidden" id="pPageItemsProtected" defaultValue="WUsHTLS19BZMgXrmobfMYecfbEz22L0aozENMf4WK9A" /></form>

        </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        forgotPassword: state.login.forgotPasswordDetails,
        globals: state.global
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onForgotPassword: (payload) => dispatch(actions.forgotPassword(payload)),
        onClearForgotPass: () => dispatch(actions.clearForgotPass()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForGotPassword);