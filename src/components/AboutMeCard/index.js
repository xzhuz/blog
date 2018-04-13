import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../SideBar";
import Avatar from "../Avatar";

import './aboutMeCard.scss';

class AboutMeCard extends React.PureComponent {
    render () {
        const {aboutMe} = this.props;
        return (
            <SideBar barTitle={'关于我'}>
                <div className={'about-me'}>
                    <Avatar avatar={aboutMe.avatar}/>
                    <div className={'me-info'}>
                        <div className={'me-name'}>
                            <span className={'me-menu'}>我</span>
                            <span className={'info-name'}>{aboutMe.name}</span>
                        </div>
                        <div className={'me-major'}>
                            <span className={'me-menu'}>职业</span>
                            <span className={'info-major'}>{aboutMe.major}</span>
                        </div>
                        <div className={'me-mail'}>
                            <span className={'me-menu'}>邮箱</span>
                            <span className={'info-mail'}>{aboutMe.mail}</span>
                        </div>
                    </div>
                </div>
            </SideBar>
        );
    }
}

AboutMeCard.propTypes = {
    aboutMe: PropTypes.object,
};

export default AboutMeCard;