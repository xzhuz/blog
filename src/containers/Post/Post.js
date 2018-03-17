import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import ReactMarkdown from 'react-markdown';

import './post.scss';
import {getPost} from "../../reducers/blog.redux";
import Title from "../../components/Title/Title";

class Post extends React.PureComponent {

    componentDidMount() {
        const {postId} = this.props.match.params;
        this.props.getPost(postId);
    }

    render () {
        const {title, summary, content, date} = this.props.post;
        return (
            <div className='container'>
                <div className={'blog'}>
                    <Title title={title}/>
                    <p className={'blog-date'}>{date}</p>
                    <ReactMarkdown source={content} />
                </div>
                <div className={'right-menu'}>

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {post: state.loadPost};
};

export default withRouter(connect(mapStateToProps, {getPost})(Post));
