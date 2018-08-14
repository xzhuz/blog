import {fromJS} from "immutable";
import * as request from '../../utils/axios/api';

const initialState = fromJS({
});

export default function complimentReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};


export function confirmCompliment(id, compliment) {
    return () => {
        request.doConfirmCompliment(id, compliment).then(res => {
            // console.log("");
        });
    };
}
