import {connect} from 'react-redux';
import * as Home from './constants';
import {pageableArticles, clearRelatives, popularArticles} from './modules';

const mapDispatchToProps = {
    pageableArticles: (pageable) => pageableArticles(pageable),
    clearRelatives: () => clearRelatives(),
    loadPopularArticles: () => popularArticles(),
};

const mapStateToProps = (state) => {
    return {
        articles: state.get(Home.HOME).get(Home.HOME_DATA),
        popularArticles: state.get(Home.HOME).get(Home.POPULAR_ARTICLES),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
