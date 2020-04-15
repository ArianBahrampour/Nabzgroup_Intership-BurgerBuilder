import React from 'react';

import logoImg from '../../assets/Images/28.1 burger-logo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<img src={logoImg} alt="logo" />
	</div>
);

export default Logo;
