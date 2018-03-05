import React from 'react';
import PropTypes from 'prop-types';

import Label from '../Tag/Tag';

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
        const {avatar, postId, title, summary, label, date} = this.props;
        const cardAvatar = require(`../img/${avatar}.png`);
        return (
            <div className={'card'} id={postId}>
                <div className={'card-avatar'}>
                    <img src={cardAvatar} alt='card-avatar' style={{width: 120}}/>
                </div>
                <div className={'card-container'}>
                    <div className={'card-title'} onClick={this.showPost} >
                        <span>{title}</span>
                    </div>
                    <div className={'card-content'} onClick={this.showPost} >
                        <span>{summary}</span>
                    </div>
                    <div className={'card-info'}>
                        <div className={'card-tags'}>
                            {
                                label.split(';').map(v => (
                                    <Label label={v} />
                                ))
                            }
                        </div>
                        <div className={'card-date'}>
                            {date}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    avatar: PropTypes.string.isRequired,
    showPost: PropTypes.func,
    postId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
};

export default Card;
