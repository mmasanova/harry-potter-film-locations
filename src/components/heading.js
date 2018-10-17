import React, { Component } from 'react';

class Heading extends Component {
	render() {
		return (
			<div class="heading">
				<h1>{this.props.title}</h1>
			</div>
		)
	}
}

export default Heading;