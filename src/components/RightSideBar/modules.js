import {fromJS, List} from "immutable";

import * as request from '../../utils/axios/api';
import * as RightSideBar from "./constants";


export const relativeArticleData = (articles) => {
    return {
        type: RightSideBar.RELATIVE_ARTICLES,
        articles,
    };
};

const initialState = fromJS({
    RELATIVE_ARTICLES: new List(),
});

export default function rightSideBarReducer(state = initialState, action) {
    switch (action.type) {
        case RightSideBar.RELATIVE_ARTICLES:
            return state.set(RightSideBar.RELATIVE_ARTICLES, List.of(...action.articles));
        default:
            return state;
    }
};

export function relativeArticles(tag) {
    return (dispatch) => {
        request.relativeArticles({tag, page: 0, size: 4}).then(res => {
            if (res.code === 0) {
                dispatch(relativeArticleData(res.data));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
                dispatch(relativeArticleData([]));
            }
        });
    };
}
