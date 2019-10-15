import React, { Component } from 'react';
import '../CheckOut.css';
import './Payment.css';
import { Redirect } from 'react-router-dom'
import CashOnDelivery from './CashOnDelivery';
import DeliveryProductList from '../DeliveryDetails/DeliveryDetailsProductList';
import PayByCard from './PayByCard';
import Spinner from '../../Spinner/Spinner'
import AlertBox from '../../Common/AlertBox/AlertBox';

import * as utility from '../../utility/utility';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
// import { initializeF, trackF } from '../../utility/facebookPixel';
import { live } from '../../../api/globals';
import { Row, Col } from 'reactstrap';

let Ptype = "CC";
class Payment extends Component {
    constructor(props) {
        super(props)
        this.myIntl = props.intl
        this.state = {

            isActive: 'CC',
            value: '',
            payment_code: 'payfort_fort_cc',
            redirectToConfirm: this.props.cart_details.redirectToOrderConfirmation,
            alertBoxDetails: {
                status: false,
                message: '',
            }
        }
        Ptype = "CC";
    }

    goToDeliveryDetails = () => {
        this.props.onRedirectToDelivery();
        this.props.history.push(`/${this.props.global.store_locale}/delivery-details`);
    }

    componentDidMount() {
        if (this.props.cart_details.is_shipping_details_rec) {
            let obj = this.props.user_details.customer_details;
            if (!(utility.emptyObj(obj))) {
                let objTwo = this.props.cart_details.payment_details;
                if (utility.emptyObj(objTwo)) {
                    if (this.props.cart_details.is_payment_details_rec === false) {
                        this.props.onGetPaymentDetails({
                            quote_id: this.props.cart_details.quote_id,
                            store_id: this.props.global.currentStore
                        });
                    }
                }
            } else {
                if (this.props.guest_checkout.startGuestCheckout) {
                    let objTwo = this.props.cart_details.payment_details;
                    if (utility.emptyObj(objTwo)) {
                        if (this.props.cart_details.is_payment_details_rec === false) {
                            this.props.onGetPaymentDetails({
                                quote_id: this.props.cart_details.quote_id,
                                store_id: this.props.global.currentStore
                            });
                        }
                    }
                } else {
                    this.props.history.push(`/${this.props.global.store_locale}/sign-in-register`);
                }


            }
            // if (live) {
            //     initializeF()
            //     trackF('AddPaymentInfo');
            // }
        } else {
            this.props.history.push(`/${this.props.global.store_locale}/cart`);
        }
        let cardPay = document.getElementById("CC");
        let cod = document.getElementById("DA");
        if(cod && cardPay){
            if(this.props.cart_details.payment_details.payment_code === 'cashondelivery'){
                Ptype = 'COD';
                cod.classList.add('selected');
                cardPay.classList.remove('selected')
                this.setState({
                    isActive: 'COD',
                    payment_code: 'cashondelivery',
                })
            }else if(this.props.cart_details.payment_details.payment_code === 'payfort_fort_cc'){
                Ptype = 'CC';
                cardPay.classList.add('selected');
                cod.classList.remove('selected')
                this.setState({
                    isActive: 'CC',
                    payment_code: 'payfort_fort_cc',
                })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // const selected_country = this.props.globals.country;
        if (this.props.global.country !== prevProps.global.country) {
            if (this.props.global.country === 'International') {
                let cc_element = document.getElementById("CC");
                let cod_element = document.getElementById("DA");
                if (cod_element.classList.contains('selected')) {
                    Ptype = 'CC';
                    this.setState({
                        isActive: 'CC',
                        payment_code: 'payfort_fort_cc',
                    })
                    cod_element.classList.remove('selected');
                    cc_element.classList.add('selected');
                }
            }
        }
    }

    handleClick = (paytype) => {
        let cardPay = document.getElementById("CC");
        let cod = document.getElementById("DA");

        const shipping_type = this.props.cart_details.shipping_details.shipping_code;
        const selected_country = this.props.global.country;

        if ((paytype === 'COD') && (shipping_type === 'freeshipping_freeshipping')) {
            this.setState({
                ...this.state,
                alertBoxDetails: {
                    status: true,
                    message: this.myIntl.formatMessage({ id: 'Checkout.CodNotForCC' }),
                }
            })
            //alert(this.myIntl.formatMessage({ id: 'Checkout.CodNotForCC' }));
            return;
        } else if ((paytype === 'COD') && (selected_country === 'International')) {
            this.setState({
                ...this.state,
                alertBoxDetails: {
                    status: true,
                    message: this.myIntl.formatMessage({ id: 'Checkout.CodNotForOtherThanGCC' }),
                }
            })
            //alert(this.myIntl.formatMessage({ id: 'Checkout.CodNotForOtherThanGCC' }));
            return;
        } else {
            if (paytype === 'CC') {
                Ptype = paytype;
                cardPay.classList.add('selected');
                cod.classList.remove('selected')
                this.setState({
                    isActive: 'CC',
                    payment_code: 'payfort_fort_cc',
                })
            } else if (paytype === 'COD') {
                Ptype = paytype;
                cod.classList.add('selected');
                cardPay.classList.remove('selected')
                this.setState({
                    isActive: 'COD',
                    payment_code: 'cashondelivery',
                })
            }
        }
    }

    handleChange = (event) => {
        this.setState({ value: event.target.value });
    }

    redirectToConfirm = () => {
        let obj = this.props.cart_details.payment_details;
        if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {

            this.props.onSetPaymentDetails({
                quote_id: this.props.cart_details.quote_id,
                store_id: this.props.global.currentStore,
                payment_code: this.state.payment_code
            });
        }
    }

    redirectToShopping = () => {
        this.props.history.push(`/${this.props.global.store_locale}/`);
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

    gotoProductScreen = (item) => {
        const data = {
            customerid: typeof this.props.user_details.customer_id !== 'undefined' ? parseInt(this.props.user_details.customer_id) : " ",
            store: this.props.global.currentStore,
            url_key: item.url_key,
        };

        this.props.onGetProductDetails(data);
        this.props.getSizeChart({
            store_id: this.props.global.currentStore,
        });
        this.props.history.push(`/${this.props.global.store_locale}/products-details/${item.url_key}`);
    }


    divOnFocus = (e) => {
        e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--text-field is-active';
    }

    divOnBlure = (e) => {
        e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--text-field';
    }



    render() {
        const shipping_type = this.props.cart_details.shipping_details.shipping_code;
        const selected_country = this.props.global.country;
        let obj = this.props.cart_details.payment_details;
        let payment_type = null;
        if (!(utility.emptyObj(obj))) {
            if (obj.redirectToOrderConfirmation && (obj.payment_code !== null)) {
                return <Redirect to={`/${this.props.global.store_locale}/order-confirm?payment_type=${Ptype}`} />
            }
            if ((Ptype === 'COD') && (shipping_type !== 'freeshipping_freeshipping') && (selected_country !== 'International')) {
                payment_type = <CashOnDelivery
                    cashondelivery={obj.cashondelivery}
                    continueShopping={this.redirectToShopping}
                    redirectToCheckout={this.redirectToConfirm} />
            } else if ((Ptype === 'CC') || (selected_country !== 'International')) {
                payment_type = <PayByCard
                    payfort_fort_cc={obj.payfort_fort_cc}
                    continueShopping={this.redirectToShopping}
                    redirectToCheckout={this.redirectToConfirm} />
            }
        }

        let alertBox = null;

        if (this.state.alertBoxDetails.status) {
            alertBox = <AlertBox
                message={this.state.alertBoxDetails.message}
                alertBoxStatus={this.state.alertBoxDetails.status}
                closeBox={this.closeErrorBox} />
        }
        return (<Spinner>
            {alertBox}
            <div className="t-Body-contentInner">
                <div className="Payment container">
                    <div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div className="t-Wizard t-Wizard--showTitle t-Wizard--hideStepsXSmall" id="R269828968428292561">
                                <div className="t-Wizard-header">
                                    <h1 className="t-Wizard-title">
                                        <FormattedMessage id="Checkout.paymentMethod" defaultMessage="Payment Method" /></h1>
                                    <div className="u-Table t-Wizard-controls">
                                        <div className="u-Table-fit t-Wizard-buttons" />
                                        <div className="u-Table-fill t-Wizard-steps">
                                            <h2 className="u-VisuallyHidden">Current Progress</h2>
                                            <ul className="t-WizardSteps " id={34894189712949009}>
                                                <li className="t-WizardSteps-step is-complete" id="L34894440806949010">
                                                    <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker">
                                                        <span className="t-Icon a-Icon icon-check" /></span>
                                                        <span className="t-WizardSteps-label"><FormattedMessage id="login.SignIn.Title" defaultMessage="Sign In" /><span className="t-WizardSteps-labelState">
                                                            (Completed)</span></span></div></li>
                                                <li className="t-WizardSteps-step is-complete" id="L34894862176949011">
                                                    <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker">
                                                        <span className="t-Icon a-Icon icon-check" />
                                                    </span><span className="t-WizardSteps-label"><FormattedMessage id="delivery-details.Delivery.Title" defaultMessage="Delivery" />
                                                            <span className="t-WizardSteps-labelState">(Completed)</span></span>
                                                    </div></li><li className="t-WizardSteps-step is-active" id="L34895210921949011">
                                                    <div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker" />
                                                        <span className="t-WizardSteps-label"><FormattedMessage id="delivery-details.Payment.Title" defaultMessage="Payment" /> <span className="t-WizardSteps-labelState">(Active)</span></span></div></li><li className="t-WizardSteps-step" id="L34895615146949011"><div className="t-WizardSteps-wrap"><span className="t-WizardSteps-marker">
                                                            <span className="t-Icon a-Icon icon-check" /></span><span className="t-WizardSteps-label">
                                                                <FormattedMessage id="delivery-details.Confirmation.Title" defaultMessage="Confirmation" />
                                                                <span className="t-WizardSteps-labelState" /></span></div></li></ul>
                                        </div>
                                        <div className="u-Table-fit t-Wizard-buttons" />
                                    </div>
                                </div>
                                <div className="t-Wizard-body">
                                </div>
                            </div>
                        </div>
                    </div><div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R634945748926968673">
                                <div className="t-Region-header">
                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                        <h2 className="t-Region-title" id="R634945748926968673_heading"><FormattedMessage id="Checkout.paymentMethod" defaultMessage="Payment Method" /></h2>
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
                                            <Row className="row">
                                                <Col xs="12" lg="8" md="12">
                                                    <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--scrollBody" id="R88324702982838492">
                                                        <div className="t-Region-header">
                                                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                <h2 className="t-Region-title" id="R88324702982838492_heading">Options</h2>
                                                            </div>
                                                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                        </div>
                                                        <div className="t-Region-bodyWrap">
                                                            <div className="t-Region-buttons t-Region-buttons--top">
                                                                <div className="t-Region-buttons-left" />
                                                                <div className="t-Region-buttons-right" />
                                                            </div>
                                                            <div className="t-Region-body">
                                                                <input type="hidden" id="P8_PAYMENT_METHOD" name="P8_PAYMENT_METHOD" defaultValue="CRD" /><input type="hidden" id="P8_DELIVERY_METHOD" name="P8_DELIVERY_METHOD" defaultValue="DA" />
                                                                <ul className="shipping-tabs">
                                                                    <li onClick={() => this.handleClick("CC")} id="CC" className="tab click-collect2 selected" >
                                                                        <h3 className="method">
                                                                            <FormattedMessage id="PaybyCard.Text" defaultMessage="Pay by Card" />
                                                                        </h3>
                                                                        <span className="method-description h-hidden-mobile">
                                                                            <FormattedMessage id="PaybyCard.Content" defaultMessage="You will be directed to mada, master/visa to complete your payment and then returned to ELC." />
                                                                        </span>
                                                                        <span className="method-description divShowOnMobile">
                                                                            <FormattedMessage id="PaybyCard.CardType" defaultMessage="mada/credit/debit" />
                                                                        
                                                                        </span>
                                                                    </li>
                                                                    <li onClick={() => this.handleClick("COD")} id="DA" className="tab del-add2 ">
                                                                        <h3 className="method"><FormattedMessage id="CashOnDelivery.Text" defaultMessage="Cash On Delivery" /></h3>
                                                                        {/* <span className="method-description h-hidden-mobile">
                                                                            <FormattedMessage id="CashOnDelivery.Content" defaultMessage="Cash On Delivery" />
                                                                        </span> */}
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                            <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                <div className="t-Region-buttons-left" />
                                                                <div className="t-Region-buttons-right" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {payment_type}
                                                </Col>
                                                <Col xs="12" lg="4" md="12">
                                                    <DeliveryProductList cart_details={this.props.cart_details} coupan_code={true} store_locale={this.props.global.store_locale} gotoProductScreen={this.gotoProductScreen} />
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="t-Region-buttons t-Region-buttons--bottom">
                                        <div className="t-Region-buttons-left" />
                                        <div className="t-Region-buttons-right" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div><div className="row">
                        <div className="col col-12 apex-col-auto">
                            <div className="t-ButtonRegion t-Form--floatLeft hidden-desktop hide-buttons t-ButtonRegion--stickToBottom t-ButtonRegion--noPadding t-ButtonRegion--noUI t-Form--noPadding t-Form--xlarge t-Form--stretchInputs margin-top-none margin-bottom-none margin-left-none margin-right-none is-anchored" id="mobile-buttons" style={{ bottom: '0px' }}>
                                <div className="t-ButtonRegion-wrap">
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                        <h2 className="t-ButtonRegion-title" id="mobile-buttons_heading">Mobile Button</h2>
                                        <div className="Payment container">
                                            <Row className="row">
                                                <Col xs="2" lg="2" md="2" style={{ padding: 0 }}>
                                                    <button className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" onClick={this.goToDeliveryDetails} type="button" id="B29282633551930637" title="Continue Shopping" aria-label="Continue Shopping"><span className="t-Icon fa fa-angle-left" aria-hidden="true" /></button>
                                                </Col><Col xs="9" lg="9" md="9" style={{ padding: 0 }}>
                                                    <button onClick={this.redirectToConfirm} className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29282227949930637"><span className="t-Button-label"><FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" /></span></button>
                                                </Col>
                                            </Row>
                                        </div>
                                        <div className="t-ButtonRegion-buttons" />
                                    </div>
                                    <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons" /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div></Spinner>);
    }
}

const mapStateToProps = state => {
    return {
        guest_checkout: state.guest_user,
        user_details: state.login,
        cart_details: state.myCart,
        global: state.global
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetPaymentDetails: (payload) => dispatch(actions.getPaymentDetails(payload)),
        onSetPaymentDetails: (payload) => dispatch(actions.setPaymentDetails(payload)),
        onRedirectToPayment: () => dispatch(actions.redirectToPayment()),
        onRedirectToDelivery: () => dispatch(actions.redirectToDelivery()),
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Payment));