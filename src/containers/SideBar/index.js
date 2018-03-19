import React from 'react';

import './sideBar.scss';
import Avatar from "../../components/Avatar";

class SideBar extends React.PureComponent {
    render() {
        return (
            <div className={'side-bar'}>
                <Avatar avatar={'avatar'}/>
                <div className={'name'}>
                    <span>Mei Sen</span>
                </div>
                <div className={'sign'}>
                    <span>人生得意需尽欢 莫使金樽空对月</span>
                </div>
            </div>
        );
    }
}

export default SideBar;
