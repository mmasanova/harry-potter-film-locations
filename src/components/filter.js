import React, { Component } from 'react';

export class Filter extends Component {
	render() {
		const { value, onFilterSelect, options, title, id } = this.props;

		return (
			<div className="filter-container">
				<label
					className="filter-label"
					htmlFor={id}>
					{title}
				</label>
				<select
					id={id}
					defaultValue={value}
					onChange={(event) => onFilterSelect(event.target.value)}>
					<option value="">Any</option>
					{
						options.map(option => (
							<option
								key={option.value}
								value={option.value}>
								{option.name}
							</option>
						))
					}
				</select>
			</div>
		)
	}
}