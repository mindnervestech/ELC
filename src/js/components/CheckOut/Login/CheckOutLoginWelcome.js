import React, { Component } from 'react';
import '../CheckOut.css';
import { FormattedMessage } from 'react-intl';
import Login from '../../Login/Login'
import { checkoutEvent } from '../../utility/googleTagManager'

import { connect } from 'react-redux';
let stepCountForGTM = 0;
class CheckOutLoginWelcome extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    let path = this.props.location.pathname.split("/")
    if (path[path.length - 1] === 'checkout-login') {
      stepCountForGTM = 1
    }
    if (this.props.location && this.props.location && this.props.location.state && this.props.location.state.data) {
      checkoutEvent(this.props.location.state.data, stepCountForGTM)
    }
  }
  componentDidUpdate() {

  }
  render() {

    return (<><div className="t-Body-contentInner">
      <div className="container">
        <div className="row">

          <div className="col col-12 apex-col-auto">
            <div className="t-Wizard containers  t-Wizard--showTitle t-Wizard--hideStepsSmall" id="R278855537416870116">
              <div className="t-Wizard-header">
                <h1 className="t-Wizard-title"><FormattedMessage id="signin.title" defaultMessage="Sign In" /></h1>
                <div className="u-Table t-Wizard-controls">
                  <div className="u-Table-fit t-Wizard-buttons" />
                  <div className="u-Table-fill t-Wizard-steps">
                    <h2 className="u-VisuallyHidden">Current Progress</h2>
                    <ul className="t-WizardSteps t-WizardSteps--displayLabels" id={34894189712949009}>
                      <li className="t-WizardSteps-step is-active" id="L34894440806949010">
                        <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker" />
                          <span className="t-WizardSteps-label"><FormattedMessage id="signin.title" defaultMessage="Sign In" /><span className="t-WizardSteps-labelState">
                            (Active)</span></span></div></li>
                      <li className="t-WizardSteps-step" id="L34894862176949011">
                        <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker">
                          <span className="t-Icon a-Icon icon-check" /></span>
                          <span className="t-WizardSteps-label"><FormattedMessage id="delivery-details.Delivery.Title" defaultMessage="Delivery" /> <span className="t-WizardSteps-labelState" /></span>
                        </div></li><li className="t-WizardSteps-step" id="L34895210921949011">
                        <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker"><span className="t-Icon a-Icon icon-check" /></span>
                          <span className="t-WizardSteps-label"><FormattedMessage id="login.Payment.Title" defaultMessage="payment" />

                            <span className="t-WizardSteps-labelState" /></span></div></li>
                      <li className="t-WizardSteps-step" id="L34895615146949011"><div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker"><span className="t-Icon a-Icon icon-check" /></span><span className="t-WizardSteps-label"><FormattedMessage id="login.Confirmation.Title" defaultMessage="Confirmation" />  <span className="t-WizardSteps-labelState" /></span></div></li></ul>
                  </div>
                  <div className="u-Table-fit t-Wizard-buttons" />
                </div>
              </div>
              <div className="t-Wizard-body">
              </div>
            </div>
          </div>
        </div>

        <Login isGuest={true} startGuestCheckout={this.props.guestUser.startGuestCheckout}></Login>

      </div>
    </div>
    </>);
  }
}

const mapStateToProps = state => {
  return {
    guestUser: state.guest_user,
  }
}
export default connect(mapStateToProps)(CheckOutLoginWelcome);