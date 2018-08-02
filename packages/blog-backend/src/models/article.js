import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { queryArticleDetail, deleteArticle, publishArticle, updateArticle } from '../services/api';

export default {
  namespace: 'article',

  state: {
    articleDetail: {},
  },

  effects: {
    *fetchArticle({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, { id: payload });
      if (response.code === 0) {
        yield put({
          type: 'saveArticleDetail',
          payload: response.data,
        });
      } else {
        message.error('查询文章信息失败');
      }
    },
    *deleteArticle({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
      if (response.code !== 0) {
        message.error('删除失败!');
      } else {
        yield put(routerRedux.push('/article/blogList'));
        message.success('删除成功!');
      }
    },
    *publishArticle({ payload }, { call, put }) {
      const response = yield call(publishArticle, payload);
      if (response.code === 0) {
        message.success('发布成功!');
        const { id } = payload;
        yield put(routerRedux.push('/article/blogDetail', { id }));
      } else {
        message.error('发布失败!');
      }
    },
    *updateArticle({ payload }, { call, put }) {
      const response = yield call(updateArticle, payload);
      if (response.code === 0) {
        message.success('更新成功!');
        const { id } = payload;
        yield put(routerRedux.push('/article/blogDetail', { id }));
      } else {
        message.error('更新失败!');
      }
    },
    *clearArticle(_, { put }) {
      yield put({
        type: 'saveArticleDetail',
        payload: {},
      });
    },
  },
  reducers: {
    saveArticleDetail(state, action) {
      return {
        ...state,
        articleDetail: action.payload,
      };
    },
  },
};
