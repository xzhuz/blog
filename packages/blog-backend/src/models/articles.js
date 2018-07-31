import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { queryPopularArticles, queryAllArticles } from '../services/api';

export default {
  namespace: 'articles',

  state: {
    popular: [],
    list: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(queryAllArticles);
      if (response.code === 0) {
        yield put({
          type: 'saveList',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      } else {
        message.error('查询失败');
      }
    },
    *fetchPopular({ payload }, { call, put }) {
      const response = yield call(queryPopularArticles, payload);
      if (response.code === 0) {
        yield put({
          type: 'savePopular',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      } else {
        message.error('查询失败');
      }
    },
    *addArticle(_, { put }) {
      yield put(
        routerRedux.push({
          pathname: '/article/blog-publish',
        })
      );
    },
  },

  reducers: {
    savePopular(state, action) {
      return {
        ...state,
        popular: action.payload,
      };
    },
    saveList(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
};
