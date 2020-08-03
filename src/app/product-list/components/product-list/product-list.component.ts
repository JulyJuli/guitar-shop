import { Component, OnInit } from '@angular/core';

import { ProductModel } from 'src/app/product/models/product.model';
import { ProductService } from 'src/app/product/services/product-service';

@Component({
  selector: 'app-product-list-component',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  productList: ProductModel[];

  // если сервис не используется в шаблоне, то делаем его приватным
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productList = this.productService.getProducts();
    this.productService.isProductListChanged.subscribe(
      () => this.productList = this.productService.getProducts());
  }
}
// этот компонент можно переместить в папку product/components/product-list
