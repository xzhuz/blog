import {fromJS} from 'immutable';

import * as App from './constants';

export const changeAppPage = (appPage) => {
    return {
        type: App.APP_PAGE,
        appPage,
    };
};

const initialState = fromJS({
    APP_PAGE: false,
});

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case App.APP_PAGE:
            return state.set(App.APP_PAGE, action.appPage);
        default:
            return state;
    }
};
