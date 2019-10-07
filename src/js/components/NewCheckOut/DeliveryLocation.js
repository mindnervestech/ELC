import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Container, Row, Col, Button, Form, FormGroup } from 'reactstrap';

import PhoneNumber from '../Login/IntlTelePhone';
import { FormattedMessage } from 'react-intl';

var _ = require('lodash');

class DeliveryLocation extends Component {
    //     constructor(props) {
    //         super(props);
    //         this.state = {
    //             title: false,
    //             firstName: false,
    //             lastName: false,
    //             number: false,
    //             address: false,
    //             country: false,
    //             addressLine1: false,
    //             addressLine2: false,
    //             state: false,
    //             city: false,
    //             postCode: false,
    //         };
    //     }

    //     cardPaymentSubmit = () => {
    //         this.setState({ cardType: true })
    //     }

    //     add = (event) => {
    //         console.log(event.charCode)
    //         if (event.charCode >= 48 && event.charCode <= 57) {
    //             console.log("true")
    //             return true;
    //         } else {
    //             return false;
    //         }
    //     }

    //     onFormSubmit = (e) => {
    //         e.preventDefault()
    //         console.log(e.target.first_name.value)
    //         if (e.target.first_name.value == "") {
    //             this.setState({ firstName: true })
    //         }
    //         if (e.target.last_name.value == "") {
    //             this.setState({ lastName: true })
    //         }
    //         if (e.target.title.value == "Please Select") {
    //             this.setState({ title: true })
    //         }
    //         if (e.target.number.value == "") {
    //             this.setState({ number: true })
    //         }
    //         if (e.target.address.value == "") {
    //             this.setState({ address: true })
    //         }
    //         if (e.target.country.value == "Please Select") {
    //             this.setState({ country: true })
    //         }
    //         if (e.target.address_line_1.value == "") {
    //             this.setState({ addressLine1: true })
    //         }
    //         if (e.target.address_line_2.value == "") {
    //             this.setState({ addressLine2: true })
    //         }
    //         if (e.target.city.value == "") {
    //             this.setState({ city: true })
    //         }
    //         if (e.target.state.value == "") {
    //             this.setState({ state: true })
    //         }
    //         if (e.target.post_code.value == "") {
    //             this.setState({ postCode: true })
    //         }
    //     }

    //     render() {
    //         console.log(this.props);
    //         return (
    //             <div>
    //                 <Form onSubmit={this.onFormSubmit}>
    //                     <FormGroup>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Title</span>
    //                         </div>
    //                         <div>
    //                             <select name="title" className={this.state.title ? "select-field error" : "select-field"} style={{ width: "100%", marginRight: 0 }}>
    //                                 <option selected disabled>Please Select</option>
    //                                 <option value="2011">value1</option>
    //                                 <option value="2012">value2</option>
    //                                 <option value="2013">value3</option>
    //                             </select>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">First Name</span>
    //                         </div>
    //                         <div>
    //                             <input name="first_name" className={this.state.firstName ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Last Name</span>
    //                         </div>
    //                         <div>
    //                             <input name="last_name" className={this.state.lastName ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Phone number</span>
    //                         </div>
    //                         <div>
    //                             <input name="number" className={this.state.number ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Address Finder</span>
    //                         </div>
    //                         <div>
    //                             <input name="address" className={this.state.address ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Country</span>
    //                         </div>
    //                         <div>
    //                             <select name="country" className={this.state.country ? "select-field error" : "select-field"} style={{ width: "100%", marginRight: 0 }}>
    //                                 <option selected disabled>Please Select</option>
    //                                 <option value="2011">value1</option>
    //                                 <option value="2012">value2</option>
    //                                 <option value="2013">value3</option>
    //                             </select>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Address Line 1</span>
    //                         </div>
    //                         <div>
    //                             <input name="address_line_1" className={this.state.addressLine1 ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Address Line 2 (Optional)</span>
    //                         </div>
    //                         <div>
    //                             <input name="address_line_2" className={this.state.addressLine2 ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">City</span>
    //                         </div>
    //                         <div>
    //                             <input name="city" className={this.state.city ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">State/ Province</span>
    //                         </div>
    //                         <div>
    //                             <input name="state" className={this.state.state ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{ marginTop: 15 }}>
    //                             <span className="blackTitle1">Post Code</span>
    //                         </div>
    //                         <div>
    //                             <input name="post_code" className={this.state.postCode ? "input-field error" : "input-field"}></input>
    //                         </div>
    //                         <div style={{paddingTop: 30}}>
    //                             <Row>
    //                                 <Col xs="1">
    //                                     <input type="checkbox" style={{ marginRight: 10, height: 20, width: 20 }}></input>
    //                                 </Col>
    //                                 <Col xs="11">
    //                                     <span>I'd like to reveive emails from ELC about special offers, new toys and voucher codes.</span>
    //                                 </Col>
    //                             </Row>
    //                         </div>
    //                         <div style={{paddingTop: 15}}>
    //                             <Row>
    //                             <Col xs="1">
    //                             <span style={{ fontSize: 60, position: 'absolute', top: -15 }}>.</span>
    //                             </Col>
    //                             <Col xs="11" style={{padding: 0}}>
    //                             <span>You can ask us to stop any time and we will never sell your data to other companies for marketing purposes</span>
    //                             </Col>
    //                             </Row>
    //                             <Row style={{paddingTop: 15}}>
    //                             <Col xs="1">
    //                             <span style={{ fontSize: 60, position: 'absolute', top: -15 }}>.</span>
    //                             </Col>
    //                             <Col xs="11" style={{padding: 0}}>
    //                             <span>We always try to send emails that are relevant to you based on products you have shown an interest in.</span>
    //                             </Col>
    //                             </Row>
    //                         </div>
    //                     </FormGroup>
    //                     <div style={{ height: 80 }}>
    //                         <Button className="button" type="submit" style={{ padding: '10px 50px' }}>Next</Button>
    //                     </div>
    //                 </Form>
    //             </div>
    //         );
    //     }
    // }

