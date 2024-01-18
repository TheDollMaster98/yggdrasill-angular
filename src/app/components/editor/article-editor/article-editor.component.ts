import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/models/article.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  editorName = '';
  articleForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public articleService: ArticleService,
    public firebaseDatabaseService: FirebaseDatabaseService,
    private authService: AuthService,
    private db: FirestoreAPIService<Article>,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthName();
    this.editorName = this.authService.getAuthName();

    this.articleForm = this.formBuilder.group({
      articleTitle: ['', Validators.required],
      publishDate: ['', Validators.required],
      genre: ['', Validators.required],
      author: [{ value: this.editorName, disabled: true }, Validators.required],
      // author: [this.editorName, Validators.required],
      articleContent: ['', Validators.required],
    });

    this.articleForm.get('author')?.setValue(this.editorName);
    this.articleForm.controls['author'].setValue(this.editorName);
  }

  get articleTitleControl() {
    return this.articleForm.get('articleTitle')!;
  }

  get publishDateControl() {
    return this.articleForm.get('publishDate')!;
  }

  get authorControl() {
    return this.articleForm.get('author')!;
  }

  get genreControl() {
    return this.articleForm.get('genre')!;
  }

  get articleContentControl() {
    return this.articleForm.get('articleContent')!;
  }

  resetArticle() {
    this.articleForm.controls['articleTitle'].reset();
    this.articleForm.controls['genre'].reset();
    this.articleForm.controls['articleContent'].reset();
    this.articleForm.controls['publishDate'].reset();
  }

  previewArticle() {
    if (this.articleForm.valid) {
      this.articleService.setTemporaryArticle(this.articleForm.value);

      const modalRef = this.modalService.open(ArticlePreviewComponent, {
        size: 'lg',
      });

      modalRef.componentInstance.articleTitle = this.articleTitleControl.value;
      modalRef.componentInstance.publishDate = this.publishDateControl.value;
      modalRef.componentInstance.author = this.authorControl.value;
      modalRef.componentInstance.genre = this.genreControl.value;
      modalRef.componentInstance.articleContent =
        this.articleContentControl.value;
      modalRef.componentInstance.isTemporary = true;
    }
  }
  // TODO: controllare qui
  uploadFile(event: any): void {
    const file = event.target.files[0];
    const path = 'articles-img';

    if (file) {
      this.storageService.pushFileToStorage(file, path).subscribe({
        next: (percentage) => {
          console.log(`Upload progress: ${percentage}%`);
        },
        error: (error) => {
          console.error('Upload failed', error);
        },
      });
    }
  }

  publishArticle() {
    // Ottieni il nome dell'autore
    const authorName = this.authService.getAuthName();

    // Aggiungi il nome dell'autore ai dati
    const articleData = {
      ...this.articleForm.value,
      author: authorName,
    };

    // Chiamata alla funzione add con newArticle popolato
    this.db.add(articleData, 'articles').then(() => {
      console.log('Articolo aggiunto con successo.');
      this.resetArticle();
    });
  }

  generateUniqueId(): string {
    const timestamp = new Date().getTime().toString();
    const randomPart = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return timestamp + randomPart;
  }

  confirmExitWithoutSaving() {
    const confirmExit = confirm(
      'Sei sicuro di voler uscire senza salvare? I dati verranno persi.'
    );
    if (confirmExit) {
      // Puoi navigare via o eseguire altre azioni necessarie
    }
  }
}
