import React, { Component } from 'react';

export class ListView extends Component  {
	componentDidUpdate(prevProps) {
		if (prevProps.activeLocation !== this.props.activeLocation) {
			const location = this.props.activeLocation;
			const selectedLi = document.getElementById(location.id)

			if (selectedLi && this.props.scrollToView) selectedLi.scrollIntoView();
		}
	}

	render() {
		const { locations, activeLocation, itemClick } = this.props;

		return (
			<ul className="locations">
				{
					locations.map(location => (
						location.visible && 
						<li 
							id={location.id}
							key={location.name}
							className={location.id === activeLocation.id ? 'active-location' : ''}
							onClick={() => itemClick(location.id)}
						>{location.name}</li>
					))
				}
			</ul>
		)
	}
}