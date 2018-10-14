import React, { Component } from 'react';

export class ListView extends Component  {
	render() {
		const { locations } = this.props;

		return (
			<ul className="locations">
				{
					locations.map(location => (
						<li key={location.name}>{location.name}</li>
					))
				}
			</ul>
		)
	}
}