import React from 'react';
import {connect} from "react-redux";
import {updateArticle} from "../../reducers/article.redux";
import {withRouter} from "react-router-dom";
import ArticleForm from "../../components/ArticleForm";
import {uploadImg, uploadThumb} from "../../reducers/file.redux";

class ModifyBlog extends React.Component {
    constructor(props) {
        super(props);
        this.modify = this.modify.bind(this);
        this.save = this.save.bind(this);
        this.state = {
            id: '',
            tags: [],
            content: '',
            title: '',
            summary: '',
            thumb: '',
            clickUpload: false
        };
    }

    componentDidMount() {
        const {id, title, content, summary, tags, thumb} = this.props.location.state;
        this.setState({
            tags: [...tags],
            id: id,
            title: title,
            content: content,
            summary: summary,
            thumb: thumb,
            publish: false
        });
        // this.forceUpdate();
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
        const {filePath} = this.props.thumbFile;
        this.setState({publish: true, thumb: filePath ? filePath : this.state.thumb}, () => {
            this.props.updateArticle(this.state);
        });
    }


    save() {
        const {filePath} = this.props.thumbFile;
        this.setState({publish: false, thumb: filePath}, () => {
            this.props.updateArticle(this.state);
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

    componentWillReceiveProps() {
        if (this.state.clickUpload) {
            const {filePath} = this.props.thumbFile;
            this.setState({
                thumb: filePath
            });
        }
    }

    uploadThumb(file) {
        const formData = new FormData();
        formData.append('file', file, file.name);
        this.props.uploadThumb(formData);
        this.setState({
            clickUpload: true
        });
    }

    contentChange(v) {
        this.setState({content: v});
        this.shouldComponentUpdate = () => {
            return false;
        };
    }

    render() {
        const {tags, title, content, summary, thumb} = this.state;
        const {errorMsg, successMsg} = this.props.msg;
        const {filePath} = this.props.file;
        return (
            <ArticleForm tags={tags}
                         btnContent={'发布'}
                         handlePublish={this.modify}
                         handleSave={this.save}
                         titleChange={(v) => this.handleChange('title', v)}
                         summaryChange={(v) => this.handleChange('summary', v)}
                         contentChange={(v) => this.contentChange(v)}
                         tagEnter={(v) => this.handleEnter(v)}
                         closeTag={(v) => this.closeTag(v)}
                         errorMsg={errorMsg}
                         successMsg={successMsg}
                         defaultTitle={title}
                         defaultSummary={summary}
                         defaultContent={content}
                         upload={(v) => this.uploadImg(v)}
                         filePath={filePath}
                         changeThumb={(v) => this.uploadThumb(v)}
                         defaultThumb={thumb}
            />

        );
    }
}

const mapStateToProps = state => {
    return {
        msg: state.articlesMsg,
        file: state.imgFile,
        thumbFile: state.thumbFile
    };
};

export default withRouter(connect(mapStateToProps, {updateArticle, uploadImg, uploadThumb})(ModifyBlog));
