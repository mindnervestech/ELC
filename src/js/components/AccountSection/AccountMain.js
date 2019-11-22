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
                                <h1 className="myaccount-header">My Account</h1>
                            </div>

                            <div className="accountmenu-list">
                                <ul>
                                    <li className="account-block">Personal Details</li>
                                    <li className="account-block">Wishlist</li>
                                    <li className="account-block">Address Book</li>
                                    <li className="account-block">Order Summary</li>
                                    <li className="account-block">Personal Details</li>
                                    <Link to={`/${store_locale}/wish-list`} style={{ textDecoration: 'none' }}>
                                        <li className="account-block">Wishlist</li></Link>

                                    <li className="account-block">Address Book</li>
                                    <li className="account-block">Order Summary</li>
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