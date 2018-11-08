import React from 'react';
import {Helmet} from "react-helmet";
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/lib/fa';


import {markdown} from '../../utils/markdownUtil';
import {formatDate} from '../../utils/commentUtils';

import Tag from '../../components/Tag';
import Compliment from '../../components/Compliment';
import Comment from '../../components/Comment';

import 'highlight.js/styles/atom-one-dark.css';
import 'tocbot/dist/tocbot.css';
import './stylesheets/article.scss';
import './stylesheets/toc.scss';
import BasicLayout from "../../components/BasicLayout";

class Article extends React.PureComponent {

    componentDidMount() {
        const {articleId} = this.props.match.params;
        this.props.increaseVisit(articleId);
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    componentWillUnmount() {
    }

    render () {
        const {article: {title, content, date, tags, compliment, id, visit}} = this.props;
        return (
            <BasicLayout>
                <article className='article-container'>
                    <Helmet title={title} />
                    <div className='article'>
                        <section>
                            <h1 className='article-title'>{title ? title.trim() : ''}</h1>
                            <p className='article-info'>
                                <span><FontAwesome.FaClockO /> {formatDate(date)}</span>
                                <span><FontAwesome.FaEye /> {visit}次</span>
                            </p>
                            <div className='article-content markdown' dangerouslySetInnerHTML={{__html: markdown(content)}} />
                            <p className='article-tags'>
                                {
                                    tags && tags.length > 0 ? [...tags.split(',')].map((v, index) => (
                                        <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                                    )) : ''
                                }
                            </p>
                            <Compliment id={id} compliment={compliment} />
                            <Comment />
                        </section>
                    </div>
                    {  /*       <SideBar>
                            <div className={classNames('bar-toc', {
                                [`toc-fixed`]: this.state.tocFixed,
                            })}>
                            </div>
                        </SideBar> */ }
                </article>
            </BasicLayout>
        );
    }
}

Article.propTypes = {
    increaseVisit: PropTypes.func.isRequired,
    article: PropTypes.object.isRequired,
};

export default Article;
