import React from 'react';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import * as FontAwesome from 'react-icons/lib/fa';
import NProgress from 'nprogress';

import Bottom from "../../components/Bottom/index";
import Card from "../../components/Card/index";
import ReadMore from "../../components/ReadMore/index";
import './stylesheets/relative.scss';

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
        const {pathname} = this.props.history.location;
        const {tagName}  = this.props.match.params;
        const isTagPage = pathname.includes('/tag');
        isTagPage ? this.props.relativeArticles(Object.assign({}, {tag: tagName}, this.state)): '';
    }

    readMore(v) {
        const {tagName}  = this.props.match.params;
        this.setState(state => ({
            size: state.size + 3,
        }), () => this.props.relativeArticles(Object.assign({}, {tag: tagName}, this.state)));
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
        NProgress.start();
        this.props.relativeArticles({tag, page: 0, size: 5});
    }

    render() {
        // articles: 点击加载更多时的文章  relatives: 相关文章
        const { relatives, tag} = this.props;
        // 判断是否已经加载完所有文章
        const articleOver = relatives.size < this.state.size;
        console.log(tag);
        return (
            <div className='container'>
                <div className='articles'>
                    <h1 className='tag-name'><FontAwesome.FaTag/>{tag}</h1>
                    {
                        relatives.filter(v => v.publish).map((v, index) => (
                            <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                                  summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                  showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>
                        ))
                    }
                    {
                        this.renderReadMore(articleOver)
                    }
                </div>
            </div>
        );
    }
}

Home.propTypes = {
    articles: PropTypes.instanceOf(List),
    relatives: PropTypes.instanceOf(List),
    tagClick: PropTypes.func,
    showPostContent: PropTypes.func,
    relativeArticles: PropTypes.func,
    tag: PropTypes.string,
};

export default Home;
