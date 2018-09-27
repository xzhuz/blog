import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {List} from 'immutable';
import NProgress from 'nprogress';

import Bottom from '../../components/Bottom';
import Card from '../../components/Card';
import ReadMore from '../../components/ReadMore';
import SideBar from "../../components/SideBar";
import './stylesheets/articles.scss';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5,
        };
    }

    componentWillUnmount() {
        NProgress.done();
    }

    componentDidUpdate() {
        NProgress.done();
    }

    componentDidMount() {
        this.props.clearRelatives();
    }

    readMore(v) {
        this.setState(state => ({
            size: state.size + 3,
        }), () => this.props.pageableArticles(this.state));
        NProgress.start();
    }

    renderReadMore(filled) {
        return filled ? <Bottom/> : <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    showPostContent(articleId) {
        this.props.history.push({
            pathname: `/article/${articleId}`
        });
    }

    tagClick(tag) {
        this.props.history.push(`/tag/${tag}`);
    }

    render() {
        // initArticles: 初始文章 articles: 点击加载更多时的文章
        const {initArticles, articles, articleCount} = this.props;
        const mergedArticles = initArticles.merge(articles);
        return (
            <div className='container'>
                <Helmet title='梅森的困学集'/>
                <div className='articles'>
                    {
                        mergedArticles.map((v, index) => (
                            <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit} compliment={v.compliment}
                                  summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                  showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>
                        ))
                    }
                    {
                        this.renderReadMore(articleCount <= this.state.size)
                    }
                </div>
                <SideBar/>
            </div>
        );
    }
}

Articles.propTypes = {
    initArticles: PropTypes.instanceOf(List),
    articles: PropTypes.instanceOf(List),
    tagClick: PropTypes.func,
    showPostContent: PropTypes.func,
    pageableArticles: PropTypes.func.isRequired,
    articleCount: PropTypes.number.isRequired,
    clearRelatives: PropTypes.func.isRequired,
};

export default Articles;
