import {combineReducers} from 'redux';
import {articleLoad, articlesList, popularArticlesLoad, articlesMsg, articleTags, articleCount} from './article.redux';
import {user} from "./user.redux";
import {menu} from "./menu.redux";
import {coverImgFile, imgFile} from "./file.redux";

export const reducers = combineReducers({
    articlesList,
    articleLoad,
    popularArticlesLoad,
    articleCount,
    user,
    menu,
    articlesMsg,
    imgFile,
    coverImgFile,
    articleTags
});