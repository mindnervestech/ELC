import React, { Component } from 'react';
import { Route, Link, Switch, Redirect, NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as actions from '../../../redux/actions/index';
import {checkoutEvent} from '../../utility/googleTagManager'
class GuestCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props,
            isRedirecAsGuestToDelivery: false
        }
    }

    redirectToDelivery = () => {
        this.setState({
            isRedirecAsGuestToDelivery: true
        })
        this.props.onStartGuestCheckout();
    }

    render() {
        if (this.state.isRedirecAsGuestToDelivery) {
            return <Redirect to={`/${this.props.globals.store_locale}/delivery-details`} />
        }
        return (<> <div className="t-Region t-Region--textContent t-Region--scrollBody" id="R34929254122907750">
            <div className="t-Region-header">
                <div className="t-Region-headerItems t-Region-headerItems--title">
                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                    <h2 className="t-Region-title" id="R34929254122907750_heading"><FormattedMessage id="CheckoutAsGuest.Msg" defaultMessage="Checkout As Guest" /></h2>
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
                                <button onClick={this.redirectToDelivery} className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" id="P6_CAGBTN">
                                    <span className="t-Button-label"><FormattedMessage id="CheckoutAsGuest.Msg" defaultMessage="Checkout As Guest" /></span>
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
        </>);
    }
}

const mapStateToProps = state => {
    return {
        globals: state.global,
        guestUser: state.guest_user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onStartGuestCheckout: () => dispatch(actions.startGuestCheckout()),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(GuestCheckout)));