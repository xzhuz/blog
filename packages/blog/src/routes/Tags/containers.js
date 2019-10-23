import {connect} from 'react-redux';

const mapDispatchToProps = {
};

const mapStateToProps = (state) => {
    return { state };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
