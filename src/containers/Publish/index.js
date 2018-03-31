import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {publishArticle} from "../../reducers/article.redux";
import ArticleForm from "../../components/ArticleForm";
import {uploadCoverImg, uploadImg} from "../../reducers/file.redux";

class Publish extends React.PureComponent {

    constructor(props) {
        super(props);
        this.publish = this.publish.bind(this);
        this.preview = this.preview.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            coverImg: '',
            visit: 0,
            tags: [],
            content: '',
            title: '',
            summary: '',
            publish: false,
            show: false,
            clickUpload: false,
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
        const {filePath} = this.props.coverFile;
        this.setState({publish: true, coverImg: filePath}, () => {
            this.props.publishBlog(this.state);
        });
    }

    save() {
        const {filePath} = this.props.coverFile;
        this.setState({publish: false, coverImg: filePath}, () => {
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

    uploadCoverImg(file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        this.props.uploadCoverImg(formData);
        this.setState({clickUpload: true});
    }

    componentWillReceiveProps() {
        if (this.state.clickUpload) {
            const {filePath} = this.props.coverFile;
            this.setState({
                coverImg:filePath
            });
        }
    }
    render() {
        const {tags, coverImg} = this.state;
        const {filePath} = this.props.file;
        const {errorMsg, successMsg} = this.props.msg;
        return (
            <ArticleForm tags={tags}
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
                         errorMsg={errorMsg}
                         successMsg={successMsg}
                         upload={(v) => this.uploadImg(v)}
                         filePath={filePath}
                         changeCoverImg={(v) => this.uploadCoverImg( v)}
                         defaultCoverImg={coverImg}
            />

        );
    }
}
const mapStateToProps = state => {
    return {
        msg: state.articlesMsg,
        file: state.imgFile,
        coverFile: state.coverImgFile
    };
};

export default withRouter(connect(mapStateToProps, {publishBlog: publishArticle, uploadImg, uploadCoverImg})(Publish));
