import React from 'react';

import logoImg from '../../assets/Images/28.1 burger-logo.png';
import classes from './Logo.module.css';
import { Link } from 'react-router-dom';

const Logo = (props) => (
	<div className={classes.Logo} style={{ height: props.height }}>
		<Link to="/">
			<img src={logoImg} alt="logo" />
		</Link>
	</div>
);

export default Logo;
