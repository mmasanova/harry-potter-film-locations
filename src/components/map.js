import React, { Component } from 'react';
import Marker from '.\\marker'
import InfoWindow from '.\\info-window';
import PlaceDetail from '.\\place-detail';
import ReactDom from 'react-dom';

export class Map extends Component {
	state = {
		bounds: {}
	}

	/**
	* @description update the content inside the info window
	*/
	onInfoWindowReady() {
		const contentDiv = document.getElementById('info-window-content');
		ReactDom.render((
			<PlaceDetail 
				location={this.location}
				venueInfo={this.venueInfo} 
				onInfoWindowUpdate={this.onInfoWindowUpdate}
				clientId={this.clientId}
			/>
		), contentDiv);
	}

	render () {
		const { 
			locations, 
			map, 
			onMarkerClick, 
			mapCenter, 
			activeMarker, 
			showInfoWindow, 
			activeLocation, 
			onInfoWindowClose,
			onInfoWindowUpdate,
			onMarkerCreated,
			venueInfo,
			clientId
		} = this.props;

		return (
			<div id="map" className="map-view">
				<div className="map-error">Map could not be loaded</div>
				{
					locations
					.map(location => (
						<Marker
							visible={location.visible}
							key={location.id} 
							map={map}
							mapCenter={mapCenter}
							position={location.position}
							location={location}
							onClick={onMarkerClick}
							onCreate={onMarkerCreated}
						/>
					))
				}
				<InfoWindow 
					marker={activeMarker}
					map={map}
					visible={showInfoWindow}
					location={activeLocation}
					onDomready={this.onInfoWindowReady}
					onCloseclick={onInfoWindowClose}
					venueInfo={venueInfo}
					onInfoWindowUpdate={onInfoWindowUpdate}
					clientId={clientId}>
				</InfoWindow>
			</div>
		)
	}
}


