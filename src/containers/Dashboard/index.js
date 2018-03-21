import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './dashboard.scss';

class Dashboard extends React.PureComponent {

    render() {
        return (
            <div className={'container'}>
                Dashboard
            </div>
        );
    }
}

export default withRouter(connect(state => state, {})(Dashboard));