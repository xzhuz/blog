import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './info.scss';

class Info extends React.PureComponent{
    render () {
        const {icon, info} = this.props;
        return (
            <ReactCSSTransitionGroup
                component={'span'}
                className={'info'}
                transitionName='info'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <span className={'icon'}>{icon}</span>
                <span className={'text'}>{info}</span>
            </ReactCSSTransitionGroup>
        );
    }
}

Info.propTypes = {
    icon: PropTypes.node.isRequired,
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Info;