import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  articleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      articleTitle: ['', Validators.required],
      publishDate: ['', Validators.required],
      genre: ['', Validators.required],
      author: ['', Validators.required],
      articleContent: ['', Validators.required],
    });
  }

  resetArticle() {
    this.articleForm.reset();
  }

  saveArticle() {
    if (this.articleForm.valid) {
      // Qui dovresti inviare il contenuto dell'articolo al tuo backend per il salvataggio.
      // Esempio di salvataggio fittizio:
      console.log('Articolo salvato:', this.articleForm.value);
    } else {
      // Aggiungi la logica per gestire i campi obbligatori vuoti
      console.log('Compila tutti i campi obbligatori.');
    }
  }
}
