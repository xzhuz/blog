import React from 'react';
import PropTypes from 'prop-types';

class NotFound extends React.PureComponent{

    constructor(props, context) {
        super(props, context);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        this.context.router.history.push('/');
    }

    render() {
        return null;
    }
}

export default NotFound;