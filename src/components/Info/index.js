import React from 'react';
import PropTypes from 'prop-types';
import './info.scss';

class Info extends React.PureComponent{
    render () {
        const {icon, info} = this.props;
        return (
            <span className='info'>
                    <span className={'icon'}>{icon}</span>
                    <span className={'text'}>{info}</span>
            </span>
        );
    }
}

Info.propTypes = {
    icon: PropTypes.node.isRequired,
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Info;