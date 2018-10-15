import React, { Component } from 'react';

class Marker extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.map !== prevProps.map ||
			this.props.position !== prevProps.position) {
			this.renderMarker();	
		}
	}

	renderMarker() {
		let { position, mapCenter, map } = this.props;

		let pos = position || mapCenter;
		position = new window.google.maps.LatLng(position);

		const options = {
			map: map,
			position: pos
		};

		this.marker = new window.google.maps.Marker(options);
	}

	render() {
		return null;
	}

	// Marker.propTypes = {
	// 	position: React.propTypes.object,
	// 	map: React.propTypes.object
	// }
}

export default Marker;