import React from 'react';

class Post extends React.PureComponent {
    render () {
        const {postId} = this.props.match.params;
        return (
            <div className='container'>
                {postId}
            </div>
        );
    }
}

export default Post;