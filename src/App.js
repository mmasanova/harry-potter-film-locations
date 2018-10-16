import React, { Component } from 'react';
import { Map } from '.\\components\\map';
import { ListView } from '.\\components\\listview';
import { Filter } from '.\\components\\filter';
import './App.css';

class App extends Component {
  state = {
    map: null,
    mapCenter: { lat: 52.060020, lng: -1.340450 },
    filterValue: '',
    activeMarker: {},
    activeLocation: {},
    showInfoWindow: true,
    movies: [
      { value: 1, name: 'Harry Potter and the Philosopher\'s Stone' },
      { value: 2, name: 'Harry Potter and the Chamber of Secrets' },
      { value: 3, name: 'Harry Potter and the Prisoner of Azkaban' },
      { value: 4, name: 'Harry Potter and the Goblet of Fire' },
      { value: 5, name: 'Harry Potter and the Order of the Phoenix' },
      { value: 6, name: 'Harry Potter and the Half-Blood Prince' },
      { value: 7, name: 'Harry Potter and the Deathly Hallows Part 1' },
      { value: 8, name: 'Harry Potter and the Deathly Hallows Part 2' }
    ],
    locations: [
      {
        name: 'Australia House',
        position: {
          lat: 51.51037,
          lng: -0.12157
        },
        visible: true,
        id: '4ad31fe9f964a52023e320e3',
        movie: [ 1 ]
      },
      {
        name: 'King\'s Cross Station',
        position: {
          lat: 51.530586,
          lng: -0.12447212
        },
        visible: true,
        id: '4af33684f964a520c7eb21e3',
        movie: [ 1, 2, 3, 4, 5, 6, 7, 8 ]
      },
      {
        name: 'Millennium Bridge',
        position: {
          lat: 51.50947,
          lng: -0.098558
        },
        visible: true,
        id: '4ac518cef964a52022a620e3',
        movie: [ 6 ]
      },
      {
        name: 'London City Hall',
        position: {
          lat: 51.505238,
          lng: -0.079039335
        },
        visible: true,
        id: '4b460230f964a520131426e3',
        movie: [ 6 ]
      },
      {
        name: 'Great Scotland Yard',
        position: {
          lat: 51.506222,
          lng: -0.126169
        },
        visible: true,
        id: '547b6c2d498e3f5770072260',
        movie: [ 6 ]
      },
      {
        name: 'Claremont Square',
        position: {
          lat: 51.5308,
          lng: -0.11031389
        },
        visible: true,
        id: '51ea867e5019f55eb85cf0dd',
        movie: [ 5, 7 ]
      },
      {
        name: 'Piccadilly Circus',
        position: {
          lat: 51.51001,
          lng: -0.13459364
        },
        visible: true,
        id: '4c9c6a059c48236a1cb14dee',
        movie: [ 7 ]
      },
      {
        name: 'Leadenhall Market',
        position: {
          lat: 51.51282,
          lng: -0.08343618
        },
        visible: true,
        id: '4ac518eff964a52062ad20e3',
        movie: [ 1 ]
      },
      {
        name: 'Reptile House, London Zoo',
        position: {
          lat: 51.535645,
          lng: -0.15573978
        },
        visible: true,
        id: '4dd912d3d1647fcf3e72035f',
        movie: [ 1 ]
      },
      {
        name: 'St. Pancras Renaissance Hotel',
        position: {
          lat: 51.529972,
          lng: -0.125404
        },
        visible: true,
        id: '4d00c69af1605481dce59fea',
        movie: [ 1 ]
      },
      {
        name: 'Durham Cathedral',
        position: {
          lat: 54.772405,
          lng: -1.576418
        },
        visible: true,
        id: '4b6e9b65f964a520cbc32ce3',
        movie: [ 1, 2, 3 ]
      },
      {
        name: 'Alnwick Castle',
        position: {
          lat: 55.415726,
          lng: -1.7060995
        },
        visible: true,
        id: '4b6eaf28f964a52080c62ce3',
        movie: [ 1, 2 ]
      },
      {
        name: 'Malham Cove',
        position: {
          lat: 54.0607,
          lng: -2.1537
        },
        visible: true,
        id: '4c0a77d27e3fc928cb9af382',
        movie: [ 7 ]
      },
      {
        name: 'New College',
        position: {
          lat: 51.754994,
          lng: -1.251768
        },
        visible: true,
        id: '4beae24a4f5576b04435b396',
        movie: [ 4 ]
      },
      {
        name: 'Lacock Abbey',
         position: {
          lat: 51.414684,
          lng: -2.1212082
        },
        visible: true,
        id: '4bf3cf3c6ba2b713362f8977',
        movie: [ 1, 2 ]
      },
      {
        name: 'Virginia Water',
         position: {
          lat: 51.410316,
          lng: -0.592274
        },
        visible: true,
        id: '4b5c6295f964a5207b2d29e3',
        movie: [ 3, 4 ]
      },
      {
        name: 'Goathland Train Station',
         position: {
          lat: 54.405403,
          lng: -0.696376
        },
        visible: true,
        id: '4c7e554701589521cbcd0863',
        movie: [ 1 ]
      },{
        name: 'Ashridge Wood',
        position: {
          lat: 51.418987,
          lng: -0.825477
        },
        visible: true,
        id: '4baf73c3f964a520eb003ce3',
        movie: [ 4 ]
      },{
        name: 'Seven Sisters Country Park',
        position: {
          lat: 50.771173,
          lng: 0.165405
        },
        visible: true,
        id: '4bc9a7290687ef3b2e3bdacc',
        movie: [ 4 ]
      },{
        name: 'Hardwick Hall',
        position: {
          lat: 53.1665647314269,
          lng: -1.30997173157461
        },
        visible: true,
        id: '4bc089b7abf495219259bf93',
        movie: [ 7, 8 ]
      },{
        name: 'Gloucester Cathedral',
        position: {
          lat: 51.866571,
          lng: -2.246986
        },
        visible: true,
        id: '4b8a755ff964a520946d32e3',
        movie: [ 1, 2, 3 ]
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

  /**
  * @description Initialises a google maps map object and stores its reference in state
  */
  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: this.state.mapCenter,
      zoom: 14
    });

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
    console.log(props, marker);
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