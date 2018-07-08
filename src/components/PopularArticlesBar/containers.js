import {connect} from 'react-redux';
import * as PopularArticlesBar from './constants';
import {popularArticles} from './modules';

const mapDispatchToProps = {
    loadPopularArticles: (tag) => popularArticles(tag),
};

const mapStateToProps = (state) => {
    return {
        popularArticles: state.get(PopularArticlesBar.POPULAR_ARTICLES_BAR).get(PopularArticlesBar.POPULAR_ARTICLES),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
