import axios from 'axios';
import {LOAD_POST, postList, LIST_POST, postLoad} from "../actions";

import {fakePosts} from '../mock/posts';

const initState = [];

export function listPost(state = initState, action) {
    return LIST_POST === action.type ? action.payload : state;
}

export function loadPost(state = initState, action) {
    return LOAD_POST === action.type ? action.payload : state;
}


export function getPostList() {
    return dispatch => {
        axios.get('/blog/list').then(res => {
            if (res.data.code === 0) {
                dispatch(postList(res.data.data));
            }
        }).catch(res => {
            dispatch(postList(fakePosts));
        });
    };
}

export function getPost(id) {
    return dispatch => {
        axios.get('/blog/post?postId=' + id).then(res => {
            if (res.data.code === 0) {
                dispatch(postLoad(res.data.data));
            }
        }).catch(res => {
            dispatch(postLoad(fakePosts));
        });
    };
}