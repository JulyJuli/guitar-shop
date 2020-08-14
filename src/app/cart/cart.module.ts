import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { SharedModule } from '../shared/shared.module';
import { CartLazyModule } from './cart-lazy.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    CartLazyModule
  ],
  exports: [
    CartListComponent
  ],
  declarations: [
    CartListComponent,
    CartItemComponent
  ]})
  export class CartModule { }
