import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-order-component',
  templateUrl: './order-list.component.html',
  providers: [
    { provide: LocalStorageService, useClass: LocalStorageService }
  ]
})
export class OrderListComponent implements OnInit {
 
  orderedProducts: ProductModel[];
  
  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private activatedRouter: ActivatedRoute) {
   }

  ngOnInit(): void {
    this.activatedRouter.params.subscribe(params => {
      const propertyName = 'orderId';
      this.orderedProducts = (this.localStorage.getItem(params[propertyName]) as any as ProductModel[]);

      console.log(this.orderedProducts);
    });
  }

  onBackClick(): void {
    this.router.navigate(['product-list']);
  }
}
