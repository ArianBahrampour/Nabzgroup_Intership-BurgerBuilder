import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: null,
            authRedirectPath: '/',
        });
    });

    it('should store the token upon login', () => {
        expect(
            reducer(
                {
                    token: null,
                    userId: null,
                    error: null,
                    loading: null,
                    authRedirectPath: '/',
                },
                {
                    type: actionTypes.AUTH_SUCCESS,
                    idToken: 'token',
                    userId: 'userid',
                }
            )
        ).toEqual({
            token: 'token',
            userId: 'userid',
            error: null,
            loading: false,
            authRedirectPath: '/',
        });
    });
});
