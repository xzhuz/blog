import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card } from 'antd';
import { routerRedux } from 'dva/router';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BlogDetail.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

const action = (
  <Fragment>
    <ButtonGroup>
      <Button>发布</Button>
      <Button>保存为草稿</Button>
    </ButtonGroup>
  </Fragment>
);

const description = (
  <DescriptionList className={styles.headerList} size="small" col="2">
    <Description term="创建时间">2017-07-07</Description>
    <Description term="更新时间">2017-08-08</Description>
    <Description term="标签">服务</Description>
    <Description term="阅读数">22</Description>
    <Description term="点赞数">33</Description>
  </DescriptionList>
);

@connect(({ profile, loading }) => ({
  profile,
  articleLoading: loading.effects['article/fetchArticle'],
}))
export default class BlogDetail extends Component {
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { search } = location;
    if (search) {
      routerRedux.push({
        pathname: '/article/blog-list',
      });
    }
    const id = search.substring(1);
    dispatch({
      type: 'article/fetchArticle',
      payload: id,
    });
  }

  render() {
    const { articleLoading } = this.props;

    return (
      <PageHeaderLayout title="。。。" action={action} content={description}>
        <Card style={{ marginBottom: 24 }} bordered={false} loading={articleLoading} />
      </PageHeaderLayout>
    );
  }
}
