import React, { Component } from 'react';
import cookie from 'react-cookies';
import '../../../styles/LocationPopup.css';
import { BASE_URL, CLONE_BASE_URL, API_TOKEN } from '../../api/globals';

import Axios from 'axios';


const LangPopup = (data) => WrappedComponent => {
    //console.log("data", data);

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isDisplay: '',
                selectedLang: '',
                selectedCountry: '',
                store_id: '',
                selectedStoreLocale: '',
                toHome: false,
                changeData: false
            }
        }

        componentDidMount() {

            // let isDisplay = (cookie.load('displayFlag') === undefined) ? false : cookie.load('displayFlag');

            let isDisplay = cookie.load('displayFlag') === undefined;
            console.log('isDisplayflag', isDisplay);

            if (isDisplay) {
                this.setState({ isDisplay: true });
                document.body.classList.add('apex-no-scroll');
            } else {
                document.body.classList.remove('apex-no-scroll');
                let language = cookie.load('language');
                let country = cookie.load('country');
                //console.log('cookie language', language);
                //console.log('cookie country', country);

                this.setState({ selectedLang: language, selectedCountry: country, changeData: true, isDisplay: false });
                //console.log('In Mount', this.state);
            }

        }


        onItemClick = (e) => {
            this.setState({ selectedCountry: e.currentTarget.dataset.id });
        }

        getStoreId = (data) => {
            //console.log('get StoreId', data);
            let store_data = data.selectedCountry + "_" + data.selectedLang;

            //Selected Store for Dynamic URL
            let country_name = this.getCountryName(data.selectedCountry);
            let store_locale = ((country_name === '') || (country_name === null)) ? data.selectedLang : country_name + "-" + data.selectedLang;


            const API = Axios.create({
                baseURL: CLONE_BASE_URL,
                headers: { Authorization: `Bearer ${API_TOKEN}`, "Content-Type": "application/json" }
            });

            const reqdata = {
                store_data: store_data
            };
            
            API.get('/storeinfo?store_data='+reqdata.store_data, reqdata).then(res => {
                // console.log("current props", this.props);
                //console.log("storeinfo response data", res.data.store_id);

                store_locale = this.getStoreLocale(res.data.store_id);

                cookie.save('storeid', res.data.store_id, { path: '/' });
                cookie.save('store_locale', store_locale, { path: '/' });
                cookie.save('language', data.selectedLang, { path: '/' });
                cookie.save('country', data.selectedCountry, { path: '/' });
                cookie.save('country_name', country_name, { path: '/' });

                localStorage.setItem('storeid', res.data.store_id);
                localStorage.setItem('store_locale', store_locale);

                this.setState({ store_id: res.data.store_id, selectedStoreLocale: store_locale });
            })

            // let store_id = 2;
            // cookie.save('storeid', store_id, { path: '/' });
            // localStorage.setItem('storeid', store_id);
            // localStorage.setItem('selectedStore', selected_store);
            // this.setState({store_id: store_id});
            // store.dispatch(actions.setChangeStore(new_store));
        }

        handleclick = (el) => {
            if (this.state.selectedLang && this.state.selectedCountry) {
                document.body.classList.remove('apex-no-scroll');

                this.setState({ changeData: true });
                this.setState({ isDisplay: false })

                cookie.save('displayFlag', 'false', { path: '/' })
                cookie.save('language', this.state.selectedLang, { path: '/' });
                cookie.save('country', this.state.selectedCountry, { path: '/' });

                this.getStoreId(this.state);

                this.setState({ toHome: true });
                localStorage.setItem('toHome', true);
                localStorage.setItem('displayVipReg', true);
                //console.log('In HandleClick', this.state);
            }

        }

        getStoreLocale(storeid) {
            var str_lc;

            if (storeid == '1') {
                str_lc = 'saudi-ar';
            } else if (storeid == '2') {
                str_lc = 'saudi-en';
            } else if (storeid == '3') {
                str_lc = 'uae-ar';
            } else if (storeid == '4') {
                str_lc = 'uae-en';
            } else if (storeid == '5') {
                str_lc = 'ar';
            } else if (storeid == '6') {
                str_lc = 'en';
            }
            return str_lc;
        }

        getCountryName(country) {
            var country_name;

            switch (country) {
                case 'KSA':
                    country_name = 'saudi';
                    break;
                case 'UAE':
                    country_name = 'uae';
                    break;
                case 'International':
                    country_name = 'International';
                    break;
                default:
                    country_name = 'saudi';
            }
            return country_name;
        }


        handleChange = (changeEvent) => {
            this.setState({ selectedLang: changeEvent.target.value });
        }

        render() {

            //console.log("display: ", this.state.isDisplay);

            return (


                <div>
                    <div style={{ display: this.state.isDisplay ? 'block' : 'none' }}>
                        <div tabIndex={-1} role="dialog" className="ui-dialog ui-corner-all ui-widget ui-widget-content ui-front ui-dialog--inline ui-draggable ui-resizable" aria-describedby="pref_popup" aria-labelledby="ui-id-1" >
                            <div className="ui-dialog-titlebar ui-corner-all ui-widget-header ui-helper-clearfix ui-draggable-handle" style={{}}>
                                <span id="ui-id-1" className="ui-dialog-title">&nbsp;</span>
                                <button type="button" className="ui-button ui-corner-all ui-widget ui-button-icon-only ui-dialog-titlebar-close" title="Close">
                                    <span className="ui-button-icon ui-icon ui-icon-closethick" />
                                    <span className="ui-button-icon-space"> </span>Close</button>
                            </div>
                            <div id="pref_popup" className="t-DialogRegion js-modal js-draggable js-resizable js-dialog-autoheight js-dialog-size480x320 js-regionDialog ui-dialog-content ui-widget-content"
                                style={{ backgroundColor: 'rgb(253, 233, 237)', width: 'auto', minHeight: '0px', maxHeight: 'none', height: 'auto' }}>

                                <div className="t-DialogRegion-wrap backWhite">
                                    <div className="t-DialogRegion-bodyWrapperOut">
                                        <div className="t-DialogRegion-bodyWrapperIn"><div className="t-DialogRegion-body">
                                            <div className="container">
                                                <div className="row">
                                                    <div className="col col-12 apex-col-auto">
                                                        <div className="t-Region t-Region--removeHeader t-Region--noBorder t-Region--hiddenOverflow" id="R39653411892606074" style={{ backgroundColor: '#fde9ed' }}>
                                                            <div className="t-Region-header">
                                                                <div className="t-Region-headerItems t-Region-headerItems--title">
                                                                    <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                                                    <h5 className="t-Region-title" id="R39653411892606074_heading">Country&amp;Language</h5>
                                                                </div>
                                                                <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                                            </div>
                                                            <div className="t-Region-bodyWrap">
                                                                <div className="t-Region-buttons t-Region-buttons--top">
                                                                    <div className="t-Region-buttons-left" />
                                                                    <div className="t-Region-buttons-right" />
                                                                </div>
                                                                <div className="t-Region-body backWhite">
                                                                    <h4 style={{ textAlign: 'center', fontWeight: 600 }}>Select your country/اختيار الدولة هنا</h4>
                                                                    <ul className="pflags">
                                                                        <li className={this.state.selectedCountry == 'KSA' ? 'ppopup-textholder active' : 'ppopup-textholder'} id="dislrcsa" data-id='KSA' onClick={this.onItemClick}>
                                                                            <a href="javascript:void(0)" className="pksa pcountry" />
                                                                            <p>السعودية</p>
                                                                            <p>KSA</p>
                                                                        </li>
                                                                        <li className={this.state.selectedCountry == 'UAE' ? 'ppopup-textholder active' : 'ppopup-textholder'} id="dislrcae" data-id='UAE' onClick={this.onItemClick}>
                                                                            <a href="javascript:void(0)" className="puae pcountry" />
                                                                            <p>الامارات</p>
                                                                            <p>UAE</p>
                                                                        </li>
                                                                        <li className={this.state.selectedCountry == 'International' ? 'ppopup-textholder active' : 'ppopup-textholder'} id="enbint" data-id='International' onClick={this.onItemClick}>
                                                                            <a href="javascript:void(0)" className="pinternational pcountry" />
                                                                            <p>دولي</p>
                                                                            <p>International</p>
                                                                        </li>
                                                                    </ul><div className="container">
                                                                        <div className="row">
                                                                            <div className="col col-12 apex-col-auto">
                                                                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel t-Form-fieldContainer--stretchInputs t-Form-fieldContainer--radioButtonGroup apex-item-wrapper apex-item-wrapper--radiogroup " id="P0_LANG_CONTAINER">

                                                                                    <label htmlFor="P0_LANG" id="P0_LANG_LABEL" className="t-Form-label" style={{ marginRight: '5%' }}>Select Language / أختيار اللغة </label>

                                                                                    <div className="t-Form-inputContainer"><div className="t-Form-itemWrapper"><div tabIndex={-1} id="P0_LANG" aria-labelledby="P0_LANG_LABEL" className="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                                                                                        <div className="apex-item-grid radio_group">
                                                                                            <div className="apex-item-grid-row">
                                                                                                <div className="apex-item-option">
                                                                                                    <input type="radio" id="P0_LANG_0" name="P0_LANG" value="en"
                                                                                                        checked={this.state.selectedLang === 'en'}
                                                                                                        onChange={this.handleChange} />
                                                                                                    <label htmlFor="P0_LANG_0">English / الأنجليزية </label>
                                                                                                </div>
                                                                                                <div className="apex-item-option">
                                                                                                    <input type="radio" id="P0_LANG_1" name="P0_LANG" value="ar"
                                                                                                        checked={this.state.selectedLang === 'ar'}
                                                                                                        onChange={this.handleChange} />
                                                                                                    <label htmlFor="P0_LANG_1">Arabic / العربية</label>
                                                                                                </div>

                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    </div><span id="P0_LANG_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                                                                            </div>
                                                                        </div><div className="row">
                                                                            <div className="col col-12 apex-col-auto">
                                                                                <button onClick={(e) => this.handleclick(e)} className="t-Button t-Button--hot t-Button--stretch t-Button--gapTop" type="button" id="B33040180548573177"><span className="t-Button-label">Submit / تقديم</span></button>
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
                                            </div></div></div></div>
                                    <div className="t-DialogRegion-buttons">
                                        <div className="t-ButtonRegion t-ButtonRegion--dialogRegion">
                                            <div className="t-ButtonRegion-wrap">
                                                <div className="t-ButtonRegion-col t-ButtonRegion-col--left"><div className="t-ButtonRegion-buttons" /></div>
                                                <div className="t-ButtonRegion-col t-ButtonRegion-col--right"><div className="t-ButtonRegion-buttons" /></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ui-widget-overlay ui-front"></div>
                    </div>
                    <WrappedComponent {...this.props} selectedLang={this.state.selectedLang} selectedCountry={this.state.selectedCountry} changeData={this.state.changeData} selectedStoreLocale={this.state.selectedStoreLocale} store_id={this.state.store_id} toHome={this.state.toHome} isDisplay={this.state.isDisplay} />
                </div>
            )
        }
    }

}

export default LangPopup;