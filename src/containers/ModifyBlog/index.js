import React from 'react';
import {connect} from "react-redux";
import {updateBlog} from "../../reducers/blog.redux";
import {withRouter} from "react-router-dom";
import AddBlog from "../../components/AddBlog";
import {uploadCoverImg, uploadImg} from "../../reducers/file.redux";

class ModifyBlog extends React.PureComponent {
    constructor(props) {
        super(props);
        this.preview = this.preview.bind(this);
        this.modify = this.modify.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            id: '',
            tags: [],
            content: '',
            title: '',
            summary: '',
            coverImg: '',
            show: false,
            clickUpload: false
        };
    }

    componentDidMount() {
        const {id, title, content, summary, tags, coverImg} = this.props.location.state;
        this.setState({
            tags: [...tags],
            id: id,
            title: title,
            content: content,
            summary: summary,
            coverImg: coverImg,
            publish: false
        });
    }

    handleChange(key, val) {
        this.setState({
            [key]: val.target.value
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

    modify() {
        const {filePath} = this.props.coverFile;
        this.setState({publish: true, coverImg: filePath}, () => {
            this.props.updateBlog(this.state);
        });
    }

    preview() {
        this.setState({show: true});
    }

    save() {
        const {filePath} = this.props.coverFile;
        this.setState({publish: false, coverImg: filePath}, () => {
            this.props.updateBlog(this.state);
        });

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
        formData.append('file', file, file.name);
        this.props.uploadImg(formData);
    }

    uploadCoverImg(file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        this.props.uploadCoverImg(formData);
        this.setState({
            clickUpload: true
        });

    }
    render() {
        const {tags, title, content, summary, show, coverImg} = this.state;
        const {errorMsg, successMsg} = this.props.msg;
        const {filePath} = this.props.file;
        const coverImgPath = (this.state.clickUpload && this.props.coverFile.filePath) ? this.props.coverFile.filePath : coverImg;
        return (
            <AddBlog tags={tags}
                     show={show}
                     btnContent={'发布'}
                     modalContent={this.state.content}
                     preview={this.preview}
                     handlePublish={this.modify}
                     handleSave={this.save}
                     titleChange={(v) => this.handleChange('title', v)}
                     summaryChange={(v) => this.handleChange('summary', v)}
                     contentChange={(v) => this.handleChange('content', v)}
                     tagEnter={(v) => this.handleEnter(v)}
                     closeTag={(v) => this.closeTag(v)}
                     modalClose={() => this.setState({show: false})}
                     errorMsg={errorMsg}
                     successMsg={successMsg}
                     defaultTitle={title}
                     defaultSummary={summary}
                     defaultContent={content}
                     upload={(v) => this.uploadImg(v)}
                     filePath={filePath}
                     changeCoverImg={(v) => this.uploadCoverImg( v)}
                     defaultCoverImg={coverImgPath}
            />

        );
    }
}

const mapStateToProps = state => {
    return {
        msg: state.blogs,
        file: state.imgFile,
        coverFile: state.coverImgFile
    };
};

export default withRouter(connect(mapStateToProps, {updateBlog, uploadImg, uploadCoverImg})(ModifyBlog));
