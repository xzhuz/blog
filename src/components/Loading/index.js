import React from 'react';
import './loading.scss';

class Loading extends React.Component{

    render () {
        const index = Math.floor(Math.random() * 6 + 1);
        return (
            <div className={`loader${index} loader`}>
                <div className={`loader-${index}`}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Loading;
