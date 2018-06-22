import {withRouter} from 'react-router-dom';

import { compose } from 'redux';
import injectReducer from '../../store/reducers';
import { withConnect } from './containers';
import reducer from './modules';
import Header from './Header';

const withReducer = injectReducer({key: 'header', reducer});

export default withRouter(compose(withReducer, withConnect)(Header));

