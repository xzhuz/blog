import axios from 'axios';
import {
    LOAD_ARTICLE,
    LIST_ALL_ARTICLE,
    LOAD_POPULAR,
    PUBLISH_ARTICLE_MSG,
    ARTICLE_UPDATED_MSG,
    ALL_ARTICLE_TAGS,
    MATCH_TAG_ARTICLE,
    loadArticle,
    loadPopularArticles,
    publishArticleMsg,
    updateArticleMsg,
    matchTagArticle,
    articleList,
    allArticleTags, listPartArticles, LIST_PART_ARTICLE, countArticles, COUNT_ARTICLE
} from "../actions/article.index";
import {CLEAR_ERROR_MSG, clearErrorMsg, ERROR_MSG, errorMsg,} from "../actions/user.index";

const initState = [];

export function articlesList(state = initState, action) {
    switch (action.type) {
        case LIST_ALL_ARTICLE:
            return action.payload;
        case MATCH_TAG_ARTICLE:
            return action.payload;
        case LIST_PART_ARTICLE:
            return action.payload;
        default:
            return state;
    }
}

export function articleLoad(state = initState, action) {
    return LOAD_ARTICLE === action.type ? action.payload : state;
}

export function popularArticlesLoad(state = initState, action) {
    return LOAD_POPULAR === action.type ? action.payload : state;
}

export function articleTags(state = initState, action) {
    return ALL_ARTICLE_TAGS === action.type ?
        action.payload.map(v => {
            return v.tags;
        }) : state;
}

export function articleCount(state = 0, action) {
    return COUNT_ARTICLE === action.type ? action.payload : state;
}

const msgInitState = {
    errorMsg: '',
    successMsg: ''
};

export function articlesMsg(state = msgInitState, action) {
    switch (action.type) {
        case PUBLISH_ARTICLE_MSG:
            return {...state, successMsg: action.msg};
        case ARTICLE_UPDATED_MSG:
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
        axios.get('/article/article?articleId=' + id).then(res => {
            if (res.data.code === 0 && res.data.data) {
                dispatch(loadArticle(res.data.data));
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
            if (res.data.code === 0 && res.data.data) {
                dispatch(loadPopularArticles(res.data.data));
            }
        });
    };
}

/**
 * 获取部分博客文章
 * @param skip 开始
 * @param limit 结束
 * @returns {Function}
 */
export function getPartArticles({skip, limit}) {
    return dispatch => {
        axios.get('/article/part?start=' + skip + '&end=' + limit).then(res => {
            if (res.data.code === 0 && res.data.data) {
                dispatch(listPartArticles(res.data.data));
            } else {
                dispatch(listPartArticles([]));
            }
        });
    } ;
}

/**
 * 发布博客
 * @param thumb
 * @param content
 * @param summary
 * @param title
 * @param tags
 * @param visit
 * @param publish
 * @returns {function(*)}
 */
export function publishArticle({thumb, content, summary, title, tags, visit, publish}) {
    return dispatch => {
        axios.post('/article/publish', {thumb, content, summary, title, tags, visit, publish}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(publishArticleMsg('发布成功!'));
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
 * @param thumb
 */
export function updateArticle({id, content, summary, title, tags, publish, thumb}) {
    return dispatch => {
        axios.post('/article/update', {id, content, summary, title, tags, publish, thumb}).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                getSpecifiedArticle(id);
                dispatch(updateArticleMsg('更新成功'));
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
            if (res.data.code === 0 && res.data.data) {
                dispatch(matchTagArticle(res.data.data));
            }
        });
    };
}

export function getAllArticleTags() {
    return dispatch => {
        axios.get('/article/list').then(res => {
            if (res.data.code === 0 && res.data.data) {
                dispatch(allArticleTags(res.data.data));
            }
        });
    };
}

/**
 * 统计
 */
export function doCountArticles() {
    return dispatch => {
        axios.get('/article/count').then(res => {
            if (res.data.code === 0 && res.data.data) {
                dispatch(countArticles(res.data.data));
            }
        });
    };
}
