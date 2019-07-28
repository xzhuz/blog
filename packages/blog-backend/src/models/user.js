import * as routerRedux from 'react-router-redux';
import { SUCCESS_CODE } from '../utils/constants';

import { queryCurrent } from '../services/user';

export default {
  namespace: 'user',

  state: {
    currentUser: {},
  },

  effects: {
    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      if (response.code === SUCCESS_CODE) {
        yield put({
          type: 'saveCurrentUser',
          payload: response.data,
        });
      } else {
        yield put(routerRedux.push('/user/login'));
      }
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
  },
};
