import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Login from './login';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'login', reducer});

export default withRouter(compose(withReducer, withConnect)(Login));

