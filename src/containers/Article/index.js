import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NProgress from 'nprogress';
import { CSSTransition } from 'react-transition-group';
import {markdown} from "../../utils/markdownUtil";
import { getSpecifiedArticle, reduceVisit} from "../../reducers/article.redux";
import RightSideBar from "../RightSideBar";
import Tag from "../../components/Tag";
import 'highlight.js/styles/atom-one-dark.css';
import './article.scss';

class Article extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {showArticle: false};
    }

    componentDidMount() {
        NProgress.start();
        const {articleId} = this.props.match.params;
        this.props.reduceVisit({id: articleId});
        this.props.getSpecifiedArticle(articleId);
    }

    showPostContent(articleId) {
        this.props.getSpecifiedArticle(articleId);
        this.props.history.push({pathname: `/article/${articleId}`});
    }

    componentDidUpdate() {
        this.setState({showArticle: true});
        NProgress.done();
    }

    componentWillUnmount() {
        this.setState({showArticle: false});
        NProgress.done();
    }

    tagClick(v) {
        this.props.history.push(`/tag/${v}`);
    }

    render () {
        const {title, content, date, tags} = this.props.article;
        return (
            <CSSTransition
                in={this.state.showArticle}
                classNames="article"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showArticle: false});}}
            >
                <div className='container'>
                    <div className='article'>
                        <section>
                            <h1 className='article-title'>{title ? title.trim() : ''}</h1>
                            <p className='article-date'>Post: {new Date(date).toLocaleString()}</p>
                            <div className='article-content markdown-body' dangerouslySetInnerHTML={{__html: markdown(content)}} />
                            <p className='article-tags'>
                                {
                                    [...tags.split(',')].map((v, index) => (
                                        <Tag label={v} key={index} clickTag={(v) => this.tagClick(v)}/>
                                    ))
                                }
                            </p>
                        </section>
                    </div>
                    {
                        tags && tags.length > 0 ? <RightSideBar tags={tags} showPopular={false}
                                             showPostContent={(id, visit) => this.showPostContent(id, visit)}
                                             articleSideBarTitle={'相关文章'}
                        /> : ''
                    }
                </div>
            </CSSTransition>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articleLoad,
    };
};

export default withRouter(connect(mapStateToProps, {getSpecifiedArticle, reduceVisit})(Article));
