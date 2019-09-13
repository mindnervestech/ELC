import React, { Component } from 'react';
import '../WishList/WishList.css';

import OrderRow from './OrderRow';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Spinner from '../Spinner/Spinner';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {

            data: '',
        }


    }

    componentDidMount() {
        if (!this.props.is_order_history_rec) {
            this.props.onGetOrderHistory({ Customerid: this.props.user_details.customer_id })
        }
    }

    logOut = () => {
        this.props.onLogoutUser();
    }

    render() {

        const store_locale = this.props.globals.store_locale;

        if (!(this.props.isUserLoggedIn)) {
            return <Redirect to={{
                pathname: `/${store_locale}/login`,
            }} />;
        }

        const orderList = this.props.orderHistory.map((c, index) => {
            return <OrderRow
                value={c}
                store_locale={this.props.globals.store_locale}
                key={index}
                clicked={() => {
                    //console.log(index)
                }} />
        });


        return (<Spinner><div className="t-Body-contentInner">
            <div className="container">
                <div className="row">
                    <div className="col col-12 apex-col-auto">
                        <div className="t-ButtonRegion t-Form--floatLeft containers t-ButtonRegion--noPadding t-ButtonRegion--noUI apex-tabs-region js-apex-region" id="R28512406002220865">
                            <div className="t-ButtonRegion-wrap">
                                <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                    <h2 className="t-ButtonRegion-title" id="R28512406002220865_heading">Region Display Selector</h2>
                                    <div className="apex-rds-container"><div className="apex-rds-slider"><div className="apex-rds-hover left" style={{ display: 'none' }}><a> <span className="a-Icon icon-left-chevron" /> </a></div><div className="apex-rds-hover right" style={{ display: 'none' }}><a> <span className="a-Icon icon-right-chevron" /> </a></div></div><ul id="28512406002220865_RDS" className="apex-rds a-Tabs" role="tablist" style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}>

                                        <li className="apex-rds-item apex-rds-first apex-rds-before" role="presentation" id="R28333887549179555_tab">

                                            <Link to={{
                                                pathname: `/${store_locale}/profile`
                                            }} role="tab" aria-controls="R28333887549179555" aria-selected="false" tabIndex={-1}><span className="FormattedMessage"><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span></Link></li>

                                        <li className="apex-rds-item apex-rds-selected" role="presentation" id="R28337577127179591_tab">

                                            <Link to={{
                                                pathname: `/${store_locale}/order-history`
                                            }} role="tab" aria-controls="R28337577127179591" aria-selected="true">
                                                <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></span></Link>

                                        </li><li className="apex-rds-item apex-rds-last apex-rds-after" role="presentation" id="USERWISHLIST_tab">

                                            <Link to={{
                                                pathname: `/${store_locale}/wish-list`
                                            }} role="tab" aria-controls="USERWISHLIST" aria-selected="false" tabIndex={-1}>
                                                <span className="FormattedMessage"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span>
                                            </Link></li>

                                    </ul></div>
                                    <div className="t-ButtonRegion-buttons" />
                                </div>
                                <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.logoutName" defaultMessage="Logout" /></span></button></div></div>
                            </div>
                        </div>
                    </div>
                </div><div className="row">

                </div><div className="row">
                    <div className="col col-12 apex-col-auto">
                        <div className="t-ContentBlock containers t-ContentBlock--h3 margin-top-lg a-Tabs-panel apex-rds-element-selected" id="R28337577127179591" role="tabpanel" aria-labelledby="R28337577127179591_tab" aria-live="polite" aria-hidden="false">
                            <div className="t-ContentBlock-header">
                                <h1 className="t-ContentBlock-title">
                                    <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></span>
                                </h1></div>
                            <div className="t-ContentBlock-body">

                                <div id="report_28337577127179591_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_R28337577127179591" data-region-id="R28337577127179591">
                                    <div className="t-Report-wrap">
                                        <table className="t-Report-pagination" role="presentation"><tbody><tr><td /></tr></tbody></table>
                                        <div className="t-Report-tableWrap">

                                            { this.props.orderHistory > 0 ? 
                                            <table className="t-Report-report" summary="Order History">
                                                <thead>
                                                    <tr>
                                                        <th className="t-Report-colHead" align="left" id="ORDERED_ON"><FormattedMessage id="profile.OrderDate.Title" defaultMessage="OrderDate" /></th>
                                                        <th className="t-Report-colHead" align="left" id="ORDER_ID"><FormattedMessage id="profile.OrderNumber.Title" defaultMessage="Order Number" /></th>
                                                        <th className="t-Report-colHead" align="left" id="CODE_DESC"><FormattedMessage id="profile.ShippingType.Title" defaultMessage="Shipping Type" /></th>
                                                        <th className="t-Report-colHead" align="left" id="PAYMENT_METHOD"><FormattedMessage id="profile.PaymentType.Title" defaultMessage="Payment Type" /></th>
                                                        <th className="t-Report-colHead" align="right" id="ORDER_TOTAL"><FormattedMessage id="profile.OrderTotal.Title" defaultMessage="Order Total" /></th>
                                                    </tr></thead>
                                                <tbody>
                                                    {orderList}
                                                </tbody>
                                            </table>:
           <div style={{marginBottom:20}}><span style={{fontSize:"24px"}}><FormattedMessage id="PageTitle.orderhistory.Empty" defaultMessage="You havn't ordered item yet"/></span></div>
                                            }
                                        </div>
                                        <div className="t-Report-links" />
                                        <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                    </div>
                                </div></div></div>
                            <div className="t-ContentBlock-buttons" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
        </Spinner>
        );
    }
}

const mapStateToProps = state => {
    return {
        isUserLoggedIn: state.login.isUserLoggedIn,
        user_details: state.login.customer_details,
        orderHistory: state.orders.orders_history,
        is_order_history_rec: state.orders.is_order_history_rec,
        globals: state.global,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser()),
        onGetOrderHistory: (payload) => dispatch(actions.getOrderHistory(payload)),
        onGetOrderDetails: (payload) => dispatch(actions.viewOrderDetails(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Order);