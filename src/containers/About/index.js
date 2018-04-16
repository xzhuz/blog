import React from 'react';
import {connect} from 'react-redux';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactMarkDown from 'react-markdown';
import NProgress from 'nprogress';
import './about.scss';
import {getAboutMe} from "../../reducers/about.redux";

class About extends React.PureComponent{

    componentDidMount() {
        NProgress.start();
        this.props.getAboutMe();
    }
    componentDidUpdate() {
        NProgress.done();
    }
    render() {
        const {about} = this.props.aboutMe;
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

const mapStateToProps = (state) => {
  return {
      aboutMe: state.aboutMe,
  };
};

export default connect(mapStateToProps, {getAboutMe})(About);
