import React from 'react';
import PropTypes from 'prop-types';

import ReactMarkDown from 'react-markdown';

class Title extends React.PureComponent {
    render () {
        const {title} = this.props;
        const formatTitle = '## ' + title;
        return (
            <div>
                <ReactMarkDown source={formatTitle}/>
            </div>
        );
    }
}

Title.propTypes = {
    title: PropTypes.string
};

export default Title;
