export const encode = (str) => {
  return btoa(unescape(encodeURIComponent(str || '')));
};

export const decode = (str) => {
  return atob(str);
};
