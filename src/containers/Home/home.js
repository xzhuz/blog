import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NProgress from 'nprogress';
import Card from '../../components/Card';
import { reduceVisit, getPartArticles, doCountArticles } from "../../reducers/article.redux";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";
import RightSideBar from "../RightSideBar";
import './home.scss';

class LoadableHome extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 6
        };
    }

    showPostContent(articleId) {
        this.props.history.push({pathname: `/article/${articleId}`});
    }

    componentDidMount() {
        NProgress.start();
        this.props.getPartArticles(this.state);
        this.props.doCountArticles();
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
        const {article, articleSize} = this.props;
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
                              showPostContent={(id) => this.showPostContent(id)}
                              articleSideBarTitle={'热门文章'}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        article: state.articlesList,
        articleSize: state.articleCount,
    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
    reduceVisit,
    doCountArticles,
})(LoadableHome));
