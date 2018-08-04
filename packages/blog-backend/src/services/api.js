import customAxios from '../utils/customAxios';

// ***********真实接口********/
export async function queryAllarticle() {
  return customAxios('/articles/list');
}

export async function queryPopulararticle(params) {
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

export async function login(params) {
  return customAxios('/user/login', {
    method: 'POST',
    data: params,
  });
}

export async function logout() {
  return customAxios('/user/logout');
}
