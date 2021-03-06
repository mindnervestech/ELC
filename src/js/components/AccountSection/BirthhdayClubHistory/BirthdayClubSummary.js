import React, { Component } from 'react';
import '../../WishList/WishList.css';
import Table from 'react-bootstrap/Table'
// import OrderRow from './OrderRow';
import { Link, Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import Spinner from '../../Spinner/Spinner';
import { Helmet } from 'react-helmet';
let birthdayclubdata = [];
class BirthdayClubSummary extends Component {
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
        if (this.props.isUserLoggedIn === true) {
            const data = {
                customer_id: this.props.user_details.customer_id
            }
            this.props.onGetBirthdayClubInfo(data);
        }
    }

    logOut = () => {
        this.props.onLogoutUser();
    }

    componentWillReceiveProps(nextProps) {

        birthdayclubdata = nextProps.birthday_club_data.birthdayclub_page_data;

    }

    render() {


        const language = localStorage.getItem('templang');
        const store_locale = this.props.globals.store_locale;
        // let title = "Your account | ELC UAE Online store";
        // let description = "Shop online for baby toys, dolls houses, wooden toys and more at ELC. Choose from big brands including LeapFrog, VTech, Smart Trike and more.";
        // let keywords = "ELC, Early Learning Center, Early Learning Centre, Toys, Baby Toys, Wooden Toys, Educational Toys";
        // if (language == 'ar') {
        // 	title = "حسابك |  متجر مركز التعليم المبكر على الإنترنت في السعودية";
        // 	description = "تسوّق ألعاب الرضّع ومنازل الدمى والألعاب الخشبية وغيرها الكثير على الإنترنت من مركز التعليم المبكر. اختر من العلامات التجارية الكبيرة بمن فيها ليب فروع وفي تيك وسمارت تريك وغيرها.";
        // 	keywords = "إي إل سي، مركز التعليم المبكر، مركز التعليم المبكر، ألعاب، ألعاب رضّع، ألعاب خشبية، ألعاب تعليمية"; 
        // }

        // let meta_tag  = <><Helmet>
        // 	<meta name="tital" content={title} />
        // 	<meta name="keywords" content={keywords} />
        // 	<meta name="description" content={description} />
        // </Helmet></>;

        if (!(this.props.isUserLoggedIn)) {
            return <Redirect to={{
                pathname: `/${store_locale}/sign-in-register`,
            }} />;
        }

        const orderList = this.props.orderHistory.map((c, index) => {
            // return <OrderRow
            //     value={c}
            //     store_locale={this.props.globals.store_locale}
            //     key={index}
            //     clicked={() => {
            //         //console.log(index)
            //     }} />
        });


        return (<Spinner><div className="t-Body-contentInner">

            <div className="padding-right-ar padding-breadcrumb borderBottomAddNew" style={{ borderBottom: '1px black' }}>
                <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
                    <span className="titleHover" style={{ fontSize: 15 }}><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></span>
                    {this.props.globals.language === 'en' ?
                        <span>&nbsp;\&nbsp;&nbsp;</span> :
                        <span>&nbsp;/&nbsp;&nbsp;</span>
                    }
                </Link>
                <span style={{ fontSize: 15, fontWeight: 'bold' }}><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span>
                <h1 className="address-header"><FormattedMessage id="birthdayclub.header" defaultMessage="Birthday Club" /></h1>
                <hr />
            </div>
            <div className="container">
                {/* {meta_tag} */}
                <div className="row">
                    <div className="col col-12 apex-col-auto">
                        <div className="t-ButtonRegion t-Form--floatLeft containers t-ButtonRegion--noPadding t-ButtonRegion--noUI apex-tabs-region js-apex-region" id="R28512406002220865">
                            <div className="t-ButtonRegion-wrap">
                                <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                    <h2 className="t-ButtonRegion-title" id="R28512406002220865_heading">Region Display Selector</h2>
                                    {/* <div className="apex-rds-container"><div className="apex-rds-slider"><div className="apex-rds-hover left" style={{ display: 'none' }}><a> <span className="a-Icon icon-left-chevron" /> </a></div><div className="apex-rds-hover right" style={{ display: 'none' }}><a> <span className="a-Icon icon-right-chevron" /> </a></div></div><ul id="28512406002220865_RDS" className="apex-rds a-Tabs" role="tablist" style={{ whiteSpace: 'nowrap', overflowX: 'hidden' }}>

                                        <li className="apex-rds-item apex-rds-first apex-rds-before" role="presentation" id="R28333887549179555_tab">

                                            <Link to={{
                                                pathname: `/${store_locale}/profile`
                                            }} role="tab" aria-controls="R28333887549179555" aria-selected="false" tabIndex={-1}><span className="FormattedMessage"><FormattedMessage id="profile.Account.Title" defaultMessage="Account" /></span></Link></li>

                                        <li className="" role="presentation" id="R28337577127179591_tab">

                                            <Link to={{
                                                pathname: `/${store_locale}/order-history`
                                            }} role="tab" aria-controls="R28337577127179591" aria-selected="true">
                                                <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></span></Link>

                                        </li>
                                        <li className="" role="presentation" id="USERWISHLIST_tab">

                                            <Link to={{
                                                pathname: `/${store_locale}/wish-list`
                                            }} role="tab" aria-controls="USERWISHLIST" aria-selected="false" tabIndex={-1}>
                                                <span className="FormattedMessage"><FormattedMessage id="profile.Wishlist.Title" defaultMessage="Wishlist" /></span>
                                            </Link></li>
                                        <li className="apex-rds-item apex-rds-last apex-rds-after" role="presentation" id="USERWISHLIST_tab">
                                            <Link to={{
                                                pathname: `/${store_locale}/birthday-club-account`,
                                                state: { ...this.state }
                                            }}
                                                role="tab" aria-controls="USERWISHLIST" aria-selected="true" tabIndex={-1}>
                                                <span className="FormattedMessage"><FormattedMessage id="profile.bcluAccountTab.Title" defaultMessage="Birthday Club" /></span></Link>
                                        </li>
                                        <button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop divShowOnMobile floatRight" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.SignOut" defaultMessage="Sign Out" /></span></button>

                                    </ul></div> */}
                                    <div className="t-ButtonRegion-buttons" />
                                </div>
                                <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop divShowOnWeb" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.SignOut" defaultMessage="Sign Out" /></span></button></div></div>
                                {/* <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons"><button onClick={this.logOut} className="t-Button t-Button--hot t-Button--gapTop" type="button" id="B28512592134220867"><span className="t-Button-label"><FormattedMessage id="header.logoutName" defaultMessage="Logout" /></span></button></div></div> */}
                            </div>
                        </div>
                    </div>
                </div><div className="row">

                </div><div className="row">
                    <div className="col col-12 apex-col-auto">
                        <div className="t-ContentBlock containers t-ContentBlock--h3 margin-top-lg a-Tabs-panel apex-rds-element-selected" id="R28337577127179591" role="tabpanel" aria-labelledby="R28337577127179591_tab" aria-live="polite" aria-hidden="false">
                            {/* {this.props.orderHistory > 0 ?
                                <div className="t-ContentBlock-header">
                                    <h1 className="t-ContentBlock-title">
                                        <span className="FormattedMessage"><FormattedMessage id="profile.OrderHistory.Title" defaultMessage="Order History" /></span>
                                    </h1></div>
                                : ""} */}
                            <div className="t-ContentBlock-body">

                                <div id="report_28337577127179591_catch"><div className="t-Report t-Report--stretch t-Report--staticRowColors t-Report--rowHighlightOff t-Report--horizontalBorders" id="report_R28337577127179591" data-region-id="R28337577127179591">
                                    <div className="t-Report-wrap">

                                        <div className="t-Report-tableWrap" style={{ marginBottom: 20 }}>
                                            {birthdayclubdata ?
                                                // <table className="t-Report-report" summary="Order History">
                                                //     <thead>
                                                //         <tr className="textAlign">
                                                //             <th className="t-Report-colHead" id="ORDERED_ON"><FormattedMessage id="birthdayclub.childname" defaultMessage="Child Name" /></th>
                                                //             <th className="t-Report-colHead" align="left" id="CODE_DESC"><FormattedMessage id="birthdayclub.childname" defaultMessage="Date of Birth" /></th>
                                                //             <th className="t-Report-colHead" align="left" id="ORDER_ID"><FormattedMessage id="birthdayclub.childname" defaultMessage="Gender" /></th>

                                                //         </tr></thead>
                                                //     <tbody>

                                                //         {birthdayclubdata && Object.keys(birthdayclubdata).map((item, index) => {
                                                //             return (
                                                //                 <tr style={{ textAlign: 'center' }} key={index}>
                                                //                     <td>{birthdayclubdata[item].name}</td>
                                                //                     <td>{birthdayclubdata[item].dob}</td>
                                                //                     <td>{birthdayclubdata[item].gender}</td>
                                                //                 </tr>
                                                //             );

                                                //         })}

                                                //     </tbody>
                                                // </table> :
                                                <Table striped bordered hover>
                                                    <thead>
                                                        <tr style={{ textAlign: 'center' }}>
                                                            <th id="ORDERED_ON"><FormattedMessage id="addchild.ChildName" defaultMessage="Child Name" /></th>
                                                            <th><FormattedMessage id="addnewchild.dateofbirth" defaultMessage="Date of Birth" /></th>
                                                            <th><FormattedMessage id="addnewchild.Gender" defaultMessage="Gender" /></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {birthdayclubdata && Object.keys(birthdayclubdata).map((item, index) => {
                                                            return (
                                                                <tr style={{ textAlign: 'center' }} key={index}>
                                                                    <td>{birthdayclubdata[item].name}</td>
                                                                    <td>{birthdayclubdata[item].dob}</td>
                                                                    <td>{birthdayclubdata[item].gender}</td>
                                                                </tr>
                                                            );

                                                        })}
                                                    </tbody>
                                                </Table> :
                                                <div style={{ marginBottom: 50 }}><span style={{ fontSize: "24px" }}><FormattedMessage id="PageTitle.birthdayclubhistory.Empty" defaultMessage="Birthday club data is not available for this account" /></span></div>
                                            }
                                        </div>
                                        <div className="t-Report-links" />
                                        <table className="t-Report-pagination t-Report-pagination--bottom" role="presentation" />
                                    </div>
                                </div>
                                </div>
                            </div>
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
        birthday_club_data: state.birthdayclubData
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogoutUser: () => dispatch(actions.logoutUser()),
        onGetBirthdayClubInfo: (payload) => dispatch(actions.getBirthDayClubInfo(payload)),
        onGetOrderHistory: (payload) => dispatch(actions.getOrderHistory(payload)),
        onGetOrderDetails: (payload) => dispatch(actions.viewOrderDetails(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(BirthdayClubSummary);