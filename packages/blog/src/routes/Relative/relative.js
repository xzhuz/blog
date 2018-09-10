import React from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import * as FontAwesome from 'react-icons/lib/fa';
import NProgress from 'nprogress';

import Bottom from '../../components/Bottom';
import Card from '../../components/Card';
import ReadMore from '../../components/ReadMore';
import SideBar from "../../components/SideBar";
import './stylesheets/relative.scss';

class Relative extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5,
        };
    }

    componentWillUnmount() {
        this.props.clearRelatives();
        NProgress.done();
    }

    componentDidUpdate() {
        NProgress.done();
    }

    componentDidMount() {
        const {tagName}  = this.props.match.params;
        this.props.relativeArticles(Object.assign({}, {tag: tagName}, this.state));
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
        this.props.clearRelatives();
        this.setState(() => ({
            size: 5,
        }), () => this.props.relativeArticles(Object.assign({}, {tag}, this.state)));
    }

    render() {
        // articles: 点击加载更多时的文章  relatives: 相关文章
        const { relatives, tag } = this.props;
        // 判断是否已经加载完所有文章
        const articleOver = relatives.size < this.state.size;
        return (
            <div className='container'>
                <Helmet title={tag} />
                <div className='articles'>
                    <h1 className='tag-name'><FontAwesome.FaTags/> {tag}</h1>
                    {
                        relatives.map((v, index) => (
                            <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit} compliment={v.compliment}
                                  summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                  showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>
                        ))
                    }
                    {
                        this.renderReadMore(articleOver)
                    }
                </div>
                <SideBar/>
            </div>
        );
    }
}

Relative.propTypes = {
    relatives: PropTypes.instanceOf(List),
    tagClick: PropTypes.func,
    showPostContent: PropTypes.func,
    relativeArticles: PropTypes.func,
    clearRelatives: PropTypes.func,
    tag: PropTypes.string,
};

export default Relative;
