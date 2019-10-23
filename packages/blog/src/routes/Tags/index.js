import {withRouter} from 'react-router-dom';
import { compose } from 'redux';

import injectReducer from '../../store/reducers';
import Tags from './tags';
import { withConnect } from './containers';
import reducer from './modules';

const withReducer = injectReducer({key: 'tags', reducer});

export default withRouter(compose(withReducer, withConnect)(Tags));

