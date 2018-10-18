import React, { Component } from 'react';

class Heading extends Component {
	render() {
		return (
			<header className="heading">
				<h1>{this.props.title}</h1>
			</header>
		)
	}
}

export default Heading;