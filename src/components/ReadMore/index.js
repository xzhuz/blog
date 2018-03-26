import React from 'react';
import PropTypes from 'prop-types';
import './readmore.scss';

class ReadMore extends React.PureComponent{

    readMore(v) {
        this.props.handleReadMore(v);
    }
    render() {
        return (
            <div className={'read-more'}>
                <span className={'read-more-text'} onClick={(v) => this.readMore(v)}>Read More →</span>
            </div>
        );
    }
}

ReadMore.propTypes = {
    handleReadMore: PropTypes.func.isRequired,
};

export default ReadMore;