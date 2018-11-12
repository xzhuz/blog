import React from 'react';
import PropTypes from 'prop-types';
import { SimpleImg } from 'react-simple-img';

class Img extends React.PureComponent {

    render() {
        const {src} = this.props;
        return (
            <SimpleImg {...props} src={src} />
        );
    }
}

Img.propTypes = {
    src: PropTypes.string.isRequired,
};

export default Img;
