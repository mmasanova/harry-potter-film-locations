import React, { Component } from 'react';
import { Map } from '.\\components\\map';
import { ListView } from '.\\components\\listview';
import { Filter } from '.\\components\\filter';
import './App.css';

class App extends Component {
  state = {
    map: null,
    filterValue: '',
    activeMarker: {},
    activeLocation: {},
    showInfoWindow: true,
    locations: [
      {
        name: 'The Falcon',
        position: {
          lat: 52.122060,
          lng: -1.403040
        },
        address: 'Warwick Road Warmington, Banbury OX17 1JJ',
        distance: 4.8,
        travelTime: 9,
        visible: true,
        id: '56b73675498e84344998645a'
      },
      {
        name: 'The Chequers',
        position: {
          lat: 51.942820,
          lng: -1.544950
        },
        address: 'Goddards Ln, Chipping Norton OX7 5NP',
        distance: 13,
        travelTime: 22,
        visible: true,
        id: '4e6265e42271573ad7988e6b'
      },
      {
        name: 'The Fox',
        position: {
          lat: 51.939730,
          lng: -1.542790
        },
        address: 'Chipping Norton OX7 5DD',
        distance: 13,
        travelTime: 23,
        visible: true,
        id: '4f7d91d2e4b0015bec9775d4'
      },
      {
        name: 'The Three Pigeon\'s Inn',
        position: {
          lat: 52.063600,
          lng: -1.339780
        },
        address: '3 Southam Rd, Banbury OX16 2ED',
        distance: 0.3,
        travelTime: 1,
        visible: true,
        id: '4d67d7592433a143963151e0'
      },
      {
        name: 'The White Horse',
        position: {
          lat: 52.021520,
          lng: -1.275970
        },
        address: '2 The Square, King\'s Sutton, Banbury OX17 3RF',
        distance: 5,
        travelTime: 12,
        visible: true,
        id: '4bf6dd0d5317a593b0f8fc7e'
      },
      {
        name: 'The Kitchen',
        position: {
          lat: 52.144480,
          lng: -1.367400
        },
        address: 'Main St, Farnborough OX17 1DZ',
        distance: 6.8,
        travelTime: 13,
        visible: true,
        id: '4c5712777329c9289c068e80'
      },
      {
        name: 'The George & Dragon',
        position: {
          lat: 52.090890,
          lng: -1.283480
        },
        address: '1 Thorpe Rd, Chacombe, Banbury OX17 2JW',
        distance: 3.9,
        travelTime: 8,
        visible: true,
        id: '4c6fc13b3444370482df215f'
      },
      {
        name: 'The Fox At Farthinghoe',
        position: {
          lat: 52.052860,
          lng: -1.221160
        },
        address: 'Baker Street, Brackley NN13 5PH',
        distance: 9.9,
        travelTime: 18,
        visible: true,
        id: ''
      }
    ]
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDMPqq_XkqrIrZ2aMM34Ovk-DC-9GpCuxY&callback=initMap');
    window.initMap = this.initMap;
  }

  initMap = () => {
    let bounds = new window.google.maps.LatLngBounds();
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: 52.060020, lng: -1.340450 },
      zoom: 14
    });

    this.state.locations.forEach(location => {
      bounds.extend(location.position);
    });

    map.fitBounds(bounds);
    
    this.setState({ 
      map: map
    });
  }

  updateFilterValue = (selectedValue) => {
    this.setState(function(prevState) {
      let locations = prevState.locations;

      locations.forEach(location => {
        if (selectedValue === '') {
          location.visible = true;
        }
        else {
          location.visible = location.travelTime <= selectedValue;
        }
      });

      return {
        filterValue: selectedValue,
        locations: locations
      }
    });
  }

  onMarkerClick = (props, marker) => {
    this.setState({ 
      activeMarker: marker,
      showInfoWindow: true,
      activeLocation: props.location
    });
  }

  onMapClick = () => {
    this.setState({
      activeMarker: null,
      activeLocation: {},
      showInfoWindow: false,
      venueId: ''
    });
  }

  render() {
    const { locations, filterValue, showInfoWindow, activeMarker, activeLocation } = this.state;

    return (
      <div className="App">
        <Map 
          map={this.state.map}
          locations={this.state.locations}
          onMarkerClick={this.onMarkerClick}
        />
        <div className="list">
          <Filter 
            value={filterValue}
            onFilterSelect={this.updateFilterValue}
          />
          <ListView
            locations={locations}
          />
        </div>
      </div>
    );
  }
}

function loadScript(url) {
  var firstScript = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  firstScript.parentNode.insertBefore(script, firstScript);
}

export default App;