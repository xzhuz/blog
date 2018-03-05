import { combineReducers } from 'redux';

import {SHOW_POST} from "../actions";

function showPost(state = 0, action) {
    switch (action.type) {
        case SHOW_POST:
            return action.id;
        default:
            return state;
    }
}

export const reducers = combineReducers({
    showPost
});