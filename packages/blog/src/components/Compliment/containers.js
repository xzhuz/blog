import {connect} from 'react-redux';
import * as Compliment from './constants';
import {confirmCompliment} from './modules';

const mapDispatchToProps = {
    confirmCompliment: (id, compliment) => confirmCompliment(id, compliment),
};

const mapStateToProps = (state) => {
    return {
        complimented: state.get(Compliment.COMPLIMENT).get(Compliment.COMPLIMENT_MOUNT),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
