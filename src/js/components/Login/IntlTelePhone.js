import React, { Component } from 'react';
import IntlTelInput from 'react-intl-tel-input';
import 'react-intl-tel-input/dist/main.css';
import './IntlTelePhone.css'
import CountryCodeList from '../utility/country_code';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';


class phoneNumber extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            dialCode: '',
            phoneValid: false,
            defaultCountry: '',

        }

    }
    sendDataToParents = (status, value, countryData, number, id) => {
        this.props.changed(status, value, countryData, number, id);
    }

    componentDidMount() {
        if ((this.props.isdefaultPhone) && (this.props.defaultPhone.carrier_code !== null)) {
            this.setState({
                phone: this.props.defaultPhone.contactNumber,
                defaultCountry: CountryCodeList[this.props.defaultPhone.carrier_code].country_id
            })

            // IntlTelInput.setFlag(CountryCodeList[this.props.defaultPhone.carrier_code].country_id, false)
        }
        //var countryData = window.intlTelInputGlobals.getCountryData();
    }



    componentDidUpdate(prevProps) {
        if ((this.props.isdefaultPhone) && (this.props.defaultPhone.carrier_code !== null)) {
            if (this.props.isdefaultPhone !== prevProps.isdefaultPhone) {

                this.setState({
                    phone: this.props.defaultPhone.contactNumber,
                    defaultCountry: CountryCodeList[this.props.defaultPhone.carrier_code].country_id
                })
                //IntlTelInput.setFlag(CountryCodeList[this.props.defaultPhone.carrier_code].country_id, false)
            }
        }
    }


    render() {
        let country = ['us'];
        if (this.props.country === 'International') {
            country = ['us'];
        } else if (this.props.country === 'KSA') {
            country = ['sa'];
        } else if (this.props.country === 'UAE') {
            country = ['ae'];
        }

        return (
            <div className='t-Form-itemWrapper'>
                <IntlTelInput
                    separateDialCode='true'
                    containerClassName="intl-tel-input allow-dropdown separate-dial-code iti-sdc-3"
                    inputClassName="text_field apex-item-text"
                    preferredCountries={country}
                    onPhoneNumberChange={(status, value, countryData, number, id) => {
                        this.setState({ phone: value })
                    }}
                    onPhoneNumberBlur={(status, value, countryData, number, id) => {
                        this.setState({
                            phone: value,
                            dialCode: countryData.dialCode,
                            phoneValid: status
                        })

                        this.sendDataToParents(status, value, countryData, number, id);

                    }}
                    onSelectFlag={(currentNumber, countryData, fullNumber, isValid) => {
                        this.setState({
                            phone: ''
                        })
                    }}

                    value={this.state.phone}
                    defaultCountry={this.state.defaultCountry}
                /></div>)
    }
}

const mapStateToProps = state => {
    return {
        country: state.global.country,
    };
}



export default connect(mapStateToProps)(phoneNumber);
