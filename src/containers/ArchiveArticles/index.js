import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NProgress from 'nprogress';
import Card from '../../components/Card';
import '../Home/home.scss';
import {
    findMatchTagsArticle,
    getPopularArticle,
    reduceVisit,
    getPartArticles,
} from "../../reducers/article.redux";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";
import RightSideBar from "../RightSideBar";

class ArchiveArticles extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 6
        };
    }

    showPostContent(articleId, visit, tags) {
        this.props.history.push({
            pathname: `/article/${articleId}`,
            state: {tags: new Array(tags.split(','))}
        });
        this.props.reduceVisit({id: articleId, visit: visit + 1});
    }

    componentDidMount() {
        const {tagName}  = this.props.match.params;
        NProgress.start();
        this.props.findMatchTagsArticle({tag: [tagName]});
        this.props.getPopularArticle();
    }

    componentDidUpdate() {
        NProgress.done();
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
        this.props.findMatchTagsArticle({tag: v});
    }

    renderCards(v, index) {
        return <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                     summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                     showPost={(id) => this.showPostContent(id, v.visit, v.tags)} showCardInfo={true}/>;
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
        const {article, popularArticle} = this.props;
        const pageSize = article.length;
        const partArticle = article.slice(0, this.state.limit);
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
                <RightSideBar articles={popularArticle}
                              showPostContent={(id, visit, tags) => this.showPostContent(id, visit, tags)}
                              articleSideBarTitle={'热门文章'}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articlesList,
        popularArticle: state.popularArticlesLoad,
    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
    getPopularArticle,
    reduceVisit,
    findMatchTagsArticle,
})(ArchiveArticles));
