import React, { Component } from 'react';
import MapContainer from "./map";
import '../../../../styles/storeLocator/store-locator.css';
import { FormattedMessage } from 'react-intl';
import StoreList from './store-listing';
import * as utility from '../../utility/utility';
import { connect } from 'react-redux';
import * as actions from '../../../redux/actions/index';

let selectedMarker = {};
let overId = null;
const google = window.google
class StoreLocator extends Component {
  constructor(props) {
    super(props);

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
      storeList: this.props.storeList
    }
    const location = window.navigator && window.navigator.geolocation
    //console.log("location", location);
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


  }

  componentDidMount() {
    const obj = this.props.storeList;

    if (obj.length <= 0) {
      this.props.onGetStoreList({
        country_id: '',
        city: ''
      });
    }
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
      { "types": ["geocode"] });
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    this.sortCountriesOnPathName(this.props.selected_country);
  }

  sortCountriesOnPathName = (countryCode) => {
    //console.log(countryCode);
    let filtred_storeList = this.props.storeList;
    if (countryCode === 'International') {
      filtred_storeList = this.props.storeList;
    } else if (countryCode === 'KSA') {
      filtred_storeList = this.props.storeList.filter((storeList) => {
        return (storeList.country_id === 'SA');
      })
    } else if (countryCode === 'UAE') {
      filtred_storeList = this.props.storeList.filter((storeList) => {
        return (storeList.country_id === 'AE');
      })
    }

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

    //console.log(filtred_storeList);
    this.setState({
      ...this.state,
      ...latLong,
      zoom: 3,
      selectedCountry: countryCode,
      storeList: [
        ...filtred_storeList
      ]
    })

  }

  handlePlaceChanged() {
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
    //console.log("place---", place);
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

    document.getElementById(newId).scrollIntoView({ behavior: "smooth" });
    document.getElementById(newId).style.background = "#ebebeb";
    selectedMarker = item;
    if (overId !== item.id) {
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

    let display = this.state.isDisplay ? 'block' : 'none';
    let errorMessage = this.state.showError ? <div id="P7_STORE_error_placeholder" data-template-id="FALLBACK_ET" className="u-visible"><div className="t-Form-error"><div id="P7_STORE_error"><FormattedMessage id="SelectStore.Validate" defaultMessage="Select the Store" /></div></div></div> : null;

    return (
      <>
        <div>
          <div className="storeLocator-container">
            <div className="storeLocator-searchBox">
              <div className="storeLocator-searchInput">

                <input type="text" ref={this.autocompleteInput} id="autocomplete" placeholder={this.props.placeHolderText} type="text" />
                <svg className="storeLocator-searchIcon" xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="23.888" height="16px" viewBox="0 0 23.888 24.117">
                  <g fill="none" stroke="#666" strokewidth={4} strokelinecap="round" strokelinejoin="round" strokemiterlimit={10}>
                    <circle cx="10.12" cy="10.12" r="8.12" />
                    <path d="M15.849 16.077l6.039 6.04" />
                  </g>
                </svg>
              </div>
              <ul className="storeLocator-storesList">

                <StoreList locations={this.state.storeList}
                  getSelectedStore={this.getSelectedStore} directionText={this.props.directionText} />

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

          <div id="over_map" style={{ display: display }}>
            <span className="close" onClick="javascript:document.getElementById(over_map).style.display=none;" /><br />
            <span id="show-store-info">
              {this.state.selectedLoc.name}
              <br />
              {this.state.selectedLoc.address}
            </span>
          </div>
        </div>
        {errorMessage}
      </>

    );
  }
}

const mapStateToProps = state => {
  return {
    storeList: state.address.storeList,
    language: state.global.language
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onGetStoreList: (payload) => dispatch(actions.getStoreList(payload)),

  }

}

export default connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(StoreLocator);