import React from 'react';
import PropTypes from 'prop-types';
import {Map} from 'immutable';
import NProgress from 'nprogress';

import SideBar from "../../components/SideBar";
import './stylesheets/achieve.scss';

class Achieve extends React.Component {


    componentWillUnmount() {
        NProgress.done();
    }

    componentDidUpdate() {
        NProgress.done();
    }

    componentDidMount() {
        this.props.clearRelatives();
    }

    showPostContent(articleId) {
        this.props.history.push({
            pathname: `/article/${articleId}`
        });
    }

    render() {
        console.log(this.props.articles.toString());
        return (
            <div className='container'>
                <section className='achieves'>

                </section>
                <SideBar/>
            </div>
        );
    }
}

Achieve.propTypes = {
    articles: PropTypes.object,
    showPostContent: PropTypes.func,
    clearRelatives: PropTypes.func.isRequired,
};

export default Achieve;
