import axios from 'axios';
import * as User from '../actions/constants';
import {authSuccess, clearAuth, clearErrorMsg, errorMsg, registerSuccess} from "../actions/user.index";
import utils from 'utility';


const initState = {
    redirectTo: '',
    msg: '',
    user: '',
    pwd: '',
};

export function user(state = initState, action) {
    switch (action.type) {
        case User.AUTH_SUCCESS:
            return {...state, redirectTo: '/dashboard/list', msg: '', ...action.payload};
        case User.CLEAR_AUTH:
            return {...state, redirectTo: '', msg: ''};
        case User.LOAD_USER:
            return {...state, ...action.payload};
        case User.ERROR_MSG:
            return {...state, msg: action.msg};
        case User.REGISTER_SUCCESS:
            return {...state, msg: action.msg};
        case User.CLEAR_ERROR_MSG:
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
        axios.post('/user/login', {username: user, password: md5Pwd(pwd)}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
                // 同时，清空错误信息
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        }).catch(err => {
            alert("系统错误，请稍后重试");
        });
    };
}


export function register({user, pwd}) {
    if (!user || !pwd) {
        return errorMsg('用户名或密码必须输入');
    }
    return dispatch => {
        axios.post('/user/register', {username: user, password: md5Pwd(pwd)}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                // 同时，清空错误信息
                dispatch(clearErrorMsg());
                // 注册成功
                dispatch(registerSuccess(res.data.msg));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        }).catch(err => {
            alert("系统错误，请稍后重试");
        });
    };
}

export function clearLoginAuth() {
    return dispatch => dispatch(clearAuth());
}

// 加密pwd
function md5Pwd(pwd) {
    const salt = 'react_is_good_#$12#$%&';
    return utils.md5(utils.md5(pwd + salt));
}
