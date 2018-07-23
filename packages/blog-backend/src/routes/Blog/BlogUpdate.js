/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import SimpleMDE from 'simplemde';

import { Form, Input, Button, Card, Tag, Tooltip, Icon, Upload, message } from 'antd';
import { markdown } from '../../utils/markdownUtils';
import { toolbar } from '../../utils/simpleMarkdownIdeUtil';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import 'simplemde/dist/simplemde.min.css';

const FormItem = Form.Item;
const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

@connect(({ loading }) => ({
  submitting: loading.effects['article/updateArticle'],
}))
@Form.create()
export default class BlogUpdate extends PureComponent {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    loading: false,
    imageUrl: '',
  };

  componentDidMount() {
    const { location, dispatch } = this.props;
    const { search } = location;
    const id = search.substring(1);
    dispatch({
      type: 'article/fetchArticle',
      payload: id,
    });
    this.smde = new SimpleMDE({
      element: document.getElementById('content').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender: plainText => markdown(plainText),
      toolbar,
    });
    this.smde.codemirror.on('change', () => this.contentChange(this.smde.value()));
  }

  handleClose = removedTag => {
    const { tags } = this.state;
    const resultTags = tags.filter(tag => tag !== removedTag);
    this.setState({ tags: resultTags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue, tags } = this.state;
    let editableTags = tags;
    if (inputValue && editableTags.indexOf(inputValue) === -1) {
      editableTags = [...editableTags, inputValue];
    }
    this.setState({
      tags: editableTags,
      inputVisible: false,
      inputValue: '',
    });
    const { form } = this.props;
    form.setFieldsValue({
      tags: editableTags.join(','),
    });
  };

  saveInputRef = input => (this.input = input);

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'article/publishArticle',
          payload: values,
        });
      }
    });
  };

  contentChange = e => {
    const { form } = this.props;
    form.setFieldsValue({
      content: e,
    });
  };

  normFile = e => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        })
      );
    }
  };

  render() {
    const { submitting, form } = this.props;
    const { tags, inputVisible, inputValue, loading, imageUrl } = this.state;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 },
        md: { span: 24 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 24, offset: 0 },
      },
    };

    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <PageHeaderLayout title="发布文章">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label="文章图像">
              {getFieldDecorator('thumb')(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action="//jsonplaceholder.typicode.com/posts/"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                </Upload>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="文章标题">
              {getFieldDecorator('title', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题',
                  },
                ],
              })(<Input placeholder="请输入文章标题" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="文章简介">
              {getFieldDecorator('summary', {
                rules: [
                  {
                    required: true,
                    message: '请输入文章简介',
                  },
                ],
              })(<Input placeholder="请输入文章简介" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="文章标签">
              {getFieldDecorator('tags', {
                rules: [
                  {
                    required: true,
                    message: '请输入文章标签',
                  },
                ],
              })(
                <div>
                  {tags.map(tag => {
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                      <Tag key={tag} closable afterClose={() => this.handleClose(tag)}>
                        {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                      </Tag>
                    );
                    return isLongTag ? (
                      <Tooltip title={tag} key={tag}>
                        {tagElem}
                      </Tooltip>
                    ) : (
                      tagElem
                    );
                  })}
                  {inputVisible && (
                    <Input
                      ref={this.saveInputRef}
                      type="text"
                      size="small"
                      style={{ width: 78 }}
                      value={inputValue}
                      onChange={this.handleInputChange}
                      onBlur={this.handleInputConfirm}
                      onPressEnter={this.handleInputConfirm}
                    />
                  )}
                  {!inputVisible && (
                    <Tag
                      onClick={this.showInput}
                      style={{ background: '#fff', borderStyle: 'dashed' }}
                    >
                      <Icon type="plus" /> 新标签
                    </Tag>
                  )}
                </div>
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="文章内容">
              {getFieldDecorator('content', {
                rules: [
                  {
                    required: true,
                    message: '请输入文章内容',
                  },
                ],
              })(<TextArea style={{ minHeight: 32 }} rows={4} placeholder="请输入文章内容" />)}
            </FormItem>
            <FormItem {...formItemLayout}>
              {getFieldDecorator('upload', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload name="logo" action="/upload.do" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </FormItem>
            <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'center' }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>
              <Button style={{ marginLeft: 8 }}>保存</Button>
            </FormItem>
          </Form>
        </Card>
      </PageHeaderLayout>
    );
  }
}
