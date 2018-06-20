import {connect} from 'react-redux';
import * as Home from './constants';
import {pageableArticles, relativeArticles} from "./modules";

const mapDispatchToProps = {
    pageableArticles: (pageable) => pageableArticles(pageable),
    relativeArticles: (tag) => relativeArticles(tag),
};

const mapStateToProps = (state) => {
    return {
        articles: state.get(Home.HOME).get(Home.ARTICLE_DATA),
        relatives: state.get(Home.HOME).get(Home.RELATIVE_ARTICLE),
        articleQuantity: state.get(Home.HOME).get(Home.ARTICLE_QUANTITY),
        tag: state.get(Home.HOME).get(Home.HOME_TAG),

    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
