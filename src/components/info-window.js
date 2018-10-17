import { Component } from 'react';

class InfoWindow extends Component {
	componentDidUpdate(prevProps, prevState) {
		if (this.props.map !== prevProps.map) {
			this.renderInfoWindow();
		}

		if (this.props.visible !== prevProps.visible ||
			this.props.marker !== prevProps.marker) {
			this.props.visible ? this.openWindow() : this.closeWindow();
		}
	}

	openWindow() {
		this.infoWindow.open(this.props.map, this.props.marker);
	}

	closeWindow() {
		this.infoWindow.close();
	}

	renderInfoWindow() {
		this.infoWindow = new window.google.maps.InfoWindow({
			content: '<div id="info-window-content"></div>'
		});

		const eventNames = [ 'domready', 'closeclick' ];

		eventNames.forEach(e => {
			this.infoWindow.addListener(e, this.handleEvent(e));
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

export default InfoWindow;