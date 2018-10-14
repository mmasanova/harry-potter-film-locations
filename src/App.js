import React, { Component } from 'react';
import { MapContainer } from '.\\components\\map-container';
import { GoogleApiWrapper } from 'google-maps-react';
import { ListView } from '.\\components\\listview';
import { Filter } from '.\\components\\filter';
import './App.css';

class App extends Component {
  state = {
    filterValue: '',
    locations: [
      {
        name: 'The Falcon',
        position: {
          lat: 52.122060,
          lng: -1.403040
        },
        address: 'Warwick Road Warmington, Banbury OX17 1JJ',
        distance: 4.8,
        travelTime: 9
      },
      {
        name: 'The Chequers',
        position: {
          lat: 51.942820,
          lng: -1.544950
        },
        address: 'Goddards Ln, Chipping Norton OX7 5NP',
        distance: 13,
        travelTime: 22
      },
      {
        name: 'The Fox',
        position: {
          lat: 51.939730,
          lng: -1.542790
        },
        address: 'Chipping Norton OX7 5DD',
        distance: 13,
        travelTime: 23
      },
      {
        name: 'The Three Pigeon\'s Inn',
        position: {
          lat: 52.063600,
          lng: -1.339780
        },
        address: '3 Southam Rd, Banbury OX16 2ED',
        distance: 0.3,
        travelTime: 1
      },
      {
        name: 'The White Horse',
        position: {
          lat: 52.021520,
          lng: -1.275970
        },
        address: '2 The Square, King\'s Sutton, Banbury OX17 3RF',
        distance: 5,
        travelTime: 12
      },
      {
        name: 'The Kitchen',
        position: {
          lat: 52.144480,
          lng: -1.367400
        },
        address: 'Main St, Farnborough OX17 1DZ',
        distance: 6.8,
        travelTime: 13
      },
      {
        name: 'The George & Dragon',
        position: {
          lat: 52.090890,
          lng: -1.283480
        },
        address: '1 Thorpe Rd, Chacombe, Banbury OX17 2JW',
        distance: 3.9,
        travelTime: 8
      },
      {
        name: 'The Fox At Farthinghoe',
        position: {
          lat: 52.052860,
          lng: -1.221160
        },
        address: 'Baker Street, Brackley NN13 5PH',
        distance: 9.9,
        travelTime: 18
      }
    ]
  }

  render() {
    const { locations, filterValue } = this.state;

    return (
      <div className="App">
        <div className="map-view">
          <MapContainer
            google={this.props.google}
            locations={locations}
          />
        </div>
        <div className="list">
          <Filter value={filterValue}/>
          <ListView
            locations={locations}
          />
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDMPqq_XkqrIrZ2aMM34Ovk-DC-9GpCuxY')
})(App)
