import {fromJS, List} from "immutable";

import * as Constants from '../../utils/Constants';

import * as request from '../../utils/axios/api';
import * as Tags from "./constants";

export const allTags = (tagList) => {
    return {
        type: Tags.ALL_TAGS,
        tagList,
    };
};

const initialState = fromJS({
    ALL_TAGS: [{}],
});

export default function articleReducer(state = initialState, action) {
    switch (action.type) {
        case Tags.ALL_TAGS:
            return state.set(Tags.ALL_TAGS, action.tagList);
        default:
            return state;
    }
};

export function fetchAllTags() {
    return request.doFetchAllTags().then(res => {
        if (res.code === Constants.SUCCESS_CODE) {
            return res.data;
        } else {
            return {};
        }
    });
}

