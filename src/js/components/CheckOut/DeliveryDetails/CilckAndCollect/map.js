import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import ReactDOM from 'react-dom'
const mapStyles = {
    width: '80%',
    height: '40%',
    margin: '5%'
};
class MapContainer extends Component {
    constructor(props){
        super(props);
      


    }

    

    __rendermarkers = (item, index) => {
        return (
            <Marker
                key={item.id}
                onClick={(props, marker, e) => this.props.onMarkerClick(props, marker, e, item)}
                onMouseover={(props, marker, e) => this.props.onMouseoverMarker(props, marker, e, item)}
                position={{ lat: item.lattitude, lng: item.longitude }}
                icon={{ url: '/images/map-marker.png' }}>
            </Marker>
        )
    }

    render() {
        const { markars, lat, lang, zoom } = this.props;

        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={11}
                    style={mapStyles}
        
                    center={{
                        lat: parseFloat(lat),
                        lng: parseFloat(lang)
                    }}

                    initialCenter={{
                        lat: parseFloat(lat),
                        lng: parseFloat(lang)
                    }}

                    // streetViewControl={false}
                    // scaleControl={false}
                    // mapTypeControl={false}
                    // panControl={false}
                    // zoomControl={true}
                    // rotateControl={false}
                    // fullscreenControl={false}
                    // onClick={this.onMapClicked}
                >

                    <InfoWindow
                        visible={this.props.showingInfoWindow}
                        marker={this.props.activeMarker}
                        close={this.props.onClose}>
                        <div>
                            <div className="storeLocator-infoWindow">
                                <h4 style={{ color: 'black' }}>Pune</h4>
                                Pune
                         </div>
                        </div>
                    </InfoWindow>
                    <Marker position={{ lat: parseFloat(lat), lng:parseFloat(lang) }}
                        onClick={() => this.props.onMarkerClick()}
                        icon={{ url: '/images/map-marker.png' }}></Marker>


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