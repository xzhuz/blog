import React, { Component } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Card, Row, Col, Select, Button, Table, Divider, Tag, Form, Input } from 'antd';
import { toChineseDate } from '../../utils/utils';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BlogList.less';

const { Option } = Select;
@connect(({ article, loading }) => ({
  article,
  articleLoading: loading.effects['article/fetchList'],
}))
@Form.create()
export default class BlogList extends Component {
  state = {
    pageNum: 0,
    pageSize: 10,
    publish: undefined,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    dispatch({
      type: 'article/fetchConditionList',
      payload: { pageNum, pageSize },
    });

    dispatch({
      type: 'article/statisticCount',
    });
  }

  onShowSizeChange = (current, pageSize) => {
    const { dispatch } = this.props;
    const { publish } = this.state;
    dispatch({
      type: 'article/fetchConditionList',
      payload: { pageNum: current, pageSize, publish },
    });
    this.setState({ pageNum: current, pageSize });
  };

  addArticle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/addArticle',
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/deleteArticle',
      payload: { id, ...this.state },
    });
  };

  handleChangeTab = e => {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    // eslint-disable-next-line radix
    const publish = e.target.value === '-1' ? undefined : Number.parseInt(e.target.value);
    this.setState({ publish });
    dispatch({
      type: 'article/fetchConditionList',
      payload: { pageNum, pageSize, publish },
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { dispatch, form } = this.props;
    const { pageNum, pageSize } = this.state;
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { title, publish } = values;
        const publishStatus = publish === '-1' || publish === '全部' ? undefined : publish;
        dispatch({
          type: 'article/fetchConditionList',
          payload: { pageNum, pageSize, publish: publishStatus, title },
        });
      }
    });
  };

  pagination(page) {
    const { pageSize, publish } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetchConditionList',
      payload: { pageNum: page, pageSize, publish },
    });
    this.setState({ pageNum: page });
  }

  render() {
    const {
      article: { list, nonPublishCount, publishCount, articleCount },
      form: { getFieldDecorator },
    } = this.props;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <Form layout="inline" onSubmit={this.handleSubmit}>
          <Form.Item label="标题">
            {getFieldDecorator('title')(<Input placeholder="文章标题" />)}
          </Form.Item>
          <Form.Item label="状态">
            {getFieldDecorator('publish', { initialValue: '全部' })(
              <Select placeholder="发布状态" style={{ width: '86px' }}>
                <Option value="-1">全部</Option>
                <Option value="1">已发布</Option>
                <Option value="0">未发布</Option>
              </Select>
            )}
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
      </div>
    );

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      onChange: page => this.pagination(page),
      onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize),
      // eslint-disable-next-line react/destructuring-assignment
      pageSize: this.state.pageSize,
      total: articleCount,
    };

    const tagColor = [
      'magenta',
      'red',
      'volcano',
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'geekblue',
      'purple',
    ];

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        render: text => <span>{text}</span>,
      },
      {
        title: '状态',
        dataIndex: 'publish',
        key: 'publish',
        render: publish => <b>{publish ? '已发布' : '未发布'}</b>,
      },
      {
        title: '标签',
        key: 'tagList',
        dataIndex: 'tagList',
        render: tagList => (
          <span>
            {tagList.map(tag => {
              const index = Math.floor(Math.random() * 10);
              const color = tagColor[index];
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: '访问',
        dataIndex: 'visit',
        key: 'visit',
      },
      {
        title: '发布时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: date => <p>{toChineseDate(date)}</p>,
      },
      {
        title: '操作',
        key: 'action',
        render: item => (
          <span>
            <Link to={{ pathname: '/article/blogDetail', search: `id=${item.articleId}` }}>
              查看
            </Link>
            <Divider type="vertical" />
            <Link to={{ pathname: '/article/blogUpdate', search: `id=${item.articleId}` }}>
              编辑
            </Link>
            <Divider type="vertical" />
            <span className={styles.deleteBtn} onClick={() => this.handleDelete(item.articleId)}>
              删除
            </span>
          </span>
        ),
      },
    ];

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="全部文章" value={`${articleCount}篇`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已发布文章" value={`${publishCount}篇`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="未发布文章" value={`${nonPublishCount}篇`} />
              </Col>
            </Row>
          </Card>

          <Card
            className={styles.listCard}
            bordered={false}
            title="文章列表"
            style={{ marginTop: 24 }}
            bodyStyle={{ padding: '0 32px 40px 32px' }}
            extra={extraContent}
          >
            <Button
              type="primary"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.addArticle}
            >
              发布新文章
            </Button>

            <Table pagination={paginationProps} columns={columns} dataSource={list} />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
