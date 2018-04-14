import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../../components/Card';
import '../Home/home.scss';
import {
    findMatchTagsArticle,
    getPopularArticle,
    reduceVisit,
    getAllArticleTags,
    getPartArticles,
    doCountArticles
} from "../../reducers/article.redux";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";
import RightSideBar from "../../components/RightSideBar";

class ArchiveArticles extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 6
        };
    }

    showPostContent(articleId, visit) {
        this.props.history.push(`/article/${articleId}`);
        this.props.reduceVisit({id: articleId, visit: visit + 1});
    }

    componentDidMount() {
        const {tagName}  = this.props.match.params;
        this.props.findMatchTagsArticle({tag: tagName});
        this.props.getPopularArticle();
        this.props.getAllArticleTags();
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
        this.props.findMatchTagsArticle({tag: v});
    }

    renderCards(v, index) {
        return <Card key={index} articleId={v._id} title={v.title} thumb={v.thumb}
                     summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                     showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>;
    }

    readMore(v) {
        this.setState(state => ({
            limit: state.limit + 3
        }));
    }

    renderReadMore(filled) {
        return filled ? <BottomOut/> : <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    render() {
        const {article, popularArticle, articleTag} = this.props;
        const pageSize = article.length;
        const partArticle = article.slice(0, this.state.limit);
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v];
        });
        tag = Array.from(new Set(tag));
        return (
            <div className='container'>
                <div className={'articles'}>
                    {
                        partArticle.filter(v => v.publish).map((v, index) => (
                            this.renderCards(v, index)
                        ))
                    }
                    {
                        this.renderReadMore(this.state.limit >= pageSize)
                    }
                </div>
                <RightSideBar articles={popularArticle} tags={tag} onClickTag={(v) => this.tagClick(v)}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articlesList,
        popularArticle: state.popularArticlesLoad,
        articleTag: state.articleTags,
    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
    getPopularArticle,
    reduceVisit,
    findMatchTagsArticle,
    getAllArticleTags,
    doCountArticles,
})(ArchiveArticles));
