import {connect} from 'react-redux';
import * as Compliment from './constants';
import {confirmCompliment, cancelCompliment} from './modules';

const mapDispatchToProps = {
    confirmCompliment: (id) => confirmCompliment(id),
    cancelCompliment: (id) => cancelCompliment(id),
};

const mapStateToProps = (state) => {
    return {
        compliment: state.get(Compliment.COMPLIMENT).get(Compliment.COMPLIMENT_MOUNT),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
