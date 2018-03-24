import React from 'react';
import PropTypes from 'prop-types';

import reactRenderer from "remark-react";
import remark from "remark";

class Title extends React.PureComponent {
    render () {
        const {title} = this.props;
        const formatTitle = '## ' + title;
        return (
            <div>
                {remark().use(reactRenderer).processSync(formatTitle).contents}
            </div>
        );
    }
}

Title.propTypes = {
    title: PropTypes.string
};

export default Title;
