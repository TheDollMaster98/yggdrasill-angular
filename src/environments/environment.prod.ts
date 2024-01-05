import { config } from 'src/config/config';

const apiUrl = 'https://yggdrasill-server-4c5d50388301.herokuapp.com/';
export const environment = {
  production: true,
  firebaseConfig: config.firebaseConfig,
  useEmulator: true,
  emulatorConfig: {
    host: 'localhost',
    port: 4000,
    ssl: false,
  },
  databaseURL: config.firebaseConfig.databaseURL,
  article: apiUrl + 'api/article',
  articles: apiUrl + 'api/articles',
  createArticle: apiUrl + 'api/createArticle',
  getArticle: apiUrl + 'api/article',
};
