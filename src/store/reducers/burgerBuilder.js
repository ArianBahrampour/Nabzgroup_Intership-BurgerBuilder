import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility'; //I think using this function is unnecessary

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const initialState = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    error: false,
};

const addIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
    };
};

const removeIngredient = (state, action) => {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
    };
};

const clearOrder = (state, action) => {
    return {
        ...state,
        ingredients: {
            bacon: 0,
            salad: 0,
            meat: 0,
            cheese: 0,
        },
        totalPrice: 4,
    };
};

const setIngredients = (state, action) => {
    return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 4,
        error: false,
    };
};

const fetchIngredientsFailed = (state, action) => {
    return {
        ...state,
        error: true,
    };
};

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state, action);
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredient(state, action);
        case actionTypes.CLEAR_ORDER:
            return clearOrder(state, action);
        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return fetchIngredientsFailed(state, action);
        default:
            return state;
    }
};
export default burgerReducer;
