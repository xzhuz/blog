import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Achieve from './achieve';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'achieve', reducer});

export default withRouter(compose(withReducer, withConnect)(Achieve));

