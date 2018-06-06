import React from 'react';
import Loadable from "react-loadable";
import {asyncCountArticles, asyncGetPartArticles} from "./modules/home";
import Loading from "../../components/Loading";

export default Loadable.Map({
    loader: {
        Home: () => import('./index'),
        article: () => asyncGetPartArticles({page:0, size: 5}),
        articleQuantity: () => asyncCountArticles(),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Home = loaded.Home.default;
        console.log(loaded.article.get('articles'));
        const articles = loaded.article;
        const articleQuantity = loaded.articleQuantity;
        return <Home {...props} initArticles={articles} articleQuantity={articleQuantity} />;
    }
});