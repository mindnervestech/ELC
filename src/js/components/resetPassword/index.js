import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import queryString from 'query-string';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Spinner from '../Spinner/Spinner2';
import { Container, Row, Col, Button } from 'reactstrap';
let status = false;
class ResetPassword extends Component {

	constructor(props) {
		super(props);
		this.state = {
			fields: {
				newPassword: '',
				confirmPassword: ''
			},
			newPasswordError: false,
			confirmError: false,
			newPasswordErrorInvalid: false,
			confirmErrorInvalid: false,
			passwordNotMatch: false,
			showAlert: false,
			res_message: '',
			ischeckremove: true,
		}
	}

	componentWillMount() {
		const values = queryString.parse(this.props.location.search);
		if (values.status || (values.id && values.token)) {
			if (values.status == 'true') {
				this.props.resetFlag({
					resetpasswordSucess: true,
					resetpasswordToken: false
				});
			}
			if (values.status == 'false') {
				this.props.resetFlag({
					resetpasswordSucess: false,
					resetpasswordToken: true
				});
			}
		} else {
			this.props.history.push(`/${this.props.globals.store_locale}`);
		}
	}

	componentDidUpdate(prevProps) {
		console.log(this.props.resetpasswordSucess)
		if (prevProps.newLink != this.props.newLink) {
			if (this.props.newLink) {
				this.props.history.push(`/${this.props.globals.store_locale}/password-rest?status=${this.props.resetpasswordSucess ? true : false}`);
			}
		}
	}

	componentDidMount() {
		const values = queryString.parse(this.props.location.search);
		if (values.status) {

		} else {
			this.props.resetFlag({
				resetpasswordSucess: false,
				resetpasswordToken: false
			});
		}
	}

	closeAlert = () => {
		this.setState({ showAlert: false });
	}

	handleChange = (field, e) => {
		let fields = this.state.fields;
		fields[field] = e.target.value;
		this.setState({ fields });
	}

