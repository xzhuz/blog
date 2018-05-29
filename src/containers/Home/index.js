import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import NProgress from 'nprogress';
import Card from '../../components/Card';
import { getPartArticles } from "../../reducers/article.redux";
import ReadMore from '../../components/ReadMore';
import BottomOut from "../../components/BottomOut";
import RightSideBar from "../RightSideBar";
import './home.scss';

class Home extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            skip: 0,
            limit: 5,
            clickRead: false,
        };
    }

    showPostContent(articleId) {
        this.props.history.push({pathname: `/article/${articleId}`});
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
            limit: state.limit + 3,
            clickRead: true,
        }), () => this.props.getPartArticles(this.state));
        NProgress.start();
    }

    renderReadMore(filled) {
        return filled ? <BottomOut/> : <ReadMore handleReadMore={(v) => this.readMore(v)}/>;
    }

    componentDidUpdate() {
        NProgress.done();
    }



    render() {
        const {articleList, articleQuantity, initArticles} = this.props;
        const articles = this.state.clickRead ? articleList: initArticles;
        return (
            <div className='container'>
                <div className={'articles'}>
                    {
                        articles.filter(v => v.publish).map((v, index) => (
                            this.renderCards(v, index)
                        ))
                    }
                    {
                        this.renderReadMore(this.state.limit >= articleQuantity)
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

Home.propTypes = {
    initArticles: PropTypes.array,
    articleQuantity: PropTypes.number,
};
const mapStateToProps = state => {
    return {
        articleList: state.articlesList,

    };
};

export default withRouter(connect(mapStateToProps, {
    getPartArticles,
})(Home));
