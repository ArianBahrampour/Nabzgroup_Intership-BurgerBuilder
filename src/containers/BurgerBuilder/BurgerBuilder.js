import React, { Component } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Aux from '../../hoc/Auxiliary';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			salad: 0,
			bacon: 0,
			cheese: 0,
			meat: 0,
		},
		totalPrice: 4,
	};

	addIngredientHandler = (type) => {
		const count = this.state.ingredients[type] + 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = count;

		this.setState((state) => ({
			ingredients: updatedIngredients,
			totalPrice: state.totalPrice + INGREDIENTS_PRICES[type],
		}));
	};

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] === 0) return null;

		const count = this.state.ingredients[type] - 1;
		const updatedIngredients = {
			...this.state.ingredients,
		};
		updatedIngredients[type] = count;

		this.setState((state) => ({
			ingredients: updatedIngredients,
			totalPrice: state.totalPrice - INGREDIENTS_PRICES[type],
		}));
	};

	render() {
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
					ingredientAdded={this.addIngredientHandler} 
					ingredientRemoved={this.removeIngredientHandler} 	
				/>
			</Aux>
		);
	}
}

export default BurgerBuilder;