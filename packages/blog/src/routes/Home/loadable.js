import React from 'react';
import Loadable from 'react-loadable';
import { getPartArticles, getArticlesCount } from './modules';
import Loading from '../../components/Loading/index';
import * as Articles from './containers';

export default Loadable.Map({
    loader: {
        Articles: () => import('./index'),
        article: () => getPartArticles({page:0, size: 5}),
        articleCount: () => getArticlesCount(),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Articles = loaded.Articles.default;
        const articles = loaded.article.get('ARTICLES_DATA');
        const articleCount = loaded.articleCount;
        return <Articles {...props} initArticles={articles} articleCount={articleCount} />;
    }
});
