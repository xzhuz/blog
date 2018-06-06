import {fromJS} from 'immutable';

import * as request from '../../../utils/axios/api';
import * as Home from '../constants/home';

export const articleData = (articles) => {
    return {
        type: Home.ARTICLE_DATA,
        articles,
    };
};

export function asyncCountArticles() {
    return request.countArticle().then(res => {
        if (res.code === 0) {
            return res.data;
        }
        return 0;
    });
}

export function asyncGetPartArticles({page, size}) {
    return request.partArticles({page, size}).then(res => {
        if (res.code === 0) {
            return fromJS({
                articles: res.data
            });
        } else if (res.code === 3) {
            alert('您刷新过于频繁，系统已拦截，请联系博主');
        } else {
            return [];
        }
    });
}


const initialState = fromJS({
    articles: []
});

export default function todoReducer(state = initialState, action) {
    switch (action.type) {
        case Home.ARTICLE_DATA:
            return state.set(Home.ARTICLE_DATA, action.articles);
        default:
            return state;
    }
};

