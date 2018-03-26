import {combineReducers} from 'redux';
import {loadPost, listAllPost, loadPopular, blogs} from './blog.redux';
import {user} from "./user.redux";
import {menu} from "./menu.redux";

export const reducers = combineReducers({
    listAllPost,
    loadPost,
    loadPopular,
    user,
    menu,
    blogs
});