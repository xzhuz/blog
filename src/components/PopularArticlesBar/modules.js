import {fromJS, List} from "immutable";

import * as request from '../../utils/axios/api';
import * as PopularArticlesBar from "./constants";


export const loadPopularArticles = (articles) => {
    return {
        type: PopularArticlesBar.POPULAR_ARTICLES,
        articles
    };
};

const initialState = fromJS({
    POPULAR_ARTICLES: new List(),
});

export default function rightSideBarReducer(state = initialState, action) {
    switch (action.type) {
        case PopularArticlesBar.POPULAR_ARTICLES:
            return state.set(PopularArticlesBar.POPULAR_ARTICLES, List.of(...action.articles));
        default:
            return state;
    }
};


/**
 * 热门文章
 * @returns {Function}
 */
export function popularArticles() {
    return (dispatch) => {
        request.popularArticles().then(res => {
            if (res.code === 0) {
                dispatch(loadPopularArticles(res.data));
            } else {
                dispatch(loadPopularArticles([]));
            }
        });
    };
}
