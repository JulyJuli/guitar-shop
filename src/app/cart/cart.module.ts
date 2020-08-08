import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListService } from './services/cart-list-service';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    CartListComponent
  ],
  declarations: [
    CartListComponent,
    CartItemComponent
  ],
  providers: [
    CartListService
  ]})
  export class CartModule { }
