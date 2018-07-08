import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import NProgress from 'nprogress';

import Bottom from '../../components/Bottom';
import Card from '../../components/Card';
import ReadMore from '../../components/ReadMore';
import SquareCard from "../../components/SquareCard";
import './stylesheets/home.scss';

class Home extends React.Component {
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
        this.props.loadPopularArticles();
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
        const {initArticles, articles, articleCount, popularArticles} = this.props;
        const mergedArticles = initArticles.merge(articles);
        return (
            <div className='container'>
                <div className='articles'>
                    {
                        mergedArticles.filter(v => v.publish).map((v, index) => (
                            <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit} compliment={v.compliment}
                                  summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                  showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>
                        ))
                    }
                    {
                        this.renderReadMore(articleCount <= this.state.size)
                    }
                </div>
                <div className='right-side-bar'>
                    <div className='side-bar-name'>
                        <h1>热门文章</h1>
                    </div>
                    <div className='side-popular-articles'>
                        {
                            popularArticles.filter(v => v.publish).map((v) => (
                                <SquareCard key={`${v.date}-${v.title}`} title={v.title} date={v.date} id={v.id}
                                            compliment={v.compliment} summary={v.summary} thumb={v.thumb} visit={v.visit}
                                            showPostContent={() => this.showPostContent(v.id)}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    initArticles: PropTypes.instanceOf(List),
    articles: PropTypes.instanceOf(List),
    popularArticles: PropTypes.instanceOf(List),
    tagClick: PropTypes.func,
    showPostContent: PropTypes.func,
    pageableArticles: PropTypes.func.isRequired,
    articleCount: PropTypes.number.isRequired,
    clearRelatives: PropTypes.func.isRequired,
    loadPopularArticles: PropTypes.func,
};

export default Home;
