import React from 'react';
import PropTypes from 'prop-types';

import './modal.scss';
import Button from "../Button";
import ReactMarkDown from 'react-markdown';
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
                                <ReactMarkDown source={content} escapeHtml={false}/>
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
    content: PropTypes.string
};

export default Modal;