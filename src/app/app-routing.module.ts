import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './components/pages/dashboard/dashboard.page';
import { PrivacyPolicyPage } from './components/privacy/privacy-policy/privacy-policy.component';
import { ComingsoonPage } from './components/pages/comingsoon/comingsoon.component';
import { GdprComponent } from './components/privacy/gdpr/gdpr.component';
import { ArticleEditorPage } from './components/editor/article-editor/article-editor.component';
import { WhoarePage } from './components/pages/whoare/whoare.page';
import { AdminPage } from './components/pages/admin/admin.page';
import { BlogPage } from './components/pages/blog/blog.page';
import { PodcastPage } from './components/pages/podcast/podcast.page';
import { UpdatesComponent } from './components/pages/updates/updates.component';
import { DashboardWordpressComponent } from './components/wordpress/blog-wordpress/blog-wordpress.component';
import { HomeWordpressComponent } from './components/wordpress/home-wordpress/home-wordpress.component';
import { HamButtonComponent } from './components/icon-component/ham-button/ham-button.component';
import { LoginPage } from './components/pages/login/login.page';
import { AdminGuard } from './guards/admin.guard';
import { AuthorGuard } from './guards/author.guard';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPage,
  },
  {
    path: 'blog',
    component: DashboardWordpressComponent,
  },
  {
    path: 'ggwp',
    component: BlogPage,
  },
  {
    path: 'comingsoon',
    component: ComingsoonPage,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyPage,
  },
  {
    path: 'gdpr',
    component: GdprComponent,
  },
  {
    path: 'edit/:author',
    component: ArticleEditorPage,
    canActivate: [AuthorGuard],
  },
  {
    path: 'chi-siamo',
    component: WhoarePage,
  },
  {
    path: 'admin',
    component: AdminPage,
    canActivate: [AdminGuard],
  },
  {
    path: 'podcast',
    component: ComingsoonPage,
  },
  {
    path: 'updates',
    component: UpdatesComponent,
  },
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
