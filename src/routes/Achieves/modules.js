import {fromJS, List, Map} from 'immutable';

import * as request from '../../utils/axios/api';
import * as Achieve from './constants';


export const clearRelatives = () => {
    return {
        type: Achieve.CLEAR_RELATIVE,
    };
};


const initialState = fromJS({
    ACHIEVE_DATA: new Map(),
});

export default function achieveReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};

export function getAchieveData() {
    return request.achieveArticle().then(res => {
        if (res.code === 0) {
            const articles = res.data;
            const achieveMap = new Map();
            articles.forEach(article => {
                const {id, date} = article;
                const year = new Date(date).getFullYear();
                const old = achieveMap.get(year.toString());
                achieveMap.set(year, List.of(id));
                if (old) {
                    achieveMap.set(year, List.of(...old, id));
                } else {
                    achieveMap.set(year, List.of(id));
                }
                console.log(achieveMap);
            });
            return fromJS({ACHIEVE_DATA: achieveMap});
        } else if (res.code === 3) {
            alert('您刷新过于频繁，系统已拦截，请联系博主');
        } else {
            return [];
        }
    });
}
