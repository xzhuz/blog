import { queryPopularArticles, queryAllArticles } from '../services/api';

export default {
  namespace: 'articles',

  state: {
    popular: [],
    all: [],
  },

  effects: {
    *fetchList(_, { call, put }) {
      const response = yield call(queryAllArticles);
      yield put({
        type: 'saveAll',
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
  },

  reducers: {
    savePopular(state, action) {
      return {
        ...state,
        popular: action.payload,
      };
    },
    saveAll(state, action) {
      return {
        ...state,
        all: action.payload,
      };
    },
  },
};
