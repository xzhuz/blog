import React from 'react';
import { CSSTransition } from 'react-transition-group';
import * as FontAwesome from 'react-icons/lib/fa';

import './assests/sidebar.scss';

class SideBar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }

    componentDidMount() {
        this.setState({show: true});
    }

    componentWillUnmount() {
        this.setState({show: false});
    }
    render() {
        const avatar = require('./assests/batman.jpg');
        const {children} = this.props;
        return (
            <CSSTransition
                in={this.state.show}
                classNames="right-side-bar"
                unmountOnExit
                timeout={{ enter: 500, exit: 300 }}
                onExited={() => {this.setState({show: false});}}
            >
                <div className='right-side-bar'>
                    <section className='side-bar'>
                        <div className='bar-avatar'>
                            <img src={avatar} />
                            <h2 className='name'>Mei Sen</h2>
                            <h3 className='major'>Java Developer</h3>
                        </div>
                        <p className='bar-contact'>
                            <a className='bar-icon' href='https://github.com/mrmeisen' target='_blank'><FontAwesome.FaGithub/> <span>GitHub</span></a>
                            <a className='https://weibo.com/3002849234/profile?rightmod=1&wvr=6&mod=personinfo'
                               target='_blank'><FontAwesome.FaWeibo/> <span>WeiBo</span></a>
                        </p>
                    </section>
                    {children}
                </div>
            </CSSTransition>
        );
    }
}

export default SideBar;