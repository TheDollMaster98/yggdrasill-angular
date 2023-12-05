// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { config } from 'src/config/config';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

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
