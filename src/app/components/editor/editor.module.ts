import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorPage } from './article-editor/article-editor.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { WysiwygEditorComponent } from './wysiwyg-editor/wysiwyg-editor.component';
import { ArticleCardComponent } from './article-card/article-card.component';
import { ArticleViewComponent } from './article-view/article-view.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../icon-component/icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ArticleCardComponent,
    ArticleEditorPage,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleViewComponent,
    WysiwygEditorComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule,
    IconModule,
  ],
  exports: [
    ArticleCardComponent,
    ArticleEditorPage,
    ArticleListComponent,
    ArticlePreviewComponent,
    ArticleViewComponent,
    WysiwygEditorComponent,
  ],
})
export class EditorModule {}
