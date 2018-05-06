import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import ReactMarkDown from 'react-markdown';
import NProgress from 'nprogress';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getAllArticleTags, getSpecifiedArticle, reduceVisit} from "../../reducers/article.redux";
import RightSideBar from "../RightSideBar";
import './article.scss';

class Article extends React.PureComponent {

    componentDidMount() {
        const {articleId} = this.props.match.params;
        NProgress.start();
        this.props.reduceVisit({id: articleId});
        this.props.getSpecifiedArticle(articleId);
        this.props.getAllArticleTags();
    }

    showPostContent(articleId) {
        this.props.getSpecifiedArticle(articleId);
        this.props.history.push({pathname: `/article/${articleId}`});
    }

    componentDidUpdate() {
        NProgress.done();
    }

    componentWillUnmount() {
        NProgress.done();
    }

    render () {
        const {title, content, date, tags} = this.props.article;
        const {articleTag} = this.props;
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v];
        });
        tag = Array.from(new Set(tag));
        return (
            <ReactCSSTransitionGroup
                component={'div'}
                className='container'
                transitionName='article'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={'article'}>
                    <section>
                        <h2>{title ? title.trim() : ''}</h2>
                        <p className='article-date'>{new Date(date).toDateString()}</p>
                        <ReactMarkDown source={content} escapeHtml={false} skipHtml={true}/>
                    </section>
                </div>
                {
                    tags && tags.length > 0 ? <RightSideBar tags={tags} showPopular={false}
                                         showPostContent={(id, visit) => this.showPostContent(id, visit)}
                                         articleSideBarTitle={'相关文章'}
                    /> : ''
                }
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articleLoad,
        articleTag: state.articleTags,
    };
};

export default withRouter(connect(mapStateToProps, {getSpecifiedArticle, getAllArticleTags, reduceVisit})(Article));
