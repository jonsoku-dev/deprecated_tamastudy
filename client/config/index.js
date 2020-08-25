export const isProd = process.env.NODE_ENV === 'production';

export const baseURL = isProd ? 'http://api.tamastudy.com/api' : 'api';
export const secondURL = isProd ? 'http://api.tamastudy.com/api' : 'api';
