import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order-form/order.component';
import { CartService } from '../cart/services/cart-list-service';
import { OrderResultComponent } from './components/order-result/order-result.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderedItemsRepository } from './repositories/ordered-items.repository';
import { MapToArray } from '../shared/pipes/map-to-array.pipe';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    OrderRoutingModule
  ],
  exports: [
    OrderComponent,
    OrderResultComponent,
    OrderListComponent
  ],
  declarations: [
    OrderComponent,
    OrderResultComponent,
    OrderListComponent
  ],
  providers: [
    CartService,
    MapToArray,
    OrderedItemsRepository
  ]
})
export class OrderModule { }
