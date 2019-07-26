import React from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/fa';

import {markdown} from '../../utils/markdownUtil';
import {formatDate} from '../../utils/commentUtils';

import Tag from '../../components/Tag';
import Compliment from '../../components/Compliment';
import Comment from '../../components/Comment';

import 'highlight.js/styles/atom-one-dark.css';
import 'tocbot/dist/tocbot.css';
import './stylesheets/article.scss';
import './stylesheets/toc.scss';

class Article extends React.PureComponent {

    componentDidMount() {
        const {articleId} = this.props.match.params;
        this.props.increaseVisit(articleId);
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    render () {
        const {article: {title, content, createTime, tagList, compliment, articleId, visit}} = this.props;
        const cardImage = 'https://codedream-blog.oss-cn-beijing.aliyuncs.com/asphalt-empty-field-163444_1560960636009.jpg';
        return (
            <article className='article-container'>
                <Helmet title={title} />
                <div className='article-outer'>
                    <div className='article'>
                        <section>
                            <div className='article-header'>
                                <div className='article-header-meta'>
                                    <time className='article-time'>{formatDate(createTime)}</time>

                                </div>
                                <h1 className='article-title'>{title} </h1>
                            </div>
                            <figure className='article-image' style={{backgroundImage: `url(${cardImage})`}}>

                            </figure>
                            <div className='article-full-content '>
                                <div className='article-content markdown' dangerouslySetInnerHTML={{__html: markdown(content)}} />
                            </div>
                            <p className='article-tags'>
                                {
                                    tagList.map((v, index) => (
                                        <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                                    ))
                                }
                            </p>
                            <Comment />
                        </section>
                    </div>
                </div>
                {  /*       <SideBar>
                            <div className={classNames('bar-toc', {
                                [`toc-fixed`]: this.state.tocFixed,
                            })}>
                            </div>
                        </SideBar> */ }
            </article>
        );
    }
}

Article.propTypes = {
    increaseVisit: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
};

export default Article;
