import {connect} from 'react-redux';
import * as Home from '../constants/home';
import {pageableArticles, relativeArticles} from "../modules/home";

const mapDispatchToProps = {
    pageableArticles: (pageable) => pageableArticles(pageable),
    relativeArticles: (tag) => relativeArticles(tag),
};

const mapStateToProps = (state) => {
    return {
        articles: state.get(Home.HOME).get(Home.ARTICLE_DATA),
        relatives: state.get(Home.HOME).get(Home.RELATIVE_ARTICLE),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
