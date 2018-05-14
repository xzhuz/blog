import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import './info.scss';

class Info extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state = {showInfo: false};
    }

    componentDidMount() {
        this.setState({showInfo: true});
    }

    componentWillUnmount() {
        this.setState({showInfo: false});
    }
    render () {
        const {icon, info} = this.props;
        return (
            <CSSTransition
                in={this.state.showInfo}
                classNames="info"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showInfo: false});}}
            >
                <span className='info'>
                    <span className={'icon'}>{icon}</span>
                    <span className={'text'}>{info}</span>
                </span>
            </CSSTransition>
        );
    }
}

Info.propTypes = {
    icon: PropTypes.node.isRequired,
    info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export default Info;
