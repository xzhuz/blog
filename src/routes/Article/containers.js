import {connect} from 'react-redux';
import * as Article from './constants';
import {getArticleDetail} from './modules';

const mapDispatchToProps = {
    articleDetail: (id) => getArticleDetail(id),
};

const mapStateToProps = (state) => {
    console.log(state);
    return {
        article: state.get(Article.ARTICLE).get(Article.ARTICLE_DETAIL),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
