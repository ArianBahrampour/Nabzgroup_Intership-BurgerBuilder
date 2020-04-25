import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
	state = {
		purchasable: false,
		purchasing: false,
		loading: false,
	};

	// componentDidMount() {
	// 	axios.get('https://react-my-burger-3b404.firebaseio.com/ingredients.json').then((response) => {
	// 		this.setState({ ingredients: response.data });
	// 	});
	// }
	checkPurchaseState = (updatedIngredients) => {
		const ingredients = updatedIngredients;
		const sum = Object.keys(ingredients)
			.map((igKey) => {
				return ingredients[igKey];
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0);
		return sum > 0;
	};

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	};

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	};

	purchaseContinueHandler = () => {
		this.props.history.push({
			pathname: '/checkout',
		});
	};

	render() {
		const disabledInfo = {
			...this.props.ingredients,
		};

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		let orderSummary = null;

		let burger = <Spinner />;
		if (this.props.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.addIngredientHandler}
						ingredientRemoved={this.props.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.props.totalPrice}
						purchasable={this.checkPurchaseState(this.props.ingredients)}
						clearOrder={this.props.clearOrderHandler}
						ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = (
				<OrderSummary
					ingredients={this.props.ingredients}
					purchaseCancelled={this.purchaseCancelHandler}
					purchaseContinued={this.purchaseContinueHandler}
					price={this.props.totalPrice}
				/>
			);
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		);
	}
}

const mapStatetoProps = (state) => {
	return {
		ingredients: state.burger.ingredients,
		totalPrice: state.burger.totalPrice,
		purchasable: state.burger.purchasable,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addIngredientHandler: (ingredient) => dispatch({ type: actionTypes.ADD_INGREDIENT, ingredient: ingredient }),
		removeIngredientHandler: (ingredient) =>
			dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredient: ingredient }),
		clearOrderHandler: () => dispatch({ type: actionTypes.CLEAR_ORDER }),
	};
};

export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
