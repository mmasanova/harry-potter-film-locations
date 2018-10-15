import React, { Component } from 'react';
import { Map, Marker, InfoWindow } from 'google-maps-react';
import { PlaceDetail } from '.\\place-detail';

export class MapContainer extends Component {
	state = {
		bounds: {}
	}

	onMapReady(mapProps, map) {
		// Set map bounds in order to display all markers
		const markers = mapProps.children[0];

		if (markers) {
			let bounds = new window.google.maps.LatLngBounds();

			markers.forEach(marker => {
				bounds.extend(marker.props.position);
			});

			map.fitBounds(bounds);
		}
	}

	render () {
		const { locations, google, onMapClick, onMarkerClick, showInfoWindow, activeMarker } = this.props;

		return (
			<Map
				google={google}
				initialCenter={{ lat: 52.060020, lng: -1.340450 }}
				onReady={this.onMapReady}
				bounds={this.state.bounds}
				onClick={onMapClick}>
				{ 
					locations
					.filter(location => location.visible)
					.map(location => (
						<Marker 
							position={location.position}
							name={location.name}
							title={location.name}
							key={location.name}
							onClick={onMarkerClick} />
					))
				}
				<InfoWindow 
					visible={showInfoWindow}
					marker={activeMarker} 
				>
					<PlaceDetail />
				</InfoWindow>
			</Map>
		)
	}
}


