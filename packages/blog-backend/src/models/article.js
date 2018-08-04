import { message } from 'antd';
import { routerRedux } from 'dva/router';
import {
  queryArticleDetail,
  deleteArticle,
  publishArticle,
  updateArticle,
  queryAllarticle,
  queryPopulararticle,
} from '../services/api';

export default {
  namespace: 'article',

  state: {
    articleDetail: {},
    popular: [],
    list: [],
  },

  effects: {
    *fetchArticle({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, { id: payload });
      if (response.code === 0) {
        yield put({
          type: 'saveArticleDetail',
          payload: response.data,
        });
      } else if (response.code === 101) {
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error('查询文章信息失败');
      }
    },
    *deleteArticle({ payload }, { call, put }) {
      const response = yield call(deleteArticle, payload);
      if (response.code !== 0) {
        message.error('删除失败!');
      } else if (response.code === 101) {
        yield put(routerRedux.push('/user/login'));
      } else {
        const queryResponse = yield call(queryAllarticle);
        if (queryResponse.code === 0) {
          yield put({
            type: 'saveList',
            payload: Array.isArray(queryResponse.data) ? queryResponse.data : [],
          });
        } else {
          message.error('查询失败');
        }
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
      } else if (response.code === 101) {
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error('发布失败!');
      }
    },
    *updateArticle({ payload }, { call, put }) {
      const response = yield call(updateArticle, payload);
      if (response.code === 0) {
        message.success('更新成功!');
        const { id, nextPath } = payload;
        if (nextPath) {
          yield put(routerRedux.push(nextPath, { id }));
        }
      } else if (response.code === 101) {
        yield put(routerRedux.push('/user/login'));
      } else {
        message.error('更新失败!');
      }
    },
    *fetchList(_, { call, put }) {
      const response = yield call(queryAllarticle);
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
      const response = yield call(queryPopulararticle, payload);
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
          pathname: '/article/blogPublish',
        })
      );
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
