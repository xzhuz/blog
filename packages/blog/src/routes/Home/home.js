import React from 'react';
import PropTypes from 'prop-types';
import Typed from 'typed.js';

import {typedOptions} from '../../utils/typedUtils';

import './stylesheets/home.scss';

class Home extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.changePage = this.changePage.bind(this);
        this.changeAboutPage = this.changeAboutPage.bind(this);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        const options = {
            ...typedOptions,
            strings: ['欢迎来到我的博客小站...', '那么就开始这快乐的旅程吧！']
        };
        new Typed('.type', options);
    }

    changePage() {
        this.props.changeAppPage(true);
        const {pathname} = this.context.router.history.location;
        if (pathname.length > 2) {
            this.context.router.history.push(pathname);
        } else {
            this.context.router.history.push('/articles');
        }
    }

    changeAboutPage() {
        this.props.changeAppPage(true);
        this.context.router.history.push('/about');
    }

    render() {
        return (
            <div className='home'>
                <div className='home-text'>
                    <div className='type' />
                </div>
                <div className='blog-button'>
                    <button onClick={this.changePage}>博客</button>
                    <button onClick={this.changeAboutPage}>关于</button>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    changeAppPage: PropTypes.func.isRequired,
};

export default Home;