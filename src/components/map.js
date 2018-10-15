import React, { Component } from 'react';
import PlaceDetail from '.\\place-detail';
import Marker from '.\\marker'

export class Map extends Component {
	state = {
		bounds: {}
	}

	// onMapReady(mapProps, map) {
	// 	// Set map bounds in order to display all markers
	// 	const markers = mapProps.children[0];

	// 	if (markers) {
	// 		let bounds = new window.google.maps.LatLngBounds();

	// 		markers.forEach(marker => {
	// 			bounds.extend(marker.props.position);
	// 		});

	// 		map.fitBounds(bounds);
	// 	}
	// }

	render () {
		//const { locations, google, onMapClick, onMarkerClick, showInfoWindow, activeMarker, activeLocation } = this.props;
		const { locations, map } = this.props;

		return (
			<div id="map" className="map-view">
				{
					locations.map(location => (
						<Marker 
							map={map} 
							position={location.position}
						/>
					))
				}
			</div>
		)
	}
}


