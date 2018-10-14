import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react';

export class MapContainer extends Component {
	state = {
		bounds: {}
	}

	onMapReady(mapProps, map) {
		// Set map bounds in order to display all markers
		let bounds = new window.google.maps.LatLngBounds();

		mapProps.children.forEach(child => {
			bounds.extend(child.props.position);
		});

		map.fitBounds(bounds);
	}

	render () {
		const { locations, google } = this.props;

		return (
			<Map
				google={google}
				initialCenter={{ lat: 52.060020, lng: -1.340450 }}
				onReady={this.onMapReady}
				bounds={this.state.bounds}>
				{ locations.map(location => (
					<Marker 
						position={location.position}
						name={location.name}
						title={location.name}
						key={location.name}
						visible={true} />
				))}
			</Map>
		)
	}
}


