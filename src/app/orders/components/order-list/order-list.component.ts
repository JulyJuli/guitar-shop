import { Component, OnInit } from '@angular/core';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProductModel } from 'src/app/products/models/product.model';
import { OrderedItemsRepository } from '../../repositories/ordered-items.repository';

@Component({
  selector: 'app-order-list-component',
  templateUrl: './order-list.component.html',
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class OrderListComponent implements OnInit {
  orders: { key: string, value: any }[] = [];

  constructor(public orderItemsRepo: OrderedItemsRepository, private localStorage: LocalStorageService) { }

  ngOnInit(): void {
    this.orderItemsRepo.ordersIds.forEach(orderId => {
      this.orders[orderId] = this.localStorage.getItem(orderId) as any as ProductModel[];
    });
  }
}
