import customAxios from '../utils/customAxios';

// ***********真实接口********/
export async function queryAllArticle(params) {
  return customAxios('/blog/all', { params });
}

export async function queryAllArticleCondition(params) {
  return customAxios('/articles/condition', { params });
}

export async function queryPopulararticle(params) {
  return customAxios('/statistics/popular', { params });
}

export async function queryUserVisit(params) {
  return customAxios('/statistics/userVisit', { params });
}

export async function queryStatisticCount(params) {
  return customAxios('/statistics/statisticCount', { params });
}

export async function queryArticleDetail(params) {
  return customAxios('/blog/info', { params });
}

export async function deleteArticle(params) {
  return customAxios('/articles/delete', {
    method: 'DELETE',
    params,
  });
}

export async function publishArticle(params) {
  return customAxios('/articles/publish', {
    method: 'PUT',
    data: params,
  });
}

export async function updateArticle(params) {
  return customAxios('/articles/update', {
    method: 'PUT',
    data: params,
  });
}

export async function login(params) {
  return customAxios('/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return customAxios('/user/logout');
}
