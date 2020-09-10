import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductListComponent } from './components/components/product-list/product-list.component';
import { ProductFormComponent } from './components/components/product-form/product-form.component';
import { ProductInfoComponent } from './components/components/product-info/product-info.component';

const routes: Routes = [
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  },
  {
    path: 'edit/:productId',
    component: ProductFormComponent
  },
  {
    path: 'product-info/:productId',
    component: ProductInfoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
