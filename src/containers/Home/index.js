import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NProgress from 'nprogress';
import Card from '../../components/Card';
import './home.scss';
import {
    getPopularArticle,
    reduceVisit,
    getPartArticles,
    doCountArticles,
    getAllArticleTags,
} from "../../reducers/article.redux";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";
import RightSideBar from "../RightSideBar";

class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 6
        };
    }

    showPostContent(articleId, visit) {
        this.props.history.push({pathname: `/article/${articleId}`});
        this.props.reduceVisit({id: articleId, visit: visit + 1});
    }

    componentDidMount() {
        this.props.getPartArticles(this.state);
        this.props.getPopularArticle();
        this.props.doCountArticles();
        this.props.getAllArticleTags();
        NProgress.start();
    }


    componentWillUnmount() {
        NProgress.done();
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    renderCards(v, index) {
        return <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                     summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                     showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>;
    }

    readMore(v) {
        this.setState(state => ({
            limit: state.limit + 3
        }), () => this.props.getPartArticles(this.state));
    }

    renderReadMore(filled) {
        return filled ? <BottomOut/> : <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    componentDidUpdate() {
        NProgress.done();
    }

    render() {
        const {article, popularArticle, articleSize} = this.props;
        return (
            <div className='container'>
                <div className={'articles'}>
                    {
                        article.filter(v => v.publish).map((v, index) => (
                            this.renderCards(v, index)
                        ))
                    }
                    {
                        this.renderReadMore(this.state.limit >= articleSize)
                    }
                </div>
                <RightSideBar showPopular={true}
                              showPostContent={(id, visit) => this.showPostContent(id, visit)}
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
        articleSize: state.articleCount,
    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
    getPopularArticle,
    reduceVisit,
    doCountArticles,
    getAllArticleTags,
})(Home));
