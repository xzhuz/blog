import {fromJS, Map} from 'immutable';

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
            return fromJS({ACHIEVE_DATA: res.data});
        } else if (res.code === 3) {
            alert('您刷新过于频繁，系统已拦截，请联系博主');
        } else {
            return [];
        }
    });
}
