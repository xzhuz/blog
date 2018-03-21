import axios from 'axios';
import {
    LOAD_POST, postList, LIST_POST, postLoad, postPopular, LOAD_POPULAR, blogPublish,
    PUBLISH_BLOG
} from "../actions/blog.index";
import {ERROR_MSG, errorMsg,} from "../actions/user.index";

const initState = [];

export function listPost(state = initState, action) {
    return LIST_POST === action.type ? action.payload : state;
}

export function loadPost(state = initState, action) {
    return LOAD_POST === action.type ? action.payload : state;
}

export function loadPopular(state = initState, action) {
    return LOAD_POPULAR === action.type ? action.payload : state;
}

const publishInitState = {
    msg: ''
};

export function publishBlogs(state = publishInitState, action) {
    switch (action.type) {
        case PUBLISH_BLOG:
            return {...state, msg: action.msg};
        case ERROR_MSG:
            return {...state, msg: action.msg};
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
    return dispatch => {
        axios.get('/blog/post?postId=' + id).then(res => {
            if (res.data.code === 0) {
                dispatch(postLoad(res.data.data));
            }
        });
    };
}

export function getPopularPost() {
    return dispatch => {
        axios.get('/blog/popular').then(res => {
            if (res.data.code === 0) {
                dispatch(postPopular(res.data.data));
            }
        });
    };
}

export function publishBlog({icon, content, summary, title, tags, visit}) {
    return dispatch => {
        axios.post('/blog/publish', {icon, content, summary, title, tags, visit}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(blogPublish('发布成功!'));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}
