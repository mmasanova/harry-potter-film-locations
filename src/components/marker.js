import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Marker extends Component {
	componentWillUnmount() {
		if (this.marker) {
			this.marker.setMap(null);
		}
	}

	componentDidUpdate(prevProps) {
		if (this.props.map !== prevProps.map ||
			this.props.position !== prevProps.position) {
			this.renderMarker();	
		} else if (this.props.visible !== prevProps.visible) {
			if (this.props.visible) {
				this.marker.setMap(this.props.map);
			} else {
				this.marker.setMap(null);
			}
		}
	}

	renderMarker() {
		let { position, mapCenter, map, visible } = this.props;

		let pos = position || mapCenter;
		position = new window.google.maps.LatLng(pos);

		const options = {
			map: visible ? map : null,
			position: position
		};

		this.marker = new window.google.maps.Marker(options);
	}

	render() {
		return null;
	}
}

Marker.propTypes = {
	position: PropTypes.object,
	map: PropTypes.object
}

export default Marker;