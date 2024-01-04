import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-tutorial-cloud',
  templateUrl: './tutorial-cloud.component.html',
  styleUrls: ['./tutorial-cloud.component.scss'],
})
export class TutorialCloudComponent implements OnInit {
  articleList: Article[] = [];
  newArticle: Article = {
    author: '',
    genre: '',
    articleTitle: '',
    articleContent: '',
    publishDate: '',
  };

  articleForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private firestoreAPIService: FirestoreAPIService<Article>
  ) {
    this.articleForm = this.formBuilder.group({
      author: ['', Validators.required],
      genre: ['', Validators.required],
      articleTitle: ['', Validators.required],
      articleContent: ['', Validators.required],
      publishDate: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.firestoreAPIService.setCollection('articles');
    this.firestoreAPIService.getAll().subscribe((elementi) => {
      this.articleList = elementi;
    });
  }

  addArticle(): void {
    if (this.validateArticle()) {
      // Popola newArticle con i valori dal form
      this.newArticle = {
        author: this.articleForm.value.author,
        genre: this.articleForm.value.genre,
        articleTitle: this.articleForm.value.articleTitle,
        articleContent: this.articleForm.value.articleContent,
        publishDate: this.articleForm.value.publishDate,
      };

      // Chiamata alla funzione add con newArticle popolato
      this.firestoreAPIService.add(this.newArticle).then(() => {
        console.log('Articolo aggiunto con successo.');
        this.clearForm();
      });
    }
  }

  private validateArticle(): boolean {
    // Aggiungi la logica di validazione se necessario
    return true; // Per ora, ritorna sempre true
  }

  private clearForm(): void {
    this.newArticle = {
      author: '',
      genre: '',
      articleTitle: '',
      articleContent: '',
      publishDate: '',
    };
  }

  isFieldInvalid(field: string): boolean {
    const control = this.articleForm.get(field);
    return control ? control.invalid && control.touched : false;
  }
}
