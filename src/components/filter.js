import React, { Component } from 'react';

export class Filter extends Component {
	render() {
		const times = [ 5, 10, 15, 20, 30 ]
		const { value, onFilterSelect } = this.props;

		return (
			<div className="filter-container">
				<label 
					htmlFor="travel-time-filter"
					id="travel-time-filter-label">
					Filter by Travel Time
				</label>
				<select 
					id="travel-time-filter"
					defaultValue={value}
					onChange={(event) => onFilterSelect(event.target.value)}>
					<option value="">Any</option>
					{
						times.map(time => (
							<option key={time} value={time}>Up to {time} minutes</option>
						))
					}
				</select>
			</div>
		)
	}
}