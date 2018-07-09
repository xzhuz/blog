import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import NProgress from 'nprogress';

import {markdown} from '../../utils/markdownUtil';
import {formatDate} from '../../utils/commentUtils';

import Tag from '../../components/Tag';
import Compliment from '../../components/Compliment';
import Comment from '../../components/Comment';

import 'highlight.js/styles/atom-one-dark.css';
import './stylesheets/article.scss';

class Article extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showArticle: false,
        };
    }

    componentDidMount() {
        NProgress.start();
        const {articleId} = this.props.match.params;
        this.props.articleDetail(articleId);
        this.props.increaseVisit(articleId);
    }


    showPostContent(articleId) {
        this.props.history.push({pathname: `/article/${articleId}`});
    }

    componentDidUpdate() {
        NProgress.done();
        this.setState({showArticle: true});
    }

    componentWillUnmount() {
        this.setState({showArticle: false});
        NProgress.done();
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    render () {
        const {title, content, date, tags, compliment, id, visit} = this.props.article;
        return (
            <CSSTransition
                in={this.state.showArticle && !Number.isNaN(new Date(date).getFullYear())}
                classNames='article'
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showArticle: false});}}
            >
                <article className='container'>
                    <div className='article'>
                        <section>
                            <h1 className='article-title'>{title ? title.trim() : ''}</h1>
                            <p className='article-info'>发布: {formatDate(date)}</p>
                            <p className='article-info'>阅读: {visit} 次</p>
                            <div className='article-content markdown' dangerouslySetInnerHTML={{__html: markdown(content)}} />
                            <p className='article-tags'>
                                {
                                    tags && tags.length > 0 ? [...tags.split(',')].map((v, index) => (
                                        <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                                    )) : ''
                                }
                            </p>
                            <Compliment id={id} origin={compliment} />
                            <Comment />
                        </section>
                    </div>

                </article>
            </CSSTransition>
        );
    }
}

Article.propTypes = {
    articleDetail: PropTypes.func.isRequired,
    increaseVisit: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
};

export default Article;