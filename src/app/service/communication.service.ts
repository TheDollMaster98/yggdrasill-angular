// communication.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private articleUpdatedSource = new Subject<void>();

  articleUpdated$ = this.articleUpdatedSource.asObservable();

  triggerArticleUpdated() {
    this.articleUpdatedSource.next();
  }
}
