import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Relative from './relative';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'relative', reducer});

export default withRouter(compose(withReducer, withConnect)(Relative));

