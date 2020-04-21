import React, { Component } from 'react';
import { Route } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

export class Checkout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: {
				salad: 0,
				bacon: 0,
				meat: 0,
				cheese: 0,
			},
		};
	}

	componentDidMount() {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};

		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1];
		}
		this.setState({ ingredients: ingredients });
	}

	checkoutCancelledHandler = () => {
		this.props.history.goBack();
	};
	checkoutContinuedHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	};

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					render={() => <ContactData ingredients={this.state.ingredients} />}
				></Route>
			</div>
		);
	}
}

export default Checkout;
