import React, { Component } from 'react';
import { Map, Marker } from 'google-maps-react';

export class MapContainer extends Component {
	render () {
		const { locations } = this.props;
		
		return (
			<Map 
				google={this.props.google} 
				style={{ height: '100%', position: 'relative', width: '100%' }} 
				zoom={14}
				initialCenter={{ lat: 52.060020, lng: -1.340450 }}>
			{ locations.map(location => (
				<Marker 
					position={{ lat: location.lat, lng: location.lng }}
					name={location.name}
					title={location.name}
					key={location.name}
					visible={true} />
				))}
			</Map>
		)
	}
}


