export const setToken = (token) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  user.token = token;
  localStorage.setItem('user', JSON.stringify(user));
};

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token || null;
};

export const removeToken = () => {
  localStorage.removeItem('user');
};

export const getAuthHeader = () => {
  const token = getToken();
  return token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};
};