import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProductModel } from 'src/app/products/models/product.model';
import { OrderedItemsRepository } from '../../repositories/ordered-items.repository';

@Component({
  selector: 'app-order-result-component',
  templateUrl: './order-result.component.html',
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class OrderResultComponent implements OnInit {

  orderedProducts: ProductModel[];

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private orderedItemsRepo: OrderedItemsRepository,
    private activatedRouter: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const propertyName = 'orderId';
      this.orderedProducts = (this.localStorage.getItem(params[propertyName]) as any as ProductModel[]);

      this.orderedItemsRepo.addId(params[propertyName]);
    });
  }

  onBackClick(): void {
    this.router.navigate(['product-list']);
  }
}
