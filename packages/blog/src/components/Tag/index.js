import React from 'react';
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/fa';

import './tag.scss';

const colorCls = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10', 'color11', 'color12', 'color13', 'color14', 'color15'];
class Tag extends React.PureComponent {

    clickTag() {
        const {clickTag, label} = this.props;
        if (clickTag) {
            clickTag(label);
        }
    }

    render() {
        const {label, randCls} = this.props;
        const randColorCls = randCls ? colorCls[Math.round(Math.random() * colorCls.length)] : '';
        const cls = 'tag ' + randColorCls;
        return (
            <span className={cls} onClick={() => this.clickTag()}><FontAwesome.FaTag/> {label}</span>
        );
    }
}

Tag.propTypes = {
    label: PropTypes.string,
    clickTag: PropTypes.func,
    randCls: PropTypes.bool,
};

export default Tag;