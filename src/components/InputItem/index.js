import React from 'react';
import PropTypes from 'prop-types';
import './inputItem.scss';

class InputItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(v) {
        this.props.handleChange(v);
    }

    render() {
        const {inputType, holder} = this.props;
        return (
            <div className={'input-item'}>
                <input type={inputType} placeholder={holder}
                       onChange={(v) => this.handleChange(v)}
                />
            </div>

        );
    }
}

InputItem.propTypes = {
    inputType: PropTypes.string.isRequired,
    holder: PropTypes.string,
    handleChange: PropTypes.func
};

export default InputItem;