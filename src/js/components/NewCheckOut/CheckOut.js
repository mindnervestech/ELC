import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import Collapsible from 'react-collapsible';
import { Container, Row, Col, Button, Input } from 'reactstrap';
import logo1 from '../../../assets/images/you_may_also_like_1.png'
import payPalImg from '../../../assets/images/social/paypal.svg';
import masterCardImg from '../../../assets/images/social/masterCard.svg';
import CardPayment from './CardPayment'
import CardGift from './CardGift'
import DeliverySpeed from './DeliverySpeed'
import DeliveryLocation from './DeliveryLocation';
import Contact from '../CheckOut/DeliveryDetails/ContactInformation';
import Address from '../CheckOut/DeliveryDetails/AddressInformation';
import * as utility from '../utility/utility';
import { Redirect, withRouter } from 'react-router-dom';
import { FormattedMessage, injectIntl } from 'react-intl';
import SavedAddressList from '../CheckOut/DeliveryDetails/SavedAddressList';

var _ = require('lodash');

class CheckOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOldAddressSelcted: false,
            oldAddressValue: {},
            addNewAddress: false,
        };
    }

    componentDidMount() {
        if (this.props.cart_details.is_cart_details_rec && (this.props.cart_details.is_shipping_details_rec === false)) {
            this.props.OnGetShippingDetails({
                customer_id: this.props.user_details.customer_details.customer_id,
                store_id: this.props.globals.currentStore
            })
        }
    }

    AddressRadioClick = (addressId) => {
        this.setState({
            isOldAddressSelcted: true,
            oldAddressValue: addressId,
            addNewAddress: false,
        })
    }

    addNewAddress = () => {
        this.setState({
            addNewAddress: true,
            isOldAddressSelcted: false
        })
    }

    cancelAddNewAddress = () => {
        this.setState({
            addNewAddress: false,
            isOldAddressSelcted: true,
        })
    }

    goToCartDetails = () => {
        //console.log('goToCartDetails');
        this.props.onRedirectToCart();
        this.props.history.push(`/${this.props.globals.store_locale}`);
    }

    submitForm = () => {

        if (this.state.addNewAddress) {

            // this.submitContact.current.signUpSubmitContact();
            // this.submitAddress.current.signUpSubmitAddress();

            let UserID = " ";
            if (!(this.props.guest_checkout.startGuestCheckout)) {
                UserID = this.props.user_details.customer_details.customer_id;
            }


            setTimeout(() => {
                if (this.state.isContactValid && this.state.isAddressValid) {

                    let payload = {
                        addressId: '',
                        UserID: this.props.user_details.customer_details.customer_id,
                        userFirstName: this.state.ContactFields.firstName,
                        userLastName: this.state.ContactFields.lastName,
                        customer_email: this.state.ContactFields.email,
                        country_id: this.state.country_details.id,
                        state: this.state.country_details.full_name_english,
                        region_id: this.state.city_details.id,
                        city: this.state.city_details.name,
                        street: `${this.state.AddressFields.addressOne},${this.state.AddressFields.addressTwo}, ${this.state.AddressFields.addressThree}`,
                        carrier_code: this.state.ContactFields.carrierCode,
                        telephone: this.state.ContactFields.contactNumber,
                        customer_address_type: this.state.AddressFields.addressType
                    };

                    this.props.OnaddNewAddressAndRedirectToCheckout(payload)
                    //console.log('payload ', payload);
                }

            }, 5000)

        } else if (this.state.isOldAddressSelcted && (!(this.state.isCollectFromStore))) {

            this.props.OnaddOldAddressAndRedirectToCheckout(this.state.oldAddressValue);

        } else if (this.state.isCollectFromStore) {
            this.submitContact.current.signUpSubmitContact();
            this.submitStore.current.signUpSubmitStore();
            setTimeout(() => {
                if (this.state.isContactValid && this.state.isStoreValid) {
                    //console.log('>>>>>>>.', this.state.storeInfo);
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

    render() {
        let { cart_details, user_details } = this.props;
        const { customer_details } = user_details;
        const { products } = cart_details;

        let obj = this.props.cart_details.shipping_details;
        if (!(utility.emptyObj(obj))) {
        return <Redirect to={`/${this.props.globals.store_locale}/checkout-payment`} />
        }

        let addressContainer = null;
        if (!this.props.cart_details.available_address || this.props.addressBook) {
            addressContainer = <SavedAddressList
                addressData={this.props.user_details.addressBook}
                addNewAddress={this.addNewAddress}
                radioClick={this.AddressRadioClick}
                selected_country={this.props.globals.country} />
        }

        if (this.state.addNewAddress) {
            addressContainer = <>
                <DeliveryLocation addressBook={this.props.addressBook} history={this.props.history}
                 cancelAddNewAddress={this.cancelAddNewAddress}/>
            </>;
        }
        return (
            <div>
                <ul className="check-out">
                    <li className="spasing-width"></li>
                    <li>
                        {addressContainer}
                        { !this.state.addNewAddress ?<div className="DeliveryDetails container">
                            <div className="row">
                                <div className="col col-6 ">
                                    <button onClick={this.goToCartDetails} className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280522081851518" title="Continue Shopping" aria-label="Continue Shopping">
                                        <span className="t-Button-label">
                                            <FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" />
                                        </span>
                                    </button>
                                </div>
                                <div className="col col-6 ">
                                    <button onClick={this.submitForm} className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280091835851517">
                                        <span className="t-Button-label">
                                            <FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" />
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div> : <div />}

                        {/* <div>
                            <Collapsible trigger="1. Delivery Location" >
                                <DeliveryLocation addressBook={this.props.addressBook}
                                    cancelAddNewAddress={this.cancelAddNewAddress}
                                    cancelButtonShow={true} />
                            </Collapsible>
                        </div>
                        <div style={{marginTop: 10}}>
                            <Collapsible trigger="2. Delivery Speed" >
                                <DeliverySpeed></DeliverySpeed>
                            </Collapsible>
                        </div> */}
                        {/* <div style={{marginTop: 10}} className="payment">
                            <Collapsible trigger="3. Payment" >
                                <div className="cardPayment">
                                    <Collapsible trigger="Card Payment" >
                                        <CardPayment addressBook={this.props.addressBook}/>
                                    </Collapsible>
                                </div>
                                <div>
                                    <div style={{padding: '15px 15px', borderBottom: 'solid 1px #b1b1b1'}}>
                                        <img src={payPalImg} className="paymentImage"></img>
                                        <span style={{marginLeft: '10%'}}>Pay with a Paypal account</span>
                                    </div>
                                    <div style={{padding: '15px 15px',borderBottom: 'solid 1px #b1b1b1'}}>
                                        <img src={masterCardImg} className="paymentImage"></img>
                                        <span style={{marginLeft: '10%'}}>Pay with a Amazon Pay account</span>
                                    </div>
                                </div>
                                <div className="cardPayment">
                                    <Collapsible trigger="Gift Card" >
                                        <CardGift></CardGift>
                                    </Collapsible>
                                </div>
                            </Collapsible>
                        </div> */}
                    </li>
                    <li>
                        <div className="secondBlock">
                            <div className="block1">
                                <div>
                                    <span className="header-text"><FormattedMessage id="OrderSummary.Text" defaultMessage="Order summary" /></span>
                                </div>
                                <div className="blackTitle1" style={{ paddingTop: 10 }}>
                                    <span>Ship to: {customer_details.firstname}&nbsp; {customer_details.lastname}</span>
                                </div>
                            </div>
                            <div className="block2">
                                <div className="blackTitle1">
                                    <span><FormattedMessage id="DeliverTo.Text" defaultMessage="Delivery To" /></span>
                                </div>
                                {products && products.map((item, index) => (
                                    <div className="block5">
                                        <Row>
                                            <Col xs="3">
                                                <img src={item.image[0]} className="image"></img>
                                            </Col>
                                            <Col xs="6" style={{ padding: 0 }}>
                                                <div>
                                                    <span style={{ fontFamily: "VAG Rounded ELC Bold", color: '#0D943F' }}>{item.name}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontFamily: "VAG Rounded ELC Bold" }}>Item price: </span><span> {item.currency} &nbsp;{item.price}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontFamily: "VAG Rounded ELC Bold" }}><FormattedMessage id="Item.Qty" defaultMessage="Qty" />: </span><span> {item.qty}</span>
                                                </div>
                                                <div>
                                                    <span style={{ fontFamily: "VAG Rounded ELC Bold" }}><FormattedMessage id="product.sku" defaultMessage="Product code" />: </span><span> {item.sku}</span>
                                                </div>
                                            </Col>
                                            <Col xs="3">
                                                <span style={{ fontFamily: "VAG Rounded ELC Bold", color: '#0D943F' }}>{item.currency} &nbsp;{item.price * item.qty}</span>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                                <div className="block3">
                                    <span className="floatLift blackTitle1"><FormattedMessage id="Cart.Subtotal.Title" defaultMessage="Subtotal" />:</span>
                                    <span className="floatRight">{cart_details.currency} &nbsp;{cart_details.subtotal}</span>
                                </div>
                                <div className="block4">
                                    <span className="floatLift header-text"><FormattedMessage id="profile.OrderTotal.Title" defaultMessage="Order Total" /></span>
                                    <span className="floatRight header-text">{cart_details.currency} &nbsp;{cart_details.grand_total}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li className="spasing-width"></li>
                </ul>
                {/* <div className="DeliveryDetails container">
                    <div className="row">
                        <div className="col col-5 ">
                            <button onClick={this.goToCartDetails} className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280522081851518" title="Continue Shopping" aria-label="Continue Shopping">
                                <span className="t-Button-label">
                                    <FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" />
                                </span>
                            </button>
                        </div>
                        <div className="col col-5 ">
                            <button onClick={this.submitForm} className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280091835851517">
                                <span className="t-Button-label">
                                    <FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div> */}
                {/* <div className="row-2">
				    <span className="blackTitle">Narrow your Results</span>
				</div>
				<div className="bottomBorder">
					<Collapsible trigger="Type of Toy" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Brands" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Age" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Other Options" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div>
                <div className="bottomBorder">
					<Collapsible trigger="Price" >
					<div>Animal figures (72)</div>
					<div>Baby dolls (52)</div>
					<div>Fashion dolls and accessories (191)</div>
					<div>Film & TV Dolls (49)</div>
					<div>Pre-school Dolls (24)</div>
					<div>Rag Dolls 16)</div>
					</Collapsible>
				</div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cart_details: state.myCart,
        user_details: state.login,
        guest_user: state.guest_user,
        //   change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        //   countryList: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global,
        cartLoader: state.myCart.loader,
        //   updateLoader: state.myCart.update_loader
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnGetShippingDetails: (quoteId) => dispatch(actions.getAddressFromShippingDetails(quoteId)),
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
        OnaddNewAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddNewAddressAndRedirectToCheckout(quoteId)),
        OnaddOldAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddOldAddressAndRedirectToCheckout(quoteId)),
    }

}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(CheckOut)));


// export default CheckOut;
