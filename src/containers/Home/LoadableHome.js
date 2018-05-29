import React from 'react';
import Loadable from 'react-loadable';
import axios from 'axios';
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
            article: () =>  axios.get('/api/articles/part', {
                params: {
                    page: 0,
                    size: 6,
                }
            }).then(res => res.data.data),
        },
        loading: Loading,
        render(loaded, props) {
            const Home = loaded.Home.default;
            console.log(loaded.article);
            const articles = loaded.article;
            return <Home {...props} articles={articles}/>;
        }
    });
};
