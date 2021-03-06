import React, { Component } from 'react';
import '../CheckOut.css';
import './DeliveryDetails.css';

import { Redirect } from 'react-router-dom'
import Contact from './ContactInformation';
import Store from './StoreLocator';
import Address from './AddressInformation';

import AlertBox from '../../Common/AlertBox/AlertBox';

import ShippingSpinner from '../../Spinner/ShippingSpinner';
import * as utility from '../../utility/utility';
import { FormattedMessage, injectIntl } from 'react-intl';
import DeliveryProductList from './DeliveryDetailsProductList';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import SavedAddressList from './SavedAddressList';
import { initializeF, trackF } from '../../utility/facebookPixel';
import { live } from '../../../api/globals';
import { Container, Row, Col } from 'reactstrap';

const wait = require('../../../../assets/images/wait.gif');

let Eventcount = 0;
class DeliveryDetails extends Component {
    constructor(props) {
        super(props);


        this.myIntl = props.intl
        this.state = {

            data_shipping_methods_deliveryProductList: {},
            ContactFields: {
                firstName: '',
                lastName: '',
                email: '',
                contactNumber: '',
                countryCode: ''
            },
            clickedonCancel:false,
            shipping_type: '',
            oldAddressID: 0,
            gift_wrap_delivery_notes: '',
            AddressFields: {
                location: '',
                city: '',
                addressOne: '',
                addressTwo: '',
                addressThree: '',
                addressType: '',
                primaryAddress: '',
                postcode: '',
            },

            storeInfo: {},

            city_details: null,
            country_details: null,
            same_day_delivery: false,
            isContactValid: false,
            isAddressValid: false,
            isStoreValid: false,

            isFormSubmit: false,
            isRedirectToPayment: false,
            addNewAddress: this.props.cart_details.addNewAddress,
            isPhoneValid: false,
            isCollectFromStore: false,
            errors: {},
            data: {},
            same_day_delivery_allow: false,
            isOldAddressSelcted: false,
            oldAddressValue: {},
            alertBoxDetails: {
                status: false,
                message: '',
            },
            gift_wrap_required: 0
        }
        this.submitContact = React.createRef();
        this.submitAddress = React.createRef();
        this.submitStore = React.createRef();
        Eventcount = 0;
    }

    componentDidMount() {
       
        //this.props.OnproceedToCheckout({quote_id : 10})
        let shipping_city = {};

        this.setState({ data_shipping_methods_deliveryProductList: shipping_city })
        if (this.props.cart_details.is_cart_details_rec) {
            let obj = this.props.user_details.customer_details;
            if (!(utility.emptyObj(obj)) && this.props.user_details.isUserLoggedIn) {
                if (this.props.cart_details.is_cart_details_rec && (this.props.cart_details.is_shipping_details_rec === false)) {
                    this.props.OnGetShippingDetails({
                        customer_id: this.props.user_details.customer_details.customer_id,
                        store_id: this.props.globals.currentStore
                    })
                }
            } else {
                if (this.props.guest_checkout.startGuestCheckout) {
                    if (this.props.cart_details.is_cart_details_rec && (this.props.cart_details.is_shipping_details_rec === false)) {
                        this.props.OnGetShippingDetails({
                            customer_id: "",
                            store_id: this.props.globals.currentStore
                        })
                    }
                } else {
                    this.props.history.push(`/${this.props.globals.store_locale}/sign-in-register`);
                }
            }
        } else {
            this.props.history.push(`/${this.props.globals.store_locale}/cart`);
        }
        if (live) {
            initializeF()
            trackF('DeliveryDetails');
        }
    }

    gift_wrap_required = (gift_wrap) => {

        this.setState({
            gift_wrap_required: gift_wrap
        })
    }

    gift_wrap_delivery_notes = (notes) => {

        this.setState({
            gift_wrap_delivery_notes: notes
        })
    }


    clearpropsOnCancelButton=(value)=>{
        this.setState({clickedonCancel:value})
        console.log("Called cancel button",this.state.clickedonCancel)

    }


    available_for_same_day_delivery = (same_day_delivery) => {

        this.setState({
            same_day_delivery: same_day_delivery
        })

    }

