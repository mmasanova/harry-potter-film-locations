import React, { Component } from 'react';

/**
* Listbox accessibility features are based on: 
* https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/listbox_role 
*/

export class ListView extends Component  {
	state = {
		focusedItem: this.props.activeLocation ? this.props.activeLocation.id : ''
	}

	componentDidMount() {
		this.setActiveItemFocus();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.focusedItem !== this.state.focusedItem) {
			this.setActiveItemFocus();
		}
	}

	/**
	* @description Set focus to active item and scroll it into view if necessary
	*/
	setActiveItemFocus() {
		if (this.state.focusedItem) {
			const element = document.getElementById(this.state.focusedItem);
			
			element.focus();
			element.scrollIntoView({block: "nearest"});
		}
	}

	/**
	* @description When list focuses set focus to the first item if no other list
	* item is in focus (selected)
	*/
	onListFocus = () => {
		if (this.state.focusedItem === '') {
			const firstItem = document.getElementById(this.props.id).querySelector('[role="option"]');

			this.setState({
				focusedItem: firstItem.id
			});
		}
	}

	/**
	* @description Clear focused item when listview loses focus
	* @params {object} e - DOM event
	*/
	onListBlur = (e) => {
		this.setState({
			focusedItem: ''
		});
	}

	/**
	* @description Handle key events, move focused
	* @params {object} e - DOM event
	*/
	onKeyDown = (e) => {
		const keys = {
			up: 38,
			down: 40,
			space: 32,
			enter: 13
		};

		const focusedItem = document.getElementById(this.state.focusedItem);
		
		switch (e.keyCode) {
			case keys.down:
				if (focusedItem.nextSibling) {
					this.setState({
						focusedItem: focusedItem.nextSibling.id
					});
				}

				e.preventDefault();

				break;

			case keys.up:
				if (focusedItem.previousSibling) {
					this.setState({
						focusedItem: focusedItem.previousSibling.id
					});
				}

				e.preventDefault();

				break;

			case keys.space:
			case keys.enter:
				this.props.itemClick(this.state.focusedItem);
				
				break;

			default:
				break;
		}
	}

	render() {
		const { locations, activeLocation, itemClick, id } = this.props;
		const { focusedItem } = this.state;
		const activeLocationId = activeLocation ? activeLocation.id : '';

		return (
			<ul 
				id={id}
				className="list-view"
				role="listbox"
				tabIndex="0"
				aria-label="Harry Potter film locations"
				aria-activedescendant={focusedItem}
				onFocus={this.onListFocus}
				onBlur={(e) => this.onListBlur(e)}
				onKeyDown={(event) => this.onKeyDown(event)}>
				{
					locations.map(location => {
						let classNames = [];

						if (location.id === focusedItem) {
							classNames.push('focused');
						}

						if (location.id === activeLocationId) {
							classNames.push('list-view-selected');
						}

						return (
							location.visible && 
							<li 
								id={location.id}
								key={location.name}
								className={classNames.join(' ')}
								onClick={() => itemClick(location.id)}
								role="option"
								aria-selected={activeLocationId === location.id}
							>{location.name}</li>
						)
					})
				}
			</ul>
		)
	}
}