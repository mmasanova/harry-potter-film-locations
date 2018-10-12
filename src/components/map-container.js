import React, { Component } from 'react';
import { GoogleApiWrapper, Map } from 'google-maps-react';

export class MapContainer extends Component {
	render () {
		console.log(this.props)
		return (
			<Map 
				google={this.props.google} 
				style={{ height: '100%', position: 'relative', width: '100%' }} 
				zoom={14}
				initialCenter={{ lat: 51.752022, lng: -1.257677 }}>
			</Map>
		)
	}
}


