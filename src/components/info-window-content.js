import React, { Component } from 'react';
import attributionLogo from '../icons/powered-by-foursquare-grey.svg';

class PlaceDetail extends Component {
	state = {
		venueInfo: {}
	}

	componentDidMount() {
		const { location, onInfoWindowUpdate } = this.props;
		
		if (location && location.id) onInfoWindowUpdate(location.id);
	}

	componentDidUpdate(prevProps) {
		const prevLocation = prevProps.location ? prevProps.location : {};
		const currLocation = this.props.location ? this.props.location : {};

		if (prevLocation.id !== currLocation.id) {
			this.props.onInfoWindowUpdate(currLocation.id);
		}
	}

	render() {
		const { location, clientId, venueInfo } = this.props;

		return (
			<div className="place-detail">
				{location &&
					<h2>
						<a href={venueInfo.canonicalUrl + `?ref=${clientId}`} target="blank">
							{venueInfo.name || location.name}
						</a>
					</h2>
				}
				{venueInfo.error && <span>Details could not be loaded.</span>}
				{!venueInfo.name && !venueInfo.error && <span>Loading detail...</span>}
				{venueInfo.name &&
					<div id="venue-info">
						{ venueInfo.location && venueInfo.location.formattedAddress &&
							<div id="address">
								<label htmlFor="venue-address">Address:</label>
								<div id="venue-address">
									{
										venueInfo.location.formattedAddress.join(', ')
									}
								</div>
							</div>
						}
						<img 
							className="attribution-logo-small"
							alt="Foursquare attribution logo"
							src={attributionLogo} />
					</div>
				}
			</div>
		)
	}
}

export default PlaceDetail;