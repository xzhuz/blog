import {connect} from 'react-redux';
import {clearRelatives, relativeArticles} from "./modules";
import * as Relative from "./constants";

const mapDispatchToProps = {
    relativeArticles: ({tag, page, size}) => relativeArticles({tag, page, size}),
    clearRelatives: () => clearRelatives(),
};

const mapStateToProps = (state) => {
    return {
        relatives: state.get(Relative.RELATIVE).get(Relative.RELATIVE_ARTICLE),
        tag: state.get(Relative.RELATIVE).get(Relative.ARTICLE_TAG),
        count: state.get(Relative.RELATIVE).get(Relative.ARTICLE_COUNT),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
