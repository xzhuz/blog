import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import './about.scss';

class About extends React.PureComponent{

    render() {
        const {about} = "";
        return (
            <ReactCSSTransitionGroup
                component={'div'}
                className='container about-container'
                transitionName='about'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={'about-content'}>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}


export default About;