    set_shipping_type = (type) => {

        this.setState({ shipping_type: type })
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.oncancleClick===true){
            this.setState({same_day_delivery:false})
        }
        // const selected_country = this.props.globals.country;
        if (this.props.globals.country !== prevProps.globals.country) {
            if (this.props.globals.country === 'International') {
                let cc_element = document.getElementById("CC");
                if (cc_element.classList.contains('selected')) {
                    this.setState({
                        isCollectFromStore: false,
                    })
                    let cod_element = document.getElementById("DA");
                    cc_element.classList.remove('selected');
                    cod_element.classList.add('selected');
                }
            }
        }
    }

    submitForm = () => {
        if (((this.state.addNewAddress)
            || (!(this.props.cart_details.available_address)))
            && (!(this.state.isCollectFromStore))) {

            this.submitContact.current.signUpSubmitContact();
            this.submitAddress.current.signUpSubmitAddress();

            let UserID = " ";
            if (!(this.props.guest_checkout.startGuestCheckout)) {
                UserID = this.props.user_details.customer_details.customer_id;
            }

            setTimeout(() => {
               
                if (this.state.isContactValid && this.state.isAddressValid) {
                    let payload_shipping_type = ''
                    // if (this.state.shipping_type ==="samedaydelivery_shipping_samedaydelivery_shipping") {
                    //     payload_shipping_type = this.state.shipping_type;
                    // } else if (this.state.shipping_type ==="express_shipping_express_shipping") {
                    //     payload_shipping_type = this.state.shipping_type;
                    // }
                    // else{
                    //     payload_shipping_type = this.state.shipping_type;
                    // }
                    let payload = {
                        addressId: '',
                        UserID: this.props.user_details.customer_details.customer_id,
                        userFirstName: this.state.ContactFields.firstName,
                        userLastName: this.state.ContactFields.lastName,
                        customer_email: this.state.ContactFields.email.replace(/\s/g, ""),
                        country_id: this.state.country_details.id,
                        state: this.state.country_details.full_name_english,
                        region_id: this.state.city_details.id,
                        city: this.state.city_details.name,
                        street: `${this.state.AddressFields.addressOne},${this.state.AddressFields.addressTwo}, ${this.state.AddressFields.addressThree}`,
                        carrier_code: this.state.ContactFields.carrierCode,
                        telephone: parseInt(this.state.ContactFields.contactNumber),
                        customer_address_type: this.state.AddressFields.addressType,
                        postcode: this.state.AddressFields.postcode,
                        message: this.state.gift_wrap_delivery_notes,
                        gift_wrap_flag: this.state.gift_wrap_required,
                        payload_shipping_type: this.state.shipping_type
                    };

                    this.props.OnaddNewAddressAndRedirectToCheckout(payload)
                }
            }, 5000)

        } else if (this.state.isOldAddressSelcted && (!(this.state.isCollectFromStore))) {
            let payload_shipping_type='';
            this.setState({

                oldAddressValue: {
                    address_id: this.state.oldAddressID,
                    message: this.state.gift_wrap_delivery_notes,
                    gift_wrap_flag: this.state.gift_wrap_required,
                    payload_shipping_type: this.state.shipping_type
                }

            })
            setTimeout(() => {
                this.props.OnaddOldAddressAndRedirectToCheckout(this.state.oldAddressValue);
            }, 200);

        } else if (this.state.isCollectFromStore) {
            this.submitContact.current.signUpSubmitContact();
            this.submitStore.current.signUpSubmitStore();
            setTimeout(() => {
                if (this.state.isContactValid && this.state.isStoreValid) {
                    let data = {
                        store: { ...this.state.storeInfo },
                        contact: { ...this.state.ContactFields }
                    }
                    this.props.onClickAndCollect(data)
                } else {
                    this.setState({
                        ...this.state,
                        alertBoxDetails: {
                            status: true,
                            message: this.myIntl.formatMessage({ id: 'delivery-details.invalidStore' }),
                        }
                    })
                }
            }, 3000)
        } else {
            this.setState({
                ...this.state,
                alertBoxDetails: {
                    status: true,
                    message: this.myIntl.formatMessage({ id: 'delivery-details.validAddress' }),
                }
            })
        }
    }

    goToCartDetails = () => {
        this.props.onRedirectToCart();
        this.props.history.push(`/${this.props.globals.store_locale}/cart`);
    }

    goToLoginForGuest = () => {
        this.props.onRedirectToDelivery();
        this.props.history.push({
            pathname: '/' + this.props.globals.store_locale + '/checkout-login',
            state: { isGuest: true }
        })
    }

    AddressRadioClick = (addressId, value) => {
        this.setState({
            same_day_delivery_allow: value,
            isOldAddressSelcted: true,
            oldAddressID: addressId,

        })

    }

    getContactInfo = (params) => {
        this.setState({
            ContactFields: params,
            isContactValid: true,
        })
    }
    getAddressInfo = (params) => {

        this.setState({
            AddressFields: params.AddressFields,
            city_details: params.city_details,
            country_details: params.country_details,
            isAddressValid: true,
        })
    }

    getStoreInfo = (params) => {
        this.setState({
            storeInfo: { ...params },
            isStoreValid: true,
        })
    }

    addNewAddress = () => {
        this.setState({
            addNewAddress: true,
            isOldAddressSelcted: false,
            same_day_delivery_allow:false,
            same_day_delivery:false
        })
    }

    cancelAddress=()=>{
        this.setState({
           
            same_day_delivery_allow:false,
            same_day_delivery:false
        })  
    }
    changeDeliveryType = (e) => {
        const selected_country = this.props.globals.country;
        if (e.target.tagName === 'H3' || e.target.tagName == 'SPAN') {
            if ((e.target.parentNode.id === 'CC') && (selected_country === 'International')) {
                // alert(this.myIntl.formatMessage({ id: 'Click&Collect.Text' }));
                // this.setState({
                //   ...this.state,
                //   alertBoxDetails: {
                //     status: true,
                //     message: this.myIntl.formatMessage({ id: 'Click&Collect.Text' }),
                //   }
                // })
                // return;
            } else {
                let array = e.currentTarget.children;
                // for (let item of array) {
                //   item.classList.remove('selected');
                // }
                // e.target.parentNode.classList.add('selected');

                if (e.target.parentNode.id === 'CC') {
                    // this.setState({
                    //   isCollectFromStore: true,
                    // })
                } else if (e.target.parentNode.id === 'DA') {
                    this.setState({
                        isCollectFromStore: false,
                    })
                }
            }
        } else {
            if ((e.target.id === 'CC') && (selected_country === 'International')) {
                //alert(this.myIntl.formatMessage({ id: 'Click&Collect.Text' }));
                // this.setState({
                //   ...this.state,
                //   alertBoxDetails: {
                //     status: true,
                //     message: this.myIntl.formatMessage({ id: 'Click&Collect.Text' }),
                //   }
                // })
                // return;
            } else {
                let array = e.currentTarget.children;
                // for (let item of array) {
                //   item.classList.remove('selected');
                // }
                // e.target.classList.add('selected');
                if (e.target.id === 'CC') {
                    // this.setState({
                    //   isCollectFromStore: true,
                    // })
                } else if (e.target.id === 'DA') {
                    this.setState({
                        isCollectFromStore: false,
                    })
                }
            }
        }
    }

    cancelAddNewAddress = () => {
        this.setState({
            addNewAddress: false,
            same_day_delivery:false
        })
        
    }

    handleBack = () => {
        this.props.history.goBack()
    }

    continueShopping = () => {
        this.props.history.push(`/${this.props.globals.store_locale}`);
    }

    closeErrorBox = () => {
        this.setState({
            ...this.state,
            alertBoxDetails: {
                status: false,
                message: ''
            }
        })

    }

    gotoProductScreen = (item) => {
        const store_locale = this.props.globals.store_locale;

        const data = {
            customerid: typeof this.props.user_details.customer_id !== 'undefined' ? parseInt(this.props.user_details.customer_id) : " ",
            store: this.props.globals.currentStore,
            url_key: item.url_key,
        };

        this.props.onGetProductDetails(data);
        this.props.getSizeChart({
            store_id: this.props.globals.currentStore,
        });
        this.props.history.push(`/${this.props.globals.store_locale}/products-details/${item.url_key}`);
    }


    render() {
     

        const selected_country = this.props.globals.country;
        let obj = this.props.cart_details.shipping_details;
        if (!(utility.emptyObj(obj))) {
            return <Redirect to={`/${this.props.globals.store_locale}/checkout-payment`} />
        }
        let addressContainer = null;
        if (this.props.cart_details.is_shipping_details_rec) {
            if (this.props.cart_details.available_address) {
                addressContainer = <SavedAddressList
                    addressData={this.props.cart_details.addressData}
                    addNewAddress={this.addNewAddress}
                    radioClick={this.AddressRadioClick}
                   
                    selected_country={this.props.globals.country} />
            } else if (!(this.props.cart_details.available_address)) {
                addressContainer = <>
                    <Contact ref={this.submitContact} changed={this.getContactInfo} />
                    <Address  oncancleClick={this.cancelAddress}
                     available_for_same_day_delivery={this.available_for_same_day_delivery} ref={this.submitAddress} changed={this.getAddressInfo}
                        cancelButtonShow={false} selected_country={this.props.globals.country} />
                </>
            }

            if (this.state.addNewAddress) {
                addressContainer = <>
                    <Contact ref={this.submitContact} changed={this.getContactInfo} />
                    <Address  oncancleClick={this.clearpropsOnCancelButton}
                       available_for_same_day_delivery={this.available_for_same_day_delivery}
                        ref={this.submitAddress} changed={this.getAddressInfo}
                        cancelAddNewAddress={this.cancelAddNewAddress}
                        cancelButtonShow={true}
                        selected_country={this.props.globals.country} />
                </>;
            }
        }

        if (this.state.isCollectFromStore && (selected_country !== 'International')) {
            addressContainer = <>
                <Store
                    ref={this.submitStore}
                    changed={this.getStoreInfo}
                    selected_country={this.props.globals.country}
                    placeHolderText={this.myIntl.formatMessage({ id: 'StoreLocatorEnterALocation.Text' })}
                    directionText={this.myIntl.formatMessage({ id: 'StoreLocatorDirection.Text' })} />

                <Contact ref={this.submitContact} changed={this.getContactInfo} />
            </>;
        }

        let alertBox = null;
        if (this.state.alertBoxDetails.status) {
            alertBox = <AlertBox
                message={this.state.alertBoxDetails.message}
                alertBoxStatus={this.state.alertBoxDetails.status}
                closeBox={this.closeErrorBox} />
        }

        return (<>
            {!addressContainer ? <ShippingSpinner /> :

                <div className="t-Body-contentInner">
                    {alertBox}
                    <div className="DeliveryDetails container">
                        <div className="row">
                            <div className="col col-12 apex-col-auto">
                                <div className="t-Wizard containers  t-Wizard--showTitle t-Wizard--hideStepsSmall" id="R271153290088972814" style={{ marginBottom: '10px' }}>
                                    <div className="t-Wizard-header">
                                        <h1 className="t-Wizard-title"><FormattedMessage id="DeliveryDetails.Title" defaultMessage="Delivery Details" /></h1>
                                        <div className="u-Table t-Wizard-controls">
                                            <div className="u-Table-fit t-Wizard-buttons" />
                                            <div className="u-Table-fill t-Wizard-steps">
                                                <h2 className="u-VisuallyHidden">Current Progress</h2>
                                                <ul className="t-WizardSteps t-WizardSteps--displayLabels" id={34894189712949009}>
                                                    <li className="t-WizardSteps-step is-complete" id="L34894440806949010" onClick={this.goToLoginForGuest}>
                                                        <div className="t-WizardSteps-wrap">
                                                            <span className="t-WizardSteps-marker">
                                                                <span className="t-Icon a-Icon icon-check" /></span>
                                                            <span className="t-WizardSteps-label">
                                                                <FormattedMessage id="login.SignIn.Title" defaultMessage="Sign In" />
                                                                <span className="t-WizardSteps-labelState">(Completed)</span>
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li className="t-WizardSteps-step is-active" id="L34894862176949011">
                                                        <div className="t-WizardSteps-wrap">
                                                            <span className="t-WizardSteps-marker" />
                                                            <span className="t-WizardSteps-label">
                                                                <FormattedMessage id="delivery-details.Delivery.Title" defaultMessage="Delivery" />
                                                                <span className="t-WizardSteps-labelState">(Active)</span>
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li className="t-WizardSteps-step" id="L34895210921949011">
                                                        <div className="t-WizardSteps-wrap">
                                                            <span className="t-WizardSteps-marker">
                                                                <span className="t-Icon a-Icon icon-check" />
                                                            </span>
                                                            <span className="t-WizardSteps-label">
                                                                <FormattedMessage id="login.Payment.Title" defaultMessage="Payment" />
                                                                <span className="t-WizardSteps-labelState" />
                                                            </span>
                                                        </div>
                                                    </li>
                                                    <li className="t-WizardSteps-step" id="L34895615146949011">
                                                        <div className="t-WizardSteps-wrap">
                                                            <span className="t-WizardSteps-marker">
                                                                <span className="t-Icon a-Icon icon-check" />
                                                            </span>
                                                            <span className="t-WizardSteps-label">
                                                                <FormattedMessage id="login.Confirmation.Title" defaultMessage="Confirmation" />
                                                                <span className="t-WizardSteps-labelState" />
                                                            </span>
                                                        </div>
                                                    </li>
                                                </ul>
                                                <input type="hidden" id="P7_ADDR_METHOD" name="P7_ADDR_METHOD" defaultValue /><input type="hidden" id="P7_DELIVERY_METHOD" name="P7_DELIVERY_METHOD" defaultValue="DA" /><input type="hidden" id="P7_ADDR_IDS" name="P7_ADDR_IDS" defaultValue />
                                            </div>
                                            <div className="u-Table-fit t-Wizard-buttons" />
                                        </div>
                                    </div>
                                    <div className="t-Wizard-body">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-12 apex-col-auto shoppingbagdetails">
                                <div className="t-Region containers  t-Region--noPadding t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow margin-bottom-lg" id="R620852575803856306">
                                    <div className="t-Region-header">
                                        <div className="t-Region-headerItems t-Region-headerItems--title">
                                            <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                            <h2 className="t-Region-title" id="R620852575803856306_heading">details</h2>
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
                                                        <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--scrollBody" id="R78416017776728831">
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h2 className="t-Region-title" id="R78416017776728831_heading">Options</h2>
                                                                </div>
                                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                            </div>
                                                            <div className="t-Region-bodyWrap">
                                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                                <div className="t-Region-body">
                                                                    <ul className="shipping-tabs" onClick={this.changeDeliveryType}>

                                                                        <li style={{ cursor: 'unset' }} id="CC" className="tab click-collect2">
                                                                            <h3 className="method"><FormattedMessage id="delivery-details.Click&Collect.Title" defaultMessage="Click&Collect" /></h3>
                                                                            {/* <span className="method-description h-hidden-mobile"><FormattedMessage id="delivery-details.Click&Collect.Message" defaultMessage="Click&Collect Message" /></span> */}
                                                                            <span className="method"><FormattedMessage id="Comingsoon" defaultMessage="Coming soon" /></span>
                                                                        </li>

                                                                        <li id="DA" className="tab del-add2 selected">
                                                                            <h3 className="method"><FormattedMessage id="delivery-details.HomeDelivery.Title" defaultMessage="Home Delivery" /></h3>
                                                                            <span className="method-description h-hidden-mobile"><FormattedMessage id="delivery-details.HomeDelivery.Message" defaultMessage="Home Delivery Message" /></span>
                                                                        </li>
                                                                    </ul>
                                                                </div>
                                                                <div className="t-Region-buttons t-Region-buttons--bottom">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {addressContainer}
                                                    </Col>
                                                    <Col xs="12" lg="4" md="12">
                                                        <DeliveryProductList shipping_type={this.set_shipping_type}
                                                            data_shipping_methods_deliveryProductList={this.props.citywise_shipping_methods}
                                                            same_day_delivery_allow={this.state.same_day_delivery_allow}
                                                            same_day_delivery={this.state.same_day_delivery} gift_wrap_required={this.gift_wrap_required}
                                                            gift_wrap_delivery_notes={this.gift_wrap_delivery_notes} cart_details={this.props.cart_details}
                                                            store_locale={this.props.globals.store_locale}
                                                            gotoProductScreen={this.gotoProductScreen} />
                                                    </Col>
                                                </Row>
                                                <div className="row">
                                                    <div className="col col-8 ">
                                                        <div className="t-Region h-hidden-mobile  t-Region--removeHeader t-Region--stacked t-Region--scrollBody" id="R34928405250907742">
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h2 className="t-Region-title" id="R34928405250907742_heading"><FormattedMessage id="delivery-details.AddressInformation.Title" defaultMessage="Address Information" /></h2>
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
                                                                            <div className="col col-6 apex-col-auto">
                                                                                <button onClick={this.continueShopping} className="t-Button t-Button--pillStart t-Button--stretch" type="button" id="P7_CONTINUE_SHOP">
                                                                                    <span className="t-Button-label">
                                                                                        <FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" />
                                                                                    </span></button>
                                                                            </div>
                                                                            {this.state.isContactValid && this.state.isAddressValid ?
                                                                                <div className="col col-6 apex-col-auto">
                                                                                    <button className="t-Button t-Button--hot t-Button--pillEnd t-Button--stretch" type="button" disabled={true}>
                                                                                        <img src={wait} style={{ width: 25, height: 25, marginTop: -4 }} alt="" />
                                                                                        <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                                                                    </button>
                                                                                </div> :
                                                                                <div className="col col-6 apex-col-auto">
                                                                                    <button onClick={this.submitForm} className="t-Button t-Button--hot t-Button--pillEnd t-Button--stretch" type="button" id="B34928536452907743"><span className="t-Button-label"><FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" /></span></button><input type="hidden" id="P7_ADDR_EXIST" name="P7_ADDR_EXIST" defaultValue="N" />
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
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
                                        <div className="t-Region-buttons t-Region-buttons--bottom">
                                            <div className="t-Region-buttons-left" />
                                            <div className="t-Region-buttons-right" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-12 apex-col-auto">
                                <div className="t-ButtonRegion t-Form--floatLeft hidden-desktop hide-buttons t-ButtonRegion--stickToBottom t-ButtonRegion--noPadding t-ButtonRegion--noUI t-Form--noPadding t-Form--xlarge t-Form--stretchInputs margin-top-none margin-bottom-none margin-left-none margin-right-none is-anchored" id="mobile-buttons" style={{ bottom: '0px' }}>
                                    <div className="t-ButtonRegion-wrap">
                                        <div className="t-ButtonRegion-col t-ButtonRegion-col--left">
                                            <div className="t-ButtonRegion-buttons" />
                                        </div>
                                        <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                            <h2 className="t-ButtonRegion-title" id="mobile-buttons_heading">Mobile Button</h2>
                                            <div className="DeliveryDetails container">
                                                <Row className="row">
                                                    <Col xs="2" lg="2" md="2" style={{ padding: 0 }}>
                                                        <button onClick={this.goToCartDetails} className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280522081851518" title="Continue Shopping" aria-label="Continue Shopping"><span className="t-Icon fa fa-angle-left" aria-hidden="true" /></button>
                                                    </Col>
                                                    <Col xs="9" lg="9" md="9" style={{ padding: 0 }}>
                                                        <button disabled={this.state.isContactValid && this.state.isAddressValid} onClick={this.submitForm} className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280091835851517">
                                                            {this.state.isContactValid && this.state.isAddressValid ?
                                                                <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                                                : <span className="t-Button-label"><FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" /></span>
                                                            }
                                                        </button>
                                                    </Col>
                                                </Row>
                                            </div>
                                            <div className="t-ButtonRegion-buttons" />
                                        </div>
                                        <div className="t-ButtonRegion-col t-ButtonRegion-col--right">
                                            <div className="t-ButtonRegion-buttons" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
        </>);
    }
}

const mapStateToProps = state => {

    return {

        guest_checkout: state.guest_user,
        cart_details: state.myCart,
        user_details: state.login,
        citywise_shipping_methods: state.myCart.citywise_shipping_methods,
        change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        delivery_details: state.myCart.addressfromshipping_details

    };
}

const mapDispatchToProps = dispatch => {
    return {
        OnGetShippingDetails: (quoteId) => dispatch(actions.getAddressFromShippingDetails(quoteId)),
        OnaddNewAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddNewAddressAndRedirectToCheckout(quoteId)),
        OnaddOldAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddOldAddressAndRedirectToCheckout(quoteId)),
        onClickAndCollect: (quoteId) => dispatch(actions.clickAndCollect(quoteId)),
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
        onGetProductDetails: payload => dispatch(actions.getProductDetails(payload)),
        getSizeChart: payload => dispatch(actions.getSizeChart(payload)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(DeliveryDetails));