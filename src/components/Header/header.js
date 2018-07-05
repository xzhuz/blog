import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import * as FontAwesome from 'react-icons/lib/fa';
import './stylesheets/header.scss';


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
    isTop = true;
    timer = 0;

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

        if (!this.isTop) {
            clearInterval(this.timer);
        }
        this.isTop = false;
    }

    handleScrollToTop() {
        // 设置一个定时器
        this.timer = setInterval(() => {
            // 获取滚动条的滚动高度
            const osTop = document.documentElement.scrollTop || document.body.scrollTop;
            // 用于设置速度差，产生缓动的效果
            const speed = Math.floor(-osTop / 6);
            document.documentElement.scrollTop = document.body.scrollTop = osTop + speed;
            // 用于阻止滚动事件清除定时器
            this.isTop = true;
            if (osTop === 0) {
                clearInterval(this.timer);
            }
        }, 30);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
        window.removeEventListener('scroll', this.handleScroll);
    }

    mobileMenu(e) {
        this.setState(state => ({
            menuShown: !state.menuShown,
        }));
    }

    render () {
        const {pathname} = this.context.router.history.location;
        const { title } = this.props;
        return (
            <header className={
                classNames('header', {
                    [`header-scroll`]: !pathname.includes('/article') && this.state.scroll,
                    [`header-hidden`]: pathname.includes('/dashboard'),
                    [`over-flow`]: !this.state.menuShown,
                })}>
                <nav className='header-content'>
                    <div className={
                        classNames('signature', {
                            [`is-hidden`]: pathname.includes('/article') && this.state.scroll
                        })
                    }>
                        <Link  to={{ pathname: '/'}}>Mei Sen</Link>
                    </div>

                    <div className={
                        classNames('header-menu', {
                            [`is-hidden`]: pathname.includes('/article') && this.state.scroll
                        })
                    }>
                        <Link className='header-path-link' to={{ pathname: '/'}}>首页</Link>
                        <span className={classNames('header-path-link', {
                            [`active`]: pathname === '/achieve',
                        })}>
                                <Link to={{ pathname: '/achieve'}}>归档</Link>
                            </span>
                        <span className={classNames('header-path-link', {
                            [`active`]: pathname === '/about',
                        })}>
                                <Link to={{ pathname: '/about'}}>关于</Link>
                            </span>
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
                        [`is-hidden`]: pathname.includes('/article') && this.state.scroll,
                    })}
                         onClick={(e) => this.mobileMenu(e)}>
                            <span className='icon-menu cross'>
                                <span className='middle'/>
                            </span>
                    </div>
                    <div className={
                        classNames('article-header', {
                            [`is-shown`]: pathname.includes('/article') && this.state.scroll
                        })
                    }>
                        <h1 className='article-header-title' onClick={(e) => this.handleScrollToTop(e)}>{title ? title.trim() : ''}</h1>
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

Header.propTypes = {
    title: PropTypes.string,
};

export default Header;