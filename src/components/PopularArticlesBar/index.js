import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import PopularArticlesBar from './popularArticlesBar';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'popularArticlesBar', reducer});

export default withRouter(compose(withReducer, withConnect)(PopularArticlesBar));

