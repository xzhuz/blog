import React from 'react';
import './bottomout.scss';
class BottomOut extends React.PureComponent{

    render() {
        return (
            <div className={'bottom-out'}>
               <span className={'bottom-out-text'}>~触底啦，快回去吧!~</span>
            </div>
        );
    }
}

export default BottomOut;
