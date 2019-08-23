import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom'

const mapStyles = {
  width: '100%',
  height: '100%'
};

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
    };
  }

  componentDidMount() {
    // Typical usage (don't forget to compare props):
    //console.log('>>>>> ', this.props.google)

    this.forceUpdate(() => {
      //console.log(' Component updated Lnaguage : ', this.props.language)
    })

  }


  __rendermarkers = (item, index) => {
    return (
      <Marker
        key={item.id}
        onClick={(props, marker, e) => this.props.onMarkerClick(props, marker, e, item)}
        onMouseover={(props, marker, e) => this.props.onMouseoverMarker(props, marker, e, item)}
        position={{ lat: item.lattitude, lng: item.longitude }}
        icon={{ url: "https://storage.googleapis.com/nay/icons/map-marker.png" }}>
      </Marker>
    )
  }

  render() {
    const { markars, lat, long, zoom } = this.props;
    //console.log(this.props.language);
    return (
      <div>
        <Map

          google={this.props.google}
          zoom={zoom}
          style={mapStyles}
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

// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyAi0iRRQYErNXeAa6tZNgsevHWr6wbT-Nc',
//   language: 'en',

// })(MapContainer);

export default GoogleApiWrapper(
  (props) => ({
    apiKey: 'AIzaSyAi0iRRQYErNXeAa6tZNgsevHWr6wbT-Nc',
    language: props.language,
  }
  ))(MapContainer)
