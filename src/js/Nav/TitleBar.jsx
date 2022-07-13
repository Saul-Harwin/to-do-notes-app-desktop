import React, { Component } from 'react';

class TitleBar extends Component {
	render() {
		return (
			<div className='title_bar'>
				<p className='title'>Note taking App</p>
				<input className='search_bar'></input>
				<div className='profile'>
					<div className='avatar'></div>
					<p className='name'>Saul Harwin</p>
				</div>
			</div>
		);
	}
}

export default TitleBar;
