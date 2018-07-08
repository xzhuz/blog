import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import RightSideBar from './rightSideBar';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'rightSideBar', reducer});

export default withRouter(compose(withReducer, withConnect)(RightSideBar));

