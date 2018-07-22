import { queryArticleDetail, deleteArticle, publishArticle } from '../services/api';

export default {
  namespace: 'article',

  state: {
    articleDetail: {},
  },

  effects: {
    *fetchArticleDetail({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, payload);
      yield put({
        type: 'saveArticleDetail',
        payload: response,
      });
    },
    *deleteArticle({ payload }, { call }) {
      yield call(deleteArticle, payload);
    },
    *publishArticle({ payload }, { call, put }) {
      const response = yield call(publishArticle, payload);
      yield put({
        type: 'saveArticleDetail',
        payload: response,
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
