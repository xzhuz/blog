import React from 'react';
import PropTypes from 'prop-types';
import Typed from 'typed.js';

import {typedOptions} from '../../utils/typedUtils';
import { strings } from '../../utils/homeStringsUtils';

import './stylesheets/home.scss';

class Home extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.changePage = this.changePage.bind(this);
        this.changeAboutPage = this.changeAboutPage.bind(this);
        this.state = {
            index: Math.floor(Math.random() * 11),
        };
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        const { index } = this.state;
        const { sentence} = strings[index];
        const options = {
            ...typedOptions,
            strings: sentence,
        };
        new Typed('.type', options);
    }

    changePage() {
        this.props.changeAppPage(true);
        this.context.router.history.push('/articles');
    }

    changeAboutPage() {
        this.props.changeAppPage(true);
        this.context.router.history.push('/about');
    }

    render() {
        const { index } = this.state;
        const { chapter} = strings[index];
        return (
            <div className='home'>
                <div className='home-text'>
                    <div className='type' />
                    <p className='chapter'>
                        --{chapter}
                    </p>
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