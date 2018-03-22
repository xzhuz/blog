import React from 'react';
import PropTypes from 'prop-types';
import './inputItem.scss';

class InputItem extends React.PureComponent {


    handleChange(v) {
        if (this.props.handleChange) {
            this.props.handleChange(v);
        }
    }

    handleKeyUp(v){
        if (v.keyCode === 13 && this.props.onEnter){
            this.props.onEnter(v);
        }
    }

    render() {
        const {inputType, holder} = this.props;
        return (
            <div className={'input-item'}>
                {this.props.children}
                <input type={inputType} placeholder={holder}
                       onChange={(v) => this.handleChange(v)}
                       onKeyUp={(v) => this.handleKeyUp(v)}
                />
            </div>

        );
    }
}

InputItem.propTypes = {
    inputType: PropTypes.string.isRequired,
    holder: PropTypes.string,
    handleChange: PropTypes.func,
    onEnter: PropTypes.func
};

export default InputItem;