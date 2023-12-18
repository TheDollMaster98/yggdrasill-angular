import { config } from 'src/config/config';

// const apiUrl = 'http://localhost:3000/'; // test locale
// const apiUrl = 'https://us-central1-yggdrasill-project.cloudfunctions.net/'; // firebase
const apiUrl = 'https://yggdrasill-server-4c5d50388301.herokuapp.com/';
export const environment = {
  production: false,
  /*
    configurazioni nascoste di firebase: src/config.ts
  */
  firebaseConfig: config.firebaseConfig,
  databaseURL: config.firebaseConfig.databaseURL,
  articles: apiUrl + 'api/articles',
  createArticle: apiUrl + 'api/createArticles', // Aggiunto l'URL per la creazione degli articoli
};
