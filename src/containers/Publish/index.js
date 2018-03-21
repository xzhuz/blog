import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import InputItem from "../../components/InputItem";

import './publish.scss';
import Button from "../../components/Button";
import {publishBlog} from "../../reducers/blog.redux";

class Publish extends React.PureComponent {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleTagChange = this.handleTagChange.bind(this);
        this.publish = this.publish.bind(this);
        this.state = {
            icon: 'cardicon',
            visit: 0,
            tags: [],
            content: '',
            title: '',
            summary: ''
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

    publish() {
        this.props.publishBlog(this.state);
    }

    render() {
        return (
            <div className={'container publish'}>
                <div className={'publish-title'}>
                    标题: <InputItem inputType={'text'} handleChange={(v) => this.handleChange("title", v)}/>
                </div>
                <div className={'publish-summary'}>
                    引言： <textarea onChange={(v) => this.handleChange("summary", v)}></textarea>
                </div>
                <div className={'publish-content'}>
                    正文： <textarea onChange={(v) => this.handleChange("content", v)}></textarea>
                </div>
                <div className={'publish-tags'}>
                    标签: <InputItem inputType={'text'} handleChange={(v) => this.handleTagChange(v)}/>
                </div>
                <div className={'publish-button'}>
                    <Button describe={'发布博客'} btnClick={this.publish} className={''}/>
                    <span className={'success-msg'}>{this.props.successMsg}</span>
                    <span className={'error-msg'}>{this.props.errorMsg}</span>
                </div>
            </div>
        );
    }
}


export default withRouter(connect(state=>state.publishBlogs, {publishBlog})(Publish));
