import {connect} from 'react-redux';
import * as Articles from './constants';
import {pageableArticles, clearRelatives, popularArticles} from './modules';

const mapDispatchToProps = {
    pageableArticles: (pageable) => pageableArticles(pageable),
    clearRelatives: () => clearRelatives(),
};

const mapStateToProps = (state) => {
    return {
        articles: state.get(Articles.ARTICLES).get(Articles.ARTICLES_DATA),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
