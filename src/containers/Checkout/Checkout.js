import React, { Component } from 'react';
import { Route } from 'react-router';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

export class Checkout extends Component {
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
					ingredients={this.props.ingredients}
					checkoutCancelled={this.checkoutCancelledHandler}
					checkoutContinued={this.checkoutContinuedHandler}
				/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData}></Route>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
	};
};

export default connect(mapStateToProps)(Checkout);
