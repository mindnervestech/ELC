import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

class ConfirmBox extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
        this.state = {
            showAlertBoxReact: this.props.alertBoxStatus,
        }
    }
    CancelClicked = () => {
        this.setState({
            showAlertBoxReact: false
        })

        this.props.buttonClick('can');
    }

    OkClicked = () => {
        this.setState({
            showAlertBoxReact: false
        })
        //console.log('Close alert Box Child');
        this.props.buttonClick('ok');
    }

    render() {
        let alertBoxReact = null;
        if (this.state.showAlertBoxReact) {
            alertBoxReact = <div className="alertify">
                <div className="dialog">
                    <div>
                    <p className="msg">{this.myIntl.formatMessage({ id: 'confirmBox.Warning' })}</p>
                    <nav>
                        <button className="ok" tabIndex={1} onClick={this.CancelClicked}>{this.myIntl.formatMessage({ id: 'alertBoxText.Cancel' })}</button>
                        <button className="ok" tabIndex={1} onClick={this.OkClicked}>{this.myIntl.formatMessage({ id: 'alertBoxText.Ok',defaultMessage:'OK' })}</button>
                    </nav>
                </div>
                </div>
            </div>

        }
        return (
            <>
                {alertBoxReact}
            </>
        )
    }
}
export default injectIntl(ConfirmBox);