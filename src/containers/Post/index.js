import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './post.scss';
import {getPost} from "../../reducers/blog.redux";
import Title from "../../components/Title/Title";
import reactRenderer from "remark-react";
import remark from "remark";

class Post extends React.PureComponent {

    componentDidMount() {
        const {postId} = this.props.match.params;
        this.props.getPost(postId);
    }

    render () {
        const {title, content, date} = this.props.post;
        return (
            <div className='container'>
                <div className={'blog'}>
                    <Title title={title}/>
                    <p className={'blog-date'}>{new Date(date).toDateString()}</p>
                    {remark().use(reactRenderer).processSync(content).contents}
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
