import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import * as FontAwesome from 'react-icons/lib/fa';
import './header.scss';


class Header extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            scroll: false,
            menuShown: false,
        };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    oldScrollTop = 0;

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 20 && this.oldScrollTop < scrollTop) {
            // 向下滚
            this.setState({scroll: true});
        } else if (scrollTop > 30 && this.oldScrollTop > scrollTop) {
            // 向上滚
            this.setState({scroll: false});
        } else {
            this.setState({scroll: false});
        }
        this.oldScrollTop = scrollTop;
    }


    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    mobileMenu(e) {
        this.setState(state => ({
            menuShown: !state.menuShown,
        }));
    }

    render () {
        const {pathname} = this.context.router.history.location;
        const logo = require('./images/logo.png');
        return (
            <header className={
                classNames('header', {
                    [`header-scroll`]: this.state.scroll,
                    [`header-hidden`]: pathname.includes('/dashboard'),
                })}>
                <nav className='header-nav'>
                    <div className='signature'>
                        <Link  to={{ pathname: '/'}} className='header-logo'>
                            <img src={logo} style={{height: '30px'}}/>
                        </Link>
                    </div>

                    <div className='header-menu'>
                        <Link className='header-path-link' to={{ pathname: '/'}}>首页</Link>
                        <Link className={classNames('header-path-link', {
                            [`active`]: pathname.includes('/achieve'),
                        })} to={{ pathname: '/achieve'}}>
                            归档
                        </Link>
                        <Link className={classNames('header-path-link', {[`active`]: pathname.includes('/about')})} to={{ pathname: '/about'}}>
                            关于
                        </Link>
                    </div>
                    <div className={classNames('header-nav-menu', {[`header-nav-menu-show`]: this.state.menuShown})}
                         onClick={(e) => this.mobileMenu(e)}>
                        <div className='header-nav-main'>
                            <ul>
                                <li className='nav-item'><Link to={{ pathname: '/'}}>首页</Link></li>
                                <li className='nav-item'><Link to={{ pathname: '/achieve'}}>归档</Link></li>
                                <li className='nav-item'><Link to={{ pathname: '/about'}}>关于</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={classNames('menu-ctrl', {
                        [`menu-ctrl-on`]: this.state.menuShown,
                    })}
                         onClick={(e) => this.mobileMenu(e)}>
                            <span className='icon-menu cross'>
                                <span className='middle'/>
                            </span>
                    </div>
                    <div className='header-contact'>
                        <a href='https://github.com/mrmeisen' target='_blank'>
                            <FontAwesome.FaGithub/>
                        </a>
                        <a href='https://weibo.com/3002849234/profile?rightmod=1&wvr=6&mod=personinfo' target='_blank'>
                            <FontAwesome.FaWeibo/>
                        </a>
                    </div>
                </nav>
            </header>
        );
    }
}

export default Header;