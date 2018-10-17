import React, { Component } from 'react';
import attributionLogo from '../icons/powered-by-foursquare-grey.svg'

class DetailWindow extends Component {
	render() {
		const { 
			venueInfo, 
			clientId, 
			locationName, 
			onCloseClick, 
			movie, 
			movies 
		} = this.props;
		let photoUrl;
		let movieNames;

		if (venueInfo && venueInfo.bestPhoto) {
			const bestPhoto = venueInfo.bestPhoto;
			photoUrl = `${bestPhoto.prefix}width300${bestPhoto.suffix}`;
		}

		if (movie) {
			if (movie.length === movies.length) {
				movieNames = 'Featured in all Harry Potter movies';
			} else {
				movieNames = movie.map(movieValue => {
					const index = movies.findIndex(thisMovie => movieValue === thisMovie.value);
					const returnValue = (index !== -1) ? movies[index].name : movieValue;

					return returnValue;
				}).join(', ');
			}
		}

		return (
			<div className="detail-window">
				<div className="detail-window-header">
					{venueInfo.name &&
						<a href={venueInfo.canonicalUrl + `?ref=${clientId}`} target="blank">
							<h2>{venueInfo.name || locationName}</h2>
						</a>
					}
					{venueInfo.error && <h2>{locationName}</h2>}
					<button 
						onClick={onCloseClick}
						className="close-detail">
						Close
					</button>
				</div>
				{movieNames && <div className="location-movie">{movieNames}</div>}
				{!venueInfo.name && !venueInfo.error && <span>Loading...</span>}
				{venueInfo.error && <span>Location detail could not be loaded</span>}
				{photoUrl && <img src={photoUrl} alt={venueInfo.name} />}
				{venueInfo.description && <p>{venueInfo.description}</p>}
				{venueInfo.contact && venueInfo.contact.formattedPhone &&
					<div id="contact-info">
						<label htmlFor="venue-contact">Contact:</label>
						<div id="venue-contact">
							{venueInfo.contact.formattedPhone}
						</div>
					</div>
				}
				{venueInfo.name && <img 
					className="attribution-logo"
					alt="Foursquare attribution logo"
					src={attributionLogo} />
				}
			</div>
		)
	}
}

export default DetailWindow;