    // export default DeliveryLocation;

    constructor(props) {
        super(props);
        this.state = {
            AddressFields: {
                WebsiteId: 1,
                firstName: '',
                lastName: '',
                location: '',
                countryCode: '',
                city: '',
                carrierCode: '',
                contactNumber: '',
                addressOne: '',
                addressTwo: '',
                addressThree: '',
                addressType: 'Home',
                primaryAddress: 0,
                postcode: '',
            },
            addressId: "",
            cities: [],
            country_details: {},
            city_details: {},
            errors: {},
            isPhoneValid: false,
            isdefaultPhone: false,

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cities.length !== this.state.cities.length) {
            if (this.props.Actype === 'Edit') {
                this.setCitydetails(this.props.addressForEdit.region_id)
            }
        }
    }

    componentDidMount() {
        // console.log('Address for Edit : ', this.props);
        if (this.props.country_list.length <= 0) {
            this.props.onGetCountryList();
        }

        if (this.props.Actype === 'Edit') {
            this.defineCities(this.props.addressForEdit.country_id);
            this.setCitydetails(this.props.addressForEdit.region_id);

            let addStrig = this.props.addressForEdit.street.split(',');
            this.setState({
                AddressFields: {
                    ...this.state.AddressFields,
                    WebsiteId: 1,
                    firstName: this.props.addressForEdit.userFirstName,
                    lastName: this.props.addressForEdit.userLastName,
                    location: this.props.addressForEdit.country_id,
                    city: this.props.addressForEdit.region_id,
                    addressOne: addStrig[0],
                    addressTwo: addStrig[1],
                    addressThree: addStrig[2],
                    primaryAddress: 0,
                    postcode: '',
                },
                addressId: this.props.addressForEdit.Id,
                isdefaultPhone: true,
            })
        }

        if (this.props.cart_details.is_cart_details_rec && (this.props.cart_details.is_shipping_details_rec === false)) {
            this.props.OnGetShippingDetails({
                customer_id: this.props.user_details.customer_details.customer_id,
                store_id: this.props.globals.currentStore
            })
        }
    }

    goToCartDetails = () => {
        //console.log('goToCartDetails');
        this.props.onRedirectToCart();
        this.props.history.push(`/${this.props.globals.store_locale}`);
    }

    // saveAddress = () => {
    //     //console.log(this.state);
    //     if (this.handleValidation()) {
    //         this.saveAddressAPI();
    //     }
    // }

    // newSubmitForm = () =>{
    //     if (this.handleValidation()) {
    //         this.submitForm();
    //     }
    // }

