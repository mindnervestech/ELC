import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '.././../redux/actions/index';
import AlertBox from '../Common/AlertBox/AlertBox';

class ChangePass extends Component {
  constructor(props) {
    super(props)
    this.myIntl = props.intl
    this.state = {
      fields: {
        pass: '',
        cpass: '',
      },
      errors: {},
      alertBoxDetails: {
        status: false,
        message: '',
      }
    }
    //console.log(this.props);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /* let obj = this.props.change_pass;
    let pass = this.state.fields.pass;
    let cpass = this.state.fields.cpass;

    if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
      if ((obj.message !== prevProps.change_pass.message) && (pass === prevState.fields.pass) && (cpass === prevState.fields.cpass)) {
        let reg_status = obj.status;
        if (!reg_status) {

          //alert(obj.message);
          this.setState({
            ...this.state,
            alertBoxDetails: {
              status: true,
              message: obj.message,
            }
          })
          this.props.onClearChangePass();
        } else if (reg_status) {

          //alert(obj.message);

          this.setState({
            ...this.state,
            alertBoxDetails: {
              status: true,
              message: obj.message,
            }
          })
          this.props.onClearChangePass();

        }
      }
    } */
  }

  handleValidation = () => {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Email
    if (!fields["cpass"]) {
      formIsValid = false;
      errors["cpass"] = <FormattedMessage id="Signup.validation.confirmPassword.empty" defaultMessage="Confirm password Cannot be empty" />;
    }

    if (!fields["pass"]) {
      formIsValid = false;
      errors["pass"] = <FormattedMessage id="Signup.validation.password.empty" defaultMessage="Password Cannot be empty" />;
    }

    if (!(fields["pass"] === fields["cpass"])) {
      formIsValid = false;
      errors["pass"] = <FormattedMessage id="Signup.validation.password.same" defaultMessage="password and confirm should match" />;
    }


    this.setState({ errors: errors });
    return formIsValid;
  }

  handleChange = (field, e) => {

    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });

  }

  onSubmitForm = (e) => {
    if (this.handleValidation()) {
      this.changePassword();
    } else {
      this.setState({
        ...this.state,
        alertBoxDetails: {
          status: true,
          message: this.myIntl.formatMessage({ id: 'ChangePassword.Validate' }),
        }
      })
    }
  }

  changePassword = () => {
    const data = {
      customerid: this.props.user_details.customer_id,
      newpassword: this.state.fields.pass,
    }

    this.props.onChangePassword(data);


  }

  closeErrorBox = () => {
    this.setState({
      ...this.state,
      alertBoxDetails: {
        status: false,
        message: ''
      }
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

    return (<>
      {alertBox}
      <input type="hidden" name="p_flow_id" defaultValue={2019} id="pFlowId" /><input type="hidden" name="p_flow_step_id" defaultValue={23} id="pFlowStepId" /><input type="hidden" name="p_instance" defaultValue={20414079679035} id="pInstance" /><input type="hidden" name="p_page_submission_id" defaultValue={331397434270474982869806568393446131471} id="pPageSubmissionId" /><input type="hidden" name="p_request" defaultValue id="pRequest" /><input type="hidden" name="p_reload_on_submit" defaultValue="S" id="pReloadOnSubmit" /><input type="hidden" defaultValue={331397434270474982869806568393446131471} id="pSalt" /><div className="t-Dialog" role="dialog" aria-label="Password Edit">
        <div className="t-Dialog-header" />
        <div className="t-Dialog-bodyWrapperOut">
          <div className="t-Dialog-bodyWrapperIn"><div className="t-Dialog-body">
            <span id="APEX_SUCCESS_MESSAGE" data-template-id="33515671899469661_S" className="apex-page-success u-hidden" /><span id="APEX_ERROR_MESSAGE" data-template-id="33515671899469661_E" className="apex-page-error u-hidden" />
            <div className="container">
              <div className="row">
                <div className="col col-12 apex-col-auto">
                  <div className="t-Region i-h480 t-Region--removeHeader t-Region--noBorder t-Region--scrollBody t-Form--stretchInputs" id="R30744403115804352">
                    <div className="t-Region-header">
                      <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                        <h2 className="t-Region-title" id="R30744403115804352_heading">Edit Password</h2>
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
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--password" id="P23_PASSWORD_CONTAINER">
                                <div className="t-Form-inputContainer">
                                  <div className="t-Form-itemWrapper">
                                  <FormattedMessage id="password" defaultMessage="Password">
                                  {(message2) =>
                                    <input style={{padding: 10}} type="password" placeholder={message2} name="P23_PASSWORD" size={30} maxLength defaultValue id="P23_PASSWORD" className="password apex-item-text" onChange={this.handleChange.bind(this, "pass")} value={this.state.fields["pass"]} />
                                  }</FormattedMessage>
                                    </div>
                                  <span id="P23_PASSWORD_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                </div>
                              </div>
                            </div>
                          </div><div className="row">
                            <div className="col col-12 apex-col-auto">
                              <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--password" id="P23_CPASSWORD_CONTAINER">
                                <div className="t-Form-inputContainer">
                                  <div className="t-Form-itemWrapper">
                                    <FormattedMessage id="profile.Confirm.Password" defaultMessage="Confirm Password">
                                      {(message) =>
                                        <input style={{padding: 10}} type="password" placeholder={message} name="P23_CPASSWORD" size={30} maxLength defaultValue id="P23_CPASSWORD" className="password apex-item-text" onChange={this.handleChange.bind(this, "cpass")} value={this.state.fields["cpass"]} />
                                      }</FormattedMessage>
                                  </div>
                                  <span id="P23_CPASSWORD_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
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
            </div>
          </div></div>
        </div>
        <div className="t-Dialog-footer"><div className="t-ButtonRegion t-Form--floatLeft " id="R30745151014804359">
          <div className="t-ButtonRegion-wrap">
            <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
            <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
              <h2 className="t-ButtonRegion-title" id="R30745151014804359_heading">Buttons</h2>
              <div className="t-ButtonRegion-buttons" />
            </div>
            <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons">

              <button onClick={this.props.oncloseModal} className="t-Button " type="button" id="B28579961600022341"><span className="t-Button-label"><FormattedMessage id="Cancel.Btn" defaultMessage="Cancel" /></span></button>

              <button onClick={this.onSubmitForm} className="t-Button t-Button--hot t-Button--gapRight" type="button" id="B28580342208022342"><span className="t-Button-label"><FormattedMessage id="Save.text" defaultMessage="Save" /></span></button></div></div>
          </div>
        </div></div>
      </div><input type="hidden" id="pPageItemsRowVersion" defaultValue /><input type="hidden" id="pPageItemsProtected" defaultValue="-2UdNuvbFwl1yOwwN0G9xg" /></>
    );
  }
}
const mapStateToProps = state => {
  return {
    user_details: state.login.customer_details,
    change_pass: state.login.changePasswordDetails,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onChangePassword: (payload) => dispatch(actions.changePassword(payload)),
    onClearChangePass: () => dispatch(actions.clearChangePass()),
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(ChangePass));