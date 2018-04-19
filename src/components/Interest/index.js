import React from 'react';
import PropTypes from 'prop-types';

import './interest.scss';

class Interest extends React.PureComponent {

    render() {
        const {label, icon} = this.props;
        return (
            <span className={'interest'}>{icon}{label}</span>
        );
    }
}

Interest.propTypes = {
    label: PropTypes.string,
    icon: PropTypes.string,
};

export default Interest;