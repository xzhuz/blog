import {connect} from 'react-redux';
import * as Header from './constants';
import {clearRelatives} from "./modules";

const mapDispatchToProps = {
    goHome: () => clearRelatives(),
};

const mapStateToProps = (state) => {
    return {
        title: state.get(Header.HEADER).get(Header.SHOW_TITLE),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
