import React, { Component } from 'react';

export class PlaceDetail extends Component {
	state = {
		data: {}
	}

	// componentDidMount() {
	// 	fetch('https://api.foursquare.com/v2/venues/56b73675498e84344998645a?client_id=LXGA0JVZIPS4YMLFKR51V5KEFQJZ4ILY33LW4J4RTZQBLT42&client_secret=LNSDFUA5TWGXOQRM45LB44W4R1KWL0QI25R4YOHP1AFYNLER&v=20181015')
	//     .then(response => response.json())
	//     .then(data => this.setState({ data: data}));
	// }

	render() {
		const { data } = this.state;

		return (
			<div>
				<h1>Name</h1>
			</div>
		)
	}
}