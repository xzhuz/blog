import React from 'react';

import './notFound.scss';

class NotFound extends React.PureComponent {

    render () {
        return (
            <div className={'container not-found-container'}>
                <span className={'not-found'}> 404 </span>
                <span className={'not-found-text'}> 你来到了没有知识的荒原. </span>
            </div>
        );
    }
}

export default NotFound;
