import {combineReducers} from 'redux';
import {loadPost, listPost} from './blog.redux';

export const reducers = combineReducers({
    listPost,
    loadPost
});