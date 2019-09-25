import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import AddressCardList from '../CustomerAddress/AddressCardList';
import AddressLink from '../CustomerAddress/AddressAddLink';
import { FormattedMessage } from 'react-intl';
import ChangePass from './ChangePass';
import Modal from 'react-responsive-modal';
import AlertBox from '../Common/AlertBox/AlertBox';
import styles from './Modal.css';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button } from 'reactstrap';

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            openFirstModal: false,
            openSecondModal: false,

            redirectToAddressBook: false,
            alertBoxDetails: {
                status: false,
                message: '',
            }
        }
        this.customer_details = this.props.user_details.customer_details;
    }


    
    componentDidMount() {
        this.props.onGetMenuNav(this.props.globals);
        let obj = this.customer_details;
        if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
            this.props.onGetUserAddress({ customerid: this.customer_details.customer_id })
        }

        if (this.props.countryList.length == 0) {
            this.props.onGetCountryList();
        }

    }

    onOpenFirstModal = () => {
        this.setState({ openFirstModal: true });
    };

    onCloseFirstModal = () => {

        this.setState({ openFirstModal: false });
    };



    logOut = () => {
        this.props.onLogoutUser();
    }

    redirectToAddressBook = () => {
        //console.log('redirect to address book')
        this.setState({ redirectToAddressBook: true })
    }

    closeErrorBox = () => {
        this.setState({
            ...this.state,
            alertBoxDetails: {
                status: false,
                message: ''
            }
        })
        console.log('Close alert Box Parent');
    }


    render() {
        let addressBook = null;
        const store_locale = this.props.globals.store_locale;

        const { openFirstModal } = this.state;
        if (!(this.props.user_details.isUserLoggedIn)) {
            return <Redirect to={{
                pathname: `/${store_locale}/login`,
            }} />;
        }


        let alertBox = null;

        if (this.state.alertBoxDetails.status) {
            alertBox = <AlertBox
                message={this.state.alertBoxDetails.message}
                alertBoxStatus={this.state.alertBoxDetails.status}
                closeBox={this.closeErrorBox} />
        }



        const changePass = <ChangePass
            oncloseModal={this.onCloseFirstModal}
            customerId={this.state.customer_id} />;


        if (this.state.redirectToAddressBook) {
            return <Redirect to={{
                pathname: `/${store_locale}/profile-address`,
            }} />;
        }




        if (this.props.change_pass.status &&
            this.props.change_pass.message &&
            (this.props.change_pass.code === 200)) {
            //alert(this.props.addressResp.message);
            if (this.state.openFirstModal) {
                this.setState({
                    ...this.state,
                    alertBoxDetails: {
                        status: true,
                        message: this.props.change_pass.message,
                    }
                })
                this.props.onClearChangePass();
                this.onCloseFirstModal();

            }

        } else if (this.props.change_pass.status == false) {
            // alert(this.props.change_pass.message);
            // this.setState({ AlertBox: true });
            this.setState({
                ...this.state,
                alertBoxDetails: {
                    status: true,
                    message: this.props.change_pass.message,
                }
            })
            this.props.onClearChangePass();
            this.onCloseFirstModal();

        }

        if (this.props.isAddBookRec) {
            addressBook = this.props.addressBook.length > 0 ?
                <AddressCardList addressList={this.props.addressBook} /> :
                <AddressLink
                    addressResp={this.props.addressResp}
                    reload={() => this.props.onGetUserAddress({ customerid: this.customer_details.customer_id })} />;
        }


        return (

            <div>
                {alertBox}
                <div style={{ width: '525.9584px' }}>
                    <Modal modalId="ChangePassword" open={openFirstModal} onClose={this.onCloseFirstModal}
                        classNames={{
                            overlay: styles.customOverlay,
                            modal: styles.customModal,
                        }}>
                        <h3><FormattedMessage id="change.password" defaultMessage="Change Password" /></h3>
                        <div>{changePass}</div>
                    </Modal>

                </div>

                <div className="t-Body-contentInner">
                    <div className="padding-right-ar padding-breadcrumb" style={{ textAlign: 'start' }}>
                        <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                            <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                            {this.props.globals.language === 'en' ?
                                <span>&nbsp;\&nbsp;&nbsp;</span> :
                                <span>&nbsp;/&nbsp;&nbsp;</span>
                            }
                        </Link>
                        <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col col-12 apex-col-auto">
                                <div className="t-ButtonRegion t-Form--floatLeft containers t-ButtonRegion--noPadding t-ButtonRegion--noUI apex-tabs-region js-apex-region" id="R28512406002220865">
                                    <div className="t-ButtonRegion-wrap">
                                        <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                        <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                            <h2 className="t-ButtonRegion-title" id="R28512406002220865_heading">Region Display Selector</h2>
                                            <div className="apex-rds-container"><div className="apex-rds-slider"><div className="apex-rds-hover left" style={{ display: 'none' }}><a> <span className="a-Icon icon-left-chevron" /> </a></div><div className="apex-rds-hover right" style={{ display: 'none' }}><a> <span className="a-Icon icon-right-chevron" /> </a></div></div><ul id="28512406002220865_RDS" className="apex-rds a-Tabs" role="tablist" style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}><li className="apex-rds-item apex-rds-first apex-rds-before apex-rds-selected" role="presentation" id="R28333887549179555_tab">

                                                <Link
                                                    to={{
                                                        pathname: `/${store_locale}/profile`,
                                                        state: { ...this.state }
                                                    }}
                                                    role="tab" aria-controls="R28333887549179555" aria-selected="true" ><span className="FormattedMessage"><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span></Link></li><li className="apex-rds-item apex-rds-after" role="presentation" id="R28337577127179591_tab">

                                                    <Link to={{
                                                        pathname: `/${store_locale}/order-history`,
                                                        state: { ...this.state }
                                                    }}
                                                        role="tab" aria-controls="R28337577127179591" aria-selected="false" tabIndex={-1} >
                                                        <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></span></Link>

                                                </li><li className="apex-rds-item apex-rds-last apex-rds-after" role="presentation" id="USERWISHLIST_tab">

                                                    <Link to={{
                                                        pathname: `/${store_locale}/wish-list`,
                                                        state: { ...this.state }
                                                    }}
                                                        role="tab" aria-controls="USERWISHLIST" aria-selected="false" tabIndex={-1}>
                                                        <span className="FormattedMessage"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span></Link></li>
                                                <button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop divShowOnMobile floatRight" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.logoutName" defaultMessage="Logout" /></span></button>
                                            </ul></div>

                                            <div className="t-ButtonRegion-buttons" />
                                        </div>
                                        <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop divShowOnWeb" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.logoutName" defaultMessage="Logout" /></span></button></div></div>
                                    </div>
                                </div>
                            </div>
                        </div><div className="row">
                            <div className="col col-12 apex-col-auto">


                                <div className="t-ContentBlock containers t-ContentBlock--padded t-ContentBlock--h3 t-ContentBlock--shadowBG margin-top-lg a-Tabs-panel apex-rds-before apex-rds-element-selected" id="R28333887549179555" role="tabpanel" aria-labelledby="R28333887549179555_tab" aria-hidden="false" style={{}}>
                                    <div className="t-ContentBlock-header"><h1 className="t-ContentBlock-title"><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></h1></div>
                                    <div className="t-ContentBlock-body"><div className="container">
                                        <Row className="row">
                                            <Col xs="12" lg="5" md="12">
                                                <div className="t-Region t-Region--noUI t-Region--hiddenOverflow" id="R28334177511179557" style={{ borderRight: '1px solid #e1e1e1' }}>
                                                    <div className="t-Region-header">
                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                            <h2 className="t-Region-title" id="R28334177511179557_heading">
                                                                <FormattedMessage id="profile.Profile.Title" defaultMessage="Profile" />
                                                            </h2>
                                                        </div>
                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                    </div>
                                                    <div className="t-Region-bodyWrap">
                                                        <div className="t-Region-buttons t-Region-buttons--top">
                                                            <div className="t-Region-buttons-left" />
                                                            <div className="t-Region-buttons-right" />
                                                        </div>
                                                        <div className="t-Region-body">
                                                            <ul style={{ display: '-webkit-box' }}>
                                                                <li style={{ marginRight: '20px' }}>
                                                                    <div className="profile-email">
                                                                        <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal', paddingBottom: 0 }}><FormattedMessage id="profile.Email.Title" defaultMessage="Email" /></p>
                                                                        <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal', paddingBottom: '20px' }}>{this.customer_details.email}
                                                                            <br />
                                                                            {/*<a href="javascript:void();" id="email_edit">Edit <i class="fas fa-chevron-right"></i></a>*/}
                                                                            <a>
                                                                            </a>
                                                                        </p>
                                                                        <a>
                                                                        </a>
                                                                    </div>
                                                                </li>
                                                                <li>
                                                                    <div className="profile-password">
                                                                        <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal', paddingBottom: 0 }}><FormattedMessage id="profile.Password.Title" defaultMessage="Password" /></p>
                                                                        <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal', paddingBottom: '20px' }}>********<br />
                                                                            <span onClick={this.onOpenFirstModal} id="password_edit"><FormattedMessage id="profile.ChangePassword.Title" defaultMessage="Change Password" /><i className="fa fa-chevron-right" /></span>
                                                                        </p>
                                                                    </div>
                                                                </li>
                                                            </ul>
                                                            <div className="profile-password">
                                                                <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal', paddingBottom: 0 }}><FormattedMessage id="profile.PhoneNumber.Title" defaultMessage="PhoneNumber" /></p>
                                                                <p style={{ fontSize: '11px', lineHeight: '17px', letterSpacing: '.04em', textTransform: 'inherit', fontWeight: 'normal', paddingBottom: '20px' }}>{this.customer_details.carrier_code ? `${this.customer_details.carrier_code == '91' && '+'}${this.customer_details.carrier_code}${this.customer_details.phone_number}` : this.customer_details.phone_number}<br />
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                                            <div className="t-Region-buttons-left" />
                                                            <div className="t-Region-buttons-right" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col xs="12" lg="7" md="12">
                                                <div className="t-Region t-Region--noUI t-Region--hiddenOverflow" id="caddress" aria-live="polite">
                                                    <div className="t-Region-header">
                                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                            <h2 className="t-Region-title" id="caddress_heading"><FormattedMessage id="profile.AddressBook.Title" defaultMessage="Address Book" /></h2>
                                                        </div>
                                                        <div className="t-Region-headerItems t-Region-headerItems--buttons">
                                                            <button onClick={this.redirectToAddressBook} className="t-Button t-Button--link" type="button" id="P21_VIEW_ALL">
                                                                <span className="t-Button-label"><FormattedMessage id="profile.ViewAll.Title" defaultMessage="ViewAll" /></span></button><span className="js-maximizeButtonContainer" /></div>


                                                    </div>

                                                    {addressBook}

                                                </div>
                                            </Col>
                                        </Row>
                                    </div></div>
                                    <div className="t-ContentBlock-buttons" />
                                </div>
                            </div>


                        </div>



                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user_details: state.login,
        change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        menu: state.menu.menuNavData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser()),
        onGetUserAddress: (payload) => dispatch(actions.getUserAddress(payload)),
        onGetCountryList: () => dispatch(actions.getCountryList()),
        onClearChangePass: () => dispatch(actions.clearChangePass()),
        onGetMenuNav: (payload) => dispatch(actions.getMenuNav(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);