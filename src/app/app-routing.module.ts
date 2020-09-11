import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { FirstComponent } from './first/components/first/first.component';
import { AboutComponent } from './layout/components/about.component';

const routes: Routes = [
  {
    path: 'first-component',
    canActivate: [AuthGuard],
    component: FirstComponent },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
