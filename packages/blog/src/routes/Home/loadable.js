import React from 'react';
import Loadable from 'react-loadable';
import { getPartArticles } from './modules';
import Loading from '../../components/Loading/index';
import * as Articles from './containers';

export default Loadable.Map({
    loader: {
        Articles: () => import('./index'),
        article: () => getPartArticles({page:0, size: 6}),
    },
    loading: Loading,
    delay: 800,
    render(loaded, props) {
        const Articles = loaded.Articles.default;
        const articles = loaded.article.get('ARTICLES_DATA');
        const articleCount = loaded.article.get('ARTICLES_COUNT');
        return <Articles {...props} initArticles={articles} articleCount={articleCount} />;
    }
});
