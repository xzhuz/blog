import React from 'react';
import Loadable from "react-loadable";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import {fetchArticle} from "./modules";

export default Loadable.Map({
    loader: {
        article: () => fetchArticle(),
        ArticleComponent: () => import('./index'),
    },
    loading: Loading,
    render(loaded, props) {
        console.log(this);
        const ArticleComponent = loaded.ArticleComponent.default;
        const article = loaded.article;

        if (!article || Object.keys(article).length === 0) {
            return <NotFound/>;
        }
        return <ArticleComponent article={article} {...props} />;
    }
});
