import React from 'react';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/lib/fa';

import './tag.scss';

class Tag extends React.PureComponent {

    clickTag() {
        const {clickTag, label} = this.props;
        if (clickTag && label) {
            const v = label.replace(/\s|\xA0/g,"");
            clickTag(v);
        }
    }

    render() {
        const {label} = this.props;
        return (
            <span className={'tag'} onClick={() => this.clickTag()}><FontAwesome.FaTag/>{label}</span>
        );
    }
}

Tag.propTypes = {
    label: PropTypes.string,
    clickTag: PropTypes.func,
};

export default Tag;