import {combineReducers} from 'redux';
import {loadPost, listPost, listTag, loadPopular} from './blog.redux';
import {user} from "./user.redux";

export const reducers = combineReducers({
    listPost,
    loadPost,
    loadPopular,
    user
});