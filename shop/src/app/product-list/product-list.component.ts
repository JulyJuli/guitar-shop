import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product-component/services/product-service';
import { Product } from '../product-component/models/product';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  productList: Product[];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.productService.isProductListChanged.subscribe(
      () => this.productList = this.productService.getProducts());
  }
}
