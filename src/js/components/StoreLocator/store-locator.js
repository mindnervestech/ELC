import React, { Component } from 'react';
import MapContainer from "./map";
import '../../../styles/storeLocator/store-locator.css';
import Axios from 'axios';
import StoreList from './store-listing';
import CountryList from './CountryList';
import CityList from './CityList';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as utility from '../utility/utility';

import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import { Link, Redirect } from 'react-router-dom';


let selectedMarker = {};
let overId = null;
let reload = true;
const google = window.google

class StoreLocator extends Component {


  constructor(props) {
    super(props);
    this.myIntl = props.intl
    this.country_codes = {
      uae: 'AE',
      saudi: 'SA',
      kuwait: 'KW',
      bahrain: 'BH',
      qatar: 'QA',
      oman: 'OM',
      morocco: 'MA',
    }
    this.state = {
      selectedLoc: {},
      lat: null,
      long: null,
      zoom: 3,
      isDisplay: false,
      activeMarker: {},
      showingInfoWindow: false,
      selectedPlace: {},
      showError: false,
      selectedMarker: {},
      selectedCountry: this.country_codes[this.props.location.pathname.split('/')[2].split('-')[2]],
      selectedCity: '',
      storeList: this.props.storeList


    }
    const location = window.navigator && window.navigator.geolocation

    if (location) {
      location.getCurrentPosition((position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        })
      }, (error) => {
        this.setState({ latitude: 'err-latitude', longitude: 'err-longitude' })
      })
    }
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this)
    this.countryCode = this.country_codes[this.props.location.pathname.split('/')[2].split('-')[2]] ? this.country_codes[this.props.location.pathname.split('/')[2].split('-')[2]] : 'SA';

  }


  handleCountryChange = (e) => {
    this.setState({ selectedCountry: e.target.value, country_id: e.target.value }, () => {
      this.sortCountriesOnPathName(this.state.selectedCountry, undefined);
    });

  }

  handleCityChange = (e) => {
    this.setState({ selectedCity: e.target.value }, () => {
      this.sortCountriesOnPathName(this.state.selectedCountry, this.state.selectedCity);
    });
  }

  componentDidMount() {
    //console.log('mount');
    const obj = this.props.storeList;

    if (obj.length <= 0) {
      this.props.onGetStoreList({
        country_id: this.state.countryCode,
        city: this.state.selectedCity
      });
    }

    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
      { "types": ["geocode"] });
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    this.sortCountriesOnPathName();
  }

  componentDidUpdate(prevProps) {

    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.sortCountriesOnPathName(this.country_codes[this.props.location.pathname.split('/')[2].split('-')[2]], undefined);
    } else if (this.props.storeList.length !== prevProps.storeList.length) {
      this.sortCountriesOnPathName(this.country_codes[this.props.location.pathname.split('/')[2].split('-')[2]], undefined);
    }
  }

  sortCountriesOnPathName = (countryCode = this.countryCode, city_code = 'NA') => {
    //console.log('sortCountriesOnPathName : ', countryCode, city_code)
    const filtred_storeList = this.props.storeList.filter((storeList) => {
      if (city_code === 'NA') {
        return (storeList.country_id === countryCode);
      } else {
        return (storeList.country_id === countryCode && storeList.city == city_code);
      }

    })
    let latLong = {

    }
    //console.log((filtred_storeList[0].lattitude));
    const obj = filtred_storeList[0];

    if (!(utility.emptyObj(obj))) {
      latLong = {
        ...latLong,
        lat: filtred_storeList[0].lattitude,
        long: filtred_storeList[0].longitude,
      }
    }
    //console.log(latLong);
    this.setState({
      ...this.state,
      ...latLong,
      zoom: 3,
      selectedCountry: countryCode,
      storeList: [
        ...filtred_storeList
      ]
    }, () => {
      //console.log('stttttt :', this.state);
      this.countryCode = countryCode;
    })

  }

  getFilteredLocations = () => {
    //console.log('getFilteredLocations')
  }

  handlePlaceChanged = () => {
    const place = this.autocomplete.getPlace();
    const latLong = {
      lat: place.geometry.location.lat(),
      long: place.geometry.location.lng(),
    }

    this.setState({
      ...this.state,
      ...latLong,
      zoom: 10,
    })
    //console.log(lat, lng);

  }


  getSelectedStore = (el) => {
    this.setState({ showError: false });
    this.zoomToNewLocation(el.lattitude, el.longitude);
    this.setState({ isDisplay: true, selectedLoc: { ...el } });
  }

  submitStoreInfo = () => {
    if (this.handleValidation()) {
      this.props.changed(this.state.selectedLoc);
    }
  }

  handleValidation = () => {
    let formIs = false;
    let obj = this.state.selectedLoc;
    if (!((Object.entries(obj).length === 0) && (obj.constructor === Object))) {
      formIs = true

    } else {
      formIs = false
      this.setState({
        showError: true
      })
    }

    return formIs
  }

  zoomToNewLocation = (lat, long) => {
    this.setState({
      lat: lat,
      long: long,
      zoom: 17
    });
  }

  onMarkerClick = (props, marker, e, item) => {
    this.setState({ showError: false });
    this.zoomToNewLocation(item.lattitude, item.longitude);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      isDisplay: true,
      selectedLoc: { ...item }
    });

  }


  onMouseoverMarker = (props, marker, e, item) => {
    let newId = 'loc' + item.id;
    //console.log(document.getElementById(newId));
    document.getElementById(newId).scrollIntoView({ behavior: "smooth" });
    document.getElementById(newId).style.background = "#ebebeb";
    selectedMarker = item;
    if (overId != item.id) {
      overId = item.id;
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        zoom: 4
      });

      setTimeout(() => {
        overId = null
      }, 2000)
    }

  }
  render() {
    //console.log(":::::", this.state.storeList)
    let display = this.state.isDisplay ? 'block' : 'none';
    let errorMessage = this.state.showError ? <div id="P7_STORE_error_placeholder" data-template-id="FALLBACK_ET" className="u-visible"><div className="t-Form-error"><div id="P7_STORE_error"><FormattedMessage id="SelectStore.Validate" defaultMessage="Select the Store" /></div></div></div> : null;
    let store_locale=this.props.globals.store_locale


    return (
      <div className="t-Body">
        <div className="t-Body-main" style={{ marginTop: '0px !important' }}>
          <div className="t-Body-title" id="t_Body_title" style={{ top: '294px' }}>
            <div id="R55451813294588531" className="t-BreadcrumbRegion containers t-BreadcrumbRegion--showBreadcrumb t-BreadcrumbRegion--useBreadcrumbTitle">
              <div className="t-BreadcrumbRegion-body">
              {/* <div style={{margin:10}} className="padding-right-ar">  
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover" style={{fontSize:15}}><FormattedMessage id="Checkout.Home" defaultMessage/></span><span>&nbsp;\&nbsp;&nbsp;</span>
            </Link>
            <span  style={{fontSize:15, fontWeight: 'bold'}}>{this.props.aboutUs.title}</span>
          </div> */}

          <div style={{margin:10,textAlign:'start'}} className="padding-right-ar">  
            <Link to={`/${store_locale}/`} style={{ textDecoration: 'none' }}>
              <span className="titleHover" style={{fontSize:15}}><FormattedMessage id="Checkout.Home" defaultMessage/></span><span>&nbsp;\&nbsp;&nbsp;</span>
            </Link>
            <span  style={{fontSize:15, fontWeight: 'bold'}}><FormattedMessage id="header.storeLocator" defaultMessage="Store Locator" /></span>
          </div>
                <div className="t-BreadcrumbRegion-title">
                  <h1 className="t-BreadcrumbRegion-titleText"><FormattedMessage id="header.storeLocator" defaultMessage="Store Locator" /></h1>
                </div>
              </div>
              <div className="t-BreadcrumbRegion-buttons" />
            </div>
          </div>

          <div className="t-Body-content" id="t_Body_content"><div id="t_Body_content_offset" style={{ height: '85px' }} />
            <span id="APEX_SUCCESS_MESSAGE" data-template-id="33770911730796245_S" className="apex-page-success u-hidden" /><span id="APEX_ERROR_MESSAGE" data-template-id="33770911730796245_E" className="apex-page-error u-hidden" />
            <div className="t-Body-contentInner">
              <div className="container" style={{maxWidth: '100%'}}>


                <div className="row">
                  <div className="col col-12 apex-col-auto">
                    <div className="t-Region containers  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody" id="R43835710405736299">
                      <div className="t-Region-header">
                        <div className="t-Region-headerItems t-Region-headerItems--title">
                          <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                          <h2 className="t-Region-title" id="R43835710405736299_heading">Filter Regions</h2>
                        </div>
                        <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                      </div>
                      <div className="t-Region-bodyWrap">
                        <div className="t-Region-buttons t-Region-buttons--top">
                          <div className="t-Region-buttons-left" />
                          <div className="t-Region-buttons-right" />
                        </div>
                        <div className="t-Region-body" style={{
                          padding: 0,
                          margin: 0,
                        }}>
                          <div className="container">
                            <div className="row">
                              <div className="col col-1 ">
                                <span className="apex-grid-nbsp">&nbsp;</span>
                              </div><div className="col col-5 storeLocatorRmPadding">
                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--select-list js-show-label" id="P12_COUNTRY_CONTAINER"><div className="t-Form-labelContainer">
                                  <label htmlFor="P12_COUNTRY" id="P12_COUNTRY_LABEL" className="t-Form-label">{this.myIntl.formatMessage({ id: 'SelectCountrySingle.Text' })}</label>
                                </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">


                                  <CountryList handleCountryChange={this.handleCountryChange} locations={this.props.storeList} selectedCountry={this.state.selectedCountry}></CountryList>



                                </div><span id="P12_COUNTRY_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div>
                              </div><div className="col col-5 ">
                                <div className="t-Form-fieldContainer t-Form-fieldContainer--floatingLabel apex-item-wrapper apex-item-wrapper--select-list js-show-label is-active" id="P12_CITY_CONTAINER"><div className="t-Form-labelContainer">
                                  <label htmlFor="P12_CITY" id="P12_CITY_LABEL" className="t-Form-label">{this.myIntl.formatMessage({ id: 'SelectCitySingle.Text' })}</label>
                                </div><div className="t-Form-inputContainer"><div className="t-Form-itemWrapper">

                                  <CityList handleCityChange={this.handleCityChange} selectedCountry={this.state.selectedCountry} locations={this.props.storeList} selectCitytext={this.myIntl.formatMessage({ id: 'SelectCity.Text' })}> </CityList>

                                </div><span id="P12_CITY_error_placeholder" className="a-Form-error" data-template-id="33609965712469734_ET" /></div></div><input type="hidden" id="MI" name="MI" defaultValue /><input type="hidden" id="P12_PAGE_TITLE" name="P12_PAGE_TITLE" defaultValue="Store Locator UAE - Nayomi UAE" /><input type="hidden" id="P12_PAGE_DESC" name="P12_PAGE_DESC" defaultValue="Store locator UAE - Locate your nearest nayomi store in UAE" />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col col-12 apex-col-auto">
                                <div className="t-Region containers  t-Region--removeHeader t-Region--noBorder t-Region--scrollBody" id="mapRegion">
                                  <div className="t-Region-header">
                                    <div className="t-Region-headerItems t-Region-headerItems--title">
                                      <span className="t-Region-headerIcon"><span className="t-Icon " aria-hidden="true" /></span>
                                      <h2 className="t-Region-title" id="mapRegion_heading">map</h2>
                                    </div>
                                    <div className="t-Region-headerItems t-Region-headerItems--buttons"><span className="js-maximizeButtonContainer" /></div>
                                  </div>

                                  <div className="t-Region-body">
                                    <div id="dvMapContent">
                                      <link rel="stylesheet" href="./Store Locator UAE - Nayomi UAE_files/store-locator.css" />
                                      <div id="wrapper">
                                        <div id="my-store-locator">

                                          <div className="storeLocator-container">
                                            <div className="storeLocator-searchBox">
                                              <div className="storeLocator-searchInput">

                                                <input type="text" ref={this.autocompleteInput} id="autocomplete" placeholder={this.myIntl.formatMessage({ id: 'StoreLocatorEnterALocation.Text' })} autoComplete="off" />
                                                <svg className="storeLocator-searchIcon" xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="23.888" height="16px" viewBox="0 0 23.888 24.117">
                                                  <g fill="none" stroke="#666" strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10}>
                                                    <circle cx="10.12" cy="10.12" r="8.12" />
                                                    <path d="M15.849 16.077l6.039 6.04" />
                                                  </g>
                                                </svg>
                                              </div>
                                              <ul className="storeLocator-storesList">

                                                <StoreList locations={this.state.storeList}
                                                  getSelectedStore={this.getSelectedStore} directionText={this.myIntl.formatMessage({ id: 'StoreLocatorDirection.Text' })} />

                                              </ul>
                                            </div>
                                            <div className="storeLocator-map" style={{ position: 'relative', overflow: 'hidden' }}>
                                              {this.state.lat && this.state.long && (
                                                <MapContainer
                                                  onMouseoverMarker={this.onMouseoverMarker}
                                                  onMarkerClick={this.onMarkerClick}
                                                  markars={this.state.storeList}
                                                  lat={this.state.lat}
                                                  long={this.state.long}
                                                  zoom={this.state.zoom}
                                                  activeMarker={this.state.activeMarker}
                                                  selectedPlace={this.state.selectedPlace}
                                                  selectedMarker={selectedMarker}
                                                  showingInfoWindow={this.state.showingInfoWindow}
                                                  language={this.props.language} />)}

                                            </div>
                                          </div>

                                        </div>
                                        <div id="over_map" style={{ display: display }}>
                                          {/* <span className="close" /><br /> */}
                                          <span id="show-store-info">
                                            {this.state.selectedLoc.name}
                                            <br />
                                            {this.state.selectedLoc.address}
                                          </span>
                                        </div>
                                      </div>
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



              </div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    storeList: state.address.storeList,
    language: state.global.language,
    globals:state.global
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetStoreList: (payload) => dispatch(actions.getStoreList(payload)),

  }

}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(injectIntl(StoreLocator));