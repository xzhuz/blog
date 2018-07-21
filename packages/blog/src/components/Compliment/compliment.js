import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';

import './stylesheets/compliment.scss';

class Compliment extends React.PureComponent{

    constructor(props){
        super(props);
        this.state = {
            clickTimes: 0,
            // 是否点击
            click: false,
        };
    }

    handleCompliment(id) {
        if (this.state.clickTimes > 4) {
            alert('你弄痛我了，不要在点我啦!');
            return;
        }
        this.setState(state => ({clickTimes: ++state.clickTimes}));
        if (this.state.click) {
            this.setState({click: false}, () => this.props.cancelCompliment(id));
            return;
        }
        this.setState({
            click: true,
        }, () => this.props.confirmCompliment(id));
    }

    render () {
        const {compliment, origin, id} = this.props;
        return (
            <div onClick={() => this.handleCompliment(id, origin)} className={classNames('compliment', {[`clickAnimation`]: this.state.click })}>
                <a><FontAwesome.FaThumbsUp className={classNames({[`complimentAnimation`]: this.state.click })} /> 点赞</a>
                <span>{compliment === 0 ? origin : compliment}</span>
            </div>
        );
    }
}

Compliment.propTypes = {
    confirmCompliment: PropTypes.func.isRequired,
    cancelCompliment: PropTypes.func.isRequired,
    compliment: PropTypes.number.isRequired,
    origin: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};

export default Compliment;