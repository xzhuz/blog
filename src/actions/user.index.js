export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const ERROR_MSG = 'ERROR_MSG';
export const LOAD_USER = 'LOAD_USER';
export const CLEAR_ERROR_MSG = 'CLEAR_ERROR_MSG';

export function authSuccess(obj) {
    const {...data} = obj;
    return {type: AUTH_SUCCESS, payload: data};
}

export function errorMsg(msg) {
    return {type: ERROR_MSG, msg};
}

export function clearErrorMsg() {
    return {
        type: CLEAR_ERROR_MSG
    };
}

export function loadUser(userInfo) {
    return {type: LOAD_USER, payload: userInfo};
}
