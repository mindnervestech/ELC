import React, { Component } from 'react';
import './MyProfile.css';
import * as utility from '../../utility/utility';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import AlertBox from '../../Common/AlertBox/AlertBox';
import { Link, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';
import Spinner from '../../Spinner/Spinner.js';
import { Row, Col } from "react-bootstrap";
const wait = require('../../../../assets/images/wait.gif');

class MyProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                password: '',
                confirmPassword: '',

            },
            errors: {},
            goToMyProfile: false,
            showPasswordAlert: false,
            showPleaseWait: false

        }
    }
    componentDidMount(){
        this.props.onGetMenuNav(this.props.globals);
    }

    render() {

        let store_locale = this.props.globals.store_locale;
        let language = this.props.globals.language;
        return (
            <div>

                <div className="t-Body-contentInner" style={{ textAlign: 'start' }}>
                    <div className="padding-right-ar padding-breadcrumb" style={{ textAlign: 'start' }}>
                        <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                            <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                            {this.props.globals.language === 'en' ?
                                <span>&nbsp;\&nbsp;&nbsp;</span> :
                                <span>&nbsp;/&nbsp;&nbsp;</span>
                            }
                        </Link>
                        <Link to={`/${store_locale}/myaccount`} style={{ textDecoration: 'none' }}>
                            <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span>
                            {language === 'en' ?
                                <span>&nbsp;\&nbsp;&nbsp;</span> :
                                <span>&nbsp;/&nbsp;&nbsp;</span>
                            }
                        </Link>
                        <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="personaldetails.text" defaultMessage="Personal Details" /></span>
                    </div>
                    <Row>
                        <Col xs={12} lg={12} md={12}>
                            <div className="update-password-conatiner">
                                <h1 className="update-password-header"><FormattedMessage id="personaldetails.text" defaultMessage="Personal Details" /></h1>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={3} xs={1} md={2}>&nbsp;</Col>
                        <Col xs={10} lg={6} md={8} style={{ marginBottom: 40 }}>
                            <div className="password-section-form">
                                <div>
                                    {this.props.user_details !== undefined ?
                                        <div>
                                            <span style={{ fontSize: 14, color: 'black', fontWeight: 800 }}><FormattedMessage id="Xmas.FirtsName" defaultMessage="First Name" /></span>:
                                <p>{this.props.user_details.firstname}</p><br />
                                            <span style={{ fontSize: 14, color: 'black', fontWeight: 800 }}><FormattedMessage id="Xmas.LastName" defaultMessage="Last Name" /></span>:
                                <p>{this.props.user_details.lastname}</p><br />
                                            <span style={{ fontSize: 14, color: 'black', fontWeight: 800 }}><FormattedMessage id="ContactUs.Email" defaultMessage="Email Address" /></span>:
                                <p>{this.props.user_details.email}</p><br />
                                            <span style={{ fontSize: 14, color: 'black', fontWeight: 800 }}><FormattedMessage id="addchild.PhoneNumber" defaultMessage="Mobile Number" /></span>:
                                <p> {this.props.user_details.carrier_code} {this.props.user_details.phone_number}</p><br />
                                        </div> : <div />}
                                </div>

                            </div>

                        </Col>
                        <Col xs={1} lg={3} md={2}>&nbsp;</Col>

                    </Row>

                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {

        globals: state.global,
        user_details: state.login.customer_details,
        change_pass: state.login.changePasswordDetails,
    };
}
const mapDispatchToProps = dispatch => {
    return {

        onChangePassword: (payload) => dispatch(actions.changePassword(payload)),
        onClearChangePass: () => dispatch(actions.clearChangePass()),
        onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);


