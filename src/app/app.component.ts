import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './service/api.service';

const mainBgRoutes = ['/dashboard'];
const routesBgRoutes = ['/dashboard'];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'yggdrasill-angular';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    Date.prototype.toJSON = function () {
      const hoursDiff = this.getHours() - this.getTimezoneOffset() / 60;
      this.setHours(hoursDiff);
      return this.toISOString();
    };
  }

  getRouter(): Router {
    return this.router;
  }

  getApiService(): ApiService {
    return this.apiService;
  }

  getMainBackgroundColorClass() {
    return mainBgRoutes.includes(this.router.url)
      ? 'page-body'
      : 'page-body-white';
  }

  getRoutesBackgroundColorClass() {
    return routesBgRoutes.includes(this.router.url)
      ? 'page-body'
      : 'page-body-white';
  }
}
