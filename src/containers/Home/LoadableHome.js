import React from 'react';
import Loadable from 'react-loadable';
import {asyncGetPartArticles, asyncCountArticles} from '../../reducers/article.redux';
import Loading from '../../components/Loading';
import {LoadableComponent} from '../../components/Loading/LoadableCompent';

LoadableComponent(() =>
    new Promise((resolve) => {
        require.ensure([], (require) => {
            resolve(require('./index').default);
        });
    })
);


export const LoadableHome = () => {
    return Loadable.Map({
        loader: {
            Home: () => import('./index'),
            article: () => asyncGetPartArticles({page:0, size: 5}),
            articleQuantity: () => asyncCountArticles(),
        },
        loading: Loading,
        delay: 1000,
        render(loaded, props) {
            const Home = loaded.Home.default;
            const articles = loaded.article;
            const articleQuantity = loaded.articleQuantity;
            return <Home {...props} initArticles={articles} articleQuantity={articleQuantity} />;
        }
    });
};
