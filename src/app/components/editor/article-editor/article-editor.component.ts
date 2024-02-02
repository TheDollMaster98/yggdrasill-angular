import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { ArticleService } from 'src/app/service/article.service';
import { Article, articleData } from 'src/app/models/article.model';
import { Observable, Subscription } from 'rxjs';
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
export class ArticleEditorPage implements OnInit, OnDestroy {
  editorName: string | null = null;
  selectedFile: File | null = null;
  articleForm!: FormGroup;
  private authNameSubscription: Subscription | null = null;

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
    // Recupero del nome di chi ha effettuato l'accesso
    this.authNameSubscription = this.authService.getAuthName().subscribe({
      next: (authName) => {
        this.editorName = authName;
        this.initArticleForm(); // Inizializza il form dopo aver ottenuto il nome dell'editore
        console.log('Editor Name:', this.editorName);
        console.log('Author Control Value:', this.authorControl.value);
      },
      error: (error) => {
        console.error('Errore durante il recupero del nome utente:', error);
      },
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe per evitare memory leaks
    if (this.authNameSubscription) {
      this.authNameSubscription.unsubscribe();
    }
  }

  private initArticleForm() {
    this.articleForm = this.formBuilder.group({
      articleTitle: ['', Validators.required],
      publishDate: ['', Validators.required],
      genre: ['', Validators.required],
      author: [{ value: this.editorName, disabled: true }, Validators.required],
      propicUrl: [null],
      file: null,
      articleContent: ['', Validators.required],
    });

    // Aggiungi un controllo per assicurarti che articleForm sia definito
    if (this.articleForm) {
      this.articleForm.get('author')!.setValue(this.editorName);
    }
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

  getFile(event: any): void {
    console.log('getFile() è stato chiamato');
    const files = event.target.files;

    if (files && files.length > 0) {
      this.selectedFile = files[0];
      console.log('Selected File:', this.selectedFile);

      this.articleForm.get('file')!.setValue(this.selectedFile);
      console.log(
        'Valore del campo file:',
        this.articleForm.get('file')!.value
      );

      const fileName = this.selectedFile
        ? this.selectedFile.name
        : 'not-found.svg';

      this.articleForm.get('propicUrl')!.setValue(fileName);

      this.cd.detectChanges();
    } else {
      console.error('File non valido o mancante.');
    }
  }

  uploadFile(): Observable<void> {
    return new Observable((observer) => {
      console.log('uploadFile() è stato chiamato');
      const file = this.selectedFile;
      console.log('Valore del campo file:', file);

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

  publishArticle() {
    const articleData = {
      ...this.articleForm.value,
      // author: authName, // Assicurati di estrarre il valore da authName
    };

    this.uploadFile().subscribe({
      next: () => {
        console.log('File caricato con successo.');

        // Rimuovi il campo file prima di aggiungerlo a Firestore
        const { file, ...articleDataWithoutFile } = articleData;

        // Ora, puoi pubblicare l'articolo nel database
        this.db
          .add(articleDataWithoutFile, 'articles')
          .then(() => {
            console.log('Articolo aggiunto con successo.');
            this.resetArticle();
          })
          .catch((addError) => {
            console.error("Errore durante l'aggiunta dell'articolo:", addError);
            // Gestisci l'errore come necessario
          });
      },
      error: (uploadError) => {
        console.error("Errore durante l'upload del file:", uploadError);
        // Gestisci l'errore come necessario
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
