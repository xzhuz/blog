import React from 'react';
import PropTypes from 'prop-types';
import './button.scss';

class Button extends React.PureComponent {

    handleClick(v) {
        this.props.btnClick(v);
    }

    render() {
        const {describe} = this.props;
        return (
            <button onClick={(v) => this.handleClick(v)} className={'default-btn'}>{describe}</button>
        );
    }
}

Button.propTypes = {
    describe: PropTypes.string.isRequired,
    btnClick: PropTypes.func.isRequired
};

export default Button;