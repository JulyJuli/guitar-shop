import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';

import { ProductComponent } from './components/components/product/product.component';
import { ProductService } from './services/product-service';
import { ProductListComponent } from './components/components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { OrderByPipe } from '../shared/pipes/order-by.pipe';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BrowserModule,
    ProductsRoutingModule,
    PopoverModule.forRoot()
  ],
  exports: [
    ProductListComponent
  ],
  declarations: [
    ProductComponent,
    ProductListComponent
  ],
  providers: [
    ProductService,
    OrderByPipe
  ]
})
export class ProductModule { }
