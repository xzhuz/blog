import {withRouter} from 'react-router-dom';

import injectReducer from '../../store/reducers';

import { compose } from 'redux';
import Home from './home';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'home', reducer});

export default withRouter(compose(withReducer, withConnect)(Home));

