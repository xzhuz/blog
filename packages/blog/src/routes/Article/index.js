import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Article from './article';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'article', reducer});

export default withRouter(compose(withReducer, withConnect)(Article));

