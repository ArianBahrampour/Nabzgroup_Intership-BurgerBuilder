import React from 'react';

import BurgerIngredient from './Burgeringredient/Burgeringredient';
import classes from './Burger.module.css';

const Burger = (props) => {
	if (!props.ingredients) return null;
	let trasnformedIngredients = Object.keys(props.ingredients)
		.map((igKey) => {
			return [...Array(props.ingredients[igKey])].map((_, i) => {
				return <BurgerIngredient key={igKey + i} type={igKey} />;
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, []);

	if (trasnformedIngredients.length === 0) {
		trasnformedIngredients = <p>Please start adding ingredients!</p>;
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngredient type="bread-top"></BurgerIngredient>
			{trasnformedIngredients}
			<BurgerIngredient type="bread-bottom"></BurgerIngredient>
		</div>
	);
};

export default Burger;
