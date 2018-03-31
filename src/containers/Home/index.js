import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Card from '../Card';
import './home.scss';
import SideBar from "../SideBar";
import {
    findMatchTagsArticle,
    getPopularArticle,
    reduceVisit,
    getAllArticleTags,
    getPartArticles,
    doCountArticles
} from "../../reducers/article.redux";
import Avatar from "../../components/Avatar";
import Tag from "../../components/Tag";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";

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
    }

    tagClick(v) {
        this.props.findMatchTagsArticle({tag: v.target.innerHTML});
    }

    renderCards(v, index) {
        return <Card key={index} articleId={v._id} title={v.title} coverImg={v.coverImg}
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
        const {article, popularArticle, articleTag, articleSize} = this.props;
        let tag = [];
        articleTag.map(v => {
            tag = [...tag, ...v];
        });
        tag = Array.from(new Set(tag));
        const skills = ['Java', 'JavaScript', 'JQuery', 'Tomcat', 'Spring', 'React'];
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
                    <SideBar barTitle={'关于我'}>
                        <div className={'about-me'}>
                            <Avatar avatar={'avatar'}/>
                            <div className={'me'}>
                                <div className={'me-name'}>
                                    <span className={'me-menu'}>Name</span> <span>Mei Sen</span>
                                </div>
                                <div className={'me-major'}>
                                    <span className={'me-menu'}>Major</span> <span>Java程序员</span>
                                </div>
                                <div className={'me-skill'}>
                                    <span className={'me-menu'}>Skills</span>
                                    <div>
                                        {
                                            skills.map((value, index) => (
                                                <Tag key={index} label={value} clickTag={(v) => console.log(v)}/>
                                            ))
                                        }
                                    </div>
                                </div>
                                <div className={'me-mail'}>
                                    <span className={'me-menu'}>Mail</span> <span>ms915818993@163.com</span>
                                </div>
                                <div className={'me-location'}>
                                    <span className={'me-menu'}>Location</span> <span>重庆</span>
                                </div>
                            </div>
                        </div>
                    </SideBar>
                    <SideBar barTitle={'热门博客'}>
                        {
                            popularArticle.map((v, index) => (
                                <Card key={index} articleId={v._id} title={v.title} coverImg={v.coverImg}
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
        articleSize: state.articleCount
    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
    getPopularArticle,
    reduceVisit,
    findMatchTagsArticle,
    getAllArticleTags,
    doCountArticles
})(Home));
