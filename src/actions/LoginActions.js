import {getEntries} from "./PageActions";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';

const loginRequest = () => {
    return {
        type: LOGIN_REQUEST,
    }
};

const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESS,
    }
};

const loginFail = () => {
    return {
        type: LOGIN_FAIL,
    }
};

export function handleLogin() {
    return function(dispatch){
        dispatch(loginRequest());
        // eslint-disable-next-line no-undef
        VK.Auth.login(r => {
            if (r.session){
                dispatch(loginSuccess());
                dispatch(getEntries());
            }else{
                dispatch(loginFail());
            }
        }, 0);
    }
}

