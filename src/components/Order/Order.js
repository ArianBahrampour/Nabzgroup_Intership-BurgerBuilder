import React from 'react';

import classes from './Order.module.css';
import Burger from '../Burger/Burger';

const Order = (props) => {
	return (
		<div className={classes.Order}>
			<div className={classes.BurgerSection}>
				<p>Burger:</p> <Burger ingredients={props.ingredients} Order />
			</div>
			<p>
				Price : <strong>{Number.parseFloat(props.price).toFixed(2)} $</strong>
			</p>
		</div>
	);
};

export default Order;
