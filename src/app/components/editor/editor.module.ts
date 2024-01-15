import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleEditorPage } from './article-editor/article-editor.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { ArticlePreviewComponent } from './article-preview/article-preview.component';
import { WysiwygEditorComponent } from './wysiwyg-editor/wysiwyg-editor.component';
import { ArticleCardComponent } from './article-card/article-card.component';

@NgModule({
  declarations: [
    // ArticleEditorPage,
    // ArticlePreviewComponent,
    // ArticleListComponent,
    // WysiwygEditorComponent
  
    ArticleCardComponent
  ],
  imports: [CommonModule],
})
export class EditorModule {}
