import {connect} from 'react-redux';

import * as Header from './constants';
import {changeAppPage} from "./modules";

const mapDispatchToProps = {
    changeAppPage: (appPage) => changeAppPage(appPage),
};

const mapStateToProps = (state) => {
    return {
        appPage: state.get(Header.HEADER).get(Header.APP_PAGE),
    };
};

export const withConnect = connect(mapStateToProps, mapDispatchToProps);
