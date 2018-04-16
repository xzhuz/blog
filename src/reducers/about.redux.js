import axios from 'axios/index';
import {loadAbout, updateAboutSuccess} from '../actions/about.index';
import {clearErrorMsg, errorMsg} from '../actions/user.index';
import * as About from "../actions/constants";

const initState = {
    'userId': '',
    'name': '',
    'mail': '',
    'location': '',
    'about': ''
};

export function aboutMe(state = initState, action) {
    return About.LOAD_ABOUT_ME === action.type ? action.payload : state;
}

const msgInitState = {
    errorMsg: '',
    successMsg: ''
};

export function updateAboutMeError(state = msgInitState, action) {
    switch (action.type) {
        case About.UPDATE_ABOUT_SUCCESS:
            return {...state, successMsg: action.msg};
        case About.ERROR_MSG:
            return {...state, errorMsg: action.msg};
        case About.CLEAR_ERROR_MSG:
            return {...state, errorMsg: ''};
        case About.CLEAR_MSG:
            return {...state, errorMsg: '', successMsg: ''};
        default:
            return state;
    }
}

export function getAboutMe() {
    return dispatch => {
        axios.get('/about/me').then(res => {
            if (res.data.code === 0 && res.data.data) {
                dispatch(loadAbout(res.data.data));
            } else {
                dispatch(loadAbout([]));
            }
        });
    };
}

export function updateAboutMe({_id, name, mail, location, about}) {
    return dispatch => {
        axios.post('/about/update', {_id, name, mail, location, about}).then(res => {
            if (res.data.code === 0) {
                // dispatch(loadAbout(res.data.data));
                dispatch(updateAboutSuccess('更新成功'));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}