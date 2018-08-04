import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { List, Card, Row, Col, Radio, Button } from 'antd';

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
    group: 0,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'article/fetchList',
    });
  }

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
      payload: { id },
    });
  };

  render() {
    const {
      article: { list },
      articleLoading,
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

    const allarticle = list;
    const publisharticle = list.filter(l => l.publish);
    const nonPublisharticle = list.filter(l => !l.publish);

    let article = allarticle;
    if (group === '1') {
      article = publisharticle;
    } else if (group === '2') {
      article = nonPublisharticle;
    }

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      pageSize: 5,
      total: article.length,
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
                <Info title="全部文章" value={`${allarticle.length}篇`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="已发布文章" value={`${publisharticle.length}篇`} bordered />
              </Col>
              <Col sm={8} xs={24}>
                <Info title="未发布文章" value={`${nonPublisharticle.length}篇`} />
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
              dataSource={article}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Link to={{ pathname: '/article/blogUpdate', search: `id=${item.id}` }}>
                      编辑
                    </Link>,
                    <Button className={styles.deleteBtn} onClick={() => this.handleDelete(item.id)}>
                      删除
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <Link to={{ pathname: '/article/blogDetail', search: `id=${item.id}` }}>
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
