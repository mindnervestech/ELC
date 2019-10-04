import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';
import { FormattedMessage } from 'react-intl';
import { Container, Row, Col, Button } from 'reactstrap';

class Address extends Component {

    constructor(props) {
        super(props);
        this.state = {
            AddressFields: {
                WebsiteId: 1,
                location: '',
                countryCode: '',
                city: '',
                addressOne: '',
                addressTwo: '',
                addressThree: '',
                addressType: 'Home',
                primaryAddress: 0,
                postcode: '',
            },
            city_details: {},
            errors: {},
            isPhoneValid: false,
            data: {},
            cities: [],
            country_details: {},
        }
    }

    componentDidMount() {
        const selected_country = this.props.globals.country;
        if(this.props.country_list.length == 0){
            this.props.onGetCountryList();
        }
        if (selected_country === 'KSA' || selected_country === 'ksa') {
            this.setState({
                cities: [],
                AddressFields: {
                    ...this.state.AddressFields,
                    location: 'SA',
                    city: ''
                }
            })
            this.defineCities('SA');
        } else if (selected_country === 'UAE' || selected_country === 'uae') {
            this.setState({
                cities: [],
                AddressFields: {
                    ...this.state.AddressFields,
                    location: 'AE',
                    city: ''
                }
            })
            this.defineCities('AE');
        }
        // } else if (selected_country === 'International') {
        //   this.setState({
        //     cities: [],
        //     AddressFields: {
        //       ...this.state.AddressFields,
        //       location: 'SA',
        //       city: ''
        //     }
        //   })
        //   this.defineCities('SA');
        // }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // const selected_country = this.props.globals.country;
        if (this.props.globals.country !== prevProps.globals.country) {
            const selected_country = this.props.globals.country;
            if (selected_country === 'KSA') {
                this.setState({
                    cities: [],
                    AddressFields: {
                        ...this.state.AddressFields,
                        location: 'SA',
                        city: ''
                    }
                })
                this.defineCities('SA');
            } else if (selected_country === 'UAE') {
                this.setState({
                    cities: [],
                    AddressFields: {
                        ...this.state.AddressFields,
                        location: 'AE',
                        city: ''
                    }
                })
                this.defineCities('AE');
            }
        }
    }

    cancelAddNewAddress = () => {
        this.props.cancelAddNewAddress();
    }

