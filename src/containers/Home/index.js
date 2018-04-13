import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../Card';
import './home.scss';
import SideBar from "../../components/SideBar";
import {
    findMatchTagsArticle,
    getPopularArticle,
    reduceVisit,
    getAllArticleTags,
    getPartArticles,
    doCountArticles
} from "../../reducers/article.redux";
import Tag from "../../components/Tag";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";
import {getAboutMe} from "../../reducers/about.redux";

class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 6
        };
    }

    showPostContent(articleId, visit) {
        this.props.history.push(`/post/${articleId}`);
        this.props.reduceVisit({id: articleId, visit: visit + 1});
    }

    componentDidMount() {
        this.props.getPartArticles(this.state);
        this.props.getPopularArticle();
        this.props.getAllArticleTags();
        this.props.doCountArticles();
        this.props.getAboutMe();
    }

    tagClick(v) {
        this.props.findMatchTagsArticle({tag: v.target.innerHTML});
    }

    renderCards(v, index) {
        return <Card key={index} articleId={v._id} title={v.title} thumb={v.thumb}
                     summary={v.summary} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                     showPost={(id) => this.showPostContent(id, v.visit)} showCardInfo={true}/>;
    }

    readMore(v) {
        this.setState(state => ({
            limit: state.limit + 3
        }), () => this.props.getPartArticles(this.state));
    }

    renderReadMore(filled) {
        if (filled) {
            return <BottomOut/>;
        }
        return <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    render() {
        const {article, popularArticle, articleTag, articleSize, aboutMe} = this.props;
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v];
        });
        tag = Array.from(new Set(tag));
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
                <div className={'right-side-bar'}>
                    <SideBar barTitle={'热门博客'}>
                        {
                            popularArticle.filter(v => v.publish).map((v, index) => (
                                <Card key={index} articleId={v._id} title={v.title} thumb={v.thumb}
                                      summary={''} tags={v.tags} date={v.date}
                                      showPost={(id) => this.showPostContent(id)} showCardInfo={false}/>
                            ))
                        }
                    </SideBar>
                    <SideBar barTitle={'标签'}>
                        {
                            tag.map((v, index) => (
                                <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                            ))
                        }
                    </SideBar>
                </div>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articlesList,
        popularArticle: state.popularArticlesLoad,
        articleTag: state.articleTags,
        articleSize: state.articleCount,
        aboutMe: state.aboutMe
    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
    getPopularArticle,
    reduceVisit,
    findMatchTagsArticle,
    getAllArticleTags,
    doCountArticles,
    getAboutMe
})(Home));
