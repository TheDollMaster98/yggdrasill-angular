import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './components/pages/dashboard/dashboard.page';
import { PrivacyPolicyPage } from './components/privacy/privacy-policy/privacy-policy.component';
import { ComingsoonPage } from './components/pages/comingsoon/comingsoon.component';
import { GdprComponent } from './components/privacy/gdpr/gdpr.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/comingsoon',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: DashboardPage,
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
