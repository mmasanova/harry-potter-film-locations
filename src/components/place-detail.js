import React, { Component } from 'react';

class PlaceDetail extends Component {
	state = {
		venueInfo: {},
		venueId: ''
	}

	componentDidMount() {
		console.log('mount!', this)

		if (this.props.location && this.props.location.id) {
			this.fetchLocationDetail(this.props.location.id);
		}
	}

	componentDidUpdate(prevProps) {
		console.log('update! ', prevProps, this)
		const prevLocation = prevProps.location ? prevProps.location : {};
		const currLocation = this.props.location ? this.props.location : {};

		if (prevLocation.id !== currLocation.id) {
			this.setState({
				venueInfo: {}
			});

			this.fetchLocationDetail(currLocation.id);
		}
		// if (prevProps.venueId !== this.state.venueId) {
		// 	console.log('fetching...');
		// 	const clientId = 'LXGA0JVZIPS4YMLFKR51V5KEFQJZ4ILY33LW4J4RTZQBLT42';
		// 	const clientSecret = 'LNSDFUA5TWGXOQRM45LB44W4R1KWL0QI25R4YOHP1AFYNLER'
		// 	const venueId = '56b73675498e84344998645a';
		// 	const url = `https://api.foursquare.com/v2/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=20181015`;

		// 	fetch(url)
		//     .then(response => response.json())
		//     .then(data => this.setState({ data: data}));
		// }
	}

	fetchLocationDetail(id) {
		console.log('fetching: ' + id)
		const clientId = 'LXGA0JVZIPS4YMLFKR51V5KEFQJZ4ILY33LW4J4RTZQBLT42';
		const clientSecret = 'LNSDFUA5TWGXOQRM45LB44W4R1KWL0QI25R4YOHP1AFYNLER'
		const url = `https://api.foursquare.com/v2/venues/${id}?client_id=${clientId}&client_secret=${clientSecret}&v=20181015`;

		fetch(url)
	    .then(response => response.json())
	    .then(data => {

	    	this.setState({ venueInfo: data.response.venue });
	    });
	    //.then(data => this.setState({ data: data}));
		
	}

	render() {
		// const { data } = this.state;
		// const venue = data.venue ? data.venue : 'N/A';
		const { location } = this.props;
		const { venueInfo } = this.state;

		return (
			<div>
				{location && 
					<h2>{venueInfo.name || location.name}</h2>
				}
				{!venueInfo.name && <span>Loading detail...</span>}
				{venueInfo.name &&
					<div id="venue-info">
						{ venueInfo.location && venueInfo.location.formattedAddress &&
							<div id="address">
								<label for="venue-address">Address:</label>
								<div id="venue-address">
									{
										venueInfo.location.formattedAddress.map(line => {
											return (
												<div>{line}</div>)
										})
									}
								</div>
							</div>
						}
						{venueInfo.contact && venueInfo.contact.formattedPhone &&
							<div id="contact-info">
								<label for="venue-contact">Contact:</label>
								<div id="venue-contact">
									{venueInfo.contact.formattedPhone}
								</div>
							</div>
						}
					</div>
				}
			</div>
		)
	}
}

export default PlaceDetail;