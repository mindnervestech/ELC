import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom'

const mapStyles = {
  width: '70%',
  height: '100%',
  left: '30%',
};
export class MapContainer extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  __rendermarkers = (item, index) => {
    return (
      <Marker
        key={item.id}
        onClick={(props, marker, e) => this.props.onMarkerClick(props, marker, e, item)}
        onMouseover={(props, marker, e) => this.props.onMouseoverMarker(props, marker, e, item)}
        position={{ lat: item.lattitude, lng: item.longitude }}
        icon={{ url:  '/images/map-marker.png'}}>
      </Marker>
    )
  }

  render() {
    const { markars, lat, long, zoom } = this.props;
console.log("this.props in marker",this.props)
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={zoom}
          //style={MapCss}
          className="MapCss"
          center={{
            lat: lat,
            lng: long
          }}

          initialCenter={{
            lat: lat,
            lng: long
          }}

          streetViewControl={false}
          scaleControl={false}
          mapTypeControl={false}
          panControl={false}
          zoomControl={true}
          rotateControl={false}
          fullscreenControl={false}
          onClick={this.onMapClicked}
        >
          {
            markars.map(this.__rendermarkers)
          }
          <InfoWindow
            marker={this.props.activeMarker}
            visible={this.props.showingInfoWindow}>
            <div>
              <div className="storeLocator-infoWindow">
                <h4 style={{ color: 'black' }}>{this.props.selectedMarker.name}</h4>
                {this.props.selectedMarker.address}
              </div>
            </div>
          </InfoWindow>

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyBiD-Nrxm9gwPzYuFW_pQDokcaVgiNwwoQ',
    language: props.language,
  }
  ))(MapContainer)