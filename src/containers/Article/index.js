import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './article.scss';
import ReactMarkDown from 'react-markdown';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {getSpecifiedArticle} from "../../reducers/article.redux";
import Title from "../../components/Title/Title";

class Article extends React.PureComponent {

    componentWillMount() {
        const {articleId} = this.props.match.params;
        this.props.getSpecifiedArticle(articleId);
    }

    render () {
        const {title, content, date} = this.props.article;
        let menu = [];
        if (content) {
            menu = content.split('\n').filter((v) => {
                return v.trim().startsWith('#');
            });
        }
        return (
            <ReactCSSTransitionGroup
                component={'div'}
                className='container'
                transitionName='article'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={'article'}>
                    <Title title={title}/>
                    <p className={'article-date'}>{new Date(date).toDateString()}</p>
                    <ReactMarkDown source={content} escapeHtml={false}/>
                </div>
                <div className={'right-side-bar'}>

                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

const mapStateToProps = state => {
    return {article: state.articleLoad};
};

export default withRouter(connect(mapStateToProps, {getSpecifiedArticle})(Article));
