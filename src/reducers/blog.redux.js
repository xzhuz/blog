import axios from 'axios';
import {LOAD_POST, postList} from "../actions";

const initState = [];

export function loadPost(state = initState, action) {
    switch (action.type) {
        case LOAD_POST:
            return action.payload;
        default:
            return state;
    }
}

export function getPostList() {
    return dispatch => {
        axios.get('/blog/list').then(res => {
            if (res.data.code === 0) {
                dispatch(postList(res.data.data));
            }
        });
    };
}
