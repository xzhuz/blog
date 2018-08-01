/* eslint-disable react/no-danger */
import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Radio } from 'antd';
import queryString from 'query-string';
import moment from 'moment';
import { routerRedux } from 'dva/router';
import DescriptionList from 'components/DescriptionList';
import { markdown } from '../../utils/markdownUtils';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BlogDetail.less';

const { Description } = DescriptionList;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@connect(({ article, loading }) => ({
  article,
  articleLoading: loading.effects['article/fetchArticle'],
}))
export default class BlogDetail extends Component {
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { search } = location;
    if (!search) {
      dispatch(routerRedux.push('/articles/blog-list'));
    } else {
      const { id } = queryString.parse(search);
      dispatch({
        type: 'article/fetchArticle',
        payload: id,
      });
    }
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
    const { content, date, update, tags, visit, compliment, publish } = articleDetail;

    const action = (
      <Fragment>
        <RadioGroup
          defaultValue={publish ? '0' : '1'}
          onChange={e => this.handleUpdateArticle({ group: e.target.value })}
          buttonStyle="solid"
        >
          <RadioButton value="0">发布</RadioButton>
          <RadioButton value="1">保存为草稿</RadioButton>
        </RadioGroup>
      </Fragment>
    );

    const description = (
      <DescriptionList className={styles.headerList} size="small" col="2">
        <Description term="创建时间">{moment(date).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term="更新时间">{moment(update).format('YYYY-MM-DD HH:mm:ss')}</Description>
        <Description term="标签">{tags}</Description>
        <Description term="阅读数">{visit}</Description>
        <Description term="点赞数">{compliment}</Description>
        <Description term="是否发布">{publish ? '是' : '否'}</Description>
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
