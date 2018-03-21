export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const ERROR_MSG = 'ERROR_MSG';
export const LOAD_USER = 'LOAD_USER';

export function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESS, payload: data};
}

export function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}

export function loadUser(userInfo) {
    return {type: LOAD_USER, payload: userInfo};
}
