import axios from 'axios';
import {loadMenu} from "../actions/menu.index";
import * as Menu from '../actions/constants';
const initState = [];

export function menu(state = initState, action) {
    return Menu.LOAD_MENU === action.type ? action.payload : state;
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
