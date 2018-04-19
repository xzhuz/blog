import React from 'react';
import {withRouter} from "react-router-dom";
import {deleteArticle, getArticleList} from "../../reducers/article.redux";
import {connect} from "react-redux";
import ModifyCard from "../../components/ModifyCard";
import './articleList.scss';
import Pagination from "../../components/Pagination";

class ArticleList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.goPage = this.goPage.bind(this);
        this.state = {
            current: 1,
            count: 0,
        };
    }

    componentDidMount() {
        this.props.getArticleList();
    }

    clickShowPost(id, tags) {
        this.props.history.push({
            pathname: `/article/${id}`,
            state: {tags: new Array(tags.split(','))}
        });
    }

    clickRemovePost(id) {
        this.props.deleteArticle(id);
        this.props.getArticleList();
        this.shouldComponentUpdate = () =>  {
            return true;
        };

    }

    clickUpdatePost({id, title, content, summary, tags, thumb}) {
        this.props.history.push({
            pathname: `/dashboard/modify`,
            state: {id: id, title: title, content: content, summary: summary, tags: tags, thumb: thumb}});
    }

    renderPagination(size) {
        return <Pagination initPage={1} pageSize={size} goPage={this.goPage} />;
    }

    goPage(page){
        this.setState({current: page});
        window.scrollTo(0, 0);
    }

    render () {
        const {articles} = this.props;
        // 实现分页逻辑
        const pageSize = Math.ceil(articles.length / 6 );
        const {current} = this.state;
        const begin = 6 * (current - 1);
        const end = (begin + 6) > articles.length ? articles.length : begin + 6;
        const articleData = articles.filter((v, index) => {
            return index >= begin && index < end;
        });
        return (
            <div className={'container article-list'}>
                <div className={'article-list-items'}>
                {
                    articleData.map((val, index) => (
                        <ModifyCard key={index} items={val}
                                    handleClickUpdatePost={(v) => this.clickUpdatePost(v)}
                                    handleClickShowPost={(v, tags) => this.clickShowPost(v, tags)}
                                    handleClickRemovePost={(v) => this.clickRemovePost(v)}
                        />
                    ))
                }
                </div>
                <div className={'article-list-pagination'}>
                {
                    this.renderPagination(pageSize)
                }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        articles: state.articlesList
    };
};

export default withRouter(connect(mapStateToProps, {getArticleList, deleteArticle})(ArticleList));

