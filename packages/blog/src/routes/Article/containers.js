import {connect} from 'react-redux';
import {increaseVisit} from './modules';

const mapDispatchToProps = {
    increaseVisit: (id) => increaseVisit(id),
};

const mapStateToProps = (state) => {
    return { state };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
