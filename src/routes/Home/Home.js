import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import * as FontAwesome from 'react-icons/lib/fa';
import NProgress from 'nprogress';

import BottomOut from "../../components/BottomOut/index";
import Card from "../../components/Card/index";
import ReadMore from "../../components/ReadMore/index";
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

    readMore(v) {
        this.setState(state => ({
            size: state.size + 3,
        }), () => this.props.pageableArticles(this.state));
        NProgress.start();
    }

    renderReadMore(filled) {
        return filled ? <BottomOut/> : <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    showPostContent(articleId) {
        this.props.history.push({
            pathname: `/article/${articleId}`
        });
    }

    tagClick(tag) {
        this.props.history.push({pathname: '/tag', state: {tag}});
        NProgress.start();
        this.props.relativeArticles(tag);
    }

    render() {
        const {articleQuantity, initArticles, articles, relatives, tag} = this.props;
        const mergedArticles = tag ? relatives :initArticles.merge(articles);
        return (
            <div className='container'>
                <div className='articles'>
                    {
                        tag ? <h1 className='tag-name'><FontAwesome.FaTag/>{tag}</h1> : ''
                    }
                    {
                        mergedArticles.filter(v => v.publish).map((v, index) => (
                            <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                                  summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                  showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>
                        ))
                    }
                    {
                        this.renderReadMore(this.state.size >= articleQuantity)
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    initArticles: PropTypes.instanceOf(List),
    articles: PropTypes.instanceOf(List),
    relatives: PropTypes.instanceOf(List),
    articleQuantity: PropTypes.number,
    tagClick: PropTypes.func,
    showPostContent: PropTypes.func,
    pageableArticles: PropTypes.func.isRequired,
    relativeArticles: PropTypes.func,
    tag: PropTypes.string,
};

export default Home;
