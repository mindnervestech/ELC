import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const mapStyles = {
    width: '100%',
    height: '100%'
};

class MapContainer extends Component {
    render() {
        return (<>
            <Map
                google={this.props.google}
                style={mapStyles}
                initialCenter={{
                    lat: 25.23363,
                    lng: 55.307877
                }}
                zoom={16}>
                <Marker
                    position={{ lat: 25.23363, lng: 55.307877 }} />
            </Map>
        </>);
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyAi0iRRQYErNXeAa6tZNgsevHWr6wbT-Nc'
})(MapContainer);