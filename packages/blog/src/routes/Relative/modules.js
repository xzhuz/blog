import {fromJS, List} from "immutable";

import * as Constants from '../../utils/Constants';
import * as request from '../../utils/axios/api';
import * as Relative from "./constants";


export const relativeArticleData = (relatives) => {
    return {
        type: Relative.RELATIVE_ARTICLE,
        relatives,
    };
};

export const articleTag = (tag) => {
    return {
        type: Relative.ARTICLE_TAG,
        tag,
    };
};

export const clearRelatives = () => {
    return {
        type: Relative.CLEAR_RELATIVE,
    };
};

const initialState = fromJS({
   RELATIVE_ARTICLE: new List(),
});

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case Relative.RELATIVE_ARTICLE:
            return state.set(Relative.RELATIVE_ARTICLE, List.of(...action.relatives));
        case Relative.ARTICLE_TAG:
            return state.set(Relative.ARTICLE_TAG, action.tag);
        case Relative.CLEAR_RELATIVE:
            return state.set(Relative.ARTICLE_TAG, '').set(Relative.RELATIVE_ARTICLE, new List());
        default:
            return state;
    }
};

/**
 * 相关文章
 * @param tag
 * @param page
 * @param size
 * @returns {Function}
 */
export function relativeArticles({tag, page, size}) {
    return dispatch => {
        request.relativeArticles({tag, page, size}).then(res => {
            if (res.code === Constants.SUCCESS_CODE) {
                console.log(res.data);
                dispatch(relativeArticleData(res.data));
                dispatch(articleTag(tag));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
                dispatch(relativeArticleData([]));
                dispatch(articleTag(tag));
            }
        });
    };
}