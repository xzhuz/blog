import {connect} from 'react-redux';
import * as Login from './constants';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
    return {
        login: state.get(Login.LOGIN),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
