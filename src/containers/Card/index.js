import React from 'react';
import PropTypes from 'prop-types';

import Label from '../../components/Tag';

import './card.scss';

class Card extends React.PureComponent {
    constructor(props) {
        super(props);
        this.showPost = this.showPost.bind(this);
    }

    showPost() {
        const {postId} = this.props;
        this.props.showPost(postId);
    }

    render() {
        const {coverImg, postId, title, summary, tags, date, showCardInfo} = this.props;
        return (
            <div className={'card'} id={postId}>
                <div className={'card-coverImg'}>
                    <img src={coverImg} alt='card-coverImg'/>
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
                                tags.sort().map((v, index) => (
                                    <Label label={v} key={index} />
                                ))
                            }
                        </div>
                        <div className={'card-date'}>
                            {new Date(date).toDateString()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    coverImg: PropTypes.string.isRequired,
    showPost: PropTypes.func,
    postId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
    showCardInfo: PropTypes.bool.isRequired
};

export default Card;
