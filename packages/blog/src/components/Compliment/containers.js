import {connect} from 'react-redux';
import * as Compliment from './constants';
import {confirmCompliment} from './modules';

const mapDispatchToProps = {
    confirmCompliment: (id, compliment) => confirmCompliment(id, compliment),
};

export const withConnect = connect(state => state, mapDispatchToProps);
