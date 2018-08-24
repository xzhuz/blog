import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import App from './app';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'app', reducer});

export default compose(withReducer, withConnect)(App);

