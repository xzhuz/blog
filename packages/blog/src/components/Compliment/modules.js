import {fromJS} from "immutable";
import * as request from '../../utils/axios/api';

import * as Compliment from "./constants";

export const doConfirmCompliment = (compliment) => {
    return {
        type: Compliment.CONFIRM_COMPLIMENT,
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
        default:
            return state;
    }
};


export function confirmCompliment(id, compliment) {
    return (dispatch) => {
        request.doConfirmCompliment(id, compliment).then(res => {
            if (res.code === 0) {
                dispatch(doConfirmCompliment(compliment));
            }
        });
    };
}
