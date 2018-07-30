/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card } from 'antd';
import { routerRedux } from 'dva/router';
import queryString from 'query-string';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import 'simplemde/dist/simplemde.min.css';
import UpdateForm from './UpdateForm';

@connect(({ article, loading }) => ({
  article,
  fetching: loading.effects['/article/fetchArticle'],
}))
export default class BlogUpdate extends PureComponent {
  componentDidMount() {
    const { location, dispatch } = this.props;
    const { search } = location;
    if (!search) {
      dispatch(routerRedux.push('/article/blog-list'));
    }
    const { id } = queryString.parse(search);
    dispatch({
      type: 'article/fetchArticle',
      payload: id,
    });
  }

  render() {
    const {
      article: { articleDetail },
      fetching,
    } = this.props;

    const { title } = articleDetail;

    return (
      <PageHeaderLayout title="发布文章">
        <Card bordered={false} loading={fetching}>
          {!title ? '' : <UpdateForm data={articleDetail} />}
        </Card>
      </PageHeaderLayout>
    );
  }
}
