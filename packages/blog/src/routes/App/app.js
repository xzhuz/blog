import React from 'react';
import PropTypes from 'prop-types';

import Home from '../Home';
import BasicLayout from '../../components/BasicLayout/index';

class App extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        const {pathname} = this.context.router.history.location;
        if (pathname.length > 2) {
            this.props.changeAppPage(true);
            this.context.router.history.push(pathname);
        }
    }

    render() {
        const { appPage } = this.props;
        return (
            <div className='app'>
                {
                    appPage ? <BasicLayout /> : <Home />
                }
            </div>
        );
    }
}

App.propTypes = {
  appPage: PropTypes.bool,
  changeAppPage: PropTypes.func.isRequired,
};

export default App;
