import * as actionType from '../actions';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7,
};

const initialState = {
	ingredients: {
		salad: 0,
		bacon: 0,
		cheese: 0,
		meat: 0,
	},
	totalPrice: 4,
	purchasable: false,
};

const burgerReducer = (state = initialState, action) => {
	if (action.type === actionType.ADD_INGREDIENT) {
		return {
			...state,
			ingredients: {
				...state.ingredients,
				[action.ingredient]: state.ingredients[action.ingredient] + 1,
			},
			totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
		};
	}
	if (action.type === actionType.REMOVE_INGREDIENT) {
		return {
			...state,
			ingredients: {
				...state.ingredients,
				[action.ingredient]: state.ingredients[action.ingredient] - 1,
			},
			totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
		};
	}
	if (action.type === actionType.CLEAR_ORDER) {
		return initialState;
	}

	return state;
};
export default burgerReducer;
