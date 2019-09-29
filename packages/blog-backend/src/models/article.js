import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { SUCCESS_CODE, USER_UNAUTH } from '../utils/Constants';
import {
  queryArticleDetail,
  deleteArticle,
  publishArticle,
  updateArticle,
  queryAllArticle,
  queryPopulararticle,
  queryUserVisit,
  queryStatisticCount,
  queryAllArticleCondition,
} from '../services/api';

export default {
  namespace: 'article',

  state: {
    articleDetail: {},
    popular: [],
    list: [],
    userVisit: 0,
    articleCount: 0,
    publishCount: 0,
    nonPublishCount: 0,
  },

  effects: {
    *fetchArticle({ payload }, { call, put }) {
      const response = yield call(queryArticleDetail, { id: payload });
      if (response.code === SUCCESS_CODE) {
        yield put({
          type: 'saveArticleDetail',
          payload: response.data,
        });
      } else if (response.code === USER_UNAUTH) {
        yield put(routerRedux.push('/user/login'));
      } else if (response.msg) {
        message.error(response.msg);
      } else {
        message.error('查询文章信息失败');
      }
    },
    *deleteArticle({ payload }, { call, put }) {
      const { id, pageNum, pageSize, publish } = payload;
      const response = yield call(deleteArticle, { id });
      if (response.code !== SUCCESS_CODE) {
        message.error('删除失败!');
      } else if (response.code === USER_UNAUTH) {
        yield put(routerRedux.push('/user/login'));
      } else {
        const queryResponse = yield call(queryAllArticleCondition, { pageNum, pageSize, publish });
        if (queryResponse.code === SUCCESS_CODE) {
          const { data } = queryResponse.data;
          yield put({
            type: 'saveList',
            payload: Array.isArray(data) ? data : [],
          });
        } else if (response.msg) {
          message.error(response.msg);
        } else {
          message.error('查询失败');
        }
        yield put(routerRedux.push('/article/blogList'));
        message.success('删除成功!');
      }
    },
    *publishArticle({ payload }, { call, put }) {
      const response = yield call(publishArticle, payload);
      if (response.code === SUCCESS_CODE) {
        message.success('发布成功!');
        const { articleId } = payload;
        yield put(routerRedux.push('/article/blogDetail', { id: articleId }));
      } else if (response.code === USER_UNAUTH) {
        yield put(routerRedux.push('/user/login'));
      } else if (response.msg) {
        message.error(response.msg);
      } else {
        message.error('发布失败');
      }
    },
    *updateArticle({ payload }, { call, put }) {
      const response = yield call(updateArticle, payload);
      if (response.code === SUCCESS_CODE) {
        message.success('更新成功!');
        const { id, nextPath } = payload;
        if (nextPath) {
          yield put(routerRedux.push(nextPath, { id }));
        }
      } else if (response.code === USER_UNAUTH) {
        yield put(routerRedux.push('/user/login'));
      } else if (response.msg) {
        message.error(response.msg);
      } else {
        message.error('更新失败!');
      }
    },
    *fetchList({ payload }, { call, put }) {
      const response = yield call(queryAllArticle, payload);
      if (response.code === SUCCESS_CODE) {
        const { data } = response.data;
        yield put({
          type: 'saveList',
          payload: Array.isArray(data) ? data : [],
        });
      } else {
        message.error('查询失败');
      }
    },
    *fetchConditionList({ payload }, { call, put }) {
      const response = yield call(queryAllArticleCondition, payload);
      if (response.code === SUCCESS_CODE) {
        const { data } = response.data;
        yield put({
          type: 'saveList',
          payload: Array.isArray(data) ? data : [],
        });
      } else {
        message.error('查询失败');
      }
    },
    *fetchPopular({ payload }, { call, put }) {
      const response = yield call(queryPopulararticle, payload);
      if (response.code === SUCCESS_CODE) {
        yield put({
          type: 'savePopular',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      } else {
        message.error('查询失败');
      }
    },
    *userVisit(_, { call, put }) {
      const res = yield call(queryUserVisit);
      if (res.code === SUCCESS_CODE) {
        yield put({
          type: 'saveUserVisit',
          payload: res.data,
        });
      } else {
        message.error('获取用户访问数失败');
      }
    },
    *statisticCount(_, { call, put }) {
      const res = yield call(queryStatisticCount);
      if (res.code === SUCCESS_CODE) {
        yield put({
          type: 'saveStatisticCount',
          payload: res.data,
        });
      } else if (res.msg) {
        message.error(res.msg);
      } else {
        message.error('获取文章数失败');
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
    saveUserVisit(state, action) {
      return {
        ...state,
        userVisit: action.payload,
      };
    },
    saveStatisticCount(state, action) {
      const { articleCount, publishCount, nonPublishCount } = action.payload;
      return {
        ...state,
        articleCount,
        publishCount,
        nonPublishCount,
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
