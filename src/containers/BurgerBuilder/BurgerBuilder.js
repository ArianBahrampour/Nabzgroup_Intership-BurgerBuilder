import React, {Component} from 'react';
import {connect} from 'react-redux';
// import * as actionTypes from '../../store/actions/actionTypes';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    };
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

    componentDidMount() {
        this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
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

        let burger = this.props.error ? (
            <p>Ingredients can't be loaded :( !</p>
        ) : (
            <Spinner />
        );
        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredientHandler}
                        ingredientRemoved={this.props.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.checkPurchaseState(
                            this.props.ingredients
                        )}
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
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
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
        error: state.burger.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addIngredientHandler: (ingredient) =>
            dispatch(burgerBuilderActions.addIngredient(ingredient)),
        removeIngredientHandler: (ingredient) =>
            dispatch(burgerBuilderActions.removeIngredient(ingredient)),
        clearOrderHandler: () => dispatch(burgerBuilderActions.clearOrder()),
        onInitIngredients: () =>
            dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    };
};

export default connect(
    mapStatetoProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
