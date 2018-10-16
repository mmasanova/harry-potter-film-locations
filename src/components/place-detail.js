import React, { Component } from 'react';

class PlaceDetail extends Component {
	state = {
		data: {},
		venueId: ''
	}

	componentDidMount() {
		console.log('mount!')
		alert('hey!!')
	}

	componentDidUpdate(prevProps) {
		console.log('update! ', prevProps, this)
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

	render() {
		// const { data } = this.state;
		// const venue = data.venue ? data.venue : 'N/A';
		const { location } = this.props;

		return (
			<div>
				{location && 
					<h1>{location.name}</h1>
				}
			</div>
		)
	}
}

export default PlaceDetail;