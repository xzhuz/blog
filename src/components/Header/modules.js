import * as Header from './constants';
import { fromJS } from "immutable";

export const showTitle = (title) => {
    return {
        type: Header.SHOW_TITLE,
        title,
    };
};

export const clearRelatives = () => {
    return {
        type: Header.CLEAR_RELATIVE,
    };
};

const initialState = fromJS({
    title: '',
});

export default function HeaderReducer(state = initialState, action) {
    switch (action.type) {
        case Header.SHOW_TITLE:
            return state.set(Header.SHOW_TITLE, action.title);
        default:
            return state;
    }
};