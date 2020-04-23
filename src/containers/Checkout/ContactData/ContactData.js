import React, { Component } from 'react';
import axios from '../../../axios-orders';
import { withRouter } from 'react-router';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class ContactData extends Component {
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your Name',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'ZIP Code',
				},
				value: '',
				validation: {
					required: true,
					minLegth: 5,
					maxLength: 5,
				},
				valid: false,
				touched: false,
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your E-mail',
				},
				value: '',
				validation: {
					required: true,
				},
				valid: false,
				touched: false,
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' },
					],
				},
				value: 'fastest',
				validation: {},
				valid: true,
				touched: false,
			},
		},
		formIsValid: false,
		loading: false,
	};

	orderHandler = (event) => {
		event.preventDefault();

		let price = 4;
		for (let ing in this.props.ingredients) {
			price += INGREDIENTS_PRICES[ing] * this.props.ingredients[ing];
		}
		const formData = {};
		for (let formElement in this.state.orderForm) {
			formData[formElement] = this.state.orderForm[formElement].value;
		}
		const order = {
			ingredients: this.props.ingredients,
			price: price.toFixed(2),
			orderData: formData,
		};
		this.setState({ loading: true });
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

	checkValidation = (value, rules) => {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLegth) {
			isValid = value.length >= rules.minLegth && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.minLegth && isValid;
		}
		return isValid;
	};

	inputChangedHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {
			...this.state.orderForm,
		};
		const updatedFormElement = { ...updatedOrderForm[inputIdentifier] };

		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation);
		updatedOrderForm[inputIdentifier] = updatedFormElement;
		updatedFormElement.touched = true;

		let formIsValid = true;
		for (let inputId in updatedOrderForm) {
			formIsValid = formIsValid && updatedOrderForm[inputId].valid;
		}

		this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
	};

	render() {
		const formElements = [];

		for (let key in this.state.orderForm) {
			formElements.push({
				id: key,
				config: this.state.orderForm[key],
			});
		}

		let form = (
			<form onSubmit={this.orderHandler}>
				{formElements.map((formElement) => (
					<Input
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						key={formElement.id}
						changed={(event) => this.inputChangedHandler(event, formElement.id)}
						invalid={!formElement.config.valid}
						touched={formElement.config.touched}
						shouldValidate={formElement.config.validation}
					/>
				))}
				<Button btnType="Success" onClick={this.orderHandler} disabled={!this.state.formIsValid}>
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
