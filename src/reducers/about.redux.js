import axios from 'axios/index';
import {LOAD_ABOUT_ME, loadAbout} from '../actions/about.index';
import {clearErrorMsg, errorMsg} from '../actions/user.index';

const initState = {
    'name': '',
    'mail': '',
    'location': '',
    'about': ''
};

export function aboutMe(state = initState, action) {
    return LOAD_ABOUT_ME === action.type ? action.payload : state;
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

export function updateAboutMe({id, name, mail, location, about}) {
    return dispatch => {
        axios.post('/about/update', {id,name, mail, location, about}).then(res => {
            if (res.data.code === 0) {
                dispatch(loadAbout(res.data.data));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}