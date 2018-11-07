import React from 'react';
import Loadable from "react-loadable";
import Loading from "../../components/Loading";
import NotFound from "../../components/NotFound";
import * as request from "../../utils/axios/api";

export default Loadable.Map({
    loader: {
        ArticleComponent: () => import('./index'),
        article: () => {
            const {pathname} = document.location;
            const id = pathname.substring(pathname.lastIndexOf('/') + 1);
            return request.articleDetail(id).then(res => {
                if (res.code === 0) {
                    return res.data;
                } else {
                    return {};
                }
            });
        },
    },
    loading: Loading,
    render(loaded, props) {
        const ArticleComponent = loaded.ArticleComponent.default;
        const article = loaded.article;
        if (!article || Object.keys(article).length === 0) {
            return <NotFound />;
        }
        return <ArticleComponent article={article} {...props} />;
    }
});
