export const setToken = (token) => {
  const user = JSON.parse(sessionStorage.getItem('user')) || {};
  user.token = token;
  sessionStorage.setItem('user', JSON.stringify(user));
};

export const getToken = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  return user?.token || null;
};

export const removeToken = () => {
  sessionStorage.removeItem('user');
};

export const getAuthHeader = () => {
  const token = getToken();
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    : {};
};