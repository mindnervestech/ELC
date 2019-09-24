import React, { Component } from 'react';
import './ProfileAddress.css';
import Modal from 'react-responsive-modal';
import AddressForm from './AddressForm';
import AddressCard from './AddressCard';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import AlertBox from '../Common/AlertBox/AlertBox';
import ConfirmBox from '../Common/AlertBox/ConfirmBox';
import * as utility from '../utility/utility';
class ProfileAddress extends Component {

    constructor(props) {
        super(props);
        this.state = {
            openFirstModal: false,
            addressForEdit: {},
            modalType: 'Edit',
            alertBoxDetails: {
                status: false,
                message: '',
            },
            confirmBoxDetails: {
                addressKey: 'NA',
                status: false,
                message: '',
                clickedon: 'NA'
            },
        }
        this.customer_details = this.props.user_details.customer_details;
    }

    componentDidMount() {
        let obj = this.customer_details;
        if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
            this.props.onGetUserAddress({ customerid: this.customer_details.customer_id })
        }

        if (this.props.countryList.length == 0) {
            this.props.onGetCountryList();
        }

    }

    componentDidUpdate(prevProps) {
        if (!(utility.isEquivalent(prevProps.addressResp, this.props.addressResp))) {


            if (this.props.addressResp.status &&
                this.props.addressResp.message &&
                (this.props.addressResp.code === 200)) {
                //alert(this.props.addressResp.message);
                if (this.state.openFirstModal) {
                    this.onCloseFirstModal();
                }
                this.props.onGetUserAddress({ customerid: this.props.user_details.customer_details.customer_id });

            } else if (this.props.addressResp.status == false) {
                //alert(this.props.addressResp.message);

                this.setState({
                    ...this.state,
                    alertBoxDetails: {
                        status: true,
                        message: this.props.addressResp.message,
                    }
                })

            }
        }
    }


    deleteAddress = (addressKey) => {

        this.setState({
            ...this.state,
            confirmBoxDetails: {
                addressKey: addressKey,
                status: true,
                message: 'Are you sure you want to delete this item?',
            }
        })


    }

    openAddAddressModal = () => {

        this.setState({
            openFirstModal: true,
            modalType: 'Add'
        });
    }


    onOpenFirstModal = (addressKey) => {
        console.log('profile :', addressKey);
        this.setState({
            openFirstModal: true,
            addressForEdit: this.props.addressBook[addressKey],
            modalType: 'Edit'
        });
    }

    onCloseFirstModal = () => {
        this.setState({ openFirstModal: false });
    }

    closeErrorBox = () => {
        this.setState({
            ...this.state,
            alertBoxDetails: {
                status: false,
                message: ''
            }
        }, () => {
            this.onCloseFirstModal();
        })
        console.log('Close alert Box Parent');
    }

    buttonClick = (val) => {
        if (this.state.confirmBoxDetails.addressKey !== 'NA') {
            this.setState({
                ...this.state,
                confirmBoxDetails: {
                    status: false,
                    message: ''
                }
            })

            if (val == 'ok') {
                const addressObj = this.props.addressBook[this.state.confirmBoxDetails.addressKey];
                let addressId = addressObj.Id;
                this.props.onDeleteUserAddress({ addressId: addressId });
            }
        }
    }

    logOut = () => {
        this.props.onLogoutUser();
    }


    render() {

        let alertBox = null;

        if (this.state.alertBoxDetails.status) {
            alertBox = <AlertBox
                message={this.state.alertBoxDetails.message}
                alertBoxStatus={this.state.alertBoxDetails.status}
                closeBox={this.closeErrorBox} />
        }

        let confirmBox = null;

        if (this.state.confirmBoxDetails.status) {
            confirmBox = <ConfirmBox
                message={this.state.confirmBoxDetails.message}
                alertBoxStatus={this.state.confirmBoxDetails.status}
                buttonClick={(val) => this.buttonClick(val)} />
        }

        const { openFirstModal } = this.state;
        const store_locale = this.props.globals.store_locale;
        if (!(this.props.user_details.isUserLoggedIn)) {
            return <Redirect to={{
              pathname: `/${store_locale}/login`,
            }} />;
        }


        const add = <AddressForm closeModal={this.onCloseFirstModal} Actype={this.state.modalType} addressForEdit={this.state.addressForEdit} />
        let addressCard = null;
        const addressList = this.props.addressBook;

        if (addressList.length > 0) {
            addressCard = addressList.map((address, index) => {
                return (
                    <AddressCard
                        address={address}
                        addressKey={index}
                        openFirstModal={(id) => this.onOpenFirstModal(id)}
                        deleteAddress={(id) => this.deleteAddress(id)} />
                );
            })
        }



        return (<>
            {alertBox}
            {confirmBox}
            <Modal modalId="AddAddress"
                open={openFirstModal}
                onClose={this.onCloseFirstModal}
                center
                style={{ width: '425.9584px' }}>

                <h3><FormattedMessage id="Profile.AddAddress" defaultMessage="Add Address" /></h3>
                <div>{add}</div>

            </Modal>

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

                                        <div className="apex-rds-container"><div className="apex-rds-slider"><div className="apex-rds-hover left" style={{ display: 'none' }}><a> <span className="a-Icon icon-left-chevron" /> </a></div><div className="apex-rds-hover right" style={{ display: 'none' }}><a> <span className="a-Icon icon-right-chevron" /> </a></div></div><ul id="28512406002220865_RDS" className="apex-rds a-Tabs" role="tablist" style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}>

                                            <li className="apex-rds-item apex-rds-first apex-rds-before" role="presentation" id="R28333887549179555_tab">

                                                <Link
                                                    to={{
                                                        pathname: `/${store_locale}/profile`,
                                                        state: { ...this.state }
                                                    }}
                                                    role="tab" aria-controls="R28333887549179555" aria-selected="false" >
                                                    <span className="FormattedMessage"><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span></Link></li>

                                            <li className="apex-rds-item apex-rds-after" role="presentation" id="R28337577127179591_tab">

                                                <Link to={{
                                                    pathname: `/${store_locale}/order-history`,
                                                    state: { ...this.state }
                                                }}
                                                    role="tab" aria-controls="R28337577127179591" aria-selected="false" tabIndex={-1} >
                                                    <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="OrderHistory" /></span></Link>

                                            </li>

                                            <li className="apex-rds-item apex-rds-last apex-rds-after" role="presentation" id="USERWISHLIST_tab">

                                                <Link to={{
                                                    pathname: `/${store_locale}/wish-list`,
                                                    state: { ...this.state }
                                                }}
                                                    role="tab" aria-controls="USERWISHLIST" aria-selected="false" tabIndex={-1}>
                                                    <span className="FormattedMessage"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span></Link></li>

                                        </ul></div>

                                        <div className="t-ButtonRegion-buttons" />
                                    </div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.logoutName" defaultMessage="Logout" /></span></button></div></div>
                                </div>
                            </div>
                        </div>
                    </div><div className="row">
                        <div className="AddressDetail col col-12 apex-col-auto">
                            <div className="t-Region containers  t-Region--scrollBody" id="caddress" aria-live="polite">
                                <div className="t-Region-header">
                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                        <h2 className="t-Region-title" id="caddress_heading"><FormattedMessage id="Addresses.Text" defaultMessage="Addresses" /></h2>
                                    </div>
                                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><button onClick={this.openAddAddressModal} className="t-Button t-Button--hot " type="button" id="B28610426425643368"><span className="t-Button-label"><FormattedMessage id="AddNewAddress.Text" defaultMessage="Add New Address" /></span></button><span className="js-maximizeButtonContainer" /></div>
                                </div>

                                <div className="t-Region-bodyWrap">
                                    <div className="t-Region-buttons t-Region-buttons--top">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                    </div>
                                    <div className="t-Region-body">
                                        <div id="report_28515432958220895_catch">

                                            <ul className="t-Cards t-Cards--animColorFill t-Cards--3cols t-Cards--basic" id="caddress_cards" data-region-id="caddress">

                                                {addressCard}


                                            </ul>
                                            <table className="t-Report-pagination" role="presentation" /></div>
                                    </div>


                                    <div className="t-Region-buttons t-Region-buttons--bottom">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>);
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

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser()),
        onGetUserAddress: (payload) => dispatch(actions.getUserAddress(payload)),
        onGetCountryList: () => dispatch(actions.getCountryList()),
        onDeleteUserAddress: (payload) => dispatch(actions.deleteAddress(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileAddress);