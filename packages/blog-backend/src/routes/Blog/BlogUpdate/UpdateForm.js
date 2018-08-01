/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import SimpleMDE from 'simplemde';
import { Form, Input, Button, Tag, Tooltip, Icon, Upload, message, Switch } from 'antd';

import { markdown } from '../../../utils/markdownUtils';
import { toolbar } from '../../../utils/simpleMarkdownIdeUtil';
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

@connect(({ article, loading }) => ({
  article,
  submitting: loading.effects['/article/updateArticle'],
}))
@Form.create()
export default class UpdateForm extends PureComponent {
  state = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    loading: false,
    imageUrl: '',
    fileList: [],
  };

  componentDidMount() {
    const {
      data: { content, tags },
      form,
    } = this.props;
    const tagArr = tags.split(',');
    this.setState({ tags: tagArr });
    form.setFieldsValue({ tags: tagArr });
    this.smde = new SimpleMDE({
      element: document.getElementById('content').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender: plainText => markdown(plainText),
      initialValue: content,
      toolbar,
    });
    this.smde.codemirror.on('change', () => this.contentChange(this.smde.value()));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/clearArticle',
    });
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
    const {
      form,
      handleSubmit,
      data: { id },
    } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        handleSubmit({ ...values, id });
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
    const {
      file: { response },
    } = info;
    if (response.code !== 0) {
      message.error(`上传文件失败，原因: ${response.msg}`);
    }
  };

  handleUploadPicture = info => {
    let list = info.fileList;
    // 1. 读取远程路径并显示链接
    list = list.map(file => {
      if (file.response) {
        // 组件会将 file.url 作为链接进行展示
        const name = file.response.data;
        return { ...file, name };
      }
      return file;
    });

    // 2. 按照服务器返回信息筛选成功上传的文件
    list = list.filter(file => {
      if (file.response) {
        return file.response.code === 0;
      }
      return true;
    });

    this.setState({ fileList: list });
  };

  render() {
    const {
      submitting,
      form,
      data: { title, content, summary, publish, thumb },
    } = this.props;
    const { tags, inputVisible, inputValue, loading, imageUrl, fileList } = this.state;
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

    const uploadProps = {
      headers: { 'X-Requested-With': null },
    };

    const uploadPictureProps = {
      action: '//localhost:8000/api/file/upload',
      onChange: this.handleUploadPicture,
      multiple: true,
      normalize: this.normFile,
    };

    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
        <FormItem {...formItemLayout} label="文章图像">
          {getFieldDecorator('thumb', {
            initialValue: thumb,
          })(
            <Upload
              name="file"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="//localhost:8000/api/file/upload"
              beforeUpload={beforeUpload}
              onChange={this.handleChange}
              {...uploadProps}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: 120 }} /> : uploadButton}
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
            initialValue: title,
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
            initialValue: summary,
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
                <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                  <Icon type="plus" /> 新标签
                </Tag>
              )}
            </div>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="文章是否发布">
          {getFieldDecorator('publish', {
            rules: [
              {
                required: true,
              },
            ],
            initialValue: publish,
          })(<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked={publish} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="文章内容">
          {getFieldDecorator('content', {
            rules: [
              {
                required: true,
                message: '请输入文章内容',
              },
            ],
            initialValue: content,
          })(<TextArea style={{ minHeight: 32 }} rows={4} placeholder="请输入文章内容" />)}
        </FormItem>
        <Upload name="file" {...uploadPictureProps} listType="picture" fileList={fileList}>
          <Button>
            <Icon type="upload" /> 上传图片
          </Button>
        </Upload>
        <FormItem {...submitFormLayout} style={{ marginTop: 32, textAlign: 'center' }}>
          <Button type="primary" htmlType="submit" loading={submitting}>
            提交
          </Button>
          <Button style={{ marginLeft: 8 }}>保存</Button>
        </FormItem>
      </Form>
    );
  }
}
