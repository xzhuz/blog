import React from 'react';
import Loadable from 'react-loadable';
import { getPartArticles, getArticlesCount } from './modules';
import Loading from '../../components/Loading/index';
import * as Home from './containers';

export default Loadable.Map({
    loader: {
        Home: () => import('./index'),
        article: () => getPartArticles({page:0, size: 5}),
        articleCount: () => getArticlesCount(),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Home = loaded.Home.default;
        const articles = loaded.article.get('HOME_DATA');
        const articleCount = loaded.articleCount;
        return <Home {...props} initArticles={articles} articleCount={articleCount} />;
    }
});
