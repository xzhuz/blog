import React from 'react';
import PropTypes from 'prop-types';
import './topicTag.scss';

class TopicTag extends React.PureComponent {

    constructor(props) {
        super(props);
        this.closeTag = this.closeTag.bind(this);
    }

    closeTag(id) {
        this.props.tagClose(id);
    }

    render() {
        const {topicName, id} = this.props;
        return (
            <div className={'topic-tag'}>
                <span className={'topic-tag-name'}>{topicName}</span>
                <button onClick={() => this.closeTag(id)} className={'topic-button'}>x</button>
            </div>
        );
    }
}

TopicTag.propTypes = {
    topicName: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    tagClose: PropTypes.func.isRequired
};

export default TopicTag;