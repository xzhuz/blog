import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactMarkDown from 'react-markdown';
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
                    <ReactMarkDown source={about} escapeHtml={false}/>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}


export default About;
