import {combineReducers} from 'redux';
import {loadPost, listPost, listTag, loadPopular} from './blog.redux';

export const reducers = combineReducers({
    listPost,
    loadPost,
    loadPopular
});