// article.model.ts
export interface Article {
  author?: string;
  genre?: string;
  articleTitle?: string;
  articleContent?: string;
  publishDate?: string;
}

export interface ArticleList {
  articols: Record<string, Article>;
}
/**
L'interfaccia `ArticleList` definisce una struttura dati per rappresentare una lista di articoli. Ecco una breve sintesi:

- `export interface ArticleList`: Questa linea indica che stai esportando un'interfaccia chiamata `ArticleList` per renderla accessibile in altri moduli o file TypeScript.

- `articols`: È un membro di `ArticleList` e rappresenta un oggetto contenente articoli. Ogni articolo è identificato da una chiave di tipo stringa e ha un valore associato di tipo `Article`.

- `Record<string, Article>`: Questo specifica che l'oggetto `articols` deve avere chiavi di tipo stringa e i valori associati a queste chiavi devono essere di tipo `Article`.

- `Article`: Si riferisce a un'altra interfaccia o tipo che dovrebbe definire la struttura di un singolo articolo, comprese le proprietà come `articleContent`, `articleTitle`, `author`, etc.

In conclusione, `ArticleList` è un modo di rappresentare una lista di articoli, ciascuno con una struttura definita da `Article`. 
*/
