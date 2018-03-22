import React from 'react';
import PropTypes from 'prop-types';
import './inputItem.scss';

class InputItem extends React.PureComponent {

    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(v) {
        const {handleChange} = this.props;
        if (handleChange) {
           handleChange(v);
        }
    }

    handleKeyUp(v){
        const {onEnter} = this.props;
        if (v.keyCode === 13 && onEnter){
            onEnter(v);
        }
    }

    handleClick() {
        this.textInput.focus();
    }

    render() {
        const {inputType, holder} = this.props;
        return (
            <div className={'input-item'} onClick={this.handleClick}>
                {this.props.children}
                <input type={inputType} placeholder={holder} ref={(input) => {this.textInput = input;}}
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