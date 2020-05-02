import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    loading: false,
    purchased: false,
};

const purchaseInit = (state, action) => {
    const newOrder = {
        ...action.orderDate,
        id: action.orderId,
    };
    return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder),
    };
};

const purchaseBurgerFail = (state, action) => {
    return {
        ...state,
        loading: false,
    };
};

const purchaseBurgerStart = (state, action) => {
    return {
        ...state,
        loading: true,
    };
};

const purchaseBurgerInit = (state, action) => {
    return {
        ...state,
        purchased: false,
    };
};

const fetchOrdersStart = (state, action) => {
    return {
        ...state,
        loading: true,
    };
};

const fetchOrdersSuccess = (state, action) => {
    return {
        ...state,
        orders: action.orders,
        loading: false,
    };
};

const fetchOrdersFail = (state, action) => {
    return {
        ...state,
        loading: false,
    };
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseInit(state, action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);
        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_INIT:
            return purchaseBurgerInit(state, action);
        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess(state, action);
        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state, action);
        default:
            return state;
    }
};

export default orderReducer;
