import React from 'react';
import {connect} from "react-redux";
import {updateBlog} from "../../reducers/blog.redux";
import {withRouter} from "react-router-dom";
import AddBlog from "../../components/AddBlog";

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
            show: false
        };
    }

    componentDidMount() {
        const {id, title, content, summary, tags} = this.props.location.state;
        this.setState({
            tags: [...tags],
            id: id,
            title: title,
            content: content,
            summary: summary,
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
        this.setState({publish: true}, () => {
            this.props.updateBlog(this.state);
        });
    }

    preview() {
        this.setState({show: true});
    }

    save() {
        this.setState({publish: false}, () => {
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

    render() {
        const {tags, title, content, summary, show} = this.state;
        const {errorMsg, successMsg} = this.props.msg;
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
            />

        );
    }
}

const mapStateToProps = state => {
    return {
        msg: state.blogs
    };
};

export default withRouter(connect(mapStateToProps, {updateBlog})(ModifyBlog));
