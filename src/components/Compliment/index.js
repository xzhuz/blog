import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Compliment from './compliment';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'compliment', reducer});

export default withRouter(compose(withReducer, withConnect)(Compliment));

