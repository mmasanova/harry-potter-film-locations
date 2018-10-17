import React, { Component } from 'react';
import attributionLogo from '../powered-by-foursquare-grey.svg'

class DetailWindow extends Component {
	render() {
		const { venueInfo, clientId, locatioName } = this.props;
		let photoUrl;

		if (venueInfo && venueInfo.bestPhoto) {
			const bestPhoto = venueInfo.bestPhoto;
			photoUrl = `${bestPhoto.prefix}width300${bestPhoto.suffix}`;
		}

		return (
			<div className="detail-window">
				{venueInfo.name &&
					<a href={venueInfo.canonicalUrl + `?ref=${clientId}`} target="blank">
						<h2>{venueInfo.name || locatioName}</h2>
					</a>
				}
				{!venueInfo.name && !venueInfo.error && <span>Loading...</span>}
				{venueInfo.error && <span>Location detail could not be loaded</span>}
				{photoUrl && <img src={photoUrl} />}
				{venueInfo.description && <p>{venueInfo.description}</p>}
				{venueInfo.contact && venueInfo.contact.formattedPhone &&
					<div id="contact-info">
						<label htmlFor="venue-contact">Contact:</label>
						<div id="venue-contact">
							{venueInfo.contact.formattedPhone}
						</div>
					</div>
				}
				<img 
					className="attribution-logo"
					src={attributionLogo} />
			</div>
		)
	}
}

export default DetailWindow;