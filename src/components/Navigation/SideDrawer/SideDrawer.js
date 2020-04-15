import React from 'react';

import Logo from '../../Logo/Logo';
import NavigartionItems from '../NavigartionItems/NavigartionItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Modal/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const SideDrawer = (props) => {
	let attachedClasses = [classes.SideDrawer, classes.Close];
	if (props.open) {
		attachedClasses = [classes.SideDrawer, classes.Open];
	}
	return (
		<Aux>
			<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<Logo height="11%" />
				<nav>
					<NavigartionItems />
				</nav>
			</div>
		</Aux>
	);
};

export default SideDrawer;
