import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { ArticleService } from 'src/app/service/article.service';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { Article } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  articleForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    public articleService: ArticleService
  ) {}

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

  previewArticle() {
    // Verifica se il form è valido prima di aprire l'anteprima
    if (this.articleForm.valid) {
      // Salva temporaneamente l'articolo nel servizio
      this.articleService.setTemporaryArticle(this.articleForm.value);

      // Apri l'anteprima
      const modalRef = this.modalService.open(ArticlePreviewComponent, {
        size: 'lg',
      });

      // Passa i dati all'anteprima
      modalRef.componentInstance.articleTitle =
        this.articleForm.get('articleTitle')!.value;
      modalRef.componentInstance.publishDate =
        this.articleForm.get('publishDate')!.value;
      modalRef.componentInstance.author = this.articleForm.get('author')!.value;
      modalRef.componentInstance.genre = this.articleForm.get('genre')!.value;
      modalRef.componentInstance.articleContent =
        this.articleForm.get('articleContent')!.value;
    }
  }

  saveArticle() {
    // Mostra la conferma prima di salvare
    const confirmSave = confirm("Sei sicuro di voler salvare l'articolo?");
    if (confirmSave) {
      // Esegui la chiamata di salvataggio (implementazione della CRUD)
      this.articleService.createArticle(this.articleForm.value).subscribe(
        (response) => {
          // Gestisci la risposta dal server (se necessario)
          console.log('Articolo salvato con successo:', response);
        },
        (error) => {
          // Gestisci gli errori (se necessario)
          console.error("Errore durante il salvataggio dell'articolo:", error);
        }
      );
    }
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
