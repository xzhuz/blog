import axios from 'axios';
import {LOAD_MENU, loadMenu} from "../actions/menu.index";

const initState = [];

export function menu(state = initState, action) {
    return LOAD_MENU === action.type ? action.payload : state;
}


export function loadMenuData() {
    return dispatch => {
        axios.get('/menu/list').then(res => {
            if (res.data.code === 0) {
                dispatch(loadMenu(res.data.data));
            }
        });
    };
}
