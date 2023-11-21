// article-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/service/article.service';
import { Article } from 'src/app/models/article.model';
import { FirebaseDatabaseService } from 'src/app/service/firebase-database.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent implements OnInit {
  articles?: Article[];
  currentArticle?: Article;
  currentIndex = -1;
  title = '';

  constructor(
    private articleService: ArticleService,
    private firebaseDbSevice: FirebaseDatabaseService
  ) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  refreshList(): void {
    this.currentArticle = undefined;
    this.currentIndex = -1;
    this.loadArticles();
  }

  loadArticles(): void {
    this.firebaseDbSevice
      .getAll()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({
            id: c.payload.doc.id,
            ...c.payload.doc.data(),
          }))
        )
      )
      .subscribe((data) => {
        this.articles = data;
      });
  }

  setActiveArticles(article: Article, index: number): void {
    this.currentArticle = article;
    this.currentIndex = index;
  }
}
