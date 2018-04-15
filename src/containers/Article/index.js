import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './article.scss';
import ReactMarkDown from 'react-markdown';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {findMatchTagsArticle, getAllArticleTags, getSpecifiedArticle, reduceVisit} from "../../reducers/article.redux";
import Title from "../../components/Title/Title";
import RightSideBar from "../RightSideBar";

class Article extends React.PureComponent {

    componentDidMount() {
        const {articleId} = this.props.match.params;
        this.props.getSpecifiedArticle(articleId);
        this.props.getAllArticleTags();
    }

    showPostContent(articleId, visit) {
        this.props.history.push(`/article/${articleId}`);
        this.props.reduceVisit({id: articleId, visit: visit + 1});
        this.props.getSpecifiedArticle(articleId);
    }

    componentWillReceiveProps() {
        console.log(this.props.article);
        const {tags} = this.props.article;
        if (tags && this.props.articles.length === 0) {
            this.props.findMatchTagsArticle({tag: [...tags]});
        }

    }

    render () {
        const {title, content, date} = this.props.article;
        const {articleTag, articles} = this.props;
        const relativeArticles = articles.sort(v => v.visit).reverse().slice(0, 5);
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
                    <Title title={title}/>
                    <p className={'article-date'}>{new Date(date).toDateString()}</p>
                    <ReactMarkDown source={content} escapeHtml={false}/>
                </div>
                <RightSideBar articles={relativeArticles} showPostContent={(id, visit) => this.showPostContent(id, visit)}/>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articleLoad,
        articles: state.articlesList,
        articleTag: state.articleTags,
    };
};

export default withRouter(connect(mapStateToProps, {getSpecifiedArticle, findMatchTagsArticle, getAllArticleTags, reduceVisit})(Article));
