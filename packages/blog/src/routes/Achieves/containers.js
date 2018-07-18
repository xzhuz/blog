import {connect} from 'react-redux';
import {clearRelatives} from "./modules";

import * as Achieve from './constants';

const mapDispatchToProps = {
    clearRelatives: () => clearRelatives(),
};

const mapStateToProps = (state) => {
    return {
        article: state.get(Achieve.ACHIEVE).get(Achieve.ACHIEVE_DATA),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
