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
      yield put({
        type: 'saveArticleDetail',
        payload: response,
      });
    },
    *deleteArticle({ payload }, { call }) {
      const response = yield call(deleteArticle, { id: payload });
      if (response.code) {
        message.error('删除失败!');
      } else {
        message.success('删除成功!');
      }
    },
    *publishArticle({ payload }, { call, put }) {
      const response = yield call(publishArticle, payload);
      if (response.code) {
        message.error('发布失败!');
      } else {
        message.success('发布成功!');
        const { id } = payload;
        yield put(routerRedux.push('/article/blog-detail', { id }));
      }
    },
    *updateArticle({ payload }, { call }) {
      const response = yield call(updateArticle, payload);
      if (response.code) {
        message.error('更新失败!');
      } else {
        message.success('更新成功!');
      }
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
