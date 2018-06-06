import {connect} from 'react-redux';

// import { fromJS } from 'immutable';

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        state
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
