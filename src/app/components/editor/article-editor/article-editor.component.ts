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

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  private authorName = '';
  articleForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public articleService: ArticleService,
    public firebaseDatabaseService: FirebaseDatabaseService,
    private authService: AuthService,
    private firestoreAPIService: FirestoreAPIService<Article>
  ) {}

  ngOnInit(): void {
    this.articleForm = this.formBuilder.group({
      articleTitle: ['', Validators.required],
      publishDate: ['', Validators.required],
      genre: ['', Validators.required],
      author: [{ value: this.authorName, disabled: true }, Validators.required],
      articleContent: ['', Validators.required],
    });

    // aggiornamento articoli
    this.firebaseDatabaseService.getAllArticles();
    // aggiornamento nome
    this.authService.getCurrentUserName().subscribe({
      next: (userName) => {
        console.log('User name:', userName);
        if (userName) {
          this.articleForm.get('author')?.setValue(userName);
          this.authorName = userName;
        }
      },
      error: (error) => {
        console.error('Error getting user name:', error);
      },
    });

    // Aggiornamento nome autore
    this.authService.getCurrentUserName().subscribe({
      next: (userName) => {
        console.log('User name article editor:', userName);
        if (userName) {
          this.articleForm.get('author')?.setValue(userName);
        }
      },
      error: (error) => {
        console.error('Error getting user name:', error);
      },
    });

    //push sul cloud:
    this.firestoreAPIService.setCollection('articles');
  }

  // getter:
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
    this.articleForm.reset();
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

  publishArticle1() {
    if (this.articleForm.valid) {
      this.articleService
        .createArticle(this.articleForm.value)
        .pipe(
          tap((response) => {
            console.log('Articolo salvato con successo:', response);
            this.resetArticle();
          }),
          catchError((error) => {
            console.error(
              "Errore durante il salvataggio dell'articolo:",
              error
            );
            console.error("Dettagli dell'errore:", error.error);
            return throwError(() => error);
          })
        )
        .subscribe();
    }
  }
  // TODO: ricordarsi di mettere il controllo come sopra
  // CON realtime db.
  publishArticle2() {
    console.log('Author:', this.authorControl.value);
    this.firebaseDatabaseService
      .updateArticle(this.articleForm.value)
      .subscribe({
        complete: () => {
          console.info('Articolo salvato con successo! publishArticle');
          this.resetArticle();
        },
        error: (error) => {
          console.error("Errore durante il salvataggio dell'articolo:", error);
        },
      });
  }

  // GOOGLE CLOUD:
  publishArticle() {
    console.log('Author:', this.authorControl.value);
    // Chiamata alla funzione add con newArticle popolato
    this.firestoreAPIService.add(this.articleForm.value).then(() => {
      console.log('Articolo aggiunto con successo.');
      this.resetArticle();
    });
  }

  // // Metodo per ottenere il nome utente corrente
  // getCurrentUserName(): Observable<string | null> {
  //   return this.authService.getCurrentUserName().pipe(
  //     map((userName) => {
  //       console.log('Current user name:', userName);
  //       return userName ? userName : null;
  //     }),
  //     catchError(() => {
  //       // Gestisci eventuali errori durante il recupero del nome utente
  //       return throwError(
  //         () => new Error('Error retrieving current user name.')
  //       );
  //     })
  //   );
  // }

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
