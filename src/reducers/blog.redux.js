import axios from 'axios';
import {LOAD_POST, postList, SHOW_POST, showPost} from "../actions";

const initState = [];

export function loadPost(state = initState, action) {
    switch (action.type) {
        case LOAD_POST:
            return action.payload;
        case SHOW_POST:
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

export function getPost(id) {
    console.log("getPost" + id);
    return dispatch => {
        axios.get('/blog/post?postId=' + id).then(res => {
            console.log(res);
            if (res.data.code === 0) {
                dispatch(showPost(res.data.data));
            }
        });
    };
}