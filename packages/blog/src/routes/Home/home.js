import React from 'react';
import PropTypes from 'prop-types';
import {Helmet} from 'react-helmet';
import {List} from 'immutable';
import Loader from 'react-loaders';

import Bottom from '../../components/Bottom';
import Card from '../../components/Card';
import ReadMore from '../../components/ReadMore';
import 'loaders.css';
import './assets/stylesheets/home.scss';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.state = {
            page: 0,
            size: 6,
        };
    }

    componentDidMount() {
        this.props.clearRelatives();
        window.addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        const scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        const container = document.getElementById('container');
        const bottom = document.getElementById('bottom');
        const top = container.scrollTop + container.offsetHeight + container.offsetTop;
        if (this.oldScrollTop < scrollTop) {
            // 向下滚
            if (bottom.offsetTop + bottom.offsetHeight <= top) {
                this.loadItems(3);
            }
        }
        this.oldScrollTop = scrollTop;
    }

    readMore(v) {
        this.setState(state => ({
            size: state.size + 6,
        }), () => this.props.pageableArticles(this.state));
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
        return Array.from(arr).filter(a => !res.has(a.articleId) && res.set(a.articleId, 1));
    }

    extracted(items) {
        if (items.length % 6 !== 0) {
            const seq = Math.floor(items.length / 6);
            const supplement = 6 * (seq + 1) + 1;
            const less = supplement - items.length;
            const lastItem = items.pop();
            // if (less % 2 === 0) {
            //     less -= 1;
            // }
            items.push(lastItem);
            for (let i = 0; i < less; i++) {
                items.push(<div className='post-card no-display' key={`emptyItem${i}`}/>);
            }
        }
    }

    loadItems(e) {
        console.log(e);
        this.setState(state => ({
            size: state.size + e,
        }), () => this.props.pageableArticles(this.state));
    }


    render() {
        // initArticles: 初始文章 articles: 点击加载更多时的文章
        const {initArticles, articles, articleCount} = this.props;
        const resultArticles = this.reduce([...initArticles, ...articles]);
        const banner = require('./assets/images/banner.jpg');
        const avatar = require('./assets/images/avatar.jpg');
        const items = [];
        resultArticles.map((v, index) => {
            items.push(
                <Card key={index} articleId={v.articleId} title={v.title} thumb={v.thumb} visit={v.visit} compliment={v.compliment}
                      introduce={v.introduce} tagList={v.tagList} createTime={v.createTime} clickTag={(v) => this.tagClick(v)}
                      showPost={(articleId) => this.showPostContent(articleId, v.visit)} showCardInfo={true}/>
            );
        });

        this.extracted(items);

        return (
            <div className='container' id='container'>
                <div className="home-container">
                    <Helmet title='学而录 | 首页'/>
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
                                     申申如也,夭夭如也
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='articles-container'>
                        <div className='articles-card'>
                            {items}
                        </div>
                        <div id='bottom'/>
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
