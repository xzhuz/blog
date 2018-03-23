import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
import Button from "../Button";
import remark from 'remark';
import reactRenderer from 'remark-react';

class Modal extends React.PureComponent {

    constructor(props) {
        super(props);
        this.close = this.close.bind(this);
    }

    close() {
        this.props.close();
    }

    render() {
        const {show, title, content} = this.props;
        return (
            <div style={{display: show ? 'block' : 'none'}}>
                <div className={'modal-mask'}/>
                <div className={'modal-wrap'} role={'dialog'}>
                    <div className={'modal'} role={'document'}
                         style={{width: '600px', transformOrigin: '-17.5px -16px 0px'}}>
                        <div className={'modal-content'}>
                            <button className={'modal-close'} onClick={this.close}>
                                <span className={'modal-close-x'}>X</span>
                            </button>
                            <div className={'modal-header'}>
                                <div className={'modal-title'}>{title}</div>
                            </div>
                            <div className={'modal-body'}>
                                {remark().use(reactRenderer).processSync(content).contents}
                            </div>
                            <div className={'modal-footer'}>
                                <Button describe={'关闭'} btnClick={this.close}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired
};

export default Modal;