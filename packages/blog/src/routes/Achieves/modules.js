import {fromJS, Map} from 'immutable';

import * as request from '../../utils/axios/api';
import * as Achieve from './constants';
import * as Constants from '../../utils/Constants';


export const clearRelatives = () => {
    return {
        type: Achieve.CLEAR_RELATIVE,
    };
};


const initialState = fromJS({
    ACHIEVE_DATA: new Map(),
});

export default function achieveReducer(state = initialState, action) {
    return state;
};

export function getAchieveData() {
    return request.achieveArticle().then(res => {
        if (res.code === Constants.SUCCESS_CODE) {
            return fromJS({ACHIEVE_DATA: res.data});
        } else if (res.code === 3) {
            alert('您刷新过于频繁，系统已拦截，请联系博主');
        } else {
            return [];
        }
    });
}
