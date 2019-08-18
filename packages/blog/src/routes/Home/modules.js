import {fromJS, List} from 'immutable';

import * as Constants from '../../utils/Constants';
import * as request from '../../utils/axios/api';
import * as Articles from './constants';

export const articleData = (articles) => {
    return {
        type: Articles.ARTICLES_DATA,
        articles,
    };
};

export const clearRelatives = () => {
    return {
        type: Articles.CLEAR_RELATIVE,
    };
};


const initialState = fromJS({
    ARTICLES_DATA: new List(),
});

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case Articles.ARTICLES_DATA:
            return state.set(Articles.ARTICLES_DATA, List.of(...action.articles));
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
            if (res.code === Constants.SUCCESS_CODE) {
                dispatch(articleData(res.data.data));
            } else {
                return [];
            }
        });
    };
}

export function getArticlesCount() {
    return request.countArticle().then(res => {
        if (res.code === Constants.SUCCESS_CODE) {
            return res.data;
        }
        return 0;
    });
}


export function getPartArticles({page, size}) {
    return request.partArticles({page, size}).then(res => {
        if (res.code === Constants.SUCCESS_CODE) {
            return fromJS({
                ARTICLES_DATA: List.of(...res.data.data),
                ARTICLES_COUNT: res.data.count,
            });
        } else {
            return [];
        }
    });
}
