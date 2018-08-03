// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  // return localStorage.getItem('blog-authority') || ['admin', 'user'];
  return localStorage.getItem('blog-authority');
}

export function setAuthority(authority) {
  return localStorage.setItem('blog-authority', authority);
}
