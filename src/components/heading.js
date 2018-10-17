import React, { Component } from 'react';

class Heading extends Component {
	render() {
		return (
			<div className="heading">
				<h1>{this.props.title}</h1>
			</div>
		)
	}
}

export default Heading;