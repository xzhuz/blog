import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import { CSSTransition } from 'react-transition-group';
import tocbot from 'tocbot';
import SideBar from "../../components/SideBar/index";
import Tag from "../../components/Tag/index";
import Card from "../../components/Card/index";
import {tocOption} from '../../utils/tocbotUtils';
import { getPopularArticle, findMatchTagsArticle, getAllArticleTags } from "../../reducers/article.redux";
import 'tocbot/dist/tocbot.css';
import './rightSideBar.scss';
import './toc.scss';

class RightSideBar extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            showRightSideBar: false,
        };
        // this.barToc = React.createRef();
    }

    componentDidMount() {
        const {tags} = this.props;
        if (tags && tags.length > 0) {
            this.props.findMatchTagsArticle({tag: tags});
        } else {
            this.props.getPopularArticle();
        }
        this.props.getAllArticleTags();
        this.setState({showRightSideBar: true});
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
        tocbot.init({...tocOption(),  headingsOffset: -window.innerHeight});
        return (
            <CSSTransition
                in={this.state.showRightSideBar}
                classNames="right-side-bar"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
            >
                <div className={'right-side-bar'}>
                    <SideBar barTitle={articleSideBarTitle} >
                        {
                            sideBarArticles.filter(v => v.publish).map((v, index) => (
                                <Card key={index} articleId={v.id} title={v.title} thumb={v.thumb} visit={v.visit}
                                      summary={''} tags={v.tags} date={v.date} clickTag={(v) => this.tagClick(v)}
                                      showPost={(id) => this.showPostContent(id, v.tags)} showCardInfo={false}/>
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
                    <div className='bar-toc'>
                    </div>
                </div>
            </CSSTransition>
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
    getAllArticleTags,
})(RightSideBar));
