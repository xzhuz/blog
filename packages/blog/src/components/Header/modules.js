import {fromJS} from 'immutable';

import * as Header from './constants';

export const changeAppPage = (appPage) => {
    return {
        type: Header.APP_PAGE,
        appPage,
    };
};


const initialState = fromJS({
    APP_PAGE: false,
});

export default function globalReducer(state = initialState, action) {
    switch (action.type) {
        case Header.APP_PAGE:
            return state.set(Header.APP_PAGE, action.appPage);
        default:
            return state;
    }
};
