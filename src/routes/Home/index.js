import {withRouter} from 'react-router-dom';

import injectReducer from '../../store/reducers';

import { compose } from 'redux';
import Home from './components/Home';
import { withConnect } from './containers/HomeContainer';
import reducer from './modules/home';

const withReducer = injectReducer({key: 'home', reducer});

export default withRouter(compose(withReducer, withConnect)(Home));

