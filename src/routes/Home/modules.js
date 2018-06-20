import {fromJS, List} from 'immutable';

import * as request from '../../utils/axios/api';
import * as Home from './constants';

export const articleData = (articles) => {
    return {
        type: Home.ARTICLE_DATA,
        articles,
    };
};

export const relativeArticleData = (articles) => {
    return {
        type: Home.RELATIVE_ARTICLE,
        articles,
    };
};

export const showRelativeArticleTag = (tag) => {
    return {
        type: Home.HOME_TAG,
        tag,
    };
};

export const articleQuantity = (quantity) => {
    return {
        type: Home.ARTICLE_QUANTITY,
        quantity,
    };
};

const initialState = fromJS({
    ARTICLE_DATA: new List(),
});

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case Home.ARTICLE_DATA:
            return state.set(Home.ARTICLE_DATA, List.of(...action.articles));
        case Home.RELATIVE_ARTICLE:
            return state.set(Home.RELATIVE_ARTICLE, List.of(...action.articles));
        case Home.HOME_TAG:
            return state.set(Home.HOME_TAG, action.tag);
        case Home.ARTICLE_QUANTITY:
            return state.set(Home.ARTICLE_QUANTITY, action.quantity);
        default:
            return state;
    }
};

/**
 * 分页文章
 * @param page
 * @param size
 * @returns {Function}
 */
export function pageableArticles({page, size}) {
    return (dispatch) => {
        request.partArticles({page, size}).then(res => {
            if (res.code === 0) {
                dispatch(articleData(res.data));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                return [];
            }
        });
    };
}

/**
 * 相关文章
 * @param tag
 * @returns {Function}
 */
export function relativeArticles(tag) {
    return dispatch => {
        request.relativeArticles(tag).then(res => {
            if (res.code === 0) {
                dispatch(relativeArticleData(res.data));
                dispatch(showRelativeArticleTag(tag));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
                dispatch(showRelativeArticleTag(''));
            }
        });
    };
}

export function getArticlesQuantity() {
    return dispatch => {
        request.countArticle().then(res => {
            if (res.code === 0) {
                dispatch(articleQuantity(res.data));
            }
            return dispatch(articleQuantity(0));
        });
    };
}

export function getPartArticles({page, size}) {
    return request.partArticles({page, size}).then(res => {
        if (res.code === 0) {
            return fromJS({ARTICLE_DATA: List.of(...res.data)});
        } else if (res.code === 3) {
            alert('您刷新过于频繁，系统已拦截，请联系博主');
        } else {
            return [];
        }
    });
}
