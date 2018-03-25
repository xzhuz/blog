import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import './boardRouter.scss';

class BoardRouter extends React.PureComponent {

    handleClick(v){
        if (this.props.linkClick) {
            this.props.linkClick(v);
        }
    }

    render() {
        const {toPath, describe} = this.props;
        return (
            <Link to={toPath} className={'self-router'} onClick={(v) => this.handleClick(v)}>{describe}</Link>
        );
    }
}

BoardRouter.propTypes = {
    toPath: PropTypes.string.isRequired,
    describe: PropTypes.string.isRequired,
    linkClick: PropTypes.func,
};

export default BoardRouter;