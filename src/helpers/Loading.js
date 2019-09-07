import React, { Component } from 'react';
import { Spinner } from 'reactstrap'
export default class Loading extends Component {
	render() {
		return (
			<div className="h-100 w-100 d-flex justify-content-center align-items-center">
				<Spinner />
			</div>
		)
	}
}