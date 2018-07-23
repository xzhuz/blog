import { queryArticleDetail, deleteArticle, publishArticle } from '../services/api';

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
      yield call(deleteArticle, { id: payload });
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
