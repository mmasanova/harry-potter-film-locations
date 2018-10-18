import React, { Component } from 'react';
import Marker from './marker'
import InfoWindow from './info-window';
import InfoWindowContent from './info-window-content';
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

		if (contentDiv) {
			ReactDom.render((
				<InfoWindowContent 
					location={this.location}
					venueInfo={this.venueInfo} 
					clientId={this.clientId}
				/>
			), contentDiv);
		}
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
			onMarkerCreated,
			venueInfo,
			clientId
		} = this.props;

		return (
			<div 
				id="map" 
				className="map-view"
				aria-label="Map of Harry Potter film locations in UK" 
				role="application">
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
					clientId={clientId}>
				</InfoWindow>
			</div>
		)
	}
}


