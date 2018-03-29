import {combineReducers} from 'redux';
import {loadArticle, listAllArticle, loadPopular, articles, articleTags} from './article.redux';
import {user} from "./user.redux";
import {menu} from "./menu.redux";
import {coverImgFile, imgFile, uploadImg} from "./file.redux";

export const reducers = combineReducers({
    listAllArticle,
    loadArticle,
    loadPopular,
    user,
    menu,
    articles,
    imgFile,
    coverImgFile,
    articleTags
});