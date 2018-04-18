import {combineReducers} from 'redux';
import {articleLoad, articlesList, popularArticlesLoad, articlesMsg, articleTags, articleCount} from './article.redux';
import {user} from "./user.redux";
import {thumbFile, imgFile} from "./file.redux";
import {aboutMe, updateAboutMeError} from "./about.redux";

export const reducers = combineReducers({
    articlesList,
    articleLoad,
    popularArticlesLoad,
    articleCount,
    user,
    articlesMsg,
    imgFile,
    thumbFile,
    articleTags,
    aboutMe,
    updateAboutMeError
});