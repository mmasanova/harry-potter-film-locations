import React, { Component } from 'react';
import { Map } from './components/map';
import { ListView } from './components/listview';
import { Filter } from './components/filter';
import Heading from './components/heading';
import DetailWindow from './components/detail-window';
import activeIcon from './icons/place.svg';
import './App.css';
import data from './data';

class App extends Component {
  state = {
    map: null,
    mapCenter: { lat: 52.060020, lng: -1.340450 },
    filterValue: '',
    activeMarker: null,
    activeLocation: null,
    venueInfo: {},
    showInfoWindow: true,
    scrollItemToView: false,
    movies: data.movies,
    locations: data.locations
  }

  clientId = 'LXGA0JVZIPS4YMLFKR51V5KEFQJZ4ILY33LW4J4RTZQBLT42';
  clientSecret = 'LNSDFUA5TWGXOQRM45LB44W4R1KWL0QI25R4YOHP1AFYNLER';

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

    map.addListener('click', this.clearActiveMarker);

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
    const { activeMarker } = this.state;
    this.setMarkerActive(activeMarker, false);

    this.setState({ 
      activeMarker: marker,
      showInfoWindow: true,
      activeLocation: props.location,
      scrollItemToView: true
    });

    this.setMarkerActive(marker, true);
  }

  clearActiveMarker = () => {
    const { activeMarker } = this.state;
    this.setMarkerActive(activeMarker, false);

    this.setState({
      activeMarker: null,
      activeLocation: null,
      showInfoWindow: false,
      scrollItemToView: false
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

    this.setState({
      scrollItemToView: false
    });
  }

  setMarkerActive = (marker, active) => {
    if (marker) {
      if (active) {
        this.toogleMarkerBounce(marker, true);
        this.setMarkerIcon(marker, true);
      } else {
        this.toogleMarkerBounce(marker, false);
        this.setMarkerIcon(marker, false);
      }
    }
  }

  toogleMarkerBounce = (marker, bounce) => {
    if (bounce) {
      marker.setAnimation(window.google.maps.Animation.BOUNCE);
    } else {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      }
    }
  }

  setMarkerIcon(marker, active) {
    if (active) {
      marker.setIcon(activeIcon);
    } else {
      marker.setIcon(null);
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

  fetchLocationDetail = (id) => {
    const url = `https://api.foursquare.com/v2/venues/${id}?client_id=${this.clientId}&client_secret=${this.clientSecret}&v=20181015`;

    fetch(url)
      .then(response => {
        if (response && response.ok) {
          return response.json();
        } else {
          return { meta: 999 };
        }
      })
      .then(data => {
        if (data && data.meta && data.meta.code === 200) {
          this.setState({ venueInfo: data.response.venue });
        } else {
          this.setState({ venueInfo: { error: true } });
        }
      })
      .catch(error => this.setState({ venueInfo: { error: true } }));
  }

  render() {
    const { 
      locations, 
      filterValue, 
      showInfoWindow,
      scrollItemToView,
      activeMarker, 
      activeLocation,
      mapCenter,
      map,
      movies,
      venueInfo
    } = this.state;

    return (
      <div className="App">
        <Heading title="Harry Potter Films' Locations" />
        <main className="content">
          <Map 
            map={map}
            locations={locations}
            onMarkerClick={this.onMarkerClick}
            onMarkerCreated={this.onMarkerCreated}
            onInfoWindowClose={this.clearActiveMarker}
            mapCenter={mapCenter}
            activeMarker={activeMarker}
            activeLocation={activeLocation}
            venueInfo={venueInfo}
            showInfoWindow={showInfoWindow}
            onInfoWindowUpdate={this.fetchLocationDetail}
            clientId={this.clientId}
          />
          { !activeMarker && 
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
                scrollToView={scrollItemToView}
                id="locations-list"
              />
            </div>
          }
          { activeMarker &&
              <DetailWindow 
                venueInfo={venueInfo} 
                clientId={this.clientId}
                locationName={activeLocation ? activeLocation.name : ''}
                movie={activeLocation ? activeLocation.movie : ''}
                movies={movies}
                onCloseClick={this.clearActiveMarker}
              />
          }
        </main>
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
  script.innerHTML = 'function gm_authFailure() {alert("map auth fail")}';

  firstScript.parentNode.insertBefore(script, firstScript);
}

export default App;