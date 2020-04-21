import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { withRouter } from 'react-router';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class ContactData extends Component {
	state = {
		name: '',
		email: '',
		address: {
			street: '',
			postalCode: '',
		},
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		let price = 4;
		for (let ing in this.props.ingredients) {
			price += INGREDIENTS_PRICES[ing] * this.props.ingredients[ing];
		}
		this.setState({ loading: true });
		const order = {
			ingredients: this.props.ingredients,
			price: price.toFixed(2),
			customer: {
				name: 'Arian Bahrampour',
				address: {
					street: 'KermoonStreen 1',
					zipCode: '41351',
					country: 'Iran',
				},
				email: 'test@test.com',
			},
			deliveryMethod: 'fastest',
		};
		axios
			.post('/orders.json', order)
			.then((response) => {
				this.setState({ loading: false });
				this.props.history.replace('/orders');
			})
			.catch((error) => {
				this.setState({ loading: false });
			});
	};

	render() {
		let form = (
			<form>
				<input className={classes.Input} type="text" name="name" placeholder="Your name" />
				<input className={classes.Input} type="text" name="email" placeholder="Your Mail" />
				<input className={classes.Input} type="text" name="street" placeholder="Street" />
				<input className={classes.Input} type="text" name="postal" placeholder="Postal Code" />
				<Button btnType="Success" onClick={this.orderHandler}>
					Order
				</Button>
			</form>
		);
		if (this.state.loading) form = <Spinner />;
		return (
			<div className={classes.ContactData}>
				<h4>Enter your Contact Data</h4>
				{form}
			</div>
		);
	}
}

export default withRouter(ContactData);
