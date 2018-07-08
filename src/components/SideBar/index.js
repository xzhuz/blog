import React from 'react';
import PropTypes from 'prop-types';

import './sidebar.scss';

class SideBar extends React.PureComponent {
    render() {
        const {barTitle, children} = this.props;
        return (
            <div className={'side-bar'}>
                <div className={'bar-title'}>
                    {barTitle}
                </div>
                <div className={'bar-child'}>
                    {children}
                </div>
            </div>
        );
    }
}

SideBar.propTypes = {
    barTitle: PropTypes.string.isRequired,
};

export default SideBar;