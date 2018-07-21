import React, { PureComponent } from 'react';
import { connect } from 'dva';
import SimpleMDE from 'simplemde';

import { Form, Input, Button, Card } from 'antd';
import { markdown } from '../../utils/markdownUtils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import 'simplemde/dist/simplemde.min.css';
// import styles from './BlogPublish.less';

const FormItem = Form.Item;
const { TextArea } = Input;

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BlogPublish extends PureComponent {
  componentDidMount() {
    this.smde = new SimpleMDE({
      element: document.getElementById('content').childElementCount,
      autofocus: true,
      autosave: true,
      previewRender: plainText => markdown(plainText),
    });
    this.smde.codemirror.on('change', () => this.contentChange(this.smde.value()));
  }

  handleSubmit = e => {
    e.preventDefault();
    const { form, dispatch } = this.props;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitRegularForm',
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

  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator } = form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 0 },
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
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="发布文章">
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
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
              })(<Input placeholder="请输入文章标签" />)}
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
            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
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
