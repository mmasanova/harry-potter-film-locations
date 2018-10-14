import React, { Component } from 'react';
import { MapContainer } from '.\\components\\map-container';
import { GoogleApiWrapper } from 'google-maps-react';
import { ListView } from '.\\components\\listview';
import './App.css';

class App extends Component {
  state = {
    locations: [
      {
        name: 'The Falcon',
        position: {
          lat: 52.122060,
          lng: -1.403040
        },
        address: 'Warwick Road Warmington, Banbury OX17 1JJ'
      },
      {
        name: 'The Chequers',
        position: {
          lat: 51.942820,
          lng: -1.544950
        },
        address: 'Goddards Ln, Chipping Norton OX7 5NP'
      },
      {
        name: 'The Fox',
        position: {
          lat: 51.939730,
          lng: -1.542790
        },
        address: 'Chipping Norton OX7 5DD'
      },
      {
        name: 'The Three Pigeon\'s Inn',
        position: {
          lat: 52.063600,
          lng: -1.339780
        },
        address: '3 Southam Rd, Banbury OX16 2ED'
      },
      {
        name: 'The White Horse',
        position: {
          lat: 52.021520,
          lng: -1.275970
        },
        address: '2 The Square, King\'s Sutton, Banbury OX17 3RF'
      }
    ]
  }

  render() {
    const { locations } = this.state;

    return (
      <div className="App">
        <div className="map-view">
          <MapContainer
            google={this.props.google}
            locations={locations}
          />
        </div>
        <ListView
          locations={locations}
        />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDMPqq_XkqrIrZ2aMM34Ovk-DC-9GpCuxY')
})(App)