	applyBtn = () => {
		let validate = true;
		var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		if(this.state.fields.newPassword !== "" && this.state.fields.confirmPassword !== ""){
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

		if (this.state.fields.newPassword != this.state.fields.confirmPassword) {
			this.setState({ passwordNotMatch: true });
			validate = false;
		} else {
			this.setState({ passwordNotMatch: false });
		}

		if (!validate) {
			return;
		}

		const values = queryString.parse(this.props.location.search);
		this.props.resetPassword({
			customerId: values.id,
			password: this.state.fields.newPassword,
			passwordConfirmation: this.state.fields.confirmPassword,
			resetPasswordToken: values.token,
			store_id: this.props.globals.currentStore
		})
	}

	render() {
		let respo_message = null;
		if (this.state.showAlert) {
			respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
				<div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
					<div className="t-Alert-wrap">
						<div className="t-Alert-icon">
							<span className="t-Icon" />
						</div>
						<div className="t-Alert-content">
							<div className="t-Alert-header">
								<h2 className="t-Alert-title">{this.state.res_message}</h2>
							</div>
						</div>
						<div className="t-Alert-buttons">
							<button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={this.closeAlert} ><span className="t-Icon icon-close" /></button>
						</div>
					</div>
				</div>
			</div></span>;
		}
		console.log(this.props.resetpasswordSucess)
		if (this.props.resetpasswordSucess == false) {
			status = true;
		} else {
			status = false;
		}
		console.log(status)

		return (
			<div className="t-Body-contentInner">
				{respo_message}
				<div className="container">
					{status && (<div className="row">
						<div className="col col-12 apex-col-auto">
							<div className="t-Region centered-content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-bottom-lg margin-top-lg">
								<div className="t-Region-bodyWrap">
									<div className="t-Region-buttons t-Region-buttons--top">
										<div className="t-Region-buttons-left"></div>
										<div className="t-Region-buttons-right"></div>
									</div>
									<div className="t-Region-body">
										<center>
											<h1 style={{ font: "30px/1 Arial,sans-serif", color: "#000000", fontFamily: "elc_bold" }}>
												<FormattedMessage id="ResetPassword.success.Text" defaultMessage="Reset your password" />
											</h1>
											<h3 style={{ margin: "0 0 1.2rem", fontWeight: 500, lineHeight: 1.5 }}>
												<FormattedMessage id="ResetPassword.PasswordChanged.Text" defaultMessage="Password changed" />
											</h3>
											<p>
												<FormattedMessage id="ResetPassword.Success.Text1" defaultMessage="Success! You have created a new password for your account." />
											</p>
										</center>
									</div>
								</div>
							</div>
						</div>
					</div>)}
					{!this.props.resetpasswordLoader && (<>
						{!this.props.resetpasswordSucess && !this.props.resetpasswordToken && (<div className="row">
							<div className="col col-12 apex-col-auto">
								<div className="t-Region g-wrapper-main_content  t-Region--noBorder t-Region--scrollBody margin-top-lg margin-bottom-lg" id="R743769710750240199">
									<div className="t-Region-header">
										<div className="t-Region-headerItems t-Region-headerItems--title">
											<span className="t-Region-headerIcon">
												<span className="t-Icon" aria-hidde="true" />
											</span>
											<h2 className="t-Region-title" id="R743769710750240199_heading">
												<FormattedMessage id="ResetPassword.Title.Text" defaultMessage="Password Reset" />
											</h2>
										</div>
										<div className="t-Region-headerItems t-Region-headerItems--buttons">
											<span className="js-maximizeButtonContainer" />
										</div>
									</div>
									<div className="t-Region-bodyWrap">
										<div className="t-Region-buttons t-Region-buttons--top">
											<div className="t-Region-buttons-left"></div>
											<div className="t-Region-buttons-right"></div>
										</div>
										<div className="t-Region-body">
											<div className="container" style={{ overflow: 'hidden' }}>
												<Row className="row">
													<Col xs="1" lg="4" md="3">
														<span className="apex-grid-nbsp">&nbsp;</span>
													</Col>
													<Col xs="10" lg="4" md="6">
														<div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--password apex-item-wrapper--has-icon js-show-label" id="P1002_NEW_PASSWORD_CONTAINER">
															<div className="t-Form-labelContainer">
																<label className="t-Form-label" for="P1002_NEW_PASSWORD" id="P1002_NEW_PASSWORD_LABEL">
																	<FormattedMessage id="ResetPassword.NewPassword.Text" defaultMessage="New Password" />
																</label>
															</div>
															<div className="t-Form-inputContainer">
																<div className="t-Form-itemWrapper">
																	<FormattedMessage id="ResetPassword.EnterPassword.Text" defaultMessage="Enter Password">
																		{(message) =>
																			<input type="password" name="P1002_NEW_PASSWORD" size="30" maxLength placeholder={message}
																				className="password apex-item-text apex-item-has-icon" value={this.state.fields.newPassword}
																				onChange={(e) => this.handleChange('newPassword', e)} />
																		}
																	</FormattedMessage>
																	<span className="apex-item-icon fa fa-key" aria-hidden="true"></span>
																</div>
																{this.state.newPasswordError && (<span className="a-Form-error u-visible">
																	<span className="t-Form-error">
																		<div>
																			<FormattedMessage id="ResetPassword.newpassword.error" defaultMessage="Please enter the your new password" />
																		</div>
																	</span>
																	<br />
																</span>)}
																{this.state.newPasswordErrorInvalid && (<span className="a-Form-error u-visible">
																	<span className="t-Form-error">
																		<div>
																			<FormattedMessage id="ResetPassword.newpasswordinvalid.error" defaultMessage="Password Should Contain Lower Case, Upper Case, Digits, Special Characters" />
																		</div>
																	</span>
																	<br />
																</span>)}
															</div>
														</div>
													</Col>
												</Row>
												<Row className="row">
													<Col xs="1" lg="4" md="3">
														<span className="apex-grid-nbsp">&nbsp;</span>
													</Col>
													<Col xs="10" lg="4" md="6">
														<div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--password apex-item-wrapper--has-icon js-show-label">
															<div className="t-Form-labelContainer">
																<label className="t-Form-label" for="P1002_NEW_PASSWORD" id="P1002_NEW_PASSWORD_LABEL">
																	<FormattedMessage id="ResetPassword.ConfirmPassword.Text" defaultMessage="Confirm Password" />
																</label>
															</div>
															<div className="t-Form-inputContainer">
																<div className="t-Form-itemWrapper">
																	<FormattedMessage id="ResetPassword.EnterPassword.Text" defaultMessage="Enter Password">
																		{(message) =>
																			<input type="password" name="P1002_NEW_PASSWORD" size="30" maxLength placeholder={message}
																				className="password apex-item-text apex-item-has-icon" value={this.state.fields.confirmPassword}
																				onChange={(e) => this.handleChange('confirmPassword', e)} />
																		}
																	</FormattedMessage>
																	<span className="apex-item-icon fa fa-key" aria-hidden="true"></span>
																</div>
																{this.state.confirmError && (<span className="a-Form-error u-visible">
																	<span className="t-Form-error">
																		<div>
																			<FormattedMessage id="ResetPassword.confirmpassword.error" defaultMessage="Please confirm your new password" />
																		</div>
																	</span>
																</span>)}
																{this.state.confirmErrorInvalid && (<span className="a-Form-error u-visible">
																	<span className="t-Form-error">
																		<div>
																			<FormattedMessage id="ResetPassword.newpasswordinvalid.error" defaultMessage="Password Should Contain Lower Case, Upper Case, Digits, Special Characters" />
																		</div>
																	</span>
																	<br />
																</span>)}
															</div>
														</div>
													</Col>
												</Row>
												<Row className="row">
													<Col xs="1" lg="4" md="3">
														<span className="apex-grid-nbsp">&nbsp;</span>
													</Col>
													<Col xs="10" lg="4" md="6">
														<button className="t-Button t-Button--hot t-Button--large t-Button--stretch"
															onClick={this.applyBtn}>
															<span className="t-Button-label">
																<FormattedMessage id="ResetPassword.Apply.Text" defaultMessage="Apply" />
															</span>
														</button>
														{this.state.passwordNotMatch && (<span className="a-Form-error u-visible">
															<span className="t-Form-error">
																<div>
																	<FormattedMessage id="ResetPassword.notMatch.error" defaultMessage="New Password and Confirm New Password values didn't match." />
																</div>
															</span>
														</span>)}
													</Col>
												</Row>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>)}
						{this.props.resetpasswordToken && (<div className="row">
							<div className="col col-12 apex-col-auto">
								<div className="t-Region centered-content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-bottom-lg margin-top-lg">
									<div className="t-Region-bodyWrap">
										<div className="t-Region-buttons t-Region-buttons--top">
											<div className="t-Region-buttons-left"></div>
											<div className="t-Region-buttons-right"></div>
										</div>
										<div className="t-Region-body">
											<center>
												<h1 style={{ font: "30px/1 Arial,sans-serif", color: "#000000", fontFamily: "elc_bold" }}>
													<FormattedMessage id="RestPassword.linkExpired.Text" defaultMessage="Reset link expired" />
												</h1>
												<p>
													<FormattedMessage id="ResetPassword.linkExpired.Text1" defaultMessage="Email reset link is expired please click" />
													&nbsp;
													<a style={{ color: "inherit" }}>
														<FormattedMessage id="ResetPassword.linkExpired.Text2" defaultMessage="reset password" />
													</a>
													&nbsp;
													<FormattedMessage id="ResetPassword.linkExpired.Text3" defaultMessage="to get reset password link." />
												</p>
											</center>
										</div>
									</div>
								</div>
							</div>
						</div>)}

						{!this.props.resetpasswordSucess && (<div className="row">
							<div className="col col-12 apex-col-auto">
								<div className="t-Region centered-content  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody margin-bottom-lg margin-top-lg">
									<div className="t-Region-bodyWrap">
										<div className="t-Region-buttons t-Region-buttons--top">
											<div className="t-Region-buttons-left"></div>
											<div className="t-Region-buttons-right"></div>
										</div>
										<div className="t-Region-body">
											<center>
												<h1 style={{ font: "30px/1 Arial,sans-serif", color: "#000000", fontFamily: "elc_bold" }}>
													<FormattedMessage id="ResetPassword.success.Text" defaultMessage="Reset your password" />
												</h1>
												<h3 style={{ margin: "0 0 1.2rem", fontWeight: 500, lineHeight: 1.5, textAlign: 'center', padding: "0px !important" }}>
													<FormattedMessage id="ResetPassword.PasswordChangedfail.Text" defaultMessage="Password change failed " />
												</h3>
												<p>
													<FormattedMessage id="ResetPassword.fail.Text1" defaultMessage="Password change failed try again !!!" />
												</p>
											</center>
										</div>
									</div>
								</div>
							</div>
						</div>)}
					</>)}
					{this.props.resetpasswordLoader && (<Spinner />)}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		resetpasswordSucess: state.login.resetpasswordSucess,
		resetpasswordToken: state.login.resetpasswordToken,
		newLink: state.login.newLink,
		resetpasswordLoader: state.login.resetpasswordLoader,
		globals: state.global
	};
}

const mapDispatchToProps = dispatch => {
	return {
		resetFlag: (payload) => dispatch(actions.resetFlag(payload)),
		resetPassword: (payload) => dispatch(actions.resetPassword(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);