import customAxios from '../utils/customAxios';

export async function queryCurrent() {
  return customAxios('/user/currentUser');
}
