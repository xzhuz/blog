import React from 'react';
import PropTypes from 'prop-types';
import './tag.scss';

class Tag extends React.PureComponent {

    render() {
        const {label} = this.props;
        return (
            <span className={'tag'}>{label}</span>
        );
    }
}

Tag.propTypes = {
    label: PropTypes.string,
};

export default Tag;