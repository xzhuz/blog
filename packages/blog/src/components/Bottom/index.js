import React from 'react';
import './bottom.scss';

class Bottom extends React.PureComponent{

    render() {
        return (
            <div className='bottom-out'>
                <span className='bottom-out-text'>没有文章可以加载啦</span>
            </div>
        );
    }
}

export default Bottom;