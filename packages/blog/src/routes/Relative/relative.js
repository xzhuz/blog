import React from 'react';
import {Helmet} from 'react-helmet';
import PropTypes from 'prop-types';
import {List} from 'immutable';
import * as FontAwesome from 'react-icons/fa';
import NProgress from 'nprogress';

import Bottom from '../../components/Bottom';
import Card from '../../components/Card';
import ReadMore from '../../components/ReadMore';
import './stylesheets/relative.scss';
import BasicLayout from "../../components/BasicLayout";

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

    extracted(items) {
        if (items.length % 6 !== 0) {
            const seq = Math.floor(items.length / 6);
            const supplement = 6 * (seq + 1) + 1;
            let less = supplement - items.length;
            const lastItem = items.pop();
            if (less % 2 === 0) {
                less --;
            }
            for (let i = 0; i < less; i++) {
                items.push(<div key={`emptyItem${i}`}/>);
            }
            items.push(lastItem);

        }
    }

    render() {
        // articles: 点击加载更多时的文章  relatives: 相关文章
        const { relatives, tag } = this.props;
        // 判断是否已经加载完所有文章
        const articleOver = relatives.size < this.state.size;
        const items = relatives.map((v, index) => (
            <Card key={index} articleId={v.articleId} title={v.title} thumb={v.thumb} visit={v.visit}
                  compliment={v.compliment}
                  introduce={v.introduce} tagList={v.tagList} createTime={v.createTime}
                  clickTag={(v) => this.tagClick(v)}
                  showPost={(articleId) => this.showPostContent(articleId, v.visit)} showCardInfo={true}/>
        ));
        this.extracted(items);

        return (
           <BasicLayout>
               <Helmet title='困知记'/>
               <div className='articles-container'>
                   <h1 className='tag-name'><FontAwesome.FaTags/> {tag}</h1>
                   <div className='articles'>
                       { items }
                       {
                           this.renderReadMore(articleOver)
                       }
                   </div>
               </div>
            </BasicLayout>
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
