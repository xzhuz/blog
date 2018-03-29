import React from 'react';
import PropTypes from 'prop-types';
import './tag.scss';

class Tag extends React.PureComponent {

    clickTag(v) {
        this.props.clickTag(v);
    }

    render() {
        const {label} = this.props;
        return (
            <span className={'tag'} onClick={(v) => this.clickTag(v)}>{label}</span>
        );
    }
}

Tag.propTypes = {
    label: PropTypes.string,
    clickTag: PropTypes.func,
};

export default Tag;