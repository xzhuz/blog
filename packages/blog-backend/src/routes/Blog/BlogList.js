import React, { Component } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Button } from 'antd';
import { formatDate } from '../../utils/utils';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BlogList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ article, loading }) => ({
  article,
  articleLoading: loading.effects['article/fetchList'],
}))
export default class BlogList extends Component {
  state = {
    pageNum: 0,
    pageSize: 10,
    publish: null,
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

  handleChangeTab(e) {
    const { dispatch } = this.props;
    const { pageNum, pageSize } = this.state;
    // eslint-disable-next-line radix
    const publish = e.target.value === '-1' ? null : Number.parseInt(e.target.value);
    this.setState({ publish });
    dispatch({
      type: 'article/fetchConditionList',
      payload: { pageNum, pageSize, publish },
    });
  }

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
      articleLoading,
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
        <RadioGroup defaultValue="-1" onChange={e => this.handleChangeTab(e)} buttonStyle="solid">
          <RadioButton value="-1">全部</RadioButton>
          <RadioButton value="1">已发布</RadioButton>
          <RadioButton value="0">未发布</RadioButton>
        </RadioGroup>
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

    const ListContent = ({ data: { createTime } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <span>发布时间</span>
          <p>{formatDate(createTime)}</p>
        </div>
      </div>
    );

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
              type="dashed"
              style={{ width: '100%', marginBottom: 8 }}
              icon="plus"
              onClick={this.addArticle}
            >
              添加
            </Button>
            <List
              size="large"
              rowKey="id"
              loading={articleLoading}
              pagination={paginationProps}
              dataSource={list}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Link to={{ pathname: '/article/blogUpdate', search: `id=${item.articleId}` }}>
                      编辑
                    </Link>,
                    <Button
                      className={styles.deleteBtn}
                      onClick={() => this.handleDelete(item.articleId)}
                    >
                      删除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Link
                        to={{ pathname: '/article/blogDetail', search: `id=${item.articleId}` }}
                      >
                        {item.title}
                      </Link>
                    }
                  />
                  <ListContent data={item} />
                </List.Item>
              )}
            />
          </Card>
        </div>
      </PageHeaderLayout>
    );
  }
}
