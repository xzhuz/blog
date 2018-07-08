import React from 'react';
import PropTypes from 'prop-types';

import './sidebar.scss';

class SideBar extends React.PureComponent {
    render() {
        const {barTitle, children, sideBarRef} = this.props;
        return (
            <div className={'side-bar'} ref={sideBarRef}>
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
    sideBarRef: PropTypes.object,
};

export default SideBar;