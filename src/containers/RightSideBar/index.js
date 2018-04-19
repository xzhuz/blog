import React from 'react';
import PropTypes from 'prop-types';
import SideBar from "../../components/SideBar/index";
import Tag from "../../components/Tag/index";
import Card from "../../components/Card/index";
import './rightSideBar.scss';
import {withRouter} from "react-router-dom";
import {
    findMatchTagsArticle,
    getAllArticleTags,
    getPopularArticle, reduceVisit,
} from "../../reducers/article.redux";
import {connect} from "react-redux";

class RightSideBar extends React.PureComponent {

    componentDidMount() {
        this.props.getAllArticleTags();
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
        this.props.findMatchTagsArticle({tag: v});
    }

    showPostContent(id, visit, tags) {
        const {showPostContent} = this.props;
        if (showPostContent) {
            showPostContent(id, visit, tags);
        }
    }

    render() {
        const {articles, articleTag, articleSideBarTitle} = this.props;
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v.split(',')];
        });
        tag = Array.from(new Set(tag));
        return (
            <div className={'right-side-bar'}>
                <SideBar barTitle={articleSideBarTitle}>
                    {
                        articles
                            ? articles.filter(v => v.publish).map((v, index) => (
                                <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                                      summary={''} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                      showPost={(id) => this.showPostContent(id, v.visit, v.tags)} showCardInfo={false}/>
                            ))
                            : ''
                    }
                </SideBar>
                <SideBar barTitle={'标签'}>
                    {
                        tag
                            ? tag.map((v, index) => (
                                <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                            ))
                            : ''
                    }
                </SideBar>
            </div>
        );
    }
}

RightSideBar.propTypes = {
    articles: PropTypes.array,
    showPostContent: PropTypes.func,
    articleSideBarTitle: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        popularArticle: state.popularArticlesLoad,
        articleTag: state.articleTags,
    };
};

export default withRouter(connect(mapStateToProps, {
    getPopularArticle,
    findMatchTagsArticle,
    getAllArticleTags,
})(RightSideBar));
