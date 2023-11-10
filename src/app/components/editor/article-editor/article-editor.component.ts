import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  articleTitle: string = '';
  publishDate: string = '';
  author: string = '';
  articleContent: string = '<br>';

  resetArticle() {
    this.articleTitle = '';
    this.publishDate = '';
    this.author = '';
    this.articleContent = '';
  }

  saveArticle() {
    if (
      !this.articleTitle ||
      !this.publishDate ||
      !this.author ||
      !this.articleContent
    ) {
      // Aggiungi la logica per gestire i campi obbligatori vuoti
      console.log('Tutti i campi sono obbligatori');
      return;
    }

    // Qui dovresti inviare il contenuto dell'articolo al tuo backend per il salvataggio.
    // Esempio di salvataggio fittizio:
    console.log('Titolo:', this.articleTitle);
    console.log('Data di pubblicazione:', this.publishDate);
    console.log('Autore:', this.author);
    console.log("Contenuto dell'articolo salvato:", this.articleContent);
  }
}
