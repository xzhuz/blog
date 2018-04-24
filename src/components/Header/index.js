import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import './header.scss';

class Header extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            scroll: false,
        };
    }

    oldScrollTop = 0;

    componentDidMount() {
        const {pathname} = this.props.history.location;
        window.addEventListener('scroll', () => this.handleScroll(pathname));
    }

    handleScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        if (scrollTop > 20 && this.oldScrollTop < scrollTop) {
            // 向下滚
            this.setState({scroll: true});
        } else if (scrollTop > 20 && this.oldScrollTop > scrollTop) {
            // 向上滚
            this.setState({scroll: false});
        } else {
            this.setState({scroll: false});
        }
        this.oldScrollTop = scrollTop;
    }

    render() {
        const {pathname} = this.props.history.location;
        return (
            <header className={
                classNames('header', {
                    [`header-scroll`]: this.state.scroll,
            })}>
                <nav className={'header-content'}>
                    <span className={'signature'}><Link to={{ pathname: '/home'}}>Mei Sen</Link></span>
                    <div className={'header-link'}>
                        <span className={classNames('header-path-link')}><Link to={{ pathname: '/home'}}>Home</Link></span>
                        <span className={classNames('header-path-link', {
                            [`active`]: pathname === '/introduction',
                        })}><Link to={{ pathname: '/introduction'}}>About</Link></span>

                    </div>
                    <div className={'header-contact'}>
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

export default withRouter(Header);
