import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Header from './header';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'header', reducer});

export default compose(withReducer, withConnect)(Header);

