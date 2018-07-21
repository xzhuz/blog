import {connect} from 'react-redux';
import * as Article from './constants';
import {getArticleDetail, increaseVisit, relativeArticles} from './modules';

const mapDispatchToProps = {
    articleDetail: (id) => getArticleDetail(id),
    increaseVisit: (id) => increaseVisit(id),
};

const mapStateToProps = (state) => {
    return {
        article: state.get(Article.ARTICLE).get(Article.ARTICLE_DETAIL),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
