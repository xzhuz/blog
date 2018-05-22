import {combineReducers} from 'redux';
import {
    articleLoad,
    articlesList,
    popularArticlesLoad,
    articlesMsg,
    articleTags,
    articleCount,
    matchTagArticles, compliment
} from './article.redux';
import {user} from "./user.redux";
import {thumbFile, imgFile} from "./file.redux";

export const reducers = combineReducers({
    articlesList,
    articleLoad,
    articleCount,
    articlesMsg,
    compliment,
    articleTags,
    popularArticlesLoad,
    matchTagArticles,
    user,
    imgFile,
    thumbFile,
});
