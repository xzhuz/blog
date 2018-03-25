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

    renderBoardRouter({toPath, describe}) {
        if (toPath) {
            return (<Link to={toPath} className={'self-router'} onClick={(v) => this.handleClick(v)}>{describe}</Link>);
        }
        return (
            <span className={'self-router'}>{describe}</span>
        );
    }


    render() {
        return (
            <div>
                {
                    this.renderBoardRouter(this.props)
                }
            </div>
        );
    }
}

BoardRouter.propTypes = {
    toPath: PropTypes.string,
    describe: PropTypes.string.isRequired,
    linkClick: PropTypes.func,
};

export default BoardRouter;