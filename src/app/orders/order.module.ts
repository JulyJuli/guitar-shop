import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from '../shared/shared.module';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order-form/order.component';
import { CartService } from '../cart/services/cart-list-service';
import { OrderResultComponent } from './components/order-result/order-result.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderedItemsRepository } from './repositories/ordered-items.repository';
import { MapToArray } from '../shared/pipes/map-to-array.pipe';
import { ProcessOrderComponent } from './components/process-order/process-order.component';
import { OrderValidationService } from './services/order-validation.service';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    OrderRoutingModule
  ],
  exports: [
    OrderComponent,
    OrderResultComponent,
    OrderListComponent,
    ProcessOrderComponent
  ],
  declarations: [
    OrderComponent,
    OrderResultComponent,
    OrderListComponent,
    ProcessOrderComponent
  ],
  providers: [
    CartService,
    MapToArray,
    OrderedItemsRepository,
    OrderValidationService
  ]
})
export class OrderModule { }
