import { config } from 'src/config/config';

const apiUrl = 'https://yggdrasill-server-4c5d50388301.herokuapp.com/';
export const environment = {
  production: false,
  firebaseConfig: config.firebaseConfig,
  databaseURL: config.firebaseConfig.databaseURL,
  article: apiUrl + 'api/article',
  articles: apiUrl + 'api/articles',
  createArticle: apiUrl + 'api/createArticle',
  getArticle: apiUrl + 'api/article',
};
