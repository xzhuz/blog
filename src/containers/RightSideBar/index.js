import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import SideBar from "../../components/SideBar/index";
import Tag from "../../components/Tag/index";
import Card from "../../components/Card/index";
import {
    getPopularArticle,
    findMatchTagsArticle,
} from "../../reducers/article.redux";
import './rightSideBar.scss';

class RightSideBar extends React.PureComponent {

    componentDidMount() {
        const {tags} = this.props;
        if (tags && tags.length > 0) {
            this.props.findMatchTagsArticle({tag: tags});
        } else {
            this.props.getPopularArticle();
        }
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
        const {articles, articleTag, popularArticles, showPopular, articleSideBarTitle} = this.props;
        const sideBarArticles = showPopular ? popularArticles : articles;
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v.split(',')];
        });
        tag = Array.from(new Set(tag));
        return (
            <div className={'right-side-bar'}>
                <SideBar barTitle={articleSideBarTitle}>
                    {
                        sideBarArticles.filter(v => v.publish).map((v, index) => (
                            <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                                  summary={''} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                  showPost={(id) => this.showPostContent(id, v.visit, v.tags)} showCardInfo={false}/>
                        ))
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
    showPostContent: PropTypes.func,
    articleSideBarTitle: PropTypes.string.isRequired,
    tags: PropTypes.string,
    showPopular: PropTypes.bool.isRequired,
};

const mapStateToProps = state => {
    return {
        articles: state.matchTagArticles,
        popularArticles: state.popularArticlesLoad,
        articleTag: state.articleTags,
    };
};

export default withRouter(connect(mapStateToProps, {
    getPopularArticle,
    findMatchTagsArticle,
})(RightSideBar));
