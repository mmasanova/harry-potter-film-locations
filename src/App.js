import React, { Component } from 'react';
import { MapContainer } from '.\\components\\map-container';
import { GoogleApiWrapper } from 'google-maps-react';

class App extends Component {
  state = {
    locations: [
      {
        name: 'The Falcon',
        lat: 52.122060,
        lon: -1.403040,
        address: 'Warwick Road Warmington, Banbury OX17 1JJ'
      },
      {
        name: 'The Chequers',
        lat: 51.942820,
        lon: -1.544950,
        address: 'Goddards Ln, Chipping Norton OX7 5NP'
      },
      {
        name: 'The Fox',
        lat: 51.939730,
        lon: -1.542790,
        address: 'Chipping Norton OX7 5DD'
      },
      {
        name: 'The Three Pigeon\'s Inn',
        lat: 52.063600,
        lon: -1.339780,
        address: '3 Southam Rd, Banbury OX16 2ED'
      },
      {
        name: 'The White Horse',
        lat: 52.021520,
        lon: -1.275970,
        address: '2 The Square, King\'s Sutton, Banbury OX17 3RF'
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <MapContainer google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDMPqq_XkqrIrZ2aMM34Ovk-DC-9GpCuxY')
})(App)
