import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {List} from 'immutable';
import NProgress from 'nprogress';
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loaders';

import Bottom from '../../components/Bottom';
import Card from '../../components/Card';
import ReadMore from '../../components/ReadMore';
import 'loaders.css';
import './assets/stylesheets/home.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 3,
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

    reduce(arr) {
        const res = new Map();
        return Array.from(arr).filter(a => !res.has(a.id) && res.set(a.id, 1));
    }

    loadItems(e) {
        setTimeout(() => {
            this.setState(state => ({
                size: state.size + e,
            }), () => this.props.pageableArticles(this.state));
        }, 1000);
    }

    render() {
        // initArticles: 初始文章 articles: 点击加载更多时的文章
        const {initArticles, articles, articleCount} = this.props;
        const resultArticles = this.reduce([...initArticles, ...articles]);
        const banner = require('./assets/images/banner.jpg');
        const avatar = require('./assets/images/avatar.jpeg');

        const items = [];
        resultArticles.map((v, index) => {
            items.push(
                <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit} compliment={v.compliment}
                      summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                      showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>
            );
        });
        return (
            <div className='container'>
                <div className="home-container">
                    <Helmet title='困知记'/>
                    <div className='banner' style={{
                            backgroundImage: `url(${banner})`,
                            backgroundPositionX: '50%',
                            backgroundPositionY: '50%',
                            backgroundSize: 'cover',
                            backgroundColor: 'rgb(17, 17, 17)',
                        }}
                    >
                        <div className='banner-content'>
                            <div className='banner-detail'>
                                <img src={avatar} className='banner-avatar' />
                                <p className='banner-type'>
                                     我只是一个程序猿
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className='segment'> 最近文章 </p>
                    <div className='articles-container'>
                        <div className='articles'>
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={(e) => this.loadItems(e)}
                                hasMore={articleCount >= this.state.size}
                                loader={
                                    <Loader type='ball-beat'
                                            active={true}
                                            key={0}
                                            innerClassName='articles-loading'
                                            color='#E53A40'
                                            style={{transform: 'scale(0.5)'}}
                                    />
                                }
                            >
                               {items}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    initArticles: PropTypes.instanceOf(List),
    articles: PropTypes.instanceOf(List),
    tagClick: PropTypes.func,
    showPostContent: PropTypes.func,
    pageableArticles: PropTypes.func.isRequired,
    articleCount: PropTypes.number.isRequired,
    clearRelatives: PropTypes.func.isRequired,
};

export default Home;
