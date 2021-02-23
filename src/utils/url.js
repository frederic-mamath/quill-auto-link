export const normalize = (url) => {
  if (url.startsWith("http")) {
    return url;
  }

  return `https://${url}`;
};
