import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import './post.scss';
import {getPost} from "../../reducers/blog.redux";

class Post extends React.PureComponent {

    componentDidMount() {
        const {postId} = this.props.match.params;
        this.props.getPost(postId);
    }

    render () {
        const {content} = this.props.post;
        return (
            <div className='container'>
                <ReactMarkdown source={content} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {post: state.loadPost};
};

export default withRouter(connect(mapStateToProps, {getPost})(Post));
