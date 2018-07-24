import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Button, Card } from 'antd';
import { routerRedux } from 'dva/router';
import { parse } from 'qs';
import DescriptionList from 'components/DescriptionList';
import moment from 'moment';
import { markdown } from '../../utils/markdownUtils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BlogDetail.less';

const { Description } = DescriptionList;
const ButtonGroup = Button.Group;

@connect(({ article, loading }) => ({
  article,
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
    const { id } = parse(search);
    dispatch({
      type: 'article/fetchArticle',
      payload: id,
    });
  }

  handleUpdateArticle = e => {
    const {
      dispatch,
      article: { articleDetail },
    } = this.props;
    if (e === 0) {
      dispatch({
        type: 'article/updateArticle',
        payload: { ...articleDetail, publish: true },
      });
    } else if (e === 1) {
      dispatch({
        type: 'article/updateArticle',
        payload: { ...articleDetail, publish: false },
      });
    }
  };

  render() {
    const {
      articleLoading,
      article: { articleDetail },
    } = this.props;
    const { content, date, update, tags, visit, compliment } = articleDetail;

    const action = (
      <Fragment>
        <ButtonGroup>
          <Button onClick={() => this.handleUpdateArticle(0)}>发布</Button>
          <Button onClick={() => this.handleUpdateArticle(1)}>保存为草稿</Button>
        </ButtonGroup>
      </Fragment>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="创建时间">{moment(date).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term="更新时间">{moment(update).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term="标签">{tags}</Description>
        <Description term="阅读数">{visit}</Description>
        <Description term="点赞数">{compliment}</Description>
      </DescriptionList>
    );

    return (
      <PageHeaderLayout title="Hello World" action={action} content={description}>
        <Card style={{ marginBottom: 24 }} bordered={false} loading={articleLoading}>
          <div
            className={styles.markdown}
            dangerouslySetInnerHTML={{ __html: markdown(content) }}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
