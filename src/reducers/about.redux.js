import axios from "axios/index";
import {LOAD_ABOUT_ME, loadAbout} from "../actions/about.index";
import {clearErrorMsg, errorMsg} from "../actions/user.index";

const initState = {
    "avatar" : "",
    "name": "",
    "mail": "",
    "major": "",
    "skill": "",
    "location": "",
    "about": ""
};

export function aboutMe(state = initState, action) {
    return LOAD_ABOUT_ME === action.type ? action.payload : state;
}

export function getAboutMe() {
    return dispatch => {
        axios.get('/about/me').then(res => {
            if (res.data.code === 0) {
                console.log(res.data.data);
                dispatch(loadAbout(res.data.data));
            }
        });
    };
}

export function updateAboutMe({id, avatar, name, mail, major, skill, location, about}) {
    return dispatch => {
        axios.post('/about/update', {id, avatar, name, mail, major, skill, location, about}).then(res => {
            if (res.data.code === 0) {
                dispatch(loadAbout(res.data.data));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}