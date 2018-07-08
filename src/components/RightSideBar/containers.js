import {connect} from 'react-redux';
import * as RightSideBar from './constants';
import {relativeArticles} from './modules';

const mapDispatchToProps = {
    loadRelativeArticles: (tag) => relativeArticles(tag),
};

const mapStateToProps = (state) => {
    return {
        relativeArticles: state.get(RightSideBar.RIGHT_SIDE_BAR).get(RightSideBar.RELATIVE_ARTICLES),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
