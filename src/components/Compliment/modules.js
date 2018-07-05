import {fromJS} from "immutable";

import * as request from '../../utils/axios/api';
import * as Compliment from "./constants";

export const doConfirmCompliment = (compliment) => {
    return {
        type: Compliment.CONFIRM_COMPLIMENT,
        compliment,
    };
};

export const doCancelCompliment = (compliment) => {
    return {
        type: Compliment.CANCEL_COMPLIMENT,
        compliment,
    };
};

const initialState = fromJS({
    COMPLIMENT_MOUNT: 0,
});

export default function complimentReducer(state = initialState, action) {
    switch (action.type) {
        case Compliment.CONFIRM_COMPLIMENT:
            return state.set(Compliment.COMPLIMENT_MOUNT, action.compliment);
        case Compliment.CANCEL_COMPLIMENT:
            return state.set(Compliment.COMPLIMENT_MOUNT, action.compliment);
        default:
            return state;
    }
};


export function cancelCompliment(id) {
    return (dispatch) => {
        request.doCancelCompliment(id).then(res => {
            if (res.code === 0) {
                dispatch(doCancelCompliment(res.data));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                return dispatch(doCancelCompliment(0));
            }
        });
    };
}

export function confirmCompliment(id) {
    return (dispatch) => {
        request.doConfirmCompliment(id).then(res => {
            if (res.code === 0) {
                dispatch(doConfirmCompliment(res.data));
            } else if (res.code === 3) {
                alert('您刷新过于频繁，系统已拦截，请联系博主');
            } else {
                return dispatch(doConfirmCompliment(0));
            }
        });
    };
}
