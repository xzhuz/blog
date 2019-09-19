import React from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';

import {markdown} from '../../utils/markdownUtil';
import {formatDate} from '../../utils/commentUtils';

import Tag from '../../components/Tag';
import Comment from '../../components/Comment';

import 'highlight.js/styles/atom-one-dark.css';
import 'tocbot/dist/tocbot.css';
import './stylesheets/article.scss';
import './stylesheets/toc.scss';

class Article extends React.PureComponent {

    // componentDidMount() {
    //     const {articleId} = this.props.match.params;
    //     this.props.increaseVisit(articleId);
    // }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    render() {
        const {article: {title, content, createTime, tagList, thumb, compliment, articleId, visit}} = this.props;
        return (
            <article className='article-container'>
                <Helmet title={title}/>
                <div className='article-outer'>
                    <div className='article'>
                        <section>
                            <div className='article-header'>
                                <div className='article-header-meta'>
                                    <time className='article-time'>{formatDate(createTime)}</time>

                                </div>
                                <h1 className='article-title'>{title} </h1>
                            </div>
                            <figure className='article-image' style={{backgroundImage: `url(${thumb})`}}>

                            </figure>
                            <div className='article-full-content '>
                                <div className='article-content markdown'
                                     dangerouslySetInnerHTML={{__html: markdown(content)}}/>
                            </div>
                            <p className='article-tags'>
                                {
                                    tagList.map((v, index) => (
                                        <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                                    ))
                                }
                            </p>
                            <Comment/>
                        </section>
                    </div>
                </div>
            </article>
        );
    }
}

Article.propTypes = {
    article: PropTypes.object.isRequired,
};

export default Article;
