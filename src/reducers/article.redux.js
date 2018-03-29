import axios from 'axios';
import {
    LOAD_ARTICLE,
    LIST_ALL_ARTICLE,
    LOAD_POPULAR,
    PUBLISH_ARTICLE,
    ARTICLE_UPDATED,
    ALL_ARTICLE_TAGS,
    MATCH_TAG_ARTICLE,
    articleLoad,
    articlePopular,
    articlePublish,
    articleUpdated,
    matchTagArticle,
    articleList,
    allArticleTags
} from "../actions/article.index";
import {CLEAR_ERROR_MSG, clearErrorMsg, ERROR_MSG, errorMsg,} from "../actions/user.index";

const initState = [];

export function listAllArticle(state = initState, action) {
    switch (action.type) {
        case LIST_ALL_ARTICLE:
            return action.payload;
        case MATCH_TAG_ARTICLE:
            return action.payload;
        default:
            return state;
    }
}

export function loadArticle(state = initState, action) {
    return LOAD_ARTICLE === action.type ? action.payload : state;
}

export function loadPopular(state = initState, action) {
    return LOAD_POPULAR === action.type ? action.payload : state;
}

export function articleTags(state = initState, action) {
    return ALL_ARTICLE_TAGS === action.type ?
        action.payload.map(v => {
            return v.tags;
        }) : state;
}

const publishInitState = {
    errorMsg: '',
    successMsg: ''
};

export function articles(state = publishInitState, action) {
    switch (action.type) {
        case PUBLISH_ARTICLE:
            return {...state, successMsg: action.msg};
        case ARTICLE_UPDATED:
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
export function getArticleList() {
    return dispatch => {
        axios.get('/article/list').then(res => {
            if (res.data.code === 0) {
                dispatch(articleList(res.data.data));
            }
        });
    };
}

/**
 * 根据id 获取blog
 * @param id 博客id
 */
export function getSpecifiedArticle(id) {
    return dispatch => {
        axios.get('/article/post?articleId=' + id).then(res => {
            if (res.data.code === 0) {
                dispatch(articleLoad(res.data.data));
            }
        });
    };
}

/**
 * 获取热门博客
 */
export function getPopularArticle() {
    return dispatch => {
        axios.get('/article/popular').then(res => {
            if (res.data.code === 0) {
                dispatch(articlePopular(res.data.data));
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
export function publishArticle({coverImg, content, summary, title, tags, visit, publish}) {
    return dispatch => {
        axios.post('/article/publish', {coverImg, content, summary, title, tags, visit, publish}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(articlePublish('发布成功!'));
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
        axios.post('/article/visit', {id, visit}).then(res => {
            if (res.data.code === 0) {
                getPopularArticle();
            }
        });
    };
}

/**
 * 删除博客
 * @param id
 * @returns {function(*)}
 */
export function deleteArticle(id) {
    return dispatch => {
        axios.get('/article/delete?id=' + id).then(res => {
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
export function updateArticle({id, content, summary, title, tags, publish, coverImg}) {
    return dispatch => {
        axios.post('/article/update', {id, content, summary, title, tags, publish, coverImg}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                getSpecifiedArticle(id);
                dispatch(articleUpdated('更新成功'));
                dispatch(clearErrorMsg());
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        });
    };
}

/**
 * 查询包含M
 * @param tag
 * @returns {Function}
 */
export function findMatchTagsArticle({tag}) {
    return dispatch => {
        axios.get('/article/tag?tag=' + tag).then(res => {
            if (res.data.code === 0) {
                dispatch(matchTagArticle(res.data.data));
            }
        });
    };
}

export function getAllArticleTags() {
    return dispatch => {
        axios.get('/article/list').then(res => {
            if (res.data.code === 0) {
                dispatch(allArticleTags(res.data.data));
            }
        });
    };
}