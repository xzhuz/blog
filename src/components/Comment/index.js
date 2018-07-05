import React from 'react';
import PropTypes from 'prop-types';

import { getGitTalk } from '../../utils/commentUtils';
import 'gitalk/dist/gitalk.css';
import './comment.scss';

class Comment extends React.Component{

    constructor(props, context) {
        super(props, context);
    }

    static contextTypes = {
        router: PropTypes.object
    };

    componentDidMount() {
        const {pathname} = this.context.router.history.location;
        const gitalk = getGitTalk(pathname);
        gitalk.render('comment');
    }

    render () {
        return (
            <div id='comment'>
            </div>
        );
    }
}

export default Comment;