    newSubmitForm = () => {

        if (this.handleValidation()) {
    
        //   this.submitContact.current.signUpSubmitContact();
        //   this.submitAddress.current.signUpSubmitAddress();
    
          let UserID = " ";
          if (!(this.props.guest_user.startGuestCheckout)) {
            UserID = this.props.user_details.customer_details.customer_id;
          }
    
    
          setTimeout(() => {
            // if (this.state.isContactValid && this.state.isAddressValid) {
    
              let payload = {
                addressId: '',
                UserID: this.props.user_details.customer_details.customer_id,
                userFirstName: this.state.AddressFields.firstName,
                userLastName: this.state.AddressFields.lastName,
                customer_email: this.state.AddressFields.email,
                country_id: this.state.country_details.id,
                state: this.state.country_details.full_name_english,
                region_id: this.state.city_details.id,
                city: this.state.city_details.name,
                street: `${this.state.AddressFields.addressOne},${this.state.AddressFields.addressTwo}, ${this.state.AddressFields.addressThree}`,
                carrier_code: this.state.AddressFields.carrierCode,
                telephone: this.state.AddressFields.contactNumber,
                customer_address_type: this.state.AddressFields.addressType,
                postcode: this.state.AddressFields.postcode,
                customer_email:this.props.user_details.customer_details.email,

              };
    
              this.props.OnaddNewAddressAndRedirectToCheckout(payload)
              //console.log('payload ', payload);
            // }
    
          }, 5000)
    
        } // else {
        //   this.setState({
        //     ...this.state,
        //     alertBoxDetails: {
        //       status: true,
        //       message: this.myIntl.formatMessage({ id: 'delivery-details.validAddress' }),
        //     }
        //   })
    
        // }
    
    
      }

    handleValidation = () => {
        let fields = this.state.AddressFields;
        let errors = {};
        let formIsValid = true;

        //Name
        if (!fields["firstName"]) {
            formIsValid = false;
            errors["firstName"] = "Cannot be empty";
        }



        if (typeof fields["firstName"] !== "undefined") {
            if (!fields["firstName"].match(/^[a-zA-Z]+$/)) {
                formIsValid = false;
                errors["firstName"] = "Only letters";
            }
        }


        if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = "Cannot be empty";
        }


        if (!fields["location"]) {
            formIsValid = false;
            errors["location"] = "Cannot be empty";
        }

        if (!fields["addressOne"]) {
            formIsValid = false;
            errors["addressOne"] = "Cannot be empty";
        }

        if (!(this.state.isPhoneValid)) {
            formIsValid = false;
            errors["contactNumber"] = "Enter valid Phone number";
        }

        // if (!(this.state.postcode)) {
        //     formIsValid = false;
        //     errors["postcode"] = "Cannot be empty";
        // }


