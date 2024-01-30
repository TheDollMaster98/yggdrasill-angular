import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { ArticleService } from 'src/app/service/article.service';
import { Article, articleData } from 'src/app/models/article.model';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { AuthService } from 'src/app/service/auth.service';
import { FirestoreAPIService } from 'src/app/service/firestore-api.service';
import { StorageService } from 'src/app/service/storage.service';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  editorName = '';
  selectedFile: File | null = null;
  articleForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public articleService: ArticleService,
    public firebaseDatabaseService: FirebaseDatabaseService,
    private authService: AuthService,
    private db: FirestoreAPIService<Article>,
    private storageService: StorageService,
    private cd: ChangeDetectorRef,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.authService.getAuthName();
    this.editorName = this.authService.getAuthName();

    this.initArticleForm();

    this.articleForm.get('author')?.setValue(this.editorName);
    this.articleForm.controls['author'].setValue(this.editorName);

    // Aggiungi console.log per verificare il valore di editorName
    console.log('Editor Name:', this.editorName);
    console.log('Author Control Value:', this.authorControl.value);
  }

  private initArticleForm() {
    this.articleForm = this.formBuilder.group({
      articleTitle: ['', Validators.required],
      publishDate: ['', Validators.required],
      genre: ['', Validators.required],
      author: [{ value: this.editorName, disabled: true }, Validators.required],
      propicUrl: [null], // Imposta il valore iniziale a una stringa vuota
      file: null,
      articleContent: ['', Validators.required],
    });
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

  get propicUrlControl() {
    return this.articleForm.get('propicUrl')!;
  }

  resetArticle() {
    const controlsToReset = [
      'articleTitle',
      'genre',
      'articleContent',
      'publishDate',
      'propicUrl',
    ];
    controlsToReset.forEach((control) =>
      this.articleForm.get(control)!.reset()
    );

    this.selectedFile = null;
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

  // Metodo getFile aggiornato
  getFile(event: any): void {
    const files = event.target.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Selected File:', this.selectedFile);

      // Imposta il valore direttamente sulla proprietà 'file' del form
      this.articleForm.get('file')!.setValue(this.selectedFile);

      // Triggera il change detection per assicurarti che il valore venga aggiornato nel template
      this.cd.detectChanges();
    } else {
      console.error('File non valido o mancante.');
    }
  }

  // Modifica il metodo uploadFile() per chiamare getDownloadURL direttamente
  uploadFile(): Observable<void> {
    return new Observable((observer) => {
      const file = this.articleForm.get('file')!.value;

      if (file) {
        const path = 'articles-img';

        this.storageService.pushFileToStorage(file, path).subscribe({
          next: (percentage) => {
            console.log(`Upload progress: ${percentage}%`);
          },
          error: (error) => {
            console.error('Upload failed', error);
            observer.error(error);
          },
          complete: () => {
            const fileName = file.name;
            this.articleForm.patchValue({ propicUrl: fileName });

            console.log(
              `File is available at ${this.storageService.getDownloadUrl(
                path,
                fileName
              )}`
            );

            observer.next();
            observer.complete();
          },
        });
      } else {
        console.error('File non valido o mancante.');
      }
    });
  }
  // Metodo publishArticle aggiornato
  publishArticle1() {
    // Ottieni il nome dell'autore
    const authorName = this.authService.getAuthName();

    // Aggiungi il nome dell'autore ai dati
    const articleData = {
      ...this.articleForm.value,
      author: authorName,
    };

    // Chiamiamo le funzioni in sequenza
    this.uploadFile().subscribe({
      next: () => {
        console.log('File caricato con successo.');

        // Modifica: Salvare l'URL direttamente in propicUrl
        const fileName = this.selectedFile?.name || '';
        this.articleForm.patchValue({ propicUrl: fileName });

        // Ora possiamo pubblicare l'articolo nel database
        this.db
          .add(articleData, 'articles')
          .then(() => {
            console.log('Articolo aggiunto con successo.');
            this.resetArticle();
          })
          .catch((addError) => {
            console.error("Errore durante l'aggiunta dell'articolo:", addError);
            // Gestisci l'errore in base alle tue esigenze
          });
      },
      error: (uploadError) => {
        console.error("Errore durante l'upload del file:", uploadError);
        // Gestisci l'errore in base alle tue esigenze
      },
    });
  }
  publishArticle() {
    const authorName = this.authService.getAuthName();
    const articleData = {
      ...this.articleForm.value,
      author: authorName,
    };

    this.uploadFile().subscribe({
      next: () => {
        console.log('File caricato con successo.');

        // Remove the file field before adding to Firestore
        const { file, ...articleDataWithoutFile } = articleData;

        // Now, we can publish the article to the database
        this.db
          .add(articleDataWithoutFile, 'articles')
          .then(() => {
            console.log('Articolo aggiunto con successo.');
            this.resetArticle();
          })
          .catch((addError) => {
            console.error("Errore durante l'aggiunta dell'articolo:", addError);
            // Handle the error as needed
          });
      },
      error: (uploadError) => {
        console.error("Errore durante l'upload del file:", uploadError);
        // Handle the error as needed
      },
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
