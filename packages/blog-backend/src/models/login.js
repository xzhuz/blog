import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { login, logout } from '../services/api';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { getPageQuery } from '../utils/utils';
import { SUCCESS_CODE } from '../utils/constants';

export default {
  namespace: 'login',

  state: {
    status: undefined,
    errorMsg: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload);
      if (response.code === SUCCESS_CODE) {
        // console.log(response);
        yield put({
          type: 'changeLoginStatus',
          payload: { ...response.data },
        });
      } else {
        yield put({
          type: 'changeLoginStatus',
          payload: { ...response, status: 'error', currentAuthority: '' },
        });
      }
      // Login successfully
      if (response.code === SUCCESS_CODE) {
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.startsWith('/#')) {
              redirect = redirect.substr(2);
            }
          } else {
            window.location.href = redirect;
            return;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },
    *logout(_, { call, put }) {
      yield call(logout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
        },
      });
      reloadAuthorized();
      yield put(
        routerRedux.push({
          pathname: '/user/login',
          search: stringify({
            redirect: window.location.href,
          }),
        })
      );
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      console.log(payload);

      setAuthority('admin');
      // setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        errorMsg: payload.msg,
      };
    },
  },
};
