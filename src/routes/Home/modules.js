import {fromJS, List} from 'immutable';

import * as request from '../../utils/axios/api';
import * as Home from './constants';

export const articleData = (articles) => {
    return {
        type: Home.ARTICLE_DATA,
        articles,
    };
};

const initialState = fromJS({
    ARTICLE_DATA: new List(),
});

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case Home.ARTICLE_DATA:
            return state.set(Home.ARTICLE_DATA, List.of(...action.articles));
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
 * @param page
 * @param size
 * @returns {Function}
 */
// export function relativeArticles({tag, page, size}) {
//     return dispatch => {
//         request.relativeArticles({tag, page, size}).then(res => {
//             if (res.code === 0) {
//                 dispatch(relativeArticleData(res.data));
//                 dispatch(showRelativeArticleTag(tag));
//             } else if (res.code === 3) {
//                 alert('您刷新过于频繁，系统已拦截，请联系博主');
//                 dispatch(showRelativeArticleTag(''));
//             }
//         });
//     };
// }

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
