import * as AT from '../action-types/login';

export const loginRequest = () => ({
    type: AT.LOGIN_REQUEST,
});

export const loginSuccess = () => ({
    type: AT.LOGIN_SUCCESS,
});

export const loginFail = () => ({
    type: AT.LOGIN_FAIL,
});
