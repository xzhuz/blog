import React from 'react';
import {withRouter} from "react-router-dom";
import {deleteBlog, getPostList} from "../../reducers/blog.redux";
import {connect} from "react-redux";
import ModifyCard from "../../components/ModifyCard";
import './blogList.scss';

class BlogList extends React.PureComponent {

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

    render () {
        const {posts} = this.props;
        return (
            <div className={'container blog-list'}>
                {
                    posts.map((v, index) => (
                        <ModifyCard key={index} items={v}
                                    handleClickUpdatePost={(v) => this.clickUpdatePost(v)}
                                    handleClickShowPost={(v) => this.clickShowPost(v)}
                                    handleClickRemovePost={(v) => this.clickRemovePost(v)}
                        />
                    ))
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.listPost
    };
};

export default withRouter(connect(mapStateToProps, {getPostList, deleteBlog})(BlogList));

