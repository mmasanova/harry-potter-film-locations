import React, { Component } from 'react';
import { Map } from './components/map';
import { ListView } from './components/listview';
import { Filter } from './components/filter';
import './App.css';
import data from './data';

class App extends Component {
  state = {
    map: null,
    mapCenter: { lat: 52.060020, lng: -1.340450 },
    filterValue: '',
    activeMarker: {},
    activeLocation: {},
    showInfoWindow: true,
    movies: data.movies,
    locations: data.locations
  }

  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    loadScript('https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyDMPqq_XkqrIrZ2aMM34Ovk-DC-9GpCuxY&callback=initMap');
    window.initMap = this.initMap;
  }

  /**
  * @description Initialises a google maps map object and stores its reference in state
  */
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.mapCenter,
      zoom: 14
    });

    map.addListener('click', this.onMapClick);

    this.setMapBounds(map);
    
    this.setState({ 
      map: map
    });
  }

  /**
  * @description Sets map boundaries to include all markers
  * @param {google.maps.Map} - google.maps.Map instance which boundaries will be set
  */
  setMapBounds = (map) => {
    let bounds = new window.google.maps.LatLngBounds();

    this.state.locations.forEach(location => {
      bounds.extend(location.position);
    });

    map.fitBounds(bounds);
  }

  updateFilterValue = (selectedValue) => {
    this.setState(function(prevState) {
      let locations = prevState.locations;

      locations.forEach(location => {
        if (selectedValue === '') {
          location.visible = true;
        }
        else {
          location.visible = location.movie.includes(parseInt(selectedValue));
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
      showInfoWindow: false
    });
  }

  onListItemClick = (locationId) => {
    const locations = this.state.locations;
    const locationIndex = locations.findIndex(loc => loc.id === locationId);

    if (locationIndex !== -1) {
      const location = locations[locationIndex];

      this.onMarkerClick({
        location: location
      }, location.marker);
    }
  }

  onMarkerCreated = (props, marker) => {
    const { location } = props;

    this.setState(function(prevState) {
      let locations = prevState.locations;

      const locationIndex = locations.findIndex(loc => loc.id === location.id);

      if (locationIndex !== -1) {
        locations[locationIndex].marker = marker;
      }

      return { locations: locations };
    });
  }

  clearActiveMarker = () => {
    this.setState({
      activeMarker: null,
      activeLocation: {},
      showInfoWindow: false,
      venueId: ''
    });
  }

  render() {
    const { 
      locations, 
      filterValue, 
      showInfoWindow, 
      activeMarker, 
      activeLocation,
      mapCenter,
      map,
      movies
    } = this.state;

    return (
      <div className="App">
        <Map 
          map={map}
          locations={locations}
          onMarkerClick={this.onMarkerClick}
          onMarkerCreated={this.onMarkerCreated}
          onInfoWindowClose={this.clearActiveMarker}
          mapCenter={mapCenter}
          activeMarker={activeMarker}
          activeLocation={activeLocation}
          showInfoWindow={showInfoWindow}
        />
        <div className="list">
          <Filter
            id="location-filter"
            title="Filter by Movie"
            value={filterValue}
            onFilterSelect={this.updateFilterValue}
            options={movies}
          />
          <ListView
            locations={locations}
            activeLocation={activeLocation}
            itemClick={this.onListItemClick}
          />
        </div>
      </div>
    );
  }
}

/** 
* @description loads external script asynchronously
* @param {string} url - The url to load
*/
function loadScript(url) {
  var firstScript = document.getElementsByTagName('script')[0];
  var script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.defer = true;
  firstScript.parentNode.insertBefore(script, firstScript);
}

export default App;