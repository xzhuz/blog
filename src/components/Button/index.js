import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './button.scss';

class Button extends React.PureComponent {

    handleClick(v) {
        this.props.btnClick(v);
    }

    render() {
        const {describe, className} = this.props;
        return (
            <button onClick={(v) => this.handleClick(v)} className={classNames('default-btn', className)}>{describe}</button>
        );
    }
}

Button.propTypes = {
    describe: PropTypes.string.isRequired,
    btnClick: PropTypes.func.isRequired,
    className: PropTypes.string,
};

export default Button;
