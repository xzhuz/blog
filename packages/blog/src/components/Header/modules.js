import {fromJS} from 'immutable';

const initialState = fromJS({});

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
};
