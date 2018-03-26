import React from 'react';
import PropTypes from 'prop-types';

import './addBlog.scss';
import InputItem from "../InputItem";
import Button from "../Button";
import TopicTag from "../TopicTag";
import Modal from "../Modal";

class AddBlog extends React.PureComponent {

    constructor(props) {
        super(props);
        this.publish = this.publish.bind(this);
        this.preview = this.preview.bind(this);
        this.save = this.save.bind(this);
        this.modalClose = this.modalClose.bind(this);
    }

    publish() {
        this.props.handlePublish();
    }

    preview() {
        this.props.preview();
    }

    save() {
        this.props.handleSave();
    }

    titleChange(v) {
        this.props.titleChange(v);
    }

    summaryChange(v) {
        this.props.summaryChange(v);
    }

    contentChange(v) {
        this.props.contentChange(v);
    }

    tagEnter(v) {
        this.props.tagEnter(v);
    }

    tagClose(v) {
        this.props.closeTag(v);
    }

    modalClose() {
        this.props.modalClose();
    }

    render() {
        const {tags, errorMsg, successMsg, show, modalContent, btnContent, defaultSummary, defaultContent, defaultTitle} = this.props;
        return (
            <div className={'container add-blog'}>
                <div className={'add-blog-title add-blog-item'}>
                    <div>标题</div> <InputItem inputType={'text'} handleChange={(v) => this.titleChange(v)} defaultVal={defaultTitle}/>
                </div>
                <div className={'add-blog-tags add-blog-item'}>
                    <span>标签</span>
                    <InputItem inputType={'text'}  onEnter={(v) => this.tagEnter(v)}>
                        {
                            tags.map((val, index) => (
                                <TopicTag topicName={val} id={index} tagClose={(v) => this.tagClose(v)} key={index}/>
                            ))
                        }
                    </InputItem>
                </div>
                <div className={'add-blog-summary add-blog-item'}>
                    <span>简介</span> <textarea onChange={(v) => this.summaryChange(v)} value={defaultSummary} className={'summary-text'} />
                </div>
                <div className={'add-blog-content add-blog-item'}>
                    <span>正文</span> <textarea onChange={(v) => this.contentChange( v)} value={defaultContent} />
                </div>
                <div className={'add-blog-button'}>
                    <Button describe={btnContent} btnClick={this.publish} className={''}/>
                    <Button describe={'保存'} btnClick={this.save} className={''}/>
                    <Button describe={'预览'} btnClick={this.preview} className={''}/>
                    <span className={'success-msg'}>{successMsg}</span>
                    <span className={'error-msg'}>{errorMsg}</span>
                </div>
                <Modal show={show} close={this.modalClose} title={'预览'} content={modalContent} />
            </div>
        );
    }
}

AddBlog.propTypes = {
    tags: PropTypes.array.isRequired,
    errorMsg: PropTypes.string,
    successMsg: PropTypes.string,
    defaultTitle: PropTypes.string,
    defaultSummary: PropTypes.string,
    defaultContent: PropTypes.string,
    show: PropTypes.bool.isRequired,
    btnContent: PropTypes.string.isRequired,
    modalContent: PropTypes.string,
    preview: PropTypes.func.isRequired,
    handlePublish: PropTypes.func.isRequired,
    handleSave: PropTypes.func.isRequired,
    titleChange: PropTypes.func.isRequired,
    summaryChange: PropTypes.func.isRequired,
    contentChange: PropTypes.func.isRequired,
    tagEnter: PropTypes.func.isRequired,
    closeTag: PropTypes.func.isRequired,
    modalClose: PropTypes.func.isRequired,
};

export default AddBlog;