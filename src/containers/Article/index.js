import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import './article.scss';
import {getSpecifiedArticle} from "../../reducers/article.redux";
import Title from "../../components/Title/Title";
import ReactMarkDown from 'react-markdown';

class Article extends React.PureComponent {

    componentWillMount() {
        const {articleId} = this.props.match.params;
        this.props.getSpecifiedArticle(articleId);
    }

    render () {
        const {title, content, date} = this.props.article;
        return (
            <div className='container'>
                <div className={'article'}>
                    <Title title={title}/>
                    <p className={'article-date'}>{new Date(date).toDateString()}</p>
                    <ReactMarkDown source={content} escapeHtml={false}/>
                </div>
                <div className={'right-menu'}>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {article: state.loadArticle};
};

export default withRouter(connect(mapStateToProps, {getSpecifiedArticle})(Article));
