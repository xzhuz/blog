import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as FontAwesome from 'react-icons/fa';

import './stylesheets/compliment.scss';

class Compliment extends React.PureComponent{

    constructor(props) {
        super(props);
        this.state = {
            compliment: 0,
            click: false,
        };
    }

    componentDidMount() {
        const { compliment } = this.props;
        this.setState({compliment});
    }

    handleCompliment(id, compliment) {
        if (!this.state.click) {
            this.setState({
                compliment: compliment + 1,
                click: true,
            }, () => this.props.confirmCompliment(id, compliment + 1));
        }
    }

    render () {
        const {id} = this.props;
        const { compliment, click } =this.state;
        return (
            <div onClick={() => this.handleCompliment(id, compliment)} className={classNames('compliment', {[`clickAnimation`]: click })}>
                <a><FontAwesome.FaThumbsUp className={classNames({[`complimentAnimation`]: click })} /> 点赞</a>
                <span>{compliment}</span>
            </div>
        );
    }
}

Compliment.propTypes = {
    confirmCompliment: PropTypes.func.isRequired,
    compliment: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};

export default Compliment;