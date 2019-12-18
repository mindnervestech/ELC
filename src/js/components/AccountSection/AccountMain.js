import React, { component, Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Row, Col } from 'reactstrap';
import './AccountMain.css'
import { FormattedMessage } from 'react-intl';
let store_locale = null;

class AccountMain extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }



    render() {
        store_locale = this.props.globals.store_locale
        return (
            <>
                <Row>
                    <Col lg={2}>&nbsp;</Col>
                    <Col lg={7}>
                        <div className="account-section-container">
                            <div>
                                <h1 className="myaccount-header"><FormattedMessage id="header.MyAccount" defaultMessage="My Account" /></h1>
                            </div>

                            <div className="accountmenu-list">
                                <ul>
                                    <Link to={`/${store_locale}/address-book`}> <li className="account-block"><FormattedMessage id="addressBook" defaultMessage="Personal Details" /></li></Link>
                                    <Link to={`/${store_locale}/update-password`}> <li className="account-block"><FormattedMessage id="change.password" defaultMessage="Change Password" /></li></Link>
                                    <Link to={`/${store_locale}/address-book`}>  <li className="account-block"><FormattedMessage id="addressBook" defaultMessage="Address Book" /></li></Link>
                                    <Link to={`/${store_locale}/order-history`}>  <li className="account-block"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order Summary" /></li></Link>
                                    <Link to={`/${store_locale}/birthday-club-account`}>    <li className="account-block"><FormattedMessage id="birthdayclub.header" defaultMessage="Birthday Club" /></li></Link>
                                    <Link to={`/${store_locale}/wish-list`} style={{ textDecoration: 'none' }}>
                                        <li className="account-block"><FormattedMessage id="header.Wishlist" defaultMessage="Wishlist" /></li></Link>


                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col lg={3}></Col>
                </Row>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        isUserLoggedIn: state.login.isUserLoggedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }

}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountMain));