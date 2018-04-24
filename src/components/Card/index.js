import React from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Tag from '../Tag/index';

import './card.scss';

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showPost = this.showPost.bind(this);
    }

    showPost() {
        const {articleId} = this.props;
        this.props.showPost(articleId);
    }

    handleClickTag(v) {
        this.props.clickTag(v);
    }

    render() {
        const {thumb, title, summary, tags, date, showCardInfo} = this.props;
        return (
            <ReactCSSTransitionGroup
                component={'div'}
                className={'card'}
                transitionName='card'
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
                <div className={'thumb'} onClick={this.showPost}>
                        <img src={thumb} alt={'这是一张美图'}/>
                </div>
                <div className={'card-container'}>
                    <div className={'card-title'} onClick={this.showPost} >
                        <span>{title}</span>
                    </div>
                    <div className={'card-content'} onClick={this.showPost} >
                        <span>{summary}</span>
                    </div>
                    <div className={'card-info'} style={{display: showCardInfo ? 'flex' : 'none'}}>
                        <div className={'card-tags'}>
                            {
                                tags.split(',').sort().map((v, index) => (
                                    <Tag label={v} key={index} clickTag={(v) => this.handleClickTag(v)} />
                                ))
                            }
                        </div>

                        <div className={'card-tail'}>
                            <span className={'card-date'}>{new Date(date).toDateString()}</span>
                        </div>
                    </div>
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

Card.propTypes = {
    thumb: PropTypes.string,
    showPost: PropTypes.func,
    clickTag: PropTypes.func,
    articleId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    showCardInfo: PropTypes.bool.isRequired,
    visit: PropTypes.number.isRequired,
};

export default Card;
