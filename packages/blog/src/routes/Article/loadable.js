import React from 'react';
import Loadable from "react-loadable";
import Loading from "../../components/Loading";

export default Loadable.Map({
    loader: {
        Article: () => import('./index'),
        count: ({match}) => {
            console.log('#####################');
            console.log(match);
            return match;
        },
    },
    loading: Loading,
    render(loaded, props) {
        const Article = loaded.Article.default;
        console.log(loaded.count);
        return <Article {...props} />;
    }
});
