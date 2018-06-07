import React from 'react';
import Loadable from "react-loadable";
import {getArticlesQuantity, getPartArticles} from "../modules/home";
import Loading from "../../../components/Loading/index";

export default Loadable.Map({
    loader: {
        Home: () => import('../index'),
        article: () => getPartArticles({page:0, size: 5}),
        articleQuantity: () => getArticlesQuantity(),
    },
    loading: Loading,
    delay: 1000,
    render(loaded, props) {
        const Home = loaded.Home.default;
        const articles = loaded.article.get('ARTICLE_DATA');
        const articleQuantity = loaded.articleQuantity;
        return <Home {...props} initArticles={articles} articleQuantity={articleQuantity} />;
    }
});
