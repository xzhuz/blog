import React from 'react';
import {withRouter} from "react-router-dom";
import {deleteBlog, getPostList} from "../../reducers/blog.redux";
import {connect} from "react-redux";
import ModifyCard from "../../components/ModifyCard";
import './blogList.scss';
import Pagination from "../../components/Pagination";

class BlogList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.goPage = this.goPage.bind(this);
        this.state = {
            current: 1
        };
    }

    componentDidMount() {
        this.props.getPostList();
    }

    clickShowPost(id) {
        this.props.history.push(`/post/${id}`);
    }

    clickRemovePost(id) {
        this.props.deleteBlog(id);
        this.props.getPostList();
    }

    clickUpdatePost({_id, title, content, summary, tags}) {
        this.props.history.push({
            pathname: `/dashboard/modify`,
            state: {id: _id, title: title, content: content, summary: summary, tags: tags}});
    }

    renderPagination(size) {
        return <Pagination initPage={1} pageSize={size} goPage={this.goPage} />;
    }

    goPage(page){
        this.setState({current: page});
        window.scrollTo(0, 0);
    }

    render () {
        const {posts} = this.props;
        // 实现分页逻辑
        const pageSize = Math.ceil(posts.length / 6 );
        const {current} = this.state;
        const begin = 6 * (current - 1);
        const end = (begin + 6) > posts.length ? posts.length : begin + 6;
        const postsData = posts.filter((v, index) => {
            return index >= begin && index < end;
        });
        return (
            <div className={'container blog-list'}>
                {
                    postsData.map((v, index) => (
                        <ModifyCard key={index} items={v}
                                    handleClickUpdatePost={(v) => this.clickUpdatePost(v)}
                                    handleClickShowPost={(v) => this.clickShowPost(v)}
                                    handleClickRemovePost={(v) => this.clickRemovePost(v)}
                        />
                    ))
                }
                {
                    this.renderPagination(pageSize)
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.listAllPost
    };
};

export default withRouter(connect(mapStateToProps, {getPostList, deleteBlog})(BlogList));

