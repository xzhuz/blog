import React from 'react';

import './sideBar.scss';
import Avatar from "../../components/Avatar";

class SideBar extends React.PureComponent {
    render() {
        return (
            <div className={'side-bar'}>
                <Avatar avatar={'avatar'}/>
                <div className={'introduction'}>
                    <span>Mei Sen</span>
                </div>
                <div className={'skill'}>

                </div>
            </div>
        );
    }
}

export default SideBar;
