import { stringify } from 'qs';
import request from '../utils/request';
import customAxios from '../utils/customAxios';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

// ***********真实接口********/
export async function queryAllArticles() {
  return customAxios('/articles/list');
}

export async function queryPopularArticles(params) {
  return customAxios('/articles/popular', { params });
}

export async function queryArticleDetail(params) {
  return customAxios('/articles/info', { params });
}

export async function deleteArticle(params) {
  return customAxios('/articles/delete', { params });
}

export async function publishArticle(params) {
  return customAxios('/articles/publish', {
    method: 'POST',
    data: params,
  });
}

export async function updateArticle(params) {
  return customAxios('/articles/update', {
    method: 'POST',
    data: params,
  });
}
