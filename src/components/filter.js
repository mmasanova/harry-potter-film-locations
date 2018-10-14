import React, { Component } from 'react';

export class Filter extends Component {
	render() {
		const times = [ 5, 10, 15, 20, 30 ]

		return (
			<div className="filter-container">
				<label 
					htmlFor="travel-time-filter"
					id="travel-time-filter-label">
					Filter by Travel Time
				</label>
				<select 
					id="travel-time-filter"
					defaultValue={this.props.value}>
				<option value="">Any</option>
				{
					times.map(time => (
						<option key={time} value={time}>{time} minutes</option>
					))
				}
				</select>
				<button>Filter</button>
			</div>
		)
	}
}