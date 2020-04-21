import React from 'react';

import classes from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

const CheckoutSummary = (props) => {
	return (
		<div className={classes.CheckoutSummary}>
			<h1>Hope you enjoy the BURGER!</h1>
			<div style={{ width: '100%', margin: 'auto' }}>
				<Burger ingredients={props.ingredients} />
			</div>
			<Button btnType="Danger" onClick={props.checkoutCancelled}>Cancel</Button>
			<Button btnType="Success" onClick={props.checkoutContinued}>Continue</Button>
		</div>
	);
};

export default CheckoutSummary;
