import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/models/article.model';
import { catchError, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss'],
})
export class ArticleEditorPage implements OnInit {
  articleForm!: FormGroup;

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

  publishArticle() {
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

  confirmExitWithoutSaving() {
    const confirmExit = confirm(
      'Sei sicuro di voler uscire senza salvare? I dati verranno persi.'
    );
    if (confirmExit) {
      // Puoi navigare via o eseguire altre azioni necessarie
    }
  }
}
