import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Articles from './articles';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'articles', reducer});

export default withRouter(compose(withReducer, withConnect)(Articles));

