import {connect} from 'react-redux';
import * as Home from './constants';
import {pageableArticles} from "./modules";
import {clearRelatives} from "./modules";

const mapDispatchToProps = {
    pageableArticles: (pageable) => pageableArticles(pageable),
    clearRelatives: () => clearRelatives(),
};

const mapStateToProps = (state) => {
    return {
        articles: state.get(Home.HOME).get(Home.ARTICLE_DATA),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
