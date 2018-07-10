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
        const {achieves} = this.props;
        for (const key of achieves.keys()) {
            console.log(key);
        }
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
    achieves: PropTypes.instanceOf(Map),
    showPostContent: PropTypes.func,
    clearRelatives: PropTypes.func.isRequired,
};

export default Achieve;
