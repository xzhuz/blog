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
        const {icon, postId, title, content, tags, date} = this.props;

        const cardIcon = require(`../../img/${icon}.png`);
        return (
            <div className={'card'} id={postId}>
                <div className={'card-icon'}>
                    <div style={{backgroundImage: `url(${cardIcon})`}} />
                    <img src={cardIcon} alt='card-icon' style={{width: 120}}/>
                </div>
                <div className={'card-container'}>
                    <div className={'card-title'} onClick={this.showPost} >
                        <span>{title}</span>
                    </div>
                    <div className={'card-content'} onClick={this.showPost} >
                        <span>{content}</span>
                    </div>
                    <div className={'card-info'}>
                        <div className={'card-tags'}>
                            {
                                tags.map((v, index) => (
                                    <Label label={v} key={index} />
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
    icon: PropTypes.string.isRequired,
    showPost: PropTypes.func,
    postId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    date: PropTypes.string.isRequired,
};

export default Card;
