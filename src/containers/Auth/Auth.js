import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as actions from '../../store/actions';
import {checkValidation} from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address',
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
        isSignup: true,
        formIsValid: false,
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedControls = {
            ...this.state.controls,
        };
        const updatedFormElement = {...updatedControls[inputIdentifier]};

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkValidation(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedControls[inputIdentifier] = updatedFormElement;
        updatedFormElement.touched = true;

        let formIsValid = true;
        for (let inputId in updatedControls) {
            formIsValid = formIsValid && updatedControls[inputId].valid;
        }

        this.setState({controls: updatedControls, formIsValid: formIsValid});
    };

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    onSubmitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignup
        );
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return {isSignup: !prevState.isSignup};
        });
    };

    render() {
        const formElements = [];

        for (let key in this.state.controls) {
            formElements.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = formElements.map((formElement) => (
            <Input
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                key={formElement.id}
                changed={(event) =>
                    this.inputChangedHandler(event, formElement.id)
                }
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
            />
        ));

        if (this.props.loading) {
            form = <Spinner />;
        }

        const errorMessage = this.props.error ? (
            <p>{this.props.error}</p>
        ) : null;

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            // console.log(this.props.authRedirectPath);
            authRedirect = <Redirect to={this.props.authRedirectPath} />;
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.onSubmitHandler}>
                    {form}
                    <Button
                        btnType="Success"
                        disabled={!this.state.formIsValid}
                    >
                        SUBMIT
                    </Button>
                </form>
                <Button btnType="Danger" onClick={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.isSignup ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burger.building,
        authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignup) =>
            dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
