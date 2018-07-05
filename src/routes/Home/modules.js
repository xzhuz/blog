import {fromJS, List} from 'immutable';

import * as request from '../../utils/axios/api';
import * as Home from './constants';

export const articleData = (articles) => {
    return {
        type: Home.HOME_DATA,
        articles,
    };
};

export const clearRelatives = () => {
    return {
        type: Home.CLEAR_RELATIVE,
    };
};

const initialState = fromJS({
    HOME_DATA: new List(),
});

export default function homeReducer(state = initialState, action) {
    switch (action.type) {
        case Home.HOME_DATA:
            return state.set(Home.HOME_DATA, List.of(...action.articles));
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

export function getArticlesCount() {
    return request.countArticle().then(res => {
        if (res.code === 0) {
            return res.data;
        }
        return 0;
    });
}


export function getPartArticles({page, size}) {
    return request.partArticles({page, size}).then(res => {
        if (res.code === 0) {
            return fromJS({HOME_DATA: List.of(...res.data)});
        } else if (res.code === 3) {
            alert('您刷新过于频繁，系统已拦截，请联系博主');
        } else {
            return [];
        }
    });
}
