import React from 'react';
import {Link} from 'react-router-dom';
import './header.scss';

class Header extends React.PureComponent {

    render() {
        const github = require(`../../img/github.svg`);
        const weibo = require(`../../img/sinaweibo.svg`);
        return (
            <header className={'header'}>
                <nav className={'header-content'}>
                    <span className={'signature'}><Link to={{ pathname: '/'}}>Mei Sen</Link></span>
                    <div className={'header-img'}>
                        <a href='https://github.com/mrmeisen' target='_blank'>
                            <img src={github} alt='github' style={{width: 20}} />
                        </a>
                        <a href='https://weibo.com/3002849234/profile?rightmod=1&wvr=6&mod=personinfo' target='_blank'>
                            <img src={weibo} alt='weibo' style={{width: 25}} />
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;
