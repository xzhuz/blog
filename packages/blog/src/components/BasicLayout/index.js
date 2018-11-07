import React from 'react';
import {CSSTransition} from "react-transition-group";

import './basicLayout.scss';

class BasicLayout extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showLayout: false,
        };
    }

    componentDidMount() {
        this.setState({showLayout: true});
    }

    componentWillUnmount() {
        this.setState({showLayout: false});
    }

    render () {
        return (
            <CSSTransition
                in={this.state.showLayout}
                classNames="basicLayout"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({showLayout: false});}}
            >
                <div className='container'>
                    {this.props.children}
                </div>
            </CSSTransition>
        );
    }
}

export default BasicLayout;
