import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import classNames from 'classnames';

import './assests/stylesheets/header.scss';

const menu = [
    {
        name: '首页',
        path: '/',
    },
    {
        name: '归档',
        path: '/achieve',

    },
    {
        name: '关于',
        path: '/about',

    }
];

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
        const {pathname} = this.props.location;
        const logo = require('./assests/images/logo.png');
        return (
            <header className={
                classNames('header', {
                    [`header-scroll`]: this.state.scroll,
                    [`header-hidden`]: pathname.includes('/dashboard'),
                    [`header-diff`]: pathname === '/',
                })}>
                <nav className='header-nav'>
                    <div className='signature'>
                        <Link className='header-logo' to={{ pathname: '/'}}>
                            <img src={logo} style={{height: '30px'}}/>
                        </Link>
                    </div>

                    <div className='header-menu'>
                        {
                            menu.map(v =>  <Link className={classNames('header-path-link', {[`active`]: pathname === `${v.path}`})}
                                                 to={{ pathname: `${v.path}`}} key={v.path}>{v.name}</Link>)
                        }
                    </div>
                    <div className={classNames('header-nav-menu', {[`header-nav-menu-show`]: this.state.menuShown})}
                         onClick={(e) => this.mobileMenu(e)}>
                        <div className='header-nav-main'>
                            <ul>
                                {
                                    menu.map(v => <li className='nav-item' key={v.path}>
                                        <Link
                                            className={classNames('header-path-link', {[`active`]: pathname === `${v.path}`})}
                                            to={{ pathname: `${v.path}`}}
                                        >
                                            {v.name}
                                        </Link>
                                    </li>)
                                }
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
                </nav>
            </header>
        );
    }
}

export default Header;