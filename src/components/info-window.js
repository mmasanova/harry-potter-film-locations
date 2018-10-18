import { Component } from 'react';
import { camelize } from './utils';

class InfoWindow extends Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.map !== prevProps.map) {
			this.renderInfoWindow();
		}

		if (this.props.visible !== prevProps.visible ||
			this.props.marker !== prevProps.marker) {
			if (this.props.visible) {
				this.openWindow();
			} else {
				this.closeWindow();
			}
		}

		if (this.props.venueInfo !== prevProps.venueInfo) {
			// Update the info window content (using ReactDom.render)
			this.props.onDomready(this.props);
		}
	}

	/**
	* @description Open info window
	*/
	openWindow() {
		if (this.infoWindow) this.infoWindow.open(this.props.map, this.props.marker);
	}

	/**
	* @description Close info window
	*/
	closeWindow() {
		if (this.infoWindow) this.infoWindow.close();
	}

	/**
	* @description Initialise info window
	*/
	renderInfoWindow() {
		this.infoWindow = new window.google.maps.InfoWindow({
			content: '<div id="info-window-content"></div>'
		});

		if (this.infoWindow) {
			const eventNames = [ 'domready', 'closeclick' ];

			eventNames.forEach(e => {
				this.infoWindow.addListener(e, this.handleEvent(e));
			});
		}
	}

	/**
	* @description Handle info window event
	*/
	handleEvent(evt) {
		return (e) => {
			const eventName = `on${camelize(evt)}`;

			if (this.props[eventName]) {
				this.props[eventName](this.props, this.marker, e);
			}
		};
	}

	render() {
		return null;
	}
}

export default InfoWindow;