import React from 'react';

import ReactMarkdown from 'react-markdown';

import './post.scss';

class Post extends React.PureComponent {
    render () {
        const {postId} = this.props.match.params;
        const content = '# Header\n' + postId;
        return (
            <div className='container'>
                <ReactMarkdown source={content} />
            </div>
        );
    }
}

export default Post;