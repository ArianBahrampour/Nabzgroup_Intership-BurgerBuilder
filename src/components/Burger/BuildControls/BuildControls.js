import React from 'react';

import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{ label: 'Salad', type: 'salad' },
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => (
	<div className={classes.BuildControls}>
		<p>
			Cuurent Price : <strong>{props.price.toFixed(2)}</strong>
		</p>
		{controls.map((control) => {
			return (
				<BuildControl
					key={control.label}
					label={control.label}
					added={() => props.ingredientAdded(control.type)}
					removed={() => props.ingredientRemoved(control.type)}
					disabled={props.disabled[control.type]}
				/>
			);
		})}
		<div className={classes.ButtonHolder}>
			<button className={classes.ClearButton} onClick={props.clearOrder}>CLEAR ORDER</button>
			<button className={classes.OrderButton} disabled={!props.purchasable}>
				ORDER NOW
			</button>
		</div>
	</div>
);

export default BuildControls;
