import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstComponent } from './first/components/first/first.component';
import { AboutComponent } from './layout/components/about.component';

const routes: Routes = [
  { path: 'first-component', component: FirstComponent },
  { path: 'about-component', component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
