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
        this.goHome = this.goHome.bind(this);
        this.state = {
            scroll: false,
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

    goHome() {
        this.props.history.push('/');
        this.props.goHome();
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

    render () {
        const {pathname} = this.context.router.history.location;
        const { title } = this.props;
        return (
            <header className={
                classNames('header', {
                    [`header-scroll`]: !pathname.includes('/article') && this.state.scroll,
                    [`header-hidden`]: pathname.includes('/dashboard')
                })}>
                <nav className='header-content'>
                    <button className='signature' onClick={this.goHome}>Mei Sen</button>
                    <div className={
                        classNames('header-link', {
                            [`is-hidden`]: pathname.includes('/article') && this.state.scroll
                        })
                    }>
                        <button className='header-path-link' onClick={this.goHome}>Home</button>
                        <span className={classNames('header-path-link', {
                            [`active`]: pathname === '/about',
                        })}><Link to={{ pathname: '/about'}}>About</Link></span>

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
    goHome: PropTypes.func.isRequired,
};

export default Header;