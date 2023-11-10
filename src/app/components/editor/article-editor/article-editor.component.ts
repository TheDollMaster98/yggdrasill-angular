// article-editor.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticlePreviewComponent } from '../article-preview/article-preview.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ArticleService } from 'src/app/service/article.service';

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

  saveArticle() {
    if (this.articleForm.valid) {
      // Salvare l'articolo nel tuo backend qui
      // ...

      // Resetta il form dopo aver salvato l'articolo
      this.resetArticle();
    } else {
      console.log('Compila tutti i campi obbligatori.');
    }
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
}
