import React, { Component } from 'react';
import './UpdatePassword.css';
import * as utility from '../../utility/utility';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import AlertBox from '../../Common/AlertBox/AlertBox';
import { Link, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import Spinner from '../../Spinner/Spinner.js';
import { Row, Col } from "react-bootstrap";
const wait = require('../../../../assets/images/wait.gif');

class UpadatePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                password: '',
                confirmPassword: '',

            },
            errors: {},
            goToMyProfile: false,
            showPasswordAlert: false,
            showPleaseWait: false

        }
    }

    goToMyProfile = () => {
        this.setState({ goToMyProfile: true })

    }
    changePassword = () => {
        const data = {
            customerid: this.props.user_details.customer_id,
            newpassword: this.state.fields.password,
        }
        this.props.onChangePassword(data);

    }
    closeAlert = () => {
        this.setState({ showPasswordAlert: false })
        this.props.onClearChangePass();
        this.onClearFormData();
        this.setState({ showPleaseWait: false })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.change_pass.status == true) {
            this.setState({ showPasswordAlert: true })
            setTimeout(() => {
                this.closeAlert();
            }, 2000);

        }
        if (nextProps.change_pass.status == false) {
            this.setState({ showPasswordAlert: true });
            setTimeout(() => {
                this.closeAlert();
            }, 2000);
        }

      
    }


    onClearFormData = () => {
        this.setState({
            ...this.state,
            fields: {
                password: '',
                confirmPassword: '',
            }
        })
    }

    handleValidation = () => {
        let validate = false;
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;

        if (!fields["confirmPassword"]) {
            formIsValid = false;
            validate = true;
            errors["confirmPassword"] = <FormattedMessage id="Signup.validation.confirmPassword.empty" defaultMessage="Please enter confirm password" />;
        }

        if (!fields["password"]) {
            formIsValid = false;
            validate = true;
            errors["password"] = <FormattedMessage id="Signup.validation.password.empty" defaultMessage="Please enter password" />;
        }
        if (fields["password"] && fields["confirmPassword"]) {
            if (!fields['password'].match(regularExpression)) {
                formIsValid = false;
                errors["password"] = <FormattedMessage id="Signup.validation.password.invalid" defaultMessage="Password is not valid" />;

            }
            if (!fields['confirmPassword'].match(regularExpression)) {
                formIsValid = false;
                errors["confirmPassword"] = <FormattedMessage id="Signup.validation.password.invalid" defaultMessage="Password is not valid" />;
            }

        }
        if (!validate) {

        }

        if (!(fields["password"] === fields["confirmPassword"])) {
            formIsValid = false;
            errors["password"] = <FormattedMessage id="Signup.validation.password.same" defaultMessage="password and confirm should match" />;
        }
        this.setState({ errors: errors });
        return formIsValid;

    }
    handleChange = (field, e) => {
        let fields = this.state.fields;
        fields[field] = e.target.value;
        this.setState({ fields });
    }
    submitData = () => {
        if (this.handleValidation()) {
            this.setState({ showPleaseWait: true })
            this.changePassword();
        }
    }
    applyBtn = () => {
        let validate = true;
        var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
        if (this.state.fields.newPassword !== "" && this.state.fields.confirmPassword !== "") {
            this.state.newPasswordError = false
            this.state.confirmError = false
            if (this.state.fields.newPassword != this.state.fields.confirmPassword) {
                this.setState({ passwordNotMatch: true });
                validate = false;
            } else {
                this.setState({ passwordNotMatch: false });
            }
            if (validate == true) {
                if (!this.state.fields.newPassword.match(regularExpression)) {
                    this.setState({ newPasswordErrorInvalid: true });
                    validate = false;
                } else {
                    this.setState({ newPasswordErrorInvalid: false });
                }

                if (!this.state.fields.confirmPassword.match(regularExpression)) {
                    this.setState({ confirmErrorInvalid: true });
                    validate = false;
                } else {
                    this.setState({ confirmErrorInvalid: false });
                }
            }
        } else {
            this.state.newPasswordErrorInvalid = false
            this.state.confirmErrorInvalid = false
            this.state.passwordNotMatch = false
            if (this.state.fields.newPassword === undefined || this.state.fields.newPassword === '') {
                this.setState({ newPasswordError: true });
                validate = false;
            } else {
                this.setState({ newPasswordError: false });
            }

            if (this.state.fields.confirmPassword === undefined || this.state.fields.confirmPassword === '') {
                this.setState({ confirmError: true });
                validate = false;
            } else {
                this.setState({ confirmError: false });
            }
        }


    }

    render() {
        if (this.state.goToMyProfile) {
            this.props.history.push(`/${this.props.globals.store_locale}/myaccount`);
        }
        let respo_message = null;
        if (this.state.showPasswordAlert) {
            respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                    <div className="t-Alert-wrap">
                        <div className="t-Alert-icon">
                            <span className="t-Icon" />
                        </div>
                        <div className="t-Alert-content">
                            <div className="t-Alert-header">
                                <h2 className="t-Alert-title">{this.props.change_pass.message}</h2>
                            </div>
                        </div>
                        <div className="t-Alert-buttons">
                            <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={() => this.closeAlert()}><span className="t-Icon icon-close" /></button>
                        </div>
                    </div>
                </div>
            </div></span>;
        }



        let passwordField = null;
        passwordField = <div className="form-group">
            <label className="control-label " htmlFor="currentPassword">
                <FormattedMessage id="password" defaultMessage="Password" /></label>
            <input id="currentPassword" name="currentPassword" value={this.state.fields['password']} onChange={this.handleChange.bind(this, 'password')} className="form-control-input" type="password" autocomplete="off" />
        </div>
        let confirmPasswordField = null;
        confirmPasswordField = <div className="form-group">
            <label className="control-label" htmlFor="currentPassword">
                <FormattedMessage id="profile.Confirm.Password" defaultMessage="Confirm Password" /></label>
            <input id="currentPassword" name="currentPassword" value={this.state.fields['confirmPassword']} onChange={this.handleChange.bind(this, 'confirmPassword')} className="form-control-input" type="password" autocomplete="off" />
        </div>

        let errosObj = this.state.errors;
        if ('password' in errosObj) {
            passwordField = <div className="form-group">
                <label className="control-label " htmlFor="currentPassword">
                    <FormattedMessage id="password" defaultMessage="Password" /></label>
                <input id="currentPassword" name="currentPassword" value={this.state.fields['password']} onChange={this.handleChange.bind(this, 'password')} className="form-control-input" type="password" autocomplete="off" />
                <span id="P14_EMAIL_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                    {errosObj["password"]}
                </span>
            </div>

        }

        if ('confirmPassword' in errosObj) {
            confirmPasswordField = <div className="form-group">
                <label className="control-label" htmlFor="currentPassword">
                    <FormattedMessage id="profile.Confirm.Password" defaultMessage="Confirm Password" /></label>
                <input id="currentPassword" name="currentPassword" value={this.state.fields['confirmPassword']} onChange={this.handleChange.bind(this, 'confirmPassword')} className="form-control-input" type="password" autocomplete="off" />
                <span id="P14_EMAIL_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" style={{ color: 'red' }}>
                    {errosObj["confirmPassword"]}
                </span>
            </div>
        }


        let store_locale = this.props.globals.store_locale;
        return (
            <div className="t-Body-contentInner" style={{textAlign:'start'}}>
                <div className="padding-right-ar padding-breadcrumb" style={{ textAlign: 'start' }}>
                    <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                        <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                        {this.props.globals.language === 'en' ?
                            <span>&nbsp;\&nbsp;&nbsp;</span> :
                            <span>&nbsp;/&nbsp;&nbsp;</span>
                        }
                    </Link>
                    <span style={{ fontSize: 15, fontWeight: 'bold' }}>Update Password</span>
                    {respo_message}
                </div>
                <Row>
                    <Col xs={12} lg={12} md={12}>
                        <div className="update-password-conatiner">
                            <h1 className="update-password-header">Update Password</h1>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col lg={3} xs={1} md={2}>&nbsp;</Col>
                    <Col xs={10} lg={6} md={8} style={{ marginBottom: 40 }}>
                        <div className="password-section-form">
                            <div className="form-group">
                                {passwordField}
                            </div>
                            <p><FormattedMessage id="Form.PasswordConventions" defaultMessage="Password must be at least 8 characters long and contain an uppercase letter, a lowercase letter and a number." /></p>
                        </div>
                        <div className="form-group">
                            {confirmPasswordField}
                        </div>
                        <div style={{ display: 'flex' }}>
                            <button className="alsoLikeCardButton cancel-button" onClick={this.goToMyProfile} ><span>Cancel</span></button>
                            {this.state.showPleaseWait ?
                                <button style={{ height: 50 }} className="alsoLikeCardButton save-button" type="button" disabled={true}>
                                    <img src={wait} style={{ width: 25, height: 20, marginTop: -4 }} alt="" />
                                    <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                </button> :
                                <button className="alsoLikeCardButton save-button" onClick={this.submitData} ><span>Save</span></button>}
                        </div>
                    </Col>
                    <Col xs={1} lg={3} md={2}>&nbsp;</Col>

                </Row>

            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

        globals: state.global,
        user_details: state.login.customer_details,
        change_pass: state.login.changePasswordDetails,
    };
}
const mapDispatchToProps = dispatch => {
    return {

        onChangePassword: (payload) => dispatch(actions.changePassword(payload)),
        onClearChangePass: () => dispatch(actions.clearChangePass()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpadatePassword);


