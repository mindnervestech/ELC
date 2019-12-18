
import React, { Component } from 'react';
import PhoneNumber from '../Login/IntlTelePhone';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Link, Redirect,withRouter } from 'react-router-dom';
import { Row, Col, Button } from 'reactstrap';
const wait = require('../../../assets/images/wait.gif');

class AddressForm extends Component {

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
            goToAddressBook:false,
            addressId: "",
            cities: [],
            country_details: {},
            city_details: {},
            errors: {},
            isPhoneValid: false,
            isdefaultPhone: false,
            showAddressAddAlert:false,
            showPleaseWait:false

        }
      
    }
  

    componentDidUpdate(prevProps, prevState) {
        if (prevState.cities.length !== this.state.cities.length) {
            if (this.props.Actype === 'Edit') {
                this.setCitydetails(this.props.addressForEdit.region_id)
            }
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("NextProps from add address",nextProps)
        if (nextProps.addressResp.status == true) {
            this.setState({ showAddressAddAlert: true })
            setTimeout(() => {
                this.closeAlert();
            }, 2000);

        }
        if (nextProps.addressResp.status == false) {
            this.setState({ showAddressAddAlert: true });
            setTimeout(() => {
                this.closeAlert();
            }, 2000);
        }

    }
    goToAddressBook=(e)=>{
        e.preventDefault();
        this.setState({goToAddressBook:true});
    }
    onClearFormData = () => {
        this.setState({
            ...this.state,
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
            }
        })
    }
    closeAlert = () => {
        this.setState({ showAddressAddAlert: false })
        this.props.onClearAddressResponse();
        this.onClearFormData();
        this.setState({ showPleaseWait: false })
        document.location.reload();
    }

    componentDidMount() {

        if(this.props.location.addressProps!==undefined){
           
         // this.state.AddressFields=this.props.addressProps;   
          this.defineCities(this.props.location.addressProps.country_id);
            this.setCitydetails(this.props.location.addressProps.region_id);

            let addStrig = this.props.location.addressProps.street.split(',');
            setTimeout(() => {
                this.setState({
                    AddressFields: {
                        ...this.state.AddressFields,
                        WebsiteId: 1,
                        firstName: this.props.location.addressProps.userFirstName,
                        lastName: this.props.location.addressProps.userLastName,
                        location: this.props.location.addressProps.country_id,
                        city: this.props.location.addressProps.region_id,
                        addressOne: addStrig[0],
                        addressTwo: addStrig[1],
                        addressThree: addStrig[2],
                        primaryAddress: 0,
                        postcode: this.props.location.addressProps.postcode,
                        carrierCode: this.props.location.addressProps.carrier_code,
                       UserCity: this.state.city_details.name,
                       UserRegionId: this.state.city_details.id,

                       
                    },
                    addressId: this.props.location.addressProps.Id,
                    isdefaultPhone: true,
                })
                
            }, 100);
         
        }else{
            this.setState({AddressFields:{}});
        }
        // console.log('Address for Edit : ', this.props);
        if (this.props.country_list.length <= 0) {
            this.props.onGetCountryList();
        }

        // if (this.props.Actype === 'Edit') {
        //     this.defineCities(this.props.addressForEdit.country_id);
        //     this.setCitydetails(this.props.addressForEdit.region_id);

        //     let addStrig = this.props.addressForEdit.street.split(',');
        //     this.setState({
        //         AddressFields: {
        //             ...this.state.AddressFields,
        //             WebsiteId: 1,
        //             firstName: this.props.addressForEdit.userFirstName,
        //             lastName: this.props.addressForEdit.userLastName,
        //             location: this.props.addressForEdit.country_id,
        //             city: this.props.addressForEdit.region_id,
        //             addressOne: addStrig[0],
        //             addressTwo: addStrig[1],
        //             addressThree: addStrig[2],
        //             primaryAddress: 0,
        //             postcode: this.props.addressForEdit.postcode,
        //             carrierCode: this.props.addressForEdit.carrier_code,
        //             carrier_code: this.props.addressForEdit.carrier_code,
        //         },
        //         addressId: this.props.addressForEdit.Id,
        //         isdefaultPhone: true,
        //     })


        // }
    }

    saveAddress = (e) => {
        //console.log(this.state);
        e.preventDefault();
        if (this.handleValidation() && this.state.city_details.name && this.state.city_details.id) {
            this.setState({ showPleaseWait: true })
            this.saveAddressAPI();
        }
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

        /*if (!fields["postcode"]) {
            formIsValid = false;
            errors["postcode"] = <FormattedMessage id="Postcode.Validate" defaultMessage="Please enter Post code" />;
        }*/

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



    saveAddressAPI = () => {
        //console.log(this.state);
        let payload = {
            addressId: this.state.addressId,
            UserId: this.props.customer_details.customer_id,
            UserFirstName: this.state.AddressFields.firstName,
            UserLastName: this.state.AddressFields.lastName,
            WebsiteId: 1,
            countryCode: this.state.country_details.id,
            carrier_code: this.state.AddressFields.carrierCode,
            UserTelephone: parseInt(this.state.AddressFields.contactNumber),
            UserStreet: this.createStreet(),
            UserCity: this.state.city_details.name,
            UserRegionId: this.state.city_details.id,
            UserCountry: this.state.AddressFields.location,
            DefaultBilling: this.state.AddressFields.primaryAddress,
            DefaultShipping: this.state.AddressFields.primaryAddress,
            AddressType: this.state.AddressFields.addressType,
            postcode: this.state.AddressFields.postcode,
        };
        console.log(payload)
        if (this.state.addressId !== '') {
            this.props.onAddNewAddress(payload);
        } else {
            this.props.onEditAddress(payload);
        }


    }

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


    render() {
        //console.log(this.state.addressId);
        //console.log(this.state);

        let respo_message = null;
        if (this.state.showAddressAddAlert) {
            respo_message = <span id="APEX_SUCCESS_MESSAGE" data-template-id="126769709897686936_S" className="apex-page-success u-visible"><div className="t-Body-alert">
                <div className="t-Alert t-Alert--defaultIcons t-Alert--success t-Alert--horizontal t-Alert--page t-Alert--colorBG" id="t_Alert_Success" role="alert">
                    <div className="t-Alert-wrap">
                        <div className="t-Alert-icon">
                            <span className="t-Icon" />
                        </div>
                        <div className="t-Alert-content">
                            <div className="t-Alert-header">
                                <h2 className="t-Alert-title">{this.props.addressResp.message}</h2>
                            </div>
                        </div>
                        <div className="t-Alert-buttons">
                            <button className="t-Button t-Button--noUI t-Button--icon t-Button--closeAlert" type="button" title="Close Notification" onClick={() => this.closeAlert()}><span className="t-Icon icon-close" /></button>
                        </div>
                    </div>
                </div>
            </div></span>;
        }



        let store_locale=this.props.globals.store_locale;
        if(this.state.goToAddressBook===true){
            return <Redirect to={{
                pathname: `/${store_locale}/address-book`,
            }} />;
        }
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
                carrier_code: this.props.location.addressProps.carrier_code,
                contactNumber: this.props.location.addressProps.telephone,
            }
        }

        //console.log('>>>>', this.state);



        const errorsObj = this.state.errors;

        let firstNameInputField = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper">
            <input type="text" id="P25_FIRST_NAME" style={{minHeight: '5rem', padding: '3.2rem .8rem .6rem'}} name="P25_FIRST_NAME" className="text_field apex-item-text" onChange={this.handleChange.bind(this, "firstName")} value={this.state.AddressFields["firstName"]} size="30" maxLength="" /></div>
            <span id="P25_FIRST_NAME_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" /></div>;


        let lastNameInputField = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper">
                <input type="text" id="P25_LAST_NAME" name="P25_LAST_NAME" style={{minHeight: '5rem', padding: '3.2rem .8rem .6rem'}} className="text_field apex-item-text" onChange={this.handleChange.bind(this, "lastName")} value={this.state.AddressFields["lastName"]} size="30" maxLength="" /></div><span id="P25_LAST_NAME_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div>


        let location = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper">
                <select id="P25_R_COUNTRY" name="P25_R_COUNTRY" className="selectlist apex-item-select" readOnly="readonly" size={1} onChange={this.handleChange.bind(this, "location")} value={this.state.AddressFields["location"]}>
                <FormattedMessage id="SelectCountry.Text" defaultMessage="Select Country">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                    <option value={'SA'}>{'Saudi Arabia'}</option>
                    <option value={'AE'}>{'United Arab Emirates'}</option>
                  

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

        let postcodeInputField =

            <div className="t-Form-inputContainer">
                <div className="t-Form-itemWrapper">
                    <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} size={30} maxLength />
                </div>
                <span id="P25_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
            </div>
        /*if ('postcode' in errorsObj) {
            postcodeInputField =
                <div className="t-Form-inputContainer">
                    <div className="t-Form-itemWrapper">
                        <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text apex-page-item-error" value size={30} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} aria-describedby="P25_RADD1_error" aria-invalid="true" />
                    </div>
                    <span id="P25_RADD1_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET">
                        <span className="t-Form-error">
                            <div id="P25_RADD1_error">
                                <FormattedMessage id="Postcode.Validate" defaultMessage="Please enter Post Code" />
                            </div>
                        </span>
                    </span>
                </div>;
        }*/


        return (
            <form >
                <input type="hidden" name="p_flow_id" value={2019} id="pFlowId" /><input type="hidden" name="p_flow_step_id" value={25} id="pFlowStepId" /><input type="hidden" name="p_instance" value={20414079679035} id="pInstance" /><input type="hidden" name="p_page_submission_id" value={292881855944229881009133032913601640089} id="pPageSubmissionId" /><input type="hidden" name="p_request" value id="pRequest" /><input type="hidden" name="p_reload_on_submit" value="S" id="pReloadOnSubmit" /><input type="hidden" value={292881855944229881009133032913601640089} id="pSalt" /><div className="t-Dialog color-add-address-back" role="dialog" aria-label="Add Address">
                    <div className="t-Dialog-header " style={{color:'#fff !important'}} />
                    {respo_message }
                    <div className="t-Dialog-bodyWrapperOut" >
                        <div className="t-Dialog-bodyWrapperIn color-add-address-back"><div className="t-Dialog-body">
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
                                                            <div className="col col-6 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--text-field " onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_FIRST_NAME_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_FIRST_NAME" id="P25_FIRST_NAME_LABEL" className="t-Form-label">
                                                                            <FormattedMessage id="Form.FirstName" defaultMessage="First Name*" />
                                                                            <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                    </div>


                                                                    {firstNameInputField}


                                                                </div>
                                                            </div><div className="col col-6 apex-col-auto">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_LAST_NAME_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_LAST_NAME" id="P25_LAST_NAME_LABEL" className="t-Form-label"><FormattedMessage id="Form.LastName" defaultMessage="Last Name*" /></label>
                                                                    </div>
                                                                    {lastNameInputField}



                                                                </div>
                                                            </div>
                                                        </div><div className="row">
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
                                                        <Row className="row">
                                                            <Col xs="12" lg="6" md="6" className="editAddresspopupPadding">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                    onBlur={(e) => this.divOnBlure(e)} id="P25_RADD3_CONTAINER"><div className="t-Form-labelContainer">
                                                                        <label htmlFor="P25_RADD3" id="P25_RADD3_LABEL" className="t-Form-label"><FormattedMessage id="Postcode.Text" defaultMessage="Post Code" /></label>
                                                                    </div>
                                                                    {/* <div className="t-Form-inputContainer">
                                                                        <div className="t-Form-itemWrapper">
                                                                            <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} size={30} maxLength />
                                                                        </div>
                                                                        <span id="P25_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                    </div> */}
                                                                    {postcodeInputField}
                                                                </div>
                                                            </Col>
                                                            <Col xs="12" lg="6" md="6" className="editAddresspopupPadding">
                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper plugin-intltelinput-www.jqueryscript.net js-show-label">
                                                                    <div className="t-Form-inputContainer PhoneNumber">
                                                                        <PhoneNumber
                                                                            changed={this.contactNumber}
                                                                            isdefaultPhone={this.state.isdefaultPhone}
                                                                            defaultPhone={{ ...defaultPhoneNumber }} />
                                                                        {contactNumberInputField}

                                                                    </div>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        <div className="row">
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


                                                                </div>
                                                            </div>
                                                            <div className="col col-12 apex-col-auto ">
                                                                <div style={{ display: 'flex' }}>
                                                                    <button className="alsoLikeCardButton cancel-button" style={{ marginRight: 10, marginBottom: 30, marginTop: 10 }} onClick={(e) => this.goToAddressBook(e)} ><span><FormattedMessage id="Cancel.Btn" defaultMessage="Cancel"/></span></button>

                                                                    {this.state.showPleaseWait ?
                                                                        <button style={{ height: 50, marginRight: 10, marginBottom: 30, marginTop: 10 }} className="alsoLikeCardButton save-button" type="button" disabled={true}>
                                                                            <img src={wait} style={{ width: 25, height: 20, marginTop: -4 }} alt="" />
                                                                            <span className="t-Button-label"><FormattedMessage id="PleaseWait" defaultMessage="Please wait......." /></span>
                                                                        </button> :
                                                                        <button className="alsoLikeCardButton save-button" style={{ marginRight: 10, marginBottom: 30, marginTop: 10 }} onClick={(e) => this.saveAddress(e)} ><span><FormattedMessage id="Save.text" defaultMessage="Save"/></span></button>}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="t-Region-buttons t-Region-buttons--bottom">
                                                    <div className="t-Region-buttons-left" />
                                                    <div className="t-Region-buttons-right" />
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div></div>
                    </div>


                </div> <input type="hidden" id="pPageItemsRowVersion" /> <input type="hidden" id="pPageItemsProtected" value="k64SkfqFSNPggSJxRRzy-w" /></form >

        );
    }
}

const mapStateToProps = state => {
    return {
        customer_details: state.login.customer_details,
        country_list: state.address.countryList,
        addressResp:state.address.addressResp,
        globals:state.global
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddNewAddress: (payload) => dispatch(actions.addNewAddress(payload)),
        onGetCountryList: () => dispatch(actions.getCountryList()),
        onEditAddress: (payload) => dispatch(actions.editAddress(payload)),
        onClearAddressResponse:(payload)=>dispatch(actions.clearAddressResponse(payload))

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddressForm);
