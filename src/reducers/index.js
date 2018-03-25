import {combineReducers} from 'redux';
import {loadPost, listPost, listTag, loadPopular, blogs} from './blog.redux';
import {user} from "./user.redux";
import {menu} from "./menu.redux";

export const reducers = combineReducers({
    listPost,
    loadPost,
    loadPopular,
    user,
    menu,
    blogs
});