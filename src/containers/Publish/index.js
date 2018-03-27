import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {blogs, publishBlog} from "../../reducers/blog.redux";
import AddBlog from "../../components/AddBlog";
import {uploadImg} from "../../reducers/file.redux";

class Publish extends React.PureComponent {

    constructor(props) {
        super(props);
        this.publish = this.publish.bind(this);
        this.preview = this.preview.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            icon: 'cardicon',
            visit: 0,
            tags: [],
            content: '',
            title: '',
            summary: '',
            publish: false,
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
        this.setState({publish: true}, () => {
            this.props.publishBlog(this.state);
        });
    }

    save() {
        this.setState({publish: false}, () => {
            this.props.publishBlog(this.state);
        });
    }
    preview() {
        this.setState({show: true});
    }

    closeTag(id) {
        const {tags} = this.state;
        // 删除指定元素
        tags.splice(id, 1);
        this.setState({
            tags: [...tags]
        });
    }

    uploadImg(file) {
        const formData = new FormData();
        formData.append('file',file, file.name);
        this.props.uploadImg(formData);
    }

    render() {
        const {tags} = this.state;
        return (
            <AddBlog tags={tags}
                     show={this.state.show}
                     btnContent={'发布'}
                     modalContent={this.state.content}
                     preview={this.preview}
                     handlePublish={this.publish}
                     handleSave={this.save}
                     titleChange={(v) => this.handleChange('title', v)}
                     summaryChange={(v) => this.handleChange('summary', v)}
                     contentChange={(v) => this.handleChange('content', v)}
                     tagEnter={(v) => this.handleEnter(v)}
                     closeTag={(v) => this.closeTag(v)}
                     modalClose={() => this.setState({show: false})}
                     errorMsg={this.props.errorMsg}
                     successMsg={this.props.successMsg}
                     upload={(v) => this.uploadImg(v)}
            />

        );
    }
}

export default withRouter(connect(state => state.blogs, {publishBlog, uploadImg})(Publish));
