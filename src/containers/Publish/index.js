import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import InputItem from "../../components/InputItem";

import Button from "../../components/Button";

import {publishBlog} from "../../reducers/blog.redux";
import TopicTag from "../../components/TopicTag";
import './publish.scss';
import Modal from "../../components/Modal";

class Publish extends React.PureComponent {

    constructor(props) {
        super(props);
        this.publish = this.publish.bind(this);
        this.preview = this.preview.bind(this);
        this.state = {
            icon: 'cardicon',
            visit: 0,
            tags: [],
            content: '',
            title: '',
            summary: '',
            show: false
        };
    }

    handleChange(key, val) {
        this.setState({
            [key]: val.target.value
        });
    }

    handleTagChange(v) {
        const tag = v.target.value;
        this.setState({
            tags: tag.split(';')
        });
    }

    handleEnter(v) {
        const {tags} = this.state;
        const tag = v.target.value.trim();
        if (tag) {
            this.setState({
                tags: [...tags, tag]
            });
            v.target.value = '';
        }
    }

    publish() {
        this.props.publishBlog(this.state);
    }

    preview() {
        this.setState({show: true});
    }

    closeTag(id) {
        const {tags} = this.state;
        // 删除制定元素
        tags.splice(id, 1);
        this.setState({
            tags: [...tags]
        });
    }

    render() {
        const {tags} = this.state;
        return (
            <div className={'container publish'}>
                <div className={'publish-title publish-item'}>
                    <div>标题</div> <InputItem inputType={'text'} handleChange={(v) => this.handleChange("title", v)}/>
                </div>
                <div className={'publish-tags publish-item'}>
                    <span>标签</span>
                    <InputItem inputType={'text'}  onEnter={(v) => this.handleEnter(v)}>
                        {
                            tags.map((val, index) => (
                                <TopicTag topicName={val} id={index} tagClose={(v) => this.closeTag(v)} key={index}/>
                            ))
                        }
                    </InputItem>
                </div>
                <div className={'publish-summary publish-item'}>
                    <span>简介</span> <textarea onChange={(v) => this.handleChange("summary", v)} className={'summary-text'} />
                </div>
                <div className={'publish-content publish-item'}>
                    <span>正文</span> <textarea onChange={(v) => this.handleChange('content', v)} />
                </div>
                <div className={'publish-button'}>
                    <Button describe={'发布博客'} btnClick={this.publish} className={''}/>
                    <Button describe={'预览'} btnClick={this.preview} className={''}/>
                    <span className={'success-msg'}>{this.props.successMsg}</span>
                    <span className={'error-msg'}>{this.props.errorMsg}</span>
                </div>
                <Modal show={this.state.show} close={() => {this.setState({show: false});}} title={'预览'} contents={this.state.content} />
            </div>
        );
    }
}


export default withRouter(connect(state => state.publishBlogs, {publishBlog})(Publish));
