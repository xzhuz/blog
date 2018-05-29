import React from 'react';
import {withRouter} from 'react-router-dom';
import { getGitTalk } from '../../utils/commentUtils';
import 'gitalk/dist/gitalk.css';
import './comment.scss';

class Comment extends React.Component{

    componentDidMount() {
        const {pathname} = this.props.history.location;
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

export default withRouter(Comment);

