import React, { Component } from 'react';
import PropTypes from 'prop-types';

const eventNames = [ 'click', 'mouseover' ];

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
		let { position, mapCenter, map, visible, onCreate } = this.props;
		let pos = position || mapCenter;
		position = new window.google.maps.LatLng(pos);

		const options = {
			map: visible ? map : null,
			position: position
		};

		this.marker = new window.google.maps.Marker(options);

		if (onCreate) {
			onCreate(this.props, this.marker);
		}

		eventNames.forEach(e => {
			this.marker.addListener(e, this.handleEvent(e));
		});
	}

	handleEvent(evt) {
		return (e) => {
			const eventName = `on${camelize(evt)}`

			if (this.props[eventName]) {
				this.props[eventName](this.props, this.marker, e);
			}
		}
	}

	render() {
		return null;
	}
}

const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

Marker.propTypes = {
	position: PropTypes.object,
	map: PropTypes.object,
	onCreate: PropTypes.func
}

export default Marker;