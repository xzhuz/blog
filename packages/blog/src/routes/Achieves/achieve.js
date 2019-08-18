import React from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Map} from 'immutable';
import NProgress from 'nprogress';

import BasicLayout from "../../components/BasicLayout";
import {dateFormat} from "../../utils/commentUtils";
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

    renderAchieve() {
        const {achieves} = this.props;
        const keys = [...achieves.keys()];
        return keys.sort((a, b) => b - a).map(key => {
            const value = achieves.get(key);
            return <section className='achieve' key={`${key}-${value}`}>
                <h1 className='achieve-header'>{key}</h1>
                {
                    this.renderAchieveItems(value)
                }
            </section>;
        });
    }

    renderAchieveItems(value) {
        return value.map(data => {
            const articleId = data.get('articleId');
            const blogDate = dateFormat(data.get('blogDate'));
            const title = data.get('title');
            console.log('articleId:' + articleId + ", date: " + blogDate + ', title' + title);
            return <p key={`${articleId}`} className='achieve-items'>
                <span className='achieve-date'>{blogDate}</span>
                <span className='achieve-title'>
                    <Link to={`/article/${articleId}`}>
                        {title}
                    </Link>
                </span>
            </p>;
        });
    }

    render() {
        return (
            <BasicLayout>
                <Helmet title='困知记 | 归档'/>
                <div className='achieves'>
                    {
                        this.renderAchieve()
                    }
                </div>
            </BasicLayout>
        );
    }
}

Achieve.propTypes = {
    achieves: PropTypes.instanceOf(Map),
    showPostContent: PropTypes.func,
    clearRelatives: PropTypes.func.isRequired,
};

export default Achieve;
