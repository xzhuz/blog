import axios from 'axios';
import {
    AUTH_SUCCESS, authSuccess, CLEAR_ERROR_MSG, clearErrorMsg, ERROR_MSG, errorMsg,
    LOAD_USER
} from "../actions/user.index";

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    pwd: '',
};

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, redirectTo: '/dashboard/list', msg: '', ...action.payload};
        case LOAD_USER:
            return {...state, ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg};
        case CLEAR_ERROR_MSG:
            return {...state, msg: ''};
        default:
            return state;
    }
}

export function login({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码必须输入');
    }
    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
                // 同时，清空错误信息
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}