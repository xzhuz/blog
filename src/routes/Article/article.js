import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import NProgress from 'nprogress';
import tocbot from 'tocbot';
import classNames from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';


import {markdown} from '../../utils/markdownUtil';
import {formatDate} from '../../utils/commentUtils';
import {tocOption} from '../../utils/tocbotUtils';

import Tag from '../../components/Tag';
import Compliment from '../../components/Compliment';
import Comment from '../../components/Comment';
import SideBar from "../../components/SideBar";

import 'highlight.js/styles/atom-one-dark.css';
import 'tocbot/dist/tocbot.css';
import './stylesheets/article.scss';
import './stylesheets/toc.scss';

class Article extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleTocScroll = this.handleTocScroll.bind(this);
        this.state = {
            showArticle: false,
            tocFixed: false,
        };
    }

    componentDidMount() {
        NProgress.start();
        const {articleId} = this.props.match.params;
        this.props.articleDetail(articleId);
        this.props.increaseVisit(articleId);
        window.addEventListener('scroll', this.handleTocScroll, false);
    }

    handleTocScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const fixedHeight = 310;
        if (scrollTop > fixedHeight) {
            this.setState({tocFixed: true});
        } else if(this.state.tocFixed) {
            this.setState({tocFixed: false});
        }
    }

    showPostContent(articleId) {
        this.props.history.push({pathname: `/article/${articleId}`});
    }

    componentDidUpdate() {
        NProgress.done();
        tocbot.init(tocOption());
        this.setState({showArticle: true});
    }

    componentWillUnmount() {
        this.setState({showArticle: false});
        tocbot.destroy();
        window.removeEventListener('scroll', this.handleTocScroll, false);
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
                            <Compliment id={id} origin={compliment} />
                            <Comment />
                        </section>
                    </div>
                    <SideBar>
                        <div className={classNames('bar-toc', {
                            [`toc-fixed`]: this.state.tocFixed,
                        })}>
                        </div>
                    </SideBar>
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