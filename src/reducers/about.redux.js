import axios from 'axios/index';
import {LOAD_ABOUT_ME, loadAbout, UPDATE_ABOUT_SUCCESS, updateAboutSuccess} from '../actions/about.index';
import {CLEAR_ERROR_MSG, clearErrorMsg, ERROR_MSG, errorMsg} from '../actions/user.index';
import {ARTICLE_UPDATED_MSG, PUBLISH_ARTICLE_MSG} from "../actions/article.index";

const initState = {
    'userId': '',
    'name': '',
    'mail': '',
    'location': '',
    'about': ''
};

export function aboutMe(state = initState, action) {
    return LOAD_ABOUT_ME === action.type ? action.payload : state;
}

const msgInitState = {
    errorMsg: '',
    successMsg: ''
};

export function updateAboutMeError(state = msgInitState, action) {
    switch (action.type) {
        case UPDATE_ABOUT_SUCCESS:
            return {...state, successMsg: action.msg};
        case ERROR_MSG:
            return {...state, errorMsg: action.msg};
        case CLEAR_ERROR_MSG:
            return {...state, errorMsg: ''};
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