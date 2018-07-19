import React from 'react';
import * as FontAwesome from 'react-icons/lib/fa';

import './assests/sidebar.scss';

class SideBar extends React.PureComponent {
    render() {
        const avatar = require('./assests/batman.jpg');
        return (
            <div className='right-side-bar'>
                <section className='side-bar'>
                    <div className='bar-avatar'>
                        <img src={avatar} />
                        <h2 className='name'>Mei Sen</h2>
                        <h3 className='major'>Java Developer</h3>
                    </div>
                    <p className='bar-contact'>
                        <a className='bar-icon' href='https://github.com/mrmeisen' target='_blank'>
                            <FontAwesome.FaGithub/> <span>GitHub</span></a>
                        <a className='bar-icon' href='https://weibo.com/u/3002849234?refer_flag=1001030101_'
                           target='_blank'><FontAwesome.FaWeibo/> <span>WeiBo</span></a>
                    </p>
                </section>
                {this.props.children}
            </div>
        );
    }
}

export default SideBar;