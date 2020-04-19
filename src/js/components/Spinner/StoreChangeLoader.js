import React, { Component } from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import Spinner from './Spinner2';

class StoreChangeLoader extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
        this.state = {
            showAlertBoxReact: this.props.showStoreChangeLoader,
        }
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.showStoreChangeLoader !== prevProps.showStoreChangeLoader) {
            this.setState({
                showAlertBoxReact: this.props.showStoreChangeLoader,
            })
        }
    }

    render() {
        let alertBoxReact = null;
        if (this.state.showAlertBoxReact) {
            alertBoxReact = <div className="global alertify"><div className="dialog"><div>
                <Spinner /></div></div></div>

        }
        return (
            <>
                {alertBoxReact}
                {this.props.children}
            </>
        )
    }
}
export default injectIntl(StoreChangeLoader);