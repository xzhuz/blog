import { routerRedux } from 'dva/router';

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
      yield put({
        type: 'saveList',
        payload: Array.isArray(response) ? response : [],
      });
    },
    *fetchPopular(_, { call, put }) {
      const response = yield call(queryPopularArticles);
      yield put({
        type: 'savePopular',
        payload: Array.isArray(response) ? response : [],
      });
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
