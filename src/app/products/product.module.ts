import { NgModule } from '@angular/core';

import { ProductComponent } from './components/components/product/product.component';
import { ProductService } from './services/product-service';
import { ProductListComponent } from './components/components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    ProductListComponent
  ],
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule { }
