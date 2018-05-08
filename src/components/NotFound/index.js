import React from 'react';
import {withRouter} from 'react-router-dom';

import './notFound.scss';

class NotFound extends React.PureComponent {

    componentDidMount() {
        this.props.history.push(`/`);
    }

    render () {
        return null;
    }
}

export default withRouter(NotFound);
