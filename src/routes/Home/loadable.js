import React from 'react';
import Loadable from "react-loadable";
import { getPartArticles } from "./modules";
import Loading from "../../components/Loading/index";
import * as Home from './containers';

export default Loadable.Map({
    loader: {
        Home: () => import('./index'),
        article: () => getPartArticles({page:0, size: 5}),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Home = loaded.Home.default;
        const articles = loaded.article.get('ARTICLE_DATA');
        return <Home {...props} initArticles={articles}  />;
    }
});
