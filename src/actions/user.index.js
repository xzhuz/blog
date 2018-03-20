export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const ERROR_MSG = 'ERROR_MSG';

export function authSuccess(obj) {
    const {pwd, ...data} = obj;
    return {type: AUTH_SUCCESS, payload: data};
}

export function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}
