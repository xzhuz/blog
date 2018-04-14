import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import './header.scss';

class Header extends React.PureComponent {

    render() {
        const github = require(`../../img/github.svg`);
        const weibo = require(`../../img/sinaweibo.svg`);
        const {pathname} = this.props.history.location;
        return (
            <header className={'header'}>
                <nav className={'header-content'}>
                    <span className={'signature'}><Link to={{ pathname: '/home'}}>Mei Sen</Link></span>
                    <div className={'header-link'}>
                        <span className={classNames('header-path-link')}><Link to={{ pathname: '/home'}}>首页</Link></span>
                        <span className={classNames('header-path-link', {
                            [`active`]: pathname === '/about',
                        })}><Link to={{ pathname: '/about'}}>关于我</Link></span>

                    </div>
                    <div className={'header-contact'}>
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

export default withRouter(Header);
