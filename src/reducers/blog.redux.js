import axios from 'axios';
import {
    LOAD_POST, postList, LIST_ALL_POST, postLoad, postPopular, LOAD_POPULAR, blogPublish,
    PUBLISH_BLOG, blogUpdated, BLOG_UPDATED
} from "../actions/blog.index";
import {CLEAR_ERROR_MSG, clearErrorMsg, ERROR_MSG, errorMsg,} from "../actions/user.index";

const initState = [];

export function listAllPost(state = initState, action) {
    return LIST_ALL_POST === action.type ? action.payload : state;
}

export function loadPost(state = initState, action) {
    return LOAD_POST === action.type ? action.payload : state;
}

export function loadPopular(state = initState, action) {
    return LOAD_POPULAR === action.type ? action.payload : state;
}

const publishInitState = {
    errorMsg: '',
    successMsg: ''
};

export function blogs(state = publishInitState, action) {
    switch (action.type) {
        case PUBLISH_BLOG:
            return {...state, successMsg: action.msg};
        case BLOG_UPDATED:
            return {...state, successMsg: action.msg};
        case ERROR_MSG:
            return {...state, errorMsg: action.msg};
        case CLEAR_ERROR_MSG:
            return {...state, errorMsg: ''};
        default:
            return state;
    }
}

/**
 * 获取博客列表
 */
export function getPostList() {
    return dispatch => {
        axios.get('/blog/list').then(res => {
            if (res.data.code === 0) {
                dispatch(postList(res.data.data));
            }
        });
    };
}

/**
 * 根据id 获取blog
 * @param id 博客id
 */
export function getPost(id) {
    return dispatch => {
        axios.get('/blog/post?postId=' + id).then(res => {
            if (res.data.code === 0) {
                dispatch(postLoad(res.data.data));
            }
        });
    };
}

/**
 * 获取热门博客
 */
export function getPopularPost() {
    return dispatch => {
        axios.get('/blog/popular').then(res => {
            if (res.data.code === 0) {
                dispatch(postPopular(res.data.data));
            }
        });
    };
}

/**
 * 发布博客
 * @param coverImg
 * @param content
 * @param summary
 * @param title
 * @param tags
 * @param visit
 * @param publish
 * @returns {function(*)}
 */
export function publishBlog({coverImg, content, summary, title, tags, visit, publish}) {
    return dispatch => {
        axios.post('/blog/publish', {coverImg, content, summary, title, tags, visit, publish}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(blogPublish('发布成功!'));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

/**
 * 累加博客访问
 * @param id
 * @param visit
 * @returns {function()}
 */
export function reduceVisit({id, visit}) {
    return () => {
        axios.post('/blog/visit', {id, visit}).then(res => {
            if (res.data.code === 0) {
                getPopularPost();
            }
        });
    };
}

/**
 * 删除博客
 * @param id
 * @returns {function(*)}
 */
export function deleteBlog(id) {
    return dispatch => {
        axios.get('/blog/delete?id=' + id).then(res => {
            if (res.data.code !== 0) {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

/**
 * 更新博客
 * @param id
 * @param content
 * @param summary
 * @param title
 * @param tags
 * @param publish
 * @param coverImg
 */
export function updateBlog({id, content, summary, title, tags, publish, coverImg}) {
    return dispatch => {
        axios.post('/blog/update', {id, content, summary, title, tags, publish, coverImg}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                getPost(id);
                dispatch(blogUpdated('更新成功'));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}