        this.setState({ errors: errors });
        //console.log('error',this.state);
        return formIsValid;
    }

    createStreet = () => {
        let street = this.state.AddressFields.addressOne;
        if (this.state.AddressFields.addressTwo) {
            street = `${street},${this.state.AddressFields.addressTwo}`;
        }
        if (this.state.AddressFields.addressThree) {
            street = `${street},${this.state.AddressFields.addressThree}`;
        }

        return street;
    }

    


    // saveAddressAPI = () => {
    //     //console.log(this.state);
    //     let payload = {
    //         addressId: this.state.addressId,
    //         UserId: this.props.customer_details.customer_id,
    //         UserFirstName: this.state.AddressFields.firstName,
    //         UserLastName: this.state.AddressFields.lastName,
    //         WebsiteId: 1,
    //         countryCode: this.state.country_details.id,
    //         carrier_code: this.state.AddressFields.carrierCode,
    //         UserTelephone: this.state.AddressFields.contactNumber,
    //         UserStreet: this.createStreet(),
    //         UserCity: this.state.city_details.name,
    //         UserRegionId: this.state.city_details.id,
    //         UserCountry: this.state.AddressFields.location,
    //         DefaultBilling: this.state.AddressFields.primaryAddress,
    //         DefaultShipping: this.state.AddressFields.primaryAddress,
    //         AddressType: this.state.AddressFields.addressType,
    //         postcode: this.state.AddressFields.postcode,
    //     };
    //     console.log(payload)
    //     if (this.state.addressId !== '') {
    //         this.props.onAddNewAddress(payload);
    //     } else {
    //         this.props.onEditAddress(payload);
    //     }

    // }

    handleChange = (field, e) => {
        //console.log(field, e.target.value);

        let fields = this.state.AddressFields;
        fields[field] = e.target.value;
        this.setState({ fields });

        if (field === 'location') {
            this.defineCities(e.target.value);
        } else if (field === 'city') {
            //console.log(e.target.value);
            this.setCitydetails(e.target.value);
        }

    }

    defineCities = (location) => {
        if ((location !== null) && (location !== 'NA')) {
            const countryList = this.props.country_list;

            let result = countryList.filter(obj => {
                return obj.id === location
            })

            // console.log('>>>', location, result)
            this.setState({
                country_details: result[0],
                cities: result[0].available_regions
            })
        } else if (location == 'NA') {
            this.setState({
                cities: [],
                AddressFields: {
                    ...this.state.AddressFields,
                    city: ''
                }
            })
        }
    }

    setCitydetails = (city) => {
        //console.log('City :: ', city)
        if ((city !== null) && (city !== 'NA')) {
            const cityList = this.state.cities;

            let result = cityList.filter(obj => {
                return obj.id == city
            })

            // console.log('City >>>', cityList, city, result)
            if (result.length > 0) {
                this.setState({
                    city_details: result[0]
                });
            }

        }
    }

    contactNumber = (status, value, countryData, number, id) => {
        //console.log('from parent',status, value, countryData, number, id)
        if (status) {
            let fields = this.state.AddressFields;
            fields['contactNumber'] = value;
            fields['carrierCode'] = countryData.dialCode;
            this.setState({ fields, isPhoneValid: true });
            //console.log(this.state);
        } else {
            this.setState({ isPhoneValid: false })
        }
    }

    setAddressType = (event) => {
        //console.log(event.target.value);
        let fields = this.state.AddressFields;
        fields['addressType'] = event.target.value;
        this.setState({ fields });

    }

    setPrimaryAddress = (event) => {
        //console.log(event.target.value);
        let fields = this.state.AddressFields;
        fields['primaryAddress'] = event.target.value;
        this.setState({ fields });
        //console.log(this.state);
    }

    divOnFocus = (e) => {
        e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
    }

    divOnBlure = (e) => {

        if ((e.target.value == null) || (e.target.value == '')) {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field';
        } else {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
        }
    }

    cancelAddNewAddress = () => {
        this.props.cancelAddNewAddress();
    }


    render() {
        //console.log(this.state.addressId);
        //console.log(this.state);
        const country_list = this.props.country_list;
        const city_list = this.state.cities;
        let country_select_list = <option value=''>Select Country</option>;
        let city_select_list = null;
        if (country_list.length > 0) {

            country_select_list = country_list.filter((item) => {
                if (item.id == 'SA' || item.id == 'AE') {
                    return false;
                } else {
                    return true
                }
            }).map((item) => {
                return (
                    <option key={item.id} value={item.id} selected={true}>{item.full_name_english}</option>
                );
            })
        }

        if (city_list.length !== 0) {
            city_select_list = city_list.map((item) => {
                return (
                    <option value={item.id}>{item.name}</option>
                );
            })
        }

        let defaultPhoneNumber = {};
        if (this.state.isdefaultPhone) {
            defaultPhoneNumber = {
                ...defaultPhoneNumber,
                carrier_code: this.props.addressForEdit.carrier_code,
                contactNumber: this.props.addressForEdit.telephone,
            }
        }
        // let cancelButton = null;
        //console.log('>>>>', this.state);
        // if (this.props.cancelButtonShow) {
        //     cancelButton = <>
        //         <div className="row">
        //             <div className="col col-2 ">
        //                 <span className="apex-grid-nbsp">&nbsp;</span>
        //             </div>
        //             <div className="col col-8 ">
        //                 <button onClick={this.cancelAddNewAddress} className="t-Button t-Button--stretch" type="button" id="B28612834462643392"><span className="t-Button-label">Cancel</span></button><input type="hidden" id="P7_ADDR_ID" name="P7_ADDR_ID" /><input type="hidden" id="P7_CUS_COUNTRY_1" name="P7_CUS_COUNTRY_1" /><input type="hidden" id="P7_CUS_CITY_1" name="P7_CUS_CITY_1" />
        //             </div>
        //         </div></>;
        // }


        const errorsObj = this.state.errors;

        let firstNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_FIRST_NAME" name="P25_FIRST_NAME" className="text_field apex-item-text" onChange={this.handleChange.bind(this, "firstName")} value={this.state.AddressFields["firstName"]} size="30" maxLength="" /></div><span id="P25_FIRST_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div>;


        let lastNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_LAST_NAME" name="P25_LAST_NAME" className="text_field apex-item-text" onChange={this.handleChange.bind(this, "lastName")} value={this.state.AddressFields["lastName"]} size="30" maxLength="" /></div><span id="P25_LAST_NAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div>


        let location = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper">
                <select id="P25_R_COUNTRY" name="P25_R_COUNTRY" className="selectlist apex-item-select" readOnly="readonly" size={1} onChange={this.handleChange.bind(this, "location")} value={this.state.AddressFields["location"]}>
                <FormattedMessage id="SelectCountry.Text" defaultMessage="Select Country">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                    <option value={'SA'}>{'Saudi Arabia'}</option>
                    <option value={'AE'}>{'United Arab Emirates'}</option>
                    {country_select_list}


                </select></div><span id="P25_R_COUNTRY_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div>;


        let citsWithErrorSpan = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper">
                <select id="P25_R_CITY" name="P25_R_CITY" className="selectlist apex-item-select" size={1} onChange={this.handleChange.bind(this, "city")} value={this.state.AddressFields["city"]}>
                <FormattedMessage id="SelectCity.Text" defaultMessage="Select City">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                    {city_select_list}

                </select>
            </div>
            <span id="P25_R_CITY_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" />
        </div>;


        let addressOneInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_RADD1" name="P25_RADD1" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressOne")} value={this.state.AddressFields["addressOne"]} /></div><span id="P25_RADD1_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div>

        let contactNumberInputField = null;

        if ('firstName' in errorsObj) {
            firstNameInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_FIRST_NAME" name="P25_FIRST_NAME" className="text_field apex-item-text apex-page-item-error" onChange={this.handleChange.bind(this, "firstName")} value={this.state.AddressFields["firstName"]} size="30" maxLength="100" aria-describedby="P25_FIRST_NAME_error" aria-invalid="true" /></div><span id="P25_FIRST_NAME_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P25_FIRST_NAME_error">
                <FormattedMessage id="Signup.FirstName" defaultMessage="Please enter your name" /></div></span></span></div>

        }

        if ('location' in errorsObj) {
            location = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P25_R_COUNTRY" name="P25_R_COUNTRY" className="selectlist apex-item-select apex-page-item-error" readOnly="readonly" onChange={this.handleChange.bind(this, "location")} value={this.state.AddressFields["location"]} aria-describedby="P25_R_COUNTRY_error" aria-invalid="true">
            <FormattedMessage id="SelectCountry.Text" defaultMessage="Select Country">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                <option value={'SA'}>{'Saudi Arabia'}</option>
                <option value={'AE'}>{'United Arab Emirates'}</option>
                {country_select_list}
            </select></div><span id="P25_R_COUNTRY_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P25_R_COUNTRY_error"><FormattedMessage id="SelectCountry.Validate" defaultMessage="Select Country" /></div></span></span></div>

        }

        if ('city' in errorsObj) {
            citsWithErrorSpan = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P25_R_CITY" name="P25_R_CITY" className="selectlist apex-item-select apex-page-item-error" size={1} aria-describedby="P25_R_CITY_error" aria-invalid="true" onChange={this.handleChange.bind(this, "city")} value={this.state.AddressFields["city"]}>
            <FormattedMessage id="SelectCity.Text" defaultMessage="Select City">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                {city_select_list}

            </select></div><span id="P25_R_CITY_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P25_R_CITY_error"> <FormattedMessage id="SelectCity.Validate" defaultMessage="Please select city" /></div></span></span></div>;

        }


        if ('addressOne' in errorsObj) {

            addressOneInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_RADD1" name="P25_RADD1" className="text_field apex-item-text apex-page-item-error" value size={30} onChange={this.handleChange.bind(this, "addressOne")} value={this.state.AddressFields["addressOne"]} aria-describedby="P25_RADD1_error" aria-invalid="true" /></div><span id="P25_RADD1_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P25_RADD1_error"> <FormattedMessage id="Address.Validate" defaultMessage="Please enter Address" /></div></span></span></div>;

        }

        if ('contactNumber' in errorsObj) {
            contactNumberInputField = <span id="P7_PHONE_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P7_PHONE_error"> <FormattedMessage id="Amirah.PhoneNumber" defaultMessage="Please enter phone number" /></div></span></span>
        }
        let postcodeInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_RADD1" name="P25_RADD1" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} /></div><span id="P25_RADD1_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div>
        /*if ('postcode' in errorsObj) {

            postcodeInputField = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_RADD1" name="P25_RADD1" className="text_field apex-item-text apex-page-item-error" value size={30} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} aria-describedby="P25_RADD1_error" aria-invalid="true" /></div><span id="P25_RADD1_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P25_RADD1_error"> <FormattedMessage id="Postcode.Validate" defaultMessage="Please enter Post Code" /></div></span></span></div>;

        }*/


        return (
            <form >
                <input type="hidden" name="p_flow_id" value={2019} id="pFlowId" /><input type="hidden" name="p_flow_step_id" value={25} id="pFlowStepId" /><input type="hidden" name="p_instance" value={20414079679035} id="pInstance" /><input type="hidden" name="p_page_submission_id" value={292881855944229881009133032913601640089} id="pPageSubmissionId" /><input type="hidden" name="p_request" value id="pRequest" /><input type="hidden" name="p_reload_on_submit" value="S" id="pReloadOnSubmit" /><input type="hidden" value={292881855944229881009133032913601640089} id="pSalt" /><div className="t-Dialog" role="dialog" aria-label="Add Address">
                    <div className="t-Dialog-header" />
                    <div className="t-Dialog-bodyWrapperOut">
                        <div className="t-Dialog-bodyWrapperIn"><div className="t-Dialog-body">
                            <span id="APEX_SUCCESS_MESSAGE" data-template-id="33515671899469661_S" className="apex-page-success u-hidden" /><span id="APEX_ERROR_MESSAGE" data-template-id="33515671899469661_E" className="apex-page-error u-hidden" />
                            <div className="container">
                                <div className="row">
                                    <div className="col col-12 apex-col-auto" style={{ height: 'auto' }}>
                                        <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noUI t-Region--hiddenOverflow t-Form--slimPadding t-Form--stretchInputs t-Form--labelsAbove margin-top-none margin-bottom-none" id="DTA">
                                            <div className="t-Region-header">
                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                    <h2 className="t-Region-title" id="DTA_heading">Address information</h2>
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
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field " onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_FIRST_NAME_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_FIRST_NAME" id="P25_FIRST_NAME_LABEL" className="t-Form-label">
                                                                            <FormattedMessage id="Form.FirstName" defaultMessage="First Name" />
                                                                            <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                    </div>
                                                                    {firstNameInputField}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_LAST_NAME_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_LAST_NAME" id="P25_LAST_NAME_LABEL" className="t-Form-label"><FormattedMessage id="Form.LastName" defaultMessage="Last Name" /></label>
                                                                    </div>
                                                                    {lastNameInputField}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P25_R_COUNTRY_CONTAINER"><div className="t-Form-labelContainer">
                                                                    <label htmlFor="P25_R_COUNTRY" id="P25_R_COUNTRY_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.Location" defaultMessage="Select Country" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                </div>

                                                                    {location}


                                                                </div>
                                                            </div>
                                                        </div><div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P25_R_CITY_CONTAINER"><div className="t-Form-labelContainer">
                                                                    <label htmlFor="P25_R_CITY" id="P25_R_CITY_LABEL" className="t-Form-label">
                                                                        <FormattedMessage id="Checkout.City" defaultMessage="Select City" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                </div>


                                                                    {citsWithErrorSpan}



                                                                </div>
                                                            </div>
                                                        </div><div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field " onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_RADD1_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_RADD1" id="P25_RADD1_LABEL" className="t-Form-label"><FormattedMessage id="Address1.Text" defaultMessage="Address 1*" /><span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                    </div>

                                                                    {addressOneInputField}


                                                                </div>
                                                            </div>
                                                        </div><div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_RADD2_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_RADD2" id="P25_RADD2_LABEL" className="t-Form-label"><FormattedMessage id="Address2.Text" defaultMessage="Address 2" /></label>
                                                                    </div>

                                                                    <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><input type="text" id="P25_RADD2" name="P25_RADD2" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressTwo")} value={this.state.AddressFields["addressTwo"]} /></div><span id="P25_RADD2_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div>


                                                                </div>
                                                            </div>
                                                        </div><div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_RADD3_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_RADD3" id="P25_RADD3_LABEL" className="t-Form-label"><FormattedMessage id="Address3.Text" defaultMessage="Address 3" /></label>
                                                                    </div>


                                                                    <div className="t-Form-inputContainer">
                                                                        <div className="t-Form-itemWrapper">
                                                                            <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressThree")} value={this.state.AddressFields["addressThree"]} size={30} maxLength /></div><span id="P25_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div>


                                                                </div>
                                                            </div>
                                                            {/* <div className="col col-6 apex-col-auto">


                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label">
                                                                <div className="t-Form-inputContainer PhoneNumber">
                                                                    <PhoneNumber
                                                                        changed={this.contactNumber}
                                                                        isdefaultPhone={this.state.isdefaultPhone}
                                                                        defaultPhone={{ ...defaultPhoneNumber }} />
                                                                    {contactNumberInputField}

                                                                </div>
                                                            </div>
                                                        </div> */}
                                                        </div>
                                                        <div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_RADD3_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_RADD3" id="P25_RADD3_LABEL" className="t-Form-label"><FormattedMessage id="Postcode.Text" defaultMessage="Post Code" /></label>
                                                                    </div>
                                                                    <div className="t-Form-inputContainer">
                                                                        <div className="t-Form-itemWrapper">
                                                                            <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} size={30} maxLength />
                                                                        </div>
                                                                        <span id="P25_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                    </div>
                                                                    {/* {postcodeInputField} */}
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col col-12 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label intel-phone-width">
                                                                    <div id="PhoneNumber" className="t-Form-inputContainer PhoneNumber country-model">
                                                                        <PhoneNumber
                                                                            changed={this.contactNumber}
                                                                            isdefaultPhone={this.state.isdefaultPhone}
                                                                            defaultPhone={{ ...defaultPhoneNumber }} />
                                                                        {contactNumberInputField}

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row country-inside">
                                                            <div className="col col-6 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel  apex-item-wrapper apex-item-wrapper--radiogroup " id="P25_ADDR_TYPE_CONTAINER"><div className="t-Form-labelContainer">
                                                                    <label htmlFor="P25_ADDR_TYPE" id="P25_ADDR_TYPE_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.AddressType" defaultMessage="Address Type" /></label>
                                                                </div>


                                                                    <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><div tabIndex={-1} id="P25_ADDR_TYPE" aria-labelledby="P25_ADDR_TYPE_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                                                                        <div className="apex-item-grid radio_group">
                                                                            <div className="apex-item-grid-row" onChange={this.setAddressType}>
                                                                                <div className="apex-item-option"><input type="radio" id="P25_ADDR_TYPE_0" name="P25_ADDR_TYPE" value="Home" /><label htmlFor="P25_ADDR_TYPE_0"><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></label></div>
                                                                                <div className="apex-item-option"><input type="radio" id="P25_ADDR_TYPE_1" name="P25_ADDR_TYPE" value="Work" defaultChecked="checked" /><label htmlFor="P25_ADDR_TYPE_1"><FormattedMessage id="Checkout.Work" defaultMessage="Work" /></label></div>
                                                                            </div></div></div>
                                                                    </div><span id="P25_ADDR_TYPE_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div>


                                                                </div>
                                                            </div><div className="col col-6 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--large apex-item-wrapper apex-item-wrapper--yes-no " id="P25_PRIMARY_ADDR_CONTAINER"><div className="t-Form-labelContainer">
                                                                    <label htmlFor="P25_PRIMARY_ADDR" id="P25_PRIMARY_ADDR_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.PrimaryAddress" defaultMessage="Primary Address" /> ?</label>
                                                                </div>


                                                                    <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><div tabIndex={-1} id="P25_PRIMARY_ADDR" className="apex-button-group apex-item-group apex-item-group--switch" role="group" aria-labelledby="P25_PRIMARY_ADDR_LABEL" onChange={this.setPrimaryAddress}>
                                                                        <legend className="u-VisuallyHidden"><FormattedMessage id="Checkout.PrimaryAddress" defaultMessage="Primary Address" /> ?</legend>

                                                                        <span className="apex-item-option apex-item-option--yes">
                                                                            <input type="radio" id="P25_PRIMARY_ADDR_Y" name="P25_PRIMARY_ADDR" value={1} checked="checked" /><label htmlFor="P25_PRIMARY_ADDR_Y" className="a-Button"><FormattedMessage id="Yes.Text" defaultMessage="Yes" /></label></span>

                                                                        <span className="apex-item-option apex-item-option--no">
                                                                            <input type="radio" id="P25_PRIMARY_ADDR_N" name="P25_PRIMARY_ADDR" value={0} /><label htmlFor="P25_PRIMARY_ADDR_N" className="a-Button"><FormattedMessage id="No.Text" defaultMessage="No" /></label></span>


                                                                    </div>

                                                                    </div><span id="P25_PRIMARY_ADDR_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div>


                                                                </div><input type="hidden" id="P25_ADDR_ID" name="P25_ADDR_ID" value /><input type="hidden" id="P25_CUS_COUNTRY" name="P25_CUS_COUNTRY" value /><input type="hidden" id="P25_CUS_CITY" name="P25_CUS_CITY" value />
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
                            </div>
                        </div></div>
                    </div>
                    <div className="t-Dialog-footer"><div className="t-ButtonRegion t-Form--floatLeft " id="R28609198427643356">
                        <div className="t-ButtonRegion-wrap">
                            <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                            <div className="t-ButtonRegion-col t-ButtonRegion-col--content">
                                <h2 className="t-ButtonRegion-title" id="R28609198427643356_heading">Buttons</h2>
                                <div className="t-ButtonRegion-buttons" />
                            </div>
                            <div className="t-ButtonRegion-col t-ButtonRegion-col--right">
                                <div className="t-ButtonRegion-buttons">
                                    <button onClick={this.cancelAddNewAddress} className="t-Button " type="button" id="B28609463169643358">
                                        <span className="t-Button-label">
                                            <FormattedMessage id="Cancel.Btn" defaultMessage="Cancel" />
                                        </span>
                                    </button>
                                    {/* {cancelButton} */}
                                    {/* <button onClick={this.saveAddress} className="t-Button t-Button--hot " type="button" id="B28609333203643357">
                                        <span className="t-Button-label">
                                            <FormattedMessage id="SaveAddress.Btn" defaultMessage="Save Address" />
                                        </span>
                                    </button> */}
                                </div>
                            </div>
                        </div>
                    </div></div>
                </div>
                <div className="DeliveryDetails container">
                    <div className="row">
                        <div className="col col-6 ">
                            <button onClick={this.goToCartDetails} className="t-Button t-Button--noLabel t-Button--icon t-Button--large t-Button--pillStart t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280522081851518" title="Continue Shopping" aria-label="Continue Shopping">
                                <span className="t-Button-label">
                                    <FormattedMessage id="Cart.ContinueShopping.Title" defaultMessage="Continue Shopping" />
                                </span>
                            </button>
                        </div>
                        <div className="col col-6 ">
                            <button onClick={this.newSubmitForm} className="t-Button t-Button--hot t-Button--large t-Button--pillEnd t-Button--stretch t-Button--padLeft t-Button--padRight t-Button--padTop t-Button--padBottom" type="button" id="B29280091835851517">
                                <span className="t-Button-label">
                                    <FormattedMessage id="Checkout.Proceed" defaultMessage="Proceed" />
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                             <input type="hidden" id="pPageItemsRowVersion" /> 
                    <input type="hidden" id="pPageItemsProtected" value="k64SkfqFSNPggSJxRRzy-w" />
            </form >

        );
    }
}

const mapStateToProps = state => {
    return {
        customer_details: state.login.customer_details,
        country_list: state.address.countryList,
        cart_details: state.myCart,
        user_details: state.login,
        guest_user: state.guest_user,
        globals: state.global,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onAddNewAddress: (payload) => dispatch(actions.addNewAddress(payload)),
        onGetCountryList: () => dispatch(actions.getCountryList()),
        onRedirectToCart: () => dispatch(actions.redirectToCart()),
        OnGetShippingDetails: (quoteId) => dispatch(actions.getAddressFromShippingDetails(quoteId)),
        OnaddNewAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddNewAddressAndRedirectToCheckout(quoteId)),
        // onEditAddress: (payload) => dispatch(actions.editAddress(payload)),

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryLocation);