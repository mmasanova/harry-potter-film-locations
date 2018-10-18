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

	clientId = process.env.REACT_APP_FOURSQUARE_API_CLIENT_ID;
	clientSecret = process.env.REACT_APP_FOURSQUARE_API_CLIENT_SECRET;

	componentDidMount() {
		this.renderMap();
	}

	/**
	* @description Render Google Maps API map
	*/
	renderMap = () => {
		loadScript(`https://maps.googleapis.com/maps/api/js?v=3&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&callback=initMap`);
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

	/**
	* @description On filter change set selectedValue and set locations' visible attribute
	* based on the filter value
	*/
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

	/**
	* @description Handle marker click event, set it to active and fetch location
	*/
	onMarkerClick = (props, marker) => {
		const { activeMarker } = this.state;
		this.setMarkerActive(activeMarker, false);

		this.setState({
			venueInfo: {},
			activeMarker: marker,
			showInfoWindow: true,
			activeLocation: props.location,
			scrollItemToView: true
		});

		this.setMarkerActive(marker, true);
		this.fetchLocationDetail(props.location.id);
	}

	/**
	* @description Clear active marker
	*/
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

	/*/
	* @description Handle list item click, set state and fetch location detail
	*/
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

		this.fetchLocationDetail(locationId);
	}

	/**
	* @description Toggle marker icon and bounce
	*/
	setMarkerActive = (marker, active) => {
		if (marker) {
			if (active) {
				this.toogleMarkerBounce(marker, true);
				this.setMarkerIcon(marker, true);
				this.state.map.setCenter(marker.getPosition());
			} else {
				this.toogleMarkerBounce(marker, false);
				this.setMarkerIcon(marker, false);
			}
		}
	}

	/**
	* @description Toggle marker bouncing
	*/
	toogleMarkerBounce = (marker, bounce) => {
		if (bounce) {
			marker.setAnimation(window.google.maps.Animation.BOUNCE);
		} else {
			if (marker.getAnimation() !== null) {
				marker.setAnimation(null);
			}
		}
	}

	/**
	* @description Toggle marker's icon
	*/
	setMarkerIcon(marker, active) {
		if (active) {
			marker.setIcon(activeIcon);
		} else {
			marker.setIcon(null);
		}
	}

	/**
	* @description When a marker is created attach its reference to corresponding locations item
	*/
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

	/**
	* @description Fetch location detail from foursquare API and update state
	*/
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
		clientId={this.clientId}
		/>
		{ !activeLocation &&
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
		{ activeLocation &&
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