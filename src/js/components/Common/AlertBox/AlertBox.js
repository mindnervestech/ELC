import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';

class AlertBox extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
        this.state = {
            showAlertBoxReact: this.props.alertBoxStatus,
        }
    }

    closeErrorBox = () => {
        this.setState({
            showAlertBoxReact: false
        })
        console.log('Close alert Box Child');
        this.props.closeBox();
    }

    render() {
        let alertBoxReact = null;
        if (this.state.showAlertBoxReact) {
            alertBoxReact = <div className="alertify"><div className="dialog"><div>
                <p className="msg">{this.props.message}</p><nav><button className="ok" tabIndex={1} onClick={this.closeErrorBox}>{this.myIntl.formatMessage({ id: 'alertBoxText.Ok' })}</button></nav></div></div></div>

        }
        return (
            <>
                {alertBoxReact}
            </>
        )
    }
}
export default injectIntl(AlertBox);