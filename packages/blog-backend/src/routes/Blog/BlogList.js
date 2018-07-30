import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Button } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './BlogList.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ articles, loading }) => ({
  articles,
  articlesLoading: loading.effects['articles/fetchList'],
}))
export default class BlogList extends Component {
  state = {
    group: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/fetchList',
    });
  }

  addArticle = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/addArticle',
    });
  };

  handleDelete = id => {
    const { dispatch } = this.props;
    dispatch({
      type: 'articles/deleteArticle',
      payload: id,
    });
  };

  render() {
    const {
      articles: { list },
      articlesLoading,
    } = this.props;

    const { group } = this.state;

    const Info = ({ title, value, bordered }) => (
      <div className={styles.headerInfo}>
        <span>{title}</span>
        <p>{value}</p>
        {bordered && <em />}
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <RadioGroup
          defaultValue="0"
          onChange={e => this.setState({ group: e.target.value })}
          buttonStyle="solid"
        >
          <RadioButton value="0">全部</RadioButton>
          <RadioButton value="1">已发布</RadioButton>
          <RadioButton value="2">未发布</RadioButton>
        </RadioGroup>
      </div>
    );

    const allArticles = list;
    const publishArticles = list.filter(l => l.publish);
    const nonPublishArticles = list.filter(l => !l.publish);

    let articles = allArticles;
    if (group === '1') {
      articles = publishArticles;
    } else if (group === '2') {
      articles = nonPublishArticles;
    }

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: articles.length,
    };

    const ListContent = ({ data: { publish, date } }) => (
      <div className={styles.listContent}>
        <div className={styles.listContentItem}>
          <p>{publish}</p>
        </div>
        <div className={styles.listContentItem}>
          <span>发布时间</span>
          <p>{moment(date).format('YYYY-MM-DD HH:mm')}</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout>
        <div className={styles.standardList}>
          <Card bordered={false}>
            <Row>
              <Col sm={8} xs={24}>
                <Info title="全部文章" value={`${allArticles.length}篇`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已发布文章" value={`${publishArticles.length}篇`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="未发布文章" value={`${nonPublishArticles.length}篇`} />
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
              loading={articlesLoading}
              pagination={paginationProps}
              dataSource={articles}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Link to={{ pathname: '/article/blog-update', search: `id=${item.id}` }}>
                      编辑
                    </Link>,
                    <Button className={styles.deletBtn} onClick={() => this.handleDelete(item.id)}>
                      删除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Link to={{ pathname: '/article/blog-detail', search: `id=${item.id}` }}>
                        {item.title}
                      </Link>
                    }
                    description={item.subDescription}
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
