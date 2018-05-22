import React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import classnames from 'classnames';
import * as FontAwesome from 'react-icons/lib/fa';
import {doConfirmCompliment, doCancelCompliment} from "../../reducers/article.redux";
import './compliment.scss';
import Button from "../../components/Button";

class Compliment extends React.Component{

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
            this.setState({click: false}, () => this.props.doCancelCompliment(id));
            return;
        }
        this.setState({
            click: true,
        }, () => this.props.doConfirmCompliment(id));
    }

    render () {
        const {compliment, origin, id} = this.props;
        return (
            <div onClick={() => this.handleCompliment(id, origin)} className={classnames('compliment', {[`clickAnimation`]: this.state.click })}>
                <a><FontAwesome.FaThumbsUp className={classnames({[`complimentAnimation`]: this.state.click })} /> 点赞</a>
                <span>{compliment === 0 ? origin : compliment}</span>
            </div>
        );
    }
}

Compliment.propTypes = {
    origin: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
};

const mapStateToProps = state => {
    return {
        compliment: state.compliment,
    };
};

export default connect(mapStateToProps, {doConfirmCompliment, doCancelCompliment})(Compliment);