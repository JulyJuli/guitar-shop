import { Component, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/product/models/product.model';
import { ProductService } from 'src/app/product/services/product-service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[];

  constructor(public productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.productService.isProductListChanged.subscribe(
      () => this.productList = this.productService.getProducts());
  }
}
