import {connect} from 'react-redux';

import * as App from './constants';
import {changeAppPage} from "./modules";

const mapDispatchToProps = {
    changeAppPage: (appPage) => changeAppPage(appPage),

};

const mapStateToProps = (state) => {
    return {
        appPage: state.get(App.APP).get(App.APP_PAGE),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
