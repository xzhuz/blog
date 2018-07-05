import {connect} from 'react-redux';
import * as Header from './constants';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        title: state.get(Header.HEADER).get(Header.SHOW_TITLE),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
