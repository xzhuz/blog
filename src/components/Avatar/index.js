import React from 'react';
import PropTypes from 'prop-types';

import './avatar.scss';

class Avatar extends React.PureComponent {

    render() {
        const {avatar} = this.props;
        const userAvatar = require(`../../img/${avatar}.jpg`);
        return (
            <div className={'avatar'}>
                <img src={userAvatar} alt="avatar"/>
            </div>
        );
    }
}

Avatar.propTypes = {
    avatar: PropTypes.string.isRequired,
};

export default Avatar;
