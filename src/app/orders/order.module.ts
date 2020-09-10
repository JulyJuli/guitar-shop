import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order-form/order.component';
import { CartService } from '../cart/services/cart-list-service';
import { OrderListComponent } from './components/order-list/order-list.component';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    OrderRoutingModule
  ],
  exports: [
    OrderComponent,
    OrderListComponent
  ],
  declarations: [
    OrderComponent,
    OrderListComponent
  ],
  providers: [
    CartService
  ]
})
export class OrderModule { }