    handleValidation = () => {
        let fields = this.state.AddressFields;
        let errors = {};
        let formIsValid = true;

        if (!fields["location"]) {
            formIsValid = false;
            errors["location"] = <FormattedMessage id="SelectCountry.Validate" defaultMessage="Select Country" />;
        }

        if (fields["location"] === 'NA') {
            formIsValid = false;
            errors["location"] = <FormattedMessage id="SelectCountry.Validate" defaultMessage="Select Country" />;
        }

        if (fields["city"] === 'NA') {
            formIsValid = false;
            errors["city"] = <FormattedMessage id="SelectCity.Validate" defaultMessage="Select City" />;
        }

        if (!fields["city"]) {
            formIsValid = false;
            errors["city"] = <FormattedMessage id="SelectState.Validate" defaultMessage="Please Select State/City" />;
        }

        if (!fields["addressOne"]) {
            formIsValid = false;
            errors["addressOne"] = <FormattedMessage id="Address.Validate" defaultMessage="Please enter address" />;
        }

        if (!fields["postcode"]) {
            formIsValid = false;
            errors["postcode"] = <FormattedMessage id="Postcode.Validate" defaultMessage="Please enter Post code" />;
        }

        let obj = this.state.city_details;
        if ((Object.entries(obj).length === 0) && (obj.constructor === Object)) {
            formIsValid = false;
            errors["city"] = <FormattedMessage id="SelectState.Validate" defaultMessage="Please Select State/City" />;
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    signUpSubmitAddress = () => {
        if (this.handleValidation()) {
            this.addInfo();
        }

    }

    addInfo = () => {
        this.props.changed(this.state);
    }

    handleChange = (field, e) => {


        let fields = this.state.AddressFields;
        fields[field] = e.target.value;
        this.setState({ fields });

        if (field === 'location') {
            this.setState({
                cities: [],
                AddressFields: {
                    ...this.state.AddressFields,
                    city: ''
                }
            })
            this.defineCities(e.target.value);
        } else if (field === 'city') {
            this.setCitydetails(e.target.value);
        }
    }

    defineCities = (location) => {
        if ((location !== null) && (location !== 'NA')) {
            const countryList = this.props.country_list;

            let result = countryList.filter(obj => {
                return obj.id === location
            })

            if(result[0]){
                this.setState({
                    country_details: result[0],
                    cities: result[0].available_regions
                })
            }
            
        } else if (location === 'NA') {
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
        if ((city !== null) && (city !== 'NA')) {
            const cityList = this.state.cities;
            let result = cityList.filter(obj => {
                return obj.id === city
            })
            if (result.length > 0) {
                this.setState({
                    city_details: result[0]
                });
            }
        }
    }

    setAddressType = (event) => {
        let fields = this.state.AddressFields;
        fields['addressType'] = event.target.value;
        this.setState({ fields });

    }

    setPrimaryAddress = (event) => {
        let fields = this.state.AddressFields;
        fields['primaryAddress'] = event.target.value;
        this.setState({ fields });

    }

    divOnFocus = (e) => {
        e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
    }

    divOnBlure = (e) => {
        if ((e.target.value === null) || (e.target.value === '')) {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field';
        } else {
            e.currentTarget.className = 't-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field is-active';
        }
    }

    render() {
        let cancelButton = null;
        const selected_country = this.props.globals.country;
        const country_list = this.props.country_list;
        const city_list = this.state.cities;
        let country_select_list = null;
        let city_select_list = null;
        if (country_list.length > 0) {
            if (selected_country === 'International') {
                country_select_list = country_list.filter((item) => {
                    if (item.id === 'SA' || item.id === 'AE') {
                        return false;
                    } else {
                        return true
                    }
                }).map((item) => {
                    return (
                        <option key={item.id} value={item.id} selected={true}>{item.full_name_english}</option>
                    );
                })
            } else if (selected_country === 'KSA' || selected_country === 'ksa') {
                //this.defineCities('SA');
                country_select_list = country_list.filter(item => item.id === 'SA').map((item) => {
                    return (
                        <option key={item.id} value={item.id} selected={true}>{item.full_name_english}</option>
                    );
                })
            } else if (selected_country === 'UAE' || selected_country === 'uae') {
                //this.defineCities('AE');
                country_select_list = country_list.filter(item => item.id === 'AE').map((item) => {
                    return (
                        <option key={item.id} value={item.id} selected={true}>{item.full_name_english}</option>
                    );
                })
            }
        }

        if (city_list.length !== 0) {
            city_select_list = city_list.map((item) => {
                return (
                    <option value={item.id}>{item.name}</option>
                );
            })
        }

        if (this.props.cancelButtonShow) {
            cancelButton = <>
                <div className="row">
                    <div className="col col-2 ">
                        <span className="apex-grid-nbsp">&nbsp;</span>
                    </div>
                    <div className="col col-8 ">
                        <button onClick={this.cancelAddNewAddress} className="t-Button t-Button--stretch" type="button" id="B28612834462643392"><span className="t-Button-label">Cancel</span></button><input type="hidden" id="P7_ADDR_ID" name="P7_ADDR_ID" /><input type="hidden" id="P7_CUS_COUNTRY_1" name="P7_CUS_COUNTRY_1" /><input type="hidden" id="P7_CUS_CITY_1" name="P7_CUS_CITY_1" />
                    </div>
                </div></>;
        }


        const errorsObj = this.state.errors;

        let locationWithErrorSpan = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P7_R_COUNTRY" name="P7_R_COUNTRY" className="selectlist apex-item-select" size={1} onChange={this.handleChange.bind(this, "location")} value={this.state.AddressFields["location"]} >
            <FormattedMessage id="SelectCountry.Text" defaultMessage="Select Country">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
            {country_select_list}
        </select></div><span id="P7_R_COUNTRY_error_placeholder" className="a-Form-error u-hidden" data-template-id="126609057202360425_ET" /></div>
            ;

        let citsWithErrorSpan = <div className="t-Form-inputContainer">
            <div className="t-Form-itemWrapper">
                <select id="P7_R_CITY" name="P7_R_CITY" className="selectlist apex-item-select" size={1} onChange={this.handleChange.bind(this, "city")} value={this.state.AddressFields["city"]}>
                <FormattedMessage id="SelectCity.Text" defaultMessage="Select City">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                    {city_select_list}
                </select></div>
            <span id="P7_R_CITY_error_placeholder" className="a-Form-error" data-template-id="33610259035469734_ET" />
        </div>;


        let addressOneWithErrorSpan =
            <div className="t-Form-inputContainer">
                <div className="t-Form-itemWrapper"><input type="text" id="P7_RADD1" name="P7_RADD1" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressOne")} value={this.state.AddressFields["addressOne"]} /></div>
                <span id="P7_RADD1_error_placeholder" className="a-Form-error" data-template-id="33610144887469734_ET" />
            </div>;

        if ('location' in errorsObj) {

            locationWithErrorSpan = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P7_R_COUNTRY" name="P7_R_COUNTRY" className="selectlist apex-item-select apex-page-item-error" onChange={this.handleChange.bind(this, "location")} value={this.state.AddressFields["location"]} aria-describedby="P25_R_COUNTRY_error" aria-invalid="true">
                <FormattedMessage id="SelectCountry.Text" defaultMessage="Select Country">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                {country_select_list}
            </select></div><span id="P7_R_COUNTRY_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error"><div id="P7_R_COUNTRY_error"><FormattedMessage id="SelectCountry.Validate" defaultMessage="Select Country" /></div></span></span></div>;
        }

        if ('city' in errorsObj) {

            citsWithErrorSpan = <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><select id="P7_R_CITY" name="P7_R_CITY" className="selectlist apex-item-select apex-page-item-error" size={1} onChange={this.handleChange.bind(this, "city")} value={this.state.AddressFields["city"]} aria-describedby="P7_R_CITY_error" aria-invalid="true">
                <FormattedMessage id="SelectCity.Text" defaultMessage="Select City">
                {(message) =>
                    <option value={'NA'} selected="selected">{message}</option>
                }</FormattedMessage>
                {city_select_list}
            </select></div><span id="P7_R_CITY_error_placeholder" className="a-Form-error u-visible" data-template-id="33610259035469734_ET"><span className="t-Form-error">
                <div id="P7_R_CITY_error">{this.state.errors.city}</div></span></span></div>;
        }

        let postcodeInputField =

            <div className="t-Form-inputContainer">
                <div className="t-Form-itemWrapper">
                    <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} size={30} maxLength />
                </div>
                <span id="P25_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
            </div>
        if ('postcode' in errorsObj) {
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
        }

        if ('addressOne' in errorsObj) {
            addressOneWithErrorSpan =
                <div className="t-Form-inputContainer">
                    <div className="t-Form-itemWrapper"><input type="text" id="P7_RADD1" name="P7_RADD1" className="text_field apex-item-text apex-page-item-error" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressOne")} value={this.state.AddressFields["addressOne"]} aria-describedby="P7_RADD1_error" aria-invalid="true" /></div>
                    <span id="P7_RADD1_error_placeholder" className="a-Form-error u-visible" data-template-id="33610144887469734_ET">
                        <span className="t-Form-error">
                            <div id="P7_RADD1_error">{this.state.errors.addressOne}</div></span></span></div>;
        }
        return (<>
            <div className="t-Region find-store_hide t-Region--removeHeader t-Region--stacked t-Region--hiddenOverflow find-store_show" id="DTA">

                <div className="t-Region-header">
                    <div className="t-Region-headerItems t-Region-headerItems--title">
                        <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                        <h2 className="t-Region-title" id="DTA_heading"><FormattedMessage id="delivery-details.AddressInformation.Title" defaultMessage="Address Information" /></h2>
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
                                <Col xs="12" lg="3" md="12" className="paddingRemove">
                                    <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R34927712771907735">
                                        <div className="t-Region-header">
                                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                <h2 className="t-Region-title" id="R34927712771907735_heading">Contact Information Heading</h2>
                                            </div>
                                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                        </div>
                                        <div className="t-Region-bodyWrap">
                                            <div className="t-Region-buttons t-Region-buttons--top">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                            </div>
                                            <div className="t-Region-body">
                                                <h3 className="title-block" style={{ fontSize: '12px', lineHeight: '16px', letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 'normal' }}>
                                                    <span><FormattedMessage id="delivery-details.AddressInformation.Title" defaultMessage="Address Information" /></span>
                                                </h3>
                                            </div>
                                            <div className="t-Region-buttons t-Region-buttons--bottom">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="12" lg="9" md="12" style={{paddingLeft: 0, paddingRight: 0}}>
                                    <div className="t-Region t-Region--noPadding t-Region--removeHeader t-Region--noUI t-Region--hiddenOverflow t-Form--slimPadding t-Form--stretchInputs t-Form--labelsAbove margin-top-none margin-bottom-none" id="R631680584527102694">
                                        <div className="t-Region-header">
                                            <div className="t-Region-headerItems t-Region-headerItems--title">
                                                <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                <h2 className="t-Region-title" id="R631680584527102694_heading">Add New Address</h2>
                                            </div>
                                            <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                        </div>
                                        <div className="t-Region-bodyWrap">
                                            <div className="t-Region-buttons t-Region-buttons--top">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                            </div>
                                            <div className="t-Region-body">
                                                <p style={{ fontSize: '11px', marginBottom: '20px' }}>
                                                     <FormattedMessage id="delivery-details.addressContent" defaultMessage="Address Information content" /></p>
                                                <div className="container" style={{paddingLeft: 0, paddingRight: 0}}>
                                                    {/* <i className="fa fa-exclamation-circle" style={{ color: '#f599ba', fontSize: '22px' }} /> */}
                                                     <FormattedMessage id="delivery-details.addressContent" defaultMessage="Address Information content" />
                                                     </div>
                                                <div className="container" style={{paddingLeft: 0, paddingRight: 0}}>
                                                    <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P7_R_COUNTRY_CONTAINER"><div className="t-Form-labelContainer">
                                                                <label htmlFor="P7_R_COUNTRY" id="P7_R_COUNTRY_LABEL" className="t-Form-label">
                                                                    <FormattedMessage id="Checkout.Location" defaultMessage="Location" />
                                                                    <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                            </div>
                                                                {locationWithErrorSpan}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P7_R_CITY_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P7_R_CITY" id="P7_R_CITY_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.City" defaultMessage="City" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                </div>
                                                                {citsWithErrorSpan}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel is-required  apex-item-wrapper apex-item-wrapper--text-field " onFocus={(e) => this.divOnFocus(e)}
                                                                onBlur={(e) => this.divOnBlure(e)} id="P7_RADD1_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P7_RADD1" id="P7_RADD1_LABEL" className="t-Form-label"><FormattedMessage id="Address1.Text" defaultMessage="Address 1*" /> <span className="u-VisuallyHidden">(Value Required)</span></label>
                                                                </div>
                                                                {addressOneWithErrorSpan}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                onBlur={(e) => this.divOnBlure(e)} id="P7_RADD2_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P7_RADD2" id="P7_RADD2_LABEL" className="t-Form-label"><FormattedMessage id="Address2.Text" defaultMessage="Address 2" /></label>
                                                                </div>
                                                                <div className="t-Form-inputContainer">
                                                                    <div className="t-Form-itemWrapper"><input type="text" id="P7_RADD2" name="P7_RADD2" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressTwo")} value={this.state.AddressFields["addressTwo"]} /></div>
                                                                    <span id="P7_RADD2_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field " onFocus={(e) => this.divOnFocus(e)}
                                                                onBlur={(e) => this.divOnBlure(e)} id="P7_RADD3_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P7_RADD3" id="P7_RADD3_LABEL" className="t-Form-label"><FormattedMessage id="Address3.Text" defaultMessage="Address 3" /></label>
                                                                </div>
                                                                <div className="t-Form-inputContainer">
                                                                    <div className="t-Form-itemWrapper"><input type="text" id="P7_RADD3" name="P7_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "addressThree")} value={this.state.AddressFields["addressThree"]} /></div>
                                                                    <span id="P7_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col col-12 apex-col-auto">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--text-field" onFocus={(e) => this.divOnFocus(e)}
                                                                onBlur={(e) => this.divOnBlure(e)} id="P25_RADD3_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P25_RADD3" id="P25_RADD3_LABEL" className="t-Form-label"><FormattedMessage id="Postcode.Text" defaultMessage="Post Code*" /></label>
                                                                </div>
                                                                {/* <div className="t-Form-inputContainer">
                                                                    <div className="t-Form-itemWrapper">
                                                                        <input type="text" id="P25_RADD3" name="P25_RADD3" className="text_field apex-item-text" size={30} maxLength={100} onChange={this.handleChange.bind(this, "postcode")} value={this.state.AddressFields["postcode"]} size={30} maxLength />
                                                                    </div>
                                                                    <span id="P25_RADD3_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                </div> */}
                                                                {postcodeInputField}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Row className="row">
                                                        <Col xs="12" lg="6" md="6">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel  apex-item-wrapper apex-item-wrapper--radiogroup " id="P7_ADDR_TYPE_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P7_ADDR_TYPE" id="P7_ADDR_TYPE_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.AddressType" defaultMessage="Address Type" /></label>
                                                                </div>
                                                                <div className="t-Form-inputContainer">
                                                                    <div className="t-Form-itemWrapper">
                                                                        <div tabIndex={-1} id="P7_ADDR_TYPE" aria-labelledby="P7_ADDR_TYPE_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                                                                            <div className="apex-item-grid radio_group">
                                                                                <div className="apex-item-grid-row" onChange={this.setAddressType}>
                                                                                    <div className="apex-item-option"><input type="radio" id="P7_ADDR_TYPE_0" name="P7_ADDR_TYPE" defaultValue="Home" />
                                                                                        <label htmlFor="P7_ADDR_TYPE_0"><FormattedMessage id="Checkout.Home" defaultMessage="Home" /></label></div>
                                                                                    <div className="apex-item-option"><input type="radio" id="P7_ADDR_TYPE_1" name="P7_ADDR_TYPE" defaultValue="Work" /><label htmlFor="P7_ADDR_TYPE_1"><FormattedMessage id="Checkout.Work" defaultMessage="Work" /></label></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <span id="P7_ADDR_TYPE_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                        <Col xs="12" lg="6" md="6">
                                                            <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--large apex-item-wrapper apex-item-wrapper--yes-no " id="P7_PRIMARY_ADDR_CONTAINER">
                                                                <div className="t-Form-labelContainer">
                                                                    <label htmlFor="P7_PRIMARY_ADDR" id="P7_PRIMARY_ADDR_LABEL" className="t-Form-label"><FormattedMessage id="Checkout.PrimaryAddress" defaultMessage="Primary Address " /></label>
                                                                </div>
                                                                <div className="t-Form-inputContainer">
                                                                    <div className="t-Form-itemWrapper">
                                                                        <div tabIndex={-1} id="P7_PRIMARY_ADDR" className="apex-button-group apex-item-group apex-item-group--switch" role="group" aria-labelledby="P7_PRIMARY_ADDR_LABEL" onChange={this.setPrimaryAddress}>
                                                                            <legend className="u-VisuallyHidden"><FormattedMessage id="Checkout.PrimaryAddress" defaultMessage="Primary Address " /></legend>
                                                                            <span className="apex-item-option apex-item-option--yes"><input type="radio" id="P7_PRIMARY_ADDR_Y" name="P7_PRIMARY_ADDR" Value="Y" required /><label htmlFor="P7_PRIMARY_ADDR_Y" className="a-Button"><FormattedMessage id="Yes.Text" defaultMessage="Yes" /></label></span><span className="apex-item-option apex-item-option--no"><input type="radio" id="P7_PRIMARY_ADDR_N" name="P7_PRIMARY_ADDR" Value="N" defaultChecked="checked" /><label htmlFor="P7_PRIMARY_ADDR_N" className="a-Button"><FormattedMessage id="No.Text" defaultMessage="No" /></label></span>
                                                                        </div>
                                                                    </div>
                                                                    <span id="P7_PRIMARY_ADDR_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" />
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    {cancelButton}
                                                </div>
                                            </div>
                                            <div className="t-Region-buttons t-Region-buttons--bottom">
                                                <div className="t-Region-buttons-left" />
                                                <div className="t-Region-buttons-right" />
                                            </div>
                                        </div>
                                    </div>
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
        </>);
    }
}

const mapStateToProps = state => {
    return {
        cart_details: state.myCart,
        user_details: state.login,
        change_pass: state.login.changePasswordDetails,
        addressBook: state.address.addressBook,
        country_list: state.address.countryList,
        addressResp: state.address.addressResp,
        isAddBookRec: state.address.isAddBookRec,
        globals: state.global
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onGetCountryList: () => dispatch(actions.getCountryList()),
        OnproceedToCheckout: (quoteId) => dispatch(actions.getAddressFromShippingDetails(quoteId)),
        OnaddNewAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddNewAddressAndRedirectToCheckout(quoteId)),
        OnaddOldAddressAndRedirectToCheckout: (quoteId) => dispatch(actions.AddOldAddressAndRedirectToCheckout(quoteId)),
    }

}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(Address);