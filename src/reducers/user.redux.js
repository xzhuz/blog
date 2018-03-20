import axios from 'axios';
import {AUTH_SUCCESS, authSuccess, ERROR_MSG, errorMsg} from "../actions/user.index";

const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    pwd: '',
};

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, redirectTo: '/dashboard', msg: '', ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg};
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